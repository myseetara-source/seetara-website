# 🔧 Seetara Meta Conversions API - Complete Setup Guide

## 🔴 तपाईंको Problems (Identified):
1. **Duplicate Purchase Events** - Meta ले 12 देखाउँदा actual 7 मात्र हो
2. **No Deduplication** - `event_id` नभएकोले duplicate count हुँदैथ्यो
3. **Poor Algorithm** - Wrong data ले targeting बिग्रिएको
4. **No Quality Feedback** - Cancel/Delivered status Meta लाई जाँदैनथ्यो

## ✅ Solutions Implemented:

### 1. Website Pixel Fixed (event_id added)
All SuccessMessage components now include `eventID` for proper deduplication:
- ✅ SB107 (Golden Chain Bag)
- ✅ SB106 (Chain Bag)
- ✅ SB104 (Multi-Functional Bag)
- ✅ SW101 (Smart Wallet)
- ✅ /order-success page

### 2. Google Sheets Conversions API Created
Server-side events to complement browser pixel.

---

## 📋 Step-by-Step Setup Instructions

### STEP 1: Deploy Website Updates
```bash
# In your terminal, run:
cd /Users/dhirajthakur/Seetara/seetara-website
npm run build
# Deploy to your hosting (Vercel/etc)
```

### STEP 2: Create Google Sheets Tracker

1. **Go to**: https://sheets.google.com
2. **Create New Spreadsheet**: Name it `Seetara Meta Events Tracker`
3. **Create Sheet 1** named `Orders` with these headers:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Order ID | Timestamp | Customer Name | Phone | Product | Color | Price | Status | City | Sent to Meta | Event ID |

4. **Status values to use** (तपाईंको existing system अनुसार):
   - `Intake` - नयाँ order आयो (new lead)
   - `Converted` - Order successful भयो ✅ (यो status मा Purchase event जान्छ Meta मा!)
   - `Cancelled` - Order cancel भयो ❌ (यो status मा negative signal जान्छ Meta मा)

### STEP 3: Add Google Apps Script

1. **In your Google Sheet**: Go to **Extensions > Apps Script**
2. **Delete all existing code**
3. **Copy the entire code from**: `google-apps-script.js`
4. **Paste it** and click **Save** (Ctrl+S)
5. **Name the project**: "Seetara Meta Events"

### STEP 4: Set Up Automatic Triggers

1. In Apps Script, click the **clock icon** (Triggers) on left sidebar
2. Click **+ Add Trigger**
3. **Set up Trigger 1**:
   - Choose function: `sendNewPurchaseEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes
   - Click Save

4. **Set up Trigger 2**:
   - Choose function: `sendStatusUpdateEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes
   - Click Save

### STEP 5: Test the Connection

1. In Apps Script, select function `testConnection` from dropdown
2. Click **Run** ▶️
3. Check **View > Logs** for success message
4. Go to Meta Events Manager > Test Events to verify

### STEP 6: Import Existing Orders (Optional)

If you want to import from your existing sheet:
1. Update `IMPORT_SHEET_URL` in the script with your sheet URL
2. Run the `importFromExternalSheet` function once

---

## 📊 How It Works

### Purchase Flow:
```
Customer Orders → Website fires FB Pixel (with eventID)
                → Order saved to Google Sheets
                → Google Script sends to Conversions API (with same eventID)
                → Meta deduplicates using eventID
                → Only 1 purchase counted! ✅
```

### Quality Feedback Flow:
```
तपाईं Sheet मा Status update गर्नुहुन्छ:

"Intake" → "Converted" (successful)
          → Script sends Purchase event to Meta ✅
          → Meta learns: यो type को lead = GOOD
          
"Intake" → "Cancelled" (failed)
          → Script sends negative signal to Meta ❌
          → Meta learns: यो type को lead = BAD
          → Future ads will avoid similar people!
```

---

## 🔄 Daily Workflow (तपाईंको Status अनुसार)

### 1️⃣ जब नयाँ Order आउँछ:
1. Order automatically tracked via website
2. Sheet मा status = `Intake` हुन्छ (नयाँ order आयो)
3. ⚠️ यस stage मा Meta लाई कुनै event जाँदैन

### 2️⃣ Order Complete/Successful हुँदा:
1. Sheet मा Status change गर्नुहोस्: `Intake` → `Converted`
2. ✅ Script automatically **Purchase event** Meta लाई पठाउँछ
3. Meta ले यो customer type राम्रो हो भन्ने बुझ्छ

### 3️⃣ Order Cancel हुँदा:
1. Status change गर्नुहोस्: any → `Cancelled`
2. ❌ Script automatically **negative signal** Meta लाई पठाउँछ
3. Meta ले यो customer type खराब हो भन्ने बुझ्छ
4. Future मा यस्तै मान्छेहरुलाई ads देखाउँदैन!

---

## ⏰ Expected Timeline

| Day | What Happens |
|-----|--------------|
| Day 1-2 | Events start showing in Events Manager |
| Day 3-5 | Meta begins learning from new data |
| Day 7-14 | Ad performance should start improving |
| Day 14-30 | Full optimization with quality leads |

---

## 🆘 Troubleshooting

### Events not showing in Meta:
- Check Access Token is valid (tokens expire!)
- Verify Pixel ID is correct
- Check Apps Script logs for errors

### Duplicate events still showing:
- Ensure website is deployed with new eventID code
- Check that eventID format matches between browser and server

### Script errors:
- Go to Apps Script > Executions to see error details
- Check Google Sheet column headers match expected format

---

## 📞 Important Info

- **Pixel ID**: 2046274132882959
- **API Version**: v24.0
- **Events sent**:
  - `Purchase` → जब status = `Converted` (successful order)
  - `Lead` (quality_score: 0) → जब status = `Cancelled` (failed order)

---

## 🎯 Quick Actions Checklist

- [ ] Deploy website updates
- [ ] Create new Google Sheet
- [ ] Add Apps Script code
- [ ] Set up 2 triggers
- [ ] Run test connection
- [ ] Add first order and verify in Meta Events Manager
- [ ] Set up daily workflow for status updates

---

**Created for Seetara Nepal**
**Date**: December 30, 2025

