# Seetara Meta Conversions API - Google Sheets Integration

## 🎯 Overview
This solution sends **server-side events** to Meta Conversions API using Google Sheets as the data source. This ensures:
- ✅ **No Duplicate Events** - Proper deduplication with `event_id`
- ✅ **Quality Leads** - Send order status (Converted ✅, Cancelled ❌) to Meta
- ✅ **Better Algorithm** - Meta can optimize for real conversions
- ✅ **Lower Ad Costs** - Better targeting = cheaper, quality leads

## 📋 Setup Instructions

### Step 1: Create a New Google Sheet for Tracking
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named: `Seetara Meta Events Tracker`
3. Create 2 sheets/tabs:
   - `Orders` - For purchase events
   - `Sent Events` - To track what's been sent to Meta

### Step 2: Set Up the Orders Sheet
Add these column headers in Row 1:
| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Order ID | Timestamp | Customer Name | Phone | Product | Color | Price | Status | City | Sent to Meta | Event ID |

**Status values (तपाईंको existing sheet अनुसार):**
- `Intake` - नयाँ order आयो (new lead - no event sent yet)
- `Converted` - Order successful भयो ✅ (sends Purchase event to Meta!)
- `Cancelled` - Order cancel भयो ❌ (sends negative signal to Meta)

### Step 3: Add the Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.js`
4. Save the project as "Seetara Meta Events"

### Step 4: Set Up Triggers
1. In Apps Script, go to **Triggers** (clock icon on left)
2. Click **+ Add Trigger**
3. Set up these triggers:
   - Function: `sendNewPurchaseEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes
   
   - Function: `sendStatusUpdateEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes

### Step 5: Test the Integration
1. Add a test order to your sheet
2. Run `sendNewPurchaseEvents` manually
3. Check Meta Events Manager > Test Events

## 🔧 Configuration
Update these values in the script:
- `PIXEL_ID`: Your Meta Pixel ID
- `ACCESS_TOKEN`: Your Conversions API access token

## 📊 Event Types Sent to Meta

| Event | When Sent | Purpose |
|-------|-----------|---------|
| `Purchase` | Status = `Converted` | ✅ Track successful orders, tells Meta this is a quality customer |
| `Lead` (quality_score: 0) | Status = `Cancelled` | ❌ Negative signal, tells Meta this type of lead was bad |

### 🔄 Status Flow:
```
Order आयो → Intake (no event)
          ↓
    ┌─────┴─────┐
    ↓           ↓
Converted   Cancelled
(Purchase)  (Lead q=0)
    ✅          ❌
```

## ⚠️ Important Notes
1. **Deduplication**: Each event has unique `event_id` to prevent duplicates
2. **Phone Hashing**: Phone numbers are SHA256 hashed before sending
3. **Wait 24-48 hours**: After setup, give Meta time to receive data
4. **Check Events Manager**: Monitor in Meta Events Manager > Test Events

## 🆘 Troubleshooting
- **Events not showing**: Check access token is valid
- **Duplicates still**: Ensure browser pixel has same event_id
- **Errors in script**: Check Apps Script execution logs

---
Created for Seetara Nepal

