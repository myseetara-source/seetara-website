# 🚨 SMS API Fix Guide - Environment Variables Missing!

## समस्या (Problem):
Tapai ko `.env.local` file ma SB106 ko SMS API variables **हालिएको छैन**। That's why SMS is not working!

---

## ✅ समाधान (Solution):

### Step 1: Open `.env.local` file

Tapai ko project folder ma `.env.local` file खोल्नुस्:

```bash
# VS Code or Cursor ma open garnus
cursor .env.local
```

Or manually navigate to: `/Users/dhirajthakur/Seetara/seetara-website/.env.local`

---

### Step 2: यो lines हाल्नुस् (Add these lines)

File को **अन्तिम (bottom)** मा यो lines paste garnus:

```env
# ============================================
# SB106 Landing Page Configuration
# ============================================

# Aakash SMS API Token
NEXT_PUBLIC_AAKASH_SMS_TOKEN=933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032

# Sales Team Phone Numbers (comma separated, no spaces)
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110

# Google Apps Script URL (for saving orders to Google Sheets)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec

# WhatsApp Business Number (include country code)
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

---

### Step 3: Server Restart गर्नुस्

File save garera server restart garnus:

1. **Terminal जहाँ server चलिरहेको छ, त्यहाँ जानुस्**
2. Press `Ctrl + C` (server रोक्नुहोस्)
3. फेरि start garnus:
   ```bash
   npm run dev
   ```

---

### Step 4: Test गर्नुस्

अब http://localhost:3001/sb106 मा जानुस् र order place garnus। 

**यो कुराहरू check गर्नुस्:**
- ✅ Customer SMS jancha (आफ्नो phone number halnus)
- ✅ Sales team SMS jancha (3 numbers ma)
- ✅ Google Sheets ma save huncha
- ✅ WhatsApp automatically khulcha

---

## 📝 Copy गर्नको लागि (For Easy Copy):

यो text directly copy garera `.env.local` file मा paste garnus:

```
NEXT_PUBLIC_AAKASH_SMS_TOKEN=933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

---

## ⚠️ महत्वपूर्ण (Important):

1. **Save गर्न नबिर्सनुस्!** (Don't forget to save!)
2. **Server restart गर्नुस्** (Server must be restarted!)
3. **Exact गरी copy garnus** (Copy exactly as shown)
4. **No extra spaces** (कुनै extra space नहाल्नुस्)

---

## 🎯 Quick Commands:

```bash
# Terminal मा यो commands चलाउनुस्:

# 1. Server रोक्नुस्
Ctrl + C

# 2. Server फेरि start garnus
npm run dev

# 3. Browser refresh garnus
# Visit: http://localhost:3001/sb106
```

---

## ✅ काम भयो कि भएन check गर्ने (How to verify it works):

1. Open: http://localhost:3001/sb106
2. Form fill garnus (आफ्नो real phone number use garnus)
3. Order place garnus
4. आफ्नो phone मा SMS check garnus
5. Sales team को 3 numbers मा SMS jancha

---

**यो steps follow गर्नुस् र SMS काम गर्नेछ!** 🚀

