# Google Sheets Integration Setup Guide

यो guide ले तपाईंलाई form data Google Sheets मा automatically save गर्न मद्दत गर्छ।

## Step 1: Google Apps Script बनाउनुहोस्

1. **Google Sheet खोल्नुहोस्:** 
   - यो link मा जानुहोस्: https://docs.google.com/spreadsheets/d/1iV2Ckvvm5wuB-lkTluWXOe0rNuDT7g7tYQ_C8WrEqe4/edit

2. **Extensions मेनु मा जानुहोस्:**
   - `Extensions` → `Apps Script` click गर्नुहोस्

3. **Apps Script Editor मा:**
   - Default `Code.gs` file को सबै code हटाउनुहोस्
   - तल दिइएको code paste गर्नुहोस्:

```javascript
// Google Apps Script - Paste this in Code.gs

function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet by ID
    var spreadsheetId = '1iV2Ckvvm5wuB-lkTluWXOe0rNuDT7g7tYQ_C8WrEqe4';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Order Type',
        'Product SKU',
        'Color',
        'Customer Name',
        'Phone',
        'City',
        'Address',
        'Delivery Zone',
        'Item Price',
        'Delivery Charge',
        'Grand Total'
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Append the new data row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.orderType || 'N/A',
      data.productSKU || 'N/A',
      data.color || 'N/A',
      data.customerName || 'N/A',
      data.phone || 'N/A',
      data.city || 'N/A',
      data.address || 'N/A',
      data.deliveryLocation || 'N/A',
      data.itemPrice || 0,
      data.deliveryCharge || 0,
      data.grandTotal || 0
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data added successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this to verify the script works
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString(),
        orderType: 'Purchase',
        productSKU: 'SB106-Black',
        color: 'Black',
        customerName: 'Test Customer',
        phone: '9801234567',
        city: 'Kathmandu',
        address: 'Test Address',
        deliveryLocation: 'Inside Kathmandu Valley',
        itemPrice: 1499,
        deliveryCharge: 100,
        grandTotal: 1599
      })
    }
  };
  
  doPost(testData);
  Logger.log('Test data added to sheet');
}
```

4. **Script Save गर्नुहोस्:**
   - `Ctrl + S` (Windows) वा `Cmd + S` (Mac) थिच्नुहोस्
   - Project को नाम दिनुहोस्: `SB106 Order Handler`

## Step 2: Web App Deploy गर्नुहोस्

1. **Deploy button click गर्नुहोस्:**
   - Top right मा `Deploy` → `New deployment` click गर्नुहोस्

2. **Settings configure गर्नुहोस्:**
   - ⚙️ Gear icon छेउको `Select type` click गर्नुहोस्
   - `Web app` select गर्नुहोस्

3. **Deployment Settings:**
   - **Description:** `SB106 Order API`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` ⚠️ यो important छ!

4. **Deploy click गर्नुहोस्**

5. **Authorization:**
   - `Authorize access` click गर्नुहोस्
   - आफ्नो Google account select गर्नुहोस्
   - `Advanced` → `Go to SB106 Order Handler (unsafe)` click गर्नुहोस्
   - `Allow` click गर्नुहोस्

6. **Web App URL Copy गर्नुहोस्:**
   - Deployment सफल भएपछि, तपाईंले यस्तो URL पाउनुहुनेछ:
   ```
   https://script.google.com/macros/s/AKfycb...xxxxx.../exec
   ```
   - यो URL copy गर्नुहोस्!

## Step 3: Code मा URL Update गर्नुहोस्

1. **यो file खोल्नुहोस्:** `src/utils/googleSheetsService.js`

2. **Line 5 मा URL replace गर्नुहोस्:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

3. **File save गर्नुहोस्**

## Step 4: Test गर्नुहोस्

1. Website मा जानुहोस्: `http://localhost:5173`
2. Form fill गर्नुहोस् र submit गर्नुहोस्
3. Google Sheet check गर्नुहोस् - data automatically add हुनुपर्छ
4. Buy order गर्दा WhatsApp automatically open हुनेछ order details सहित

---

## 🎯 What Happens After Setup:

### For "I want to Buy" Orders:
1. ✅ Data automatically Google Sheet मा save हुन्छ
2. ✅ Product SKU: `SB106-Black`, `SB106-Brown`, etc.
3. ✅ WhatsApp automatically open हुन्छ +977 9802359033 मा order details सहित
4. ✅ Customer ले message send गर्न सक्छ तपाईंको sales team लाई

### For "I have a Question" Inquiries:
1. ✅ Data automatically Google Sheet मा save हुन्छ
2. ❌ WhatsApp redirect हुँदैन (inquiry मात्र हो)

---

## 📊 Google Sheet Columns:

| Column | Description |
|--------|-------------|
| Timestamp | Order/Inquiry को date र time |
| Order Type | "Purchase" वा "Inquiry" |
| Product SKU | SB106-Black, SB106-Brown, etc. |
| Color | Selected color |
| Customer Name | Customer को नाम |
| Phone | Mobile number |
| City | City/District |
| Address | Full address |
| Delivery Zone | Inside Valley / Outside Valley |
| Item Price | Product price (Rs. 1499) |
| Delivery Charge | Rs. 100 or Rs. 150 |
| Grand Total | Total amount |

---

## ⚠️ Common Issues & Solutions:

### Issue: Data Sheet मा जाँदैन
- Check: Web App URL correct छ कि छैन
- Check: "Anyone" access दिइएको छ कि छैन
- Console मा error check गर्नुहोस्

### Issue: Authorization error
- Script को settings मा जानुहोस्
- `Manage deployment` → Edit → Re-authorize

### Issue: WhatsApp open हुँदैन
- Pop-up blocker disable गर्नुहोस्
- Mobile मा test गर्नुहोस्

---

## 🔒 Security Notes:

- Web App URL लाई public न गर्नुहोस्
- यो URL ले directly तपाईंको Sheet मा data add गर्न सक्छ
- Production मा additional validation add गर्न सक्नुहुन्छ

---

✅ **Setup Complete!** अब तपाईंको form submissions automatically Google Sheet मा save हुनेछ र buy orders WhatsApp मा पनि जानेछ।

