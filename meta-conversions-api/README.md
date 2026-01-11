# Seetara Meta Conversions API - Google Sheets Integration

## 🎯 Overview
This solution provides **server-side tracking** to Meta Conversions API using Google Sheets as the data source.

### ⚠️ IMPORTANT: Duplicate Prevention Design
- **Browser Pixel** handles ALL Purchase events (fires once when order is placed)
- **CAPI (this script)** ONLY handles Refund events for cancelled orders
- This design prevents duplicate counting in Ads Manager!

## 📋 Setup Instructions

### Step 1: Create a New Google Sheet for Tracking
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named: `Seetara Orders Tracker`
3. Create 2 sheets/tabs:
   - `Orders` - For order tracking
   - `Sent Events` - To track what's been sent to Meta

### Step 2: Set Up the Orders Sheet
Run the `setupSheet()` function to automatically create headers.

Or add these column headers manually in Row 1:
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Order ID | Timestamp | Customer Name | Phone | Product | Color | Price | Order Type | Address | City | Delivery Zone | Status | Sent to Meta | Event ID | IP Address | User Agent | fbp | fbc |

**Status values:**
- `Intake` - नयाँ order आयो (new lead)
- `Converted` - Order successful भयो ✅ (marked as PIXEL - Browser already tracked)
- `Cancelled` - Order cancel भयो ❌ (sends Refund event to Meta)

### Step 3: Add the Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.js`
4. Save the project as "Seetara Meta Events"

### Step 4: Set Up Trigger (ONLY ONE!)

⚠️ **CRITICAL: Only set up ONE trigger!**

1. In Apps Script, go to **Triggers** (clock icon on left)
2. Click **+ Add Trigger**
3. **Set up this trigger:**
   - Function: `sendStatusUpdateEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes

❌ **DO NOT set up trigger for `sendNewPurchaseEvents`!**
   - This function is DISABLED to prevent duplicate Purchase events
   - Browser Pixel already handles all Purchase events

### Step 5: Delete Old Triggers (If Any)
If you have any existing trigger for `sendNewPurchaseEvents`:
1. Go to Triggers
2. Find the trigger for `sendNewPurchaseEvents`
3. Click the 3 dots menu → Delete

### Step 6: Test the Connection
1. In Apps Script, select function `testConnection` from dropdown
2. Click **Run** ▶️
3. Check **View > Logs** for success message

## 🔧 Configuration
Update these values in the script:
- `PIXEL_ID`: Your Meta Pixel ID
- `ACCESS_TOKEN`: Your Conversions API access token

## 📊 How Events Work

### Purchase Events (Browser Pixel Only):
```
Customer places order → SuccessMessage shows
                      → Browser Pixel fires Purchase (eventID = orderId)
                      → Order saved to Sheet
                      → Status = "Intake"
                      
You mark as Converted → Script marks "Sent to Meta" = "PIXEL"
                      → NO CAPI event sent (Browser already tracked!)
```

### Refund Events (CAPI Only):
```
Order is cancelled → You change Status to "Cancelled"
                   → Script sends Refund event to Meta
                   → Meta learns: this lead cancelled
                   → Ad algorithm improves!
```

## ⚠️ Why Only Refund Events via CAPI?

**Previous Problem:**
Both Browser Pixel AND CAPI sent Purchase events. Even with deduplication using `event_id`, Facebook sometimes counted them twice.

**Current Solution:**
- Browser Pixel = ONLY source of Purchase events (fires once, immediately)
- CAPI = ONLY for Refund events (tells Meta which purchases were cancelled)
- Result: Accurate purchase counts in Ads Manager!

## 🆘 Troubleshooting

### Still seeing duplicates?
1. **Check Triggers** - Delete any trigger for `sendNewPurchaseEvents`
2. **Update Script** - Make sure you have the latest version
3. **Check Event Manager** - Both Browser and CAPI should have matching event_id

### Refund events not showing?
1. **Check Status** - Order must be marked as "Cancelled"
2. **Check Trigger** - `sendStatusUpdateEvents` trigger must be running
3. **Check Logs** - View > Logs in Apps Script

---
Created for Seetara Nepal | Updated January 2026

