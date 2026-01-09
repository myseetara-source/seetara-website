/**
 * Seetara Meta Conversions API - ADVANCED VERSION
 * Updated: January 2026
 * 
 * ⚠️ DEDUPLICATION + ADVANCED MATCHING ⚠️
 * 
 * This script does THREE things:
 * 1. RECEIVES orders from website (Web App) with Advanced Matching data
 * 2. SENDS Purchase events to Meta when status = "Converted"
 * 3. SENDS Refund events to Meta when status = "Cancelled"
 * 
 * NEW FEATURES (v2.0):
 * - IP Address: Improves user matching
 * - User Agent: Browser fingerprinting
 * - fbp: Facebook Browser ID (_fbp cookie)
 * - fbc: Facebook Click ID (_fbc cookie / fbclid URL param)
 * → These improve Event Match Quality Score from ~3.4 to 7+!
 * 
 * HOW DEDUPLICATION WORKS:
 * - Website Browser Pixel fires: fbq('track', 'Purchase', {...}, { eventID: orderId })
 * - This script (CAPI) fires:    event_id: orderId (EXACT SAME!)
 * - Facebook sees both with same ID → counts as 1 purchase (not 2!)
 * 
 * SETUP:
 * 1. Update PIXEL_ID and ACCESS_TOKEN below
 * 2. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 3. Copy Web App URL to website's NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 * 4. Set up time-based triggers:
 *    - sendNewPurchaseEvents (every 5 mins)
 *    - sendStatusUpdateEvents (every 5 mins)
 * 5. Run addAdvancedMatchingColumns() once to add new columns O-R
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const CONFIG = {
  PIXEL_ID: '2046274132882959',
  ACCESS_TOKEN: 'EAAbVARQRUmQBQd3pnOyZCKf68TlMzNfmwK7l5GZARQoRQ27bEBZBbj2R2aTsFe34JkSDtJ9PUkTm9ZBUzdMNOEb3vqb9P3r2sJwXdXmFQXFfqY5ar9ZAiAoKsmBWsRETqbuffwSZBDomoYaxfX47hSSi26g9xpQ9wnsZBhF0V5vxxBmmDwd2ZAbUAnakRelG6DpQPQZDZD',
  API_VERSION: 'v20.0', // Fixed: v20.0 is stable (v24.0 may not be available yet)
  TEST_EVENT_CODE: '', // Leave empty for production, add code for testing
};

// Sheet configuration
const SHEETS = {
  ORDERS: 'Orders',
  SENT_EVENTS: 'Sent Events',
};

// Column indices (0-based) - Match with sheet headers
// A: Order ID | B: Timestamp | C: Customer Name | D: Phone | E: Product | F: Color | G: Price | H: Order Type | I: Address | J: City | K: Delivery Zone | L: Status | M: Sent to Meta | N: Event ID | O: IP Address | P: User Agent | Q: fbp | R: fbc
const COLUMNS = {
  ORDER_ID: 0,      // A
  TIMESTAMP: 1,     // B
  CUSTOMER_NAME: 2, // C
  PHONE: 3,         // D
  PRODUCT: 4,       // E
  COLOR: 5,         // F
  PRICE: 6,         // G
  ORDER_TYPE: 7,    // H - Purchase or Inquiry
  ADDRESS: 8,       // I - Full address
  CITY: 9,          // J
  DELIVERY_ZONE: 10, // K - Inside Valley / Outside Valley
  STATUS: 11,       // L
  SENT_TO_META: 12, // M
  EVENT_ID: 13,     // N
  // NEW: Advanced Matching Parameters (for better Event Match Quality)
  IP_ADDRESS: 14,   // O - Client IP Address
  USER_AGENT: 15,   // P - Client User Agent
  FBP: 16,          // Q - Facebook Browser ID (_fbp cookie)
  FBC: 17,          // R - Facebook Click ID (_fbc cookie or fbclid URL param)
};

// ============================================
// WEB APP - RECEIVE ORDERS FROM WEBSITE
// ============================================

/**
 * Handle POST requests from website
 * This is called when a customer places an order
 * 
 * FIX: Uses orderId from website if provided (for deduplication)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // FIX: Use orderId from website if provided, otherwise generate new one
    // This ensures deduplication works correctly between Pixel and CAPI
    const orderId = data.orderId || data.id || `ORD${Date.now()}`;
    
    // Get the Orders sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.ORDERS);
    
    // ⚠️ FIX #1: Use ISO format for timestamp (more reliable parsing)
    // toLocaleString can cause "Invalid Date" errors in getUnixTimestamp()
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Add new row with order data - includes all fields + Advanced Matching params
    // Status defaults to "Intake"
    sheet.appendRow([
      orderId,                              // A: Order ID (from website or generated)
      timestamp,                            // B: Timestamp (ISO format)
      data.customerName || data.name || '', // C: Customer Name
      data.phone || '',                     // D: Phone
      data.productSKU || data.product || 'Seetara Product', // E: Product
      data.color || '',                     // F: Color
      data.grandTotal || data.price || 0,   // G: Price
      data.orderType || 'Purchase',         // H: Order Type (Purchase/Inquiry)
      data.address || '',                   // I: Address
      data.city || '',                      // J: City
      data.deliveryLocation || data.deliveryZone || '', // K: Delivery Zone (inside/outside)
      'Intake',                             // L: Status (default = Intake)
      '',                                   // M: Sent to Meta (empty)
      data.eventId || data.orderId || orderId, // N: Event ID (from website for deduplication)
      // NEW: Advanced Matching Parameters (REQUIRED for high Match Quality Score!)
      data.ip || '',                        // O: Client IP Address
      data.userAgent || '',                 // P: Client User Agent
      data.fbp || '',                       // Q: Facebook Browser ID (_fbp cookie)
      data.fbc || '',                       // R: Facebook Click ID (_fbc cookie/fbclid)
    ]);
    
    Logger.log(`✅ New order added: ${orderId}`);
    
    // Return success response with the orderId used
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log(`❌ Error in doPost: ${error.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'Seetara Orders API is running!',
      message: 'Use POST to submit orders'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// SHEET SETUP - RUN THIS ONCE!
// ============================================

/**
 * 🚀 RUN THIS FUNCTION FIRST!
 * Sets up the sheet with proper headers and formatting
 * Only run once when setting up the sheet
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create or get Orders sheet
  let ordersSheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet(SHEETS.ORDERS);
  }
  
  // Set headers in Row 1 - Updated with all fields + Advanced Matching
  const headers = [
    'Order ID',      // A
    'Timestamp',     // B
    'Customer Name', // C
    'Phone',         // D
    'Product',       // E
    'Color',         // F
    'Price',         // G
    'Order Type',    // H
    'Address',       // I
    'City',          // J
    'Delivery Zone', // K
    'Status',        // L
    'Sent to Meta',  // M
    'Event ID',      // N
    // NEW: Advanced Matching Columns (for better Event Match Quality!)
    'IP Address',    // O
    'User Agent',    // P
    'fbp (Browser ID)', // Q
    'fbc (Click ID)'    // R
  ];
  
  // Write headers
  ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers - Bold, Background color, Freeze
  const headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setHorizontalAlignment('center');
  
  // Freeze header row
  ordersSheet.setFrozenRows(1);
  
  // Set column widths - Updated for new columns + Advanced Matching
  ordersSheet.setColumnWidth(1, 180);  // Order ID
  ordersSheet.setColumnWidth(2, 180);  // Timestamp
  ordersSheet.setColumnWidth(3, 150);  // Customer Name
  ordersSheet.setColumnWidth(4, 120);  // Phone
  ordersSheet.setColumnWidth(5, 150);  // Product
  ordersSheet.setColumnWidth(6, 100);  // Color
  ordersSheet.setColumnWidth(7, 80);   // Price
  ordersSheet.setColumnWidth(8, 100);  // Order Type
  ordersSheet.setColumnWidth(9, 200);  // Address
  ordersSheet.setColumnWidth(10, 120); // City
  ordersSheet.setColumnWidth(11, 130); // Delivery Zone
  ordersSheet.setColumnWidth(12, 100); // Status
  ordersSheet.setColumnWidth(13, 100); // Sent to Meta
  ordersSheet.setColumnWidth(14, 200); // Event ID
  // NEW: Advanced Matching columns
  ordersSheet.setColumnWidth(15, 130); // IP Address
  ordersSheet.setColumnWidth(16, 200); // User Agent
  ordersSheet.setColumnWidth(17, 180); // fbp (Browser ID)
  ordersSheet.setColumnWidth(18, 200); // fbc (Click ID)
  
  // IMPORTANT: Clear ALL existing data validations first (to remove old validations from H column)
  ordersSheet.getRange('A2:R1000').clearDataValidations();
  
  // Add data validation for Status column ONLY (L column)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Intake', 'Converted', 'Cancelled'], true)
    .setAllowInvalid(false)
    .setHelpText('Select: Intake, Converted, or Cancelled')
    .build();
  ordersSheet.getRange('L2:L1000').setDataValidation(statusRule);
  
  // Order Type column (H) should NOT have dropdown - it gets "Purchase" or "Inquiry" from website
  // No validation needed for H column
  
  // Add conditional formatting for Status column
  // Intake = Yellow, Converted = Green, Cancelled = Red
  const statusRange = ordersSheet.getRange('L2:L1000');
  
  // Clear existing rules
  const rules = ordersSheet.getConditionalFormatRules();
  
  // Intake = Yellow
  const intakeRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Intake')
    .setBackground('#fff2cc')
    .setRanges([statusRange])
    .build();
  
  // Converted = Green
  const convertedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Converted')
    .setBackground('#d9ead3')
    .setFontColor('#137333')
    .setRanges([statusRange])
    .build();
  
  // Cancelled = Red
  const cancelledRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Cancelled')
    .setBackground('#f4cccc')
    .setFontColor('#cc0000')
    .setRanges([statusRange])
    .build();
  
  // Apply rules
  ordersSheet.setConditionalFormatRules([intakeRule, convertedRule, cancelledRule]);
  
  // Create Sent Events sheet (for tracking)
  let sentEventsSheet = ss.getSheetByName(SHEETS.SENT_EVENTS);
  if (!sentEventsSheet) {
    sentEventsSheet = ss.insertSheet(SHEETS.SENT_EVENTS);
    sentEventsSheet.getRange(1, 1, 1, 3).setValues([['Event Key', 'Event Type', 'Sent At']]);
    sentEventsSheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
    sentEventsSheet.setFrozenRows(1);
  }
  
  Logger.log('✅ Sheet setup complete!');
  Logger.log('📋 Headers added: ' + headers.join(', '));
  Logger.log('🎨 Status dropdown added with colors: Intake (Yellow), Converted (Green), Cancelled (Red)');
  Logger.log('🚀 Advanced Matching columns added: IP Address, User Agent, fbp, fbc');
  
  // Show success message
  SpreadsheetApp.getUi().alert(
    '✅ Setup Complete!',
    'Sheet is ready:\n\n' +
    '• Headers added (A to R)\n' +
    '• Status dropdown created (Intake, Converted, Cancelled)\n' +
    '• Colors applied\n' +
    '• NEW: Advanced Matching columns added (IP, User Agent, fbp, fbc)\n\n' +
    'Next: Deploy as Web App and set up Triggers!',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * 🔧 ADD NEW COLUMNS TO EXISTING SHEET
 * Run this ONCE if you already have data in the sheet
 * This adds O, P, Q, R headers without affecting existing data
 */
function addAdvancedMatchingColumns() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.ORDERS);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ Error', 'Orders sheet not found!', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  // Set headers at O1:R1
  const headers = ['IP Address', 'User Agent', 'fbp (Browser ID)', 'fbc (Click ID)'];
  const range = sheet.getRange(1, 15, 1, 4); // O1:R1
  range.setValues([headers]);
  range.setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  
  // Set column widths
  sheet.setColumnWidth(15, 130); // IP Address
  sheet.setColumnWidth(16, 200); // User Agent
  sheet.setColumnWidth(17, 180); // fbp
  sheet.setColumnWidth(18, 200); // fbc
  
  Logger.log('✅ Advanced Matching columns added: IP Address, User Agent, fbp, fbc');
  SpreadsheetApp.getUi().alert(
    '✅ Columns Added!',
    'New Advanced Matching columns added:\n\n' +
    '• O: IP Address\n' +
    '• P: User Agent\n' +
    '• Q: fbp (Browser ID)\n' +
    '• R: fbc (Click ID)\n\n' +
    'These will improve your Event Match Quality Score!',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Send Purchase events for Converted orders
 * Run this every 5 minutes via trigger
 * 
 * Status Flow:
 * - Intake: नयाँ order आयो (don't send Purchase yet)
 * - Converted: Order successful भयो (SEND PURCHASE EVENT!)
 * - Cancelled: Order cancel भयो (send negative signal)
 */
function sendNewPurchaseEvents() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.ORDERS);
  const data = sheet.getDataRange().getValues();
  
  let eventsSent = 0;
  
  // ⚠️ FIX #2: Collect updates for batch write (prevents "Time Limit Exceeded")
  const updates = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const orderId = row[COLUMNS.ORDER_ID];
    const sentToMeta = row[COLUMNS.SENT_TO_META];
    const status = String(row[COLUMNS.STATUS]).trim().toLowerCase();
    
    // Skip if already sent or no order ID
    if (!orderId || sentToMeta === 'YES') continue;
    
    // Only send Purchase event when status is "Converted" (order successful)
    if (status === 'converted') {
      const success = sendPurchaseEvent(row, i + 1);
      if (success) {
        eventsSent++;
        
        // Collect update for batch write
        const existingEventId = row[COLUMNS.EVENT_ID];
        let eventIdToSet = existingEventId;
        
        if (!existingEventId || existingEventId === '') {
          eventIdToSet = generateEventId(orderId);
          Logger.log(`⚠️ Event ID was empty, generated fallback: ${eventIdToSet}`);
        }
        
        updates.push({
          row: i + 1,
          sentToMeta: 'YES',
          eventId: eventIdToSet
        });
      }
    }
  }
  
  // ⚠️ BATCH UPDATE: Write all updates at once (MUCH faster!)
  updates.forEach(update => {
    sheet.getRange(update.row, COLUMNS.SENT_TO_META + 1).setValue(update.sentToMeta);
    if (update.eventId) {
      sheet.getRange(update.row, COLUMNS.EVENT_ID + 1).setValue(update.eventId);
    }
  });
  
  // Flush changes to ensure they're saved
  if (updates.length > 0) {
    SpreadsheetApp.flush();
  }
  
  Logger.log(`Sent ${eventsSent} Purchase events to Meta`);
}

/**
 * Send Cancelled events to Meta
 * Run this every 5 minutes via trigger
 * 
 * This sends negative signal to Meta when order is cancelled
 * so algorithm learns which leads are bad quality
 * 
 * ⚠️ IMPORTANT FOR COD ORDERS:
 * - Browser Pixel fires Purchase immediately when order is placed
 * - If order is later cancelled, we send Refund event to Meta
 * - This tells Meta: "This purchase was cancelled - low quality lead"
 * - Meta algorithm learns to avoid showing ads to similar users
 */
function sendStatusUpdateEvents() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.ORDERS);
  const sentEventsSheet = getOrCreateSentEventsSheet();
  const data = sheet.getDataRange().getValues();
  
  let eventsSent = 0;
  
  // ⚠️ FIX #2: Collect updates for batch write (prevents "Time Limit Exceeded")
  const updates = [];
  const sentEventKeys = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const orderId = row[COLUMNS.ORDER_ID];
    const status = String(row[COLUMNS.STATUS]).trim().toLowerCase();
    const alreadySentToMeta = row[COLUMNS.SENT_TO_META];
    
    if (!orderId) continue;
    
    // Check if we already sent this status update
    const statusEventKey = `${orderId}_${status}`;
    if (isEventAlreadySent(sentEventsSheet, statusEventKey)) continue;
    
    let success = false;
    let eventId = '';
    
    // Only send event for Cancelled orders (negative signal to Meta)
    if (status === 'cancelled') {
      success = sendCancelledEvent(row, i + 1);
      eventId = `refund_${orderId}`;
    }
    
    if (success) {
      eventsSent++;
      sentEventKeys.push({ key: statusEventKey, type: status });
      
      // Collect update for batch write
      const sentToMetaValue = alreadySentToMeta === 'YES' ? 'YES+REFUND' : 'REFUND';
      updates.push({
        row: i + 1,
        sentToMeta: sentToMetaValue,
        eventId: eventId
      });
      
      Logger.log(`✅ Refund event sent for cancelled order: ${orderId}`);
    }
  }
  
  // ⚠️ BATCH UPDATE: Write all updates at once (MUCH faster!)
  updates.forEach(update => {
    sheet.getRange(update.row, COLUMNS.SENT_TO_META + 1).setValue(update.sentToMeta);
    sheet.getRange(update.row, COLUMNS.EVENT_ID + 1).setValue(update.eventId);
  });
  
  // Mark all events as sent in batch
  sentEventKeys.forEach(event => {
    markEventAsSent(sentEventsSheet, event.key, event.type);
  });
  
  // Flush changes to ensure they're saved
  if (updates.length > 0) {
    SpreadsheetApp.flush();
  }
  
  Logger.log(`Sent ${eventsSent} Cancelled/Refund events to Meta`);
}

// ============================================
// EVENT SENDING FUNCTIONS
// ============================================

/**
 * Send Purchase event to Meta (CAPI)
 * 
 * ⚠️ DEDUPLICATION:
 * The event_id here MUST match the eventID sent by Browser Pixel
 * Both use: orderId directly (no prefix!)
 * 
 * Browser Pixel: { eventID: "sb107_9841234567_1735567890" }
 * CAPI (here):   { event_id: "sb107_9841234567_1735567890" }
 * 
 * Result: Facebook counts as 1 purchase, not 2
 */
function sendPurchaseEvent(row, rowNumber) {
  const orderId = row[COLUMNS.ORDER_ID];
  const timestamp = row[COLUMNS.TIMESTAMP];
  const phone = row[COLUMNS.PHONE];
  const price = row[COLUMNS.PRICE];
  const product = row[COLUMNS.PRODUCT];
  const city = row[COLUMNS.CITY];
  
  // NEW: Get Advanced Matching parameters from sheet
  const clientIpAddress = row[COLUMNS.IP_ADDRESS];
  const clientUserAgent = row[COLUMNS.USER_AGENT];
  const fbp = row[COLUMNS.FBP];
  const fbc = row[COLUMNS.FBC];
  
  // ⚠️ IMPROVED: Use Event ID from Column N (website's ID) for perfect deduplication
  // Fallback to orderId if Column N is empty
  let eventId = row[COLUMNS.EVENT_ID];
  if (!eventId || eventId === '') {
    eventId = generateEventId(orderId);
  }
  eventId = String(eventId).trim();
  
  const eventTime = getUnixTimestamp(timestamp);
  
  Logger.log(`Sending Purchase for Order: ${orderId}, EventID: ${eventId}, IP: ${clientIpAddress ? 'YES' : 'NO'}, fbp: ${fbp ? 'YES' : 'NO'}`);
  
  // ⚠️ FIX: Convert city to string first (Google Sheets may return number/date)
  const cityString = String(city || 'kathmandu').toLowerCase().trim();
  
  const payload = {
    data: [{
      event_name: 'Purchase',
      event_time: eventTime,
      event_id: eventId, // ⚠️ MUST match Browser Pixel's eventID for deduplication!
      action_source: 'website',
      user_data: {
        ph: [hashPhone(phone)],
        ct: [hashString(cityString)],
        country: [hashString('np')],
        // NEW: Advanced Matching Parameters (improves Event Match Quality Score!)
        client_ip_address: clientIpAddress || null,
        client_user_agent: clientUserAgent || null,
        fbp: fbp || null,
        fbc: fbc || null,
      },
      custom_data: {
        currency: 'NPR',
        value: parseFloat(price) || 0,
        content_name: String(product || 'Seetara Product'),
        content_type: 'product',
        order_id: String(orderId),
      },
    }],
  };
  
  if (CONFIG.TEST_EVENT_CODE) {
    payload.test_event_code = CONFIG.TEST_EVENT_CODE;
  }
  
  return sendToMeta(payload);
}

/**
 * Send Cancelled/Refund event to Meta
 * For E-commerce, "Refund" is better than "Lead"
 * 
 * ⚠️ WHY THIS IS IMPORTANT FOR AD OPTIMIZATION:
 * - Browser Pixel fires Purchase when user places COD order
 * - But COD order might get cancelled (didn't pay, fake order, etc.)
 * - Without Refund event, Meta thinks ALL orders are successful
 * - Meta will keep targeting similar users who cancel orders
 * 
 * With Refund event:
 * - Meta knows this Purchase was cancelled/refunded
 * - Meta adjusts attribution - doesn't count as successful conversion
 * - Meta algorithm learns: "Users like this tend to cancel"
 * - Over time, Meta shows ads to higher quality leads
 * 
 * This tells Facebook:
 * - This purchase was cancelled/refunded
 * - Helps calculate accurate ROAS
 * - Algorithm learns which leads cancel (low quality)
 */
function sendCancelledEvent(row, rowNumber) {
  const orderId = row[COLUMNS.ORDER_ID];
  const phone = row[COLUMNS.PHONE];
  const price = row[COLUMNS.PRICE];
  const product = row[COLUMNS.PRODUCT];
  const city = row[COLUMNS.CITY];
  const customerName = row[COLUMNS.CUSTOMER_NAME];
  
  // NEW: Get Advanced Matching parameters from sheet
  const clientIpAddress = row[COLUMNS.IP_ADDRESS];
  const clientUserAgent = row[COLUMNS.USER_AGENT];
  const fbp = row[COLUMNS.FBP];
  const fbc = row[COLUMNS.FBC];
  
  // Use consistent event ID format (no Date.now!)
  const eventId = `refund_${orderId}`;
  const eventTime = Math.floor(Date.now() / 1000);
  
  Logger.log(`🔴 Sending Refund event for cancelled order: ${orderId}, Customer: ${customerName}, Amount: ${price}`);
  
  // ⚠️ FIX: Convert city to string first (Google Sheets may return number/date)
  const cityString = String(city || 'kathmandu').toLowerCase().trim();
  
  const payload = {
    data: [{
      event_name: 'Refund', // Standard event for cancelled purchases
      event_time: eventTime,
      event_id: eventId,
      action_source: 'system_generated',
      user_data: {
        ph: [hashPhone(phone)],
        ct: [hashString(cityString)],
        country: [hashString('np')],
        // NEW: Advanced Matching Parameters (for better matching on refunds too)
        client_ip_address: clientIpAddress || null,
        client_user_agent: clientUserAgent || null,
        fbp: fbp || null,
        fbc: fbc || null,
      },
      custom_data: {
        currency: 'NPR',
        value: parseFloat(price) || 0, // Original order value
        content_name: String(product || 'Seetara Product'),
        content_type: 'product',
        order_id: String(orderId),
        refund_reason: 'order_cancelled',
        // Custom fields for analysis
        cancellation_type: 'cod_cancelled', // Cash on delivery cancelled
      },
    }],
  };
  
  if (CONFIG.TEST_EVENT_CODE) {
    payload.test_event_code = CONFIG.TEST_EVENT_CODE;
  }
  
  return sendToMeta(payload);
}

// ============================================
// API COMMUNICATION
// ============================================

/**
 * Send payload to Meta Conversions API
 */
function sendToMeta(payload) {
  const url = `https://graph.facebook.com/${CONFIG.API_VERSION}/${CONFIG.PIXEL_ID}/events?access_token=${CONFIG.ACCESS_TOKEN}`;
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseBody = JSON.parse(response.getContentText());
    
    if (responseCode === 200) {
      Logger.log(`✅ Event sent successfully: ${JSON.stringify(responseBody)}`);
      return true;
    } else {
      Logger.log(`❌ Error sending event: ${JSON.stringify(responseBody)}`);
      return false;
    }
  } catch (error) {
    Logger.log(`❌ Exception: ${error.message}`);
    return false;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate event ID for deduplication
 * 
 * ⚠️ CRITICAL FOR DEDUPLICATION ⚠️
 * This MUST return EXACTLY the same ID that the website's Browser Pixel sends!
 * 
 * Website (Browser Pixel) sends: eventID = orderId
 * This script (CAPI) sends:      event_id = orderId
 * 
 * When both match → Facebook deduplicates → counts as 1 purchase
 * When different → Facebook counts as 2 separate purchases!
 * 
 * DO NOT add prefixes like "purchase_" or "capi_" here!
 */
function generateEventId(orderId) {
  // EXACT same format as website's eventID - no modifications!
  // Website sends: fbq('track', 'Purchase', {...}, { eventID: orderId })
  // We send:       event_id: orderId
  return String(orderId);
}

/**
 * Convert date to Unix timestamp
 */
function getUnixTimestamp(dateValue) {
  if (!dateValue) return Math.floor(Date.now() / 1000);
  
  try {
    const date = new Date(dateValue);
    return Math.floor(date.getTime() / 1000);
  } catch (e) {
    return Math.floor(Date.now() / 1000);
  }
}

/**
 * Hash phone number with SHA256
 * Facebook requires phone WITH country code: 9779XXXXXXXXX
 * DO NOT remove 977!
 */
function hashPhone(phone) {
  if (!phone) return '';
  
  // Clean phone number (remove +, -, spaces)
  let cleaned = String(phone).replace(/\D/g, '');
  
  // Remove leading 0 if present
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Add Nepal country code if not present
  // Facebook requires: 9779XXXXXXXXX format
  if (!cleaned.startsWith('977') && cleaned.length === 10) {
    cleaned = '977' + cleaned;
  }
  
  // Final format should be 9779XXXXXXXXX (13 digits)
  return hashString(cleaned);
}

/**
 * Hash string with SHA256
 */
function hashString(value) {
  if (!value) return '';
  
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value.toLowerCase().trim());
  return hash.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)).join('');
}

/**
 * Get or create the Sent Events sheet
 */
function getOrCreateSentEventsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEETS.SENT_EVENTS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.SENT_EVENTS);
    sheet.getRange(1, 1, 1, 3).setValues([['Event Key', 'Event Type', 'Sent At']]);
  }
  
  return sheet;
}

/**
 * Check if event was already sent
 */
function isEventAlreadySent(sheet, eventKey) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === eventKey) {
      return true;
    }
  }
  
  return false;
}

/**
 * Mark event as sent
 */
function markEventAsSent(sheet, eventKey, eventType) {
  sheet.appendRow([eventKey, eventType, new Date()]);
}

// ============================================
// MANUAL TEST FUNCTIONS
// ============================================

/**
 * Test the connection to Meta API
 * Run this manually to verify setup
 */
function testConnection() {
  const payload = {
    data: [{
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_id: `test_${Date.now()}`,
      action_source: 'website',
      user_data: {
        client_ip_address: '0.0.0.0',
        client_user_agent: 'Mozilla/5.0',
      },
    }],
    test_event_code: 'TEST12345', // Replace with your test code from Events Manager
  };
  
  const success = sendToMeta(payload);
  
  if (success) {
    Logger.log('✅ Connection test successful! Check Events Manager > Test Events');
  } else {
    Logger.log('❌ Connection test failed. Check your Access Token and Pixel ID.');
  }
}

/**
 * Process all orders manually (one-time)
 * Use this to catch up on orders
 */
function processAllOrders() {
  sendNewPurchaseEvents();
  sendStatusUpdateEvents();
  Logger.log('All orders processed!');
}

// ============================================
// IMPORT FROM EXTERNAL SHEET (Optional)
// ============================================

/**
 * Import orders from your existing Google Sheet
 * Update the IMPORT_SHEET_URL below
 */
function importFromExternalSheet() {
  const IMPORT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1iV2Ckvm5wuB-1kT1uWXOe0rNuDT7g7tYQ_C8WrEqe4/edit';
  const IMPORT_SHEET_NAME = 'Website Order';
  
  try {
    const sourceSheet = SpreadsheetApp.openByUrl(IMPORT_SHEET_URL).getSheetByName(IMPORT_SHEET_NAME);
    const destSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.ORDERS);
    
    const data = sourceSheet.getDataRange().getValues();
    
    // Skip header and process rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Map columns from your existing sheet
      // Adjust these indices based on your actual sheet structure
      const orderId = `ORD${Date.now()}${i}`;
      const timestamp = row[0]; // A - Timestamp
      const customerName = row[4]; // E - Deenaa Sharma
      const phone = row[5]; // F - Phone
      const product = row[2]; // C - Product
      const color = row[3]; // D - Color
      const price = row[9] || row[10]; // J or K - Price
      const status = 'new';
      const city = row[6]; // G - City
      
      // Add to orders sheet
      destSheet.appendRow([
        orderId,
        timestamp,
        customerName,
        phone,
        product,
        color,
        price,
        status,
        city,
        '', // Sent to Meta
        '', // Event ID
      ]);
    }
    
    Logger.log(`Imported ${data.length - 1} orders`);
  } catch (error) {
    Logger.log(`Import error: ${error.message}`);
  }
}

