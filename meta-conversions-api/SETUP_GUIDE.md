# 🔧 Seetara Meta Conversions API - Complete Setup Guide

## 🔴 Duplicate Purchase Problem - SOLVED!

**Problem:** Meta Ads Manager showing 6 purchases when actual orders are only 3.

**Root Cause:** Both Browser Pixel AND CAPI were sending Purchase events. Even with `event_id` deduplication, Facebook sometimes counted them twice.

**Solution:**
- ✅ Browser Pixel = ONLY source of Purchase events (fires once when order placed)
- ✅ CAPI = ONLY for Refund events (when orders are cancelled)
- ✅ Result: Accurate purchase counts!

---

## ✅ Current Design:

### Website Pixel (Browser-side):
All pages fire Purchase with proper `eventID` for deduplication:
- ✅ Luna (Luna Bag)
- ✅ SB107 (Golden Chain Bag)
- ✅ SB106 (Chain Bag)
- ✅ SB104 (Multi-Functional Bag)
- ✅ SW101 (Smart Wallet)
- ✅ /order-success page

### CAPI (Server-side via Google Apps Script):
- ❌ NO Purchase events (Browser handles this)
- ✅ Refund events when orders are cancelled

---

## 📋 Step-by-Step Setup Instructions

### STEP 1: Deploy Website Updates
```bash
cd /Users/dhirajthakur/Seetara/seetara-website
npm run build
# Deploy to Vercel
```

### STEP 2: Update Google Apps Script

1. **Open your Google Sheet**: Go to **Extensions > Apps Script**
2. **Delete ALL existing code**
3. **Copy the entire code from**: `google-apps-script.js`
4. **Paste it** and click **Save** (Ctrl+S)

### STEP 3: ⚠️ DELETE OLD TRIGGERS (CRITICAL!)

This is the most important step to fix duplicates:

1. In Apps Script, click the **clock icon** (Triggers) on left sidebar
2. **LOOK FOR** any trigger with function `sendNewPurchaseEvents`
3. **DELETE IT** by clicking the 3-dot menu → Delete
4. This trigger was causing duplicate Purchase events!

### STEP 4: Set Up Single Trigger

1. In Apps Script, click **+ Add Trigger**
2. **Set up ONLY this trigger:**
   - Choose function: `sendStatusUpdateEvents`
   - Event source: Time-driven
   - Type: Minutes timer
   - Interval: Every 5 minutes
   - Click Save

⚠️ **DO NOT add trigger for `sendNewPurchaseEvents`!**
This function is intentionally disabled to prevent duplicates.

### STEP 5: Verify Setup

1. Run `testConnection` manually to test API connection
2. Check **View > Logs** for success message

---

## 📊 How It Works Now

### When Customer Places Order:
```
Customer clicks "Order" → SuccessMessage shows
                        → Browser Pixel fires Purchase (eventID = orderId)
                        → Order saved to Google Sheet (status = Intake)
                        → ✅ ONLY 1 Purchase event to Meta!
```

### When You Mark Order as Converted:
```
You change status: Intake → Converted
                 → Script marks "Sent to Meta" = "PIXEL"
                 → ❌ NO CAPI event sent (Browser already tracked!)
```

### When Order is Cancelled:
```
You change status: any → Cancelled
                 → Script sends Refund event to Meta
                 → Meta learns: this lead cancelled
                 → Ad algorithm avoids similar users!
```

---

## 🔄 Daily Workflow

### 1️⃣ नयाँ Order आउँछ:
1. Order automatically saved to Sheet (status = `Intake`)
2. Browser Pixel already fired Purchase ✅
3. No action needed - just wait for confirmation

### 2️⃣ Order Successful हुँदा:
1. Status change: `Intake` → `Converted`
2. Script marks as "PIXEL" (already tracked by browser)
3. No duplicate event sent!

### 3️⃣ Order Cancel हुँदा:
1. Status change: any → `Cancelled`
2. Script sends Refund event to Meta
3. Meta learns this was a bad quality lead
4. Future ads avoid similar users!

---

## 🆘 Troubleshooting

### Still seeing duplicate purchases?
1. **Check Triggers** - Make sure `sendNewPurchaseEvents` trigger is DELETED
2. **Update Script** - Make sure you have the latest code
3. **Clear old data** - Duplicates from before fix will still show

### Refund events not working?
1. **Check Status** - Order must be marked as "Cancelled"
2. **Check Trigger** - `sendStatusUpdateEvents` must be running
3. **Check Logs** - View > Logs in Apps Script

### How to verify fix is working?
1. Place a test order
2. Check Events Manager → should show only 1 Purchase
3. If you cancel, you should see 1 Refund event

---

## 📞 Important Info

- **Pixel ID**: 2046274132882959
- **API Version**: v20.0
- **Events sent**:
  - `Purchase` → Browser Pixel only (when order placed)
  - `Refund` → CAPI only (when status = `Cancelled`)

---

## 🎯 Quick Checklist

- [ ] Update website code and deploy
- [ ] Update Google Apps Script code
- [ ] **DELETE `sendNewPurchaseEvents` trigger**
- [ ] Set up ONLY `sendStatusUpdateEvents` trigger
- [ ] Test with new order
- [ ] Verify only 1 purchase shows in Events Manager

---

**Created for Seetara Nepal**
**Updated**: January 2026 (Duplicate fix)

