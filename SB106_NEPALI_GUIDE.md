# 🎉 SB106 Website - Setup Guide (Nepali)

## Ke Bhayo? (What's Done?)

Tapai ko **SB106 Landing Page** lai main Seetara website ma successfully integrate gareko chu! 

**Page URL**: 
- Local testing: `http://localhost:3000/sb106`
- Live website: `https://seetara.com.np/sb106`

---

## 🚀 Kasto Deploy Garne? (How to Deploy?)

### Step 1: Environment Variables Setup

Tapai ko project folder ma `.env.local` file banaunus ani yaha paste garnus:

```env
# SB106 Configuration
NEXT_PUBLIC_AAKASH_SMS_TOKEN=933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

### Step 2: Local ma Test Garnus (Test Locally)

Terminal kholera yo command chalaunus:

```bash
npm run dev
```

Browser ma yo URL kholnus:
```
http://localhost:3000/sb106
```

### Step 3: GitHub ma Push Garnus

```bash
# All files add garnus
git add .

# Commit message leknus
git commit -m "SB106 landing page added at /sb106 route"

# GitHub ma push garnus
git push origin main
```

### Step 4: Vercel ma Environment Variables Halnus

Yo **sabai bhanda important step** ho!

1. **Vercel dashboard kholnus**: https://vercel.com
2. **Tapai ko project select garnus**: seetara-website
3. **Settings → Environment Variables** ma janus
4. **Yo 4 variables add garnus** (Step 1 bata copy garera):
   - `NEXT_PUBLIC_AAKASH_SMS_TOKEN`
   - `NEXT_PUBLIC_SALES_NUMBERS`
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. **Redeploy garnus** (Deployments → ... → Redeploy)

### Step 5: Production ma Test Garnus

Browser ma yo URL kholnus:
```
https://seetara.com.np/sb106
```

**Afno phone number halera test order place garnus!**

---

## ✅ Ke Ke Features Chan? (What Features?)

1. **4 Color Options**: Brown, Black, Maroon, Coffee
2. **Product Video**: Video play huncha
3. **Order Form**: "Buy" ra "Inquiry" duitai mode cha
4. **SMS Notification**: 
   - Customer lai confirmation SMS jancha
   - 3 sales team members lai alert SMS jancha
5. **Google Sheets**: Sabai orders automatically save huncha
6. **WhatsApp**: Order confirm garna WhatsApp automatically khulcha
7. **Mobile Friendly**: Mobile ma ramrari dekhaucha
8. **Animations**: Smooth effects chan

---

## 📱 Order Huda Ke Huncha? (What Happens on Order?)

1. Customer le form fill garcha
2. "Order Now" click garcha
3. ✅ **Customer lai SMS jancha** (order confirmation)
4. ✅ **3 sales team lai SMS jancha** (customer lai call garna alert)
5. ✅ **Google Sheet ma save huncha** (order record)
6. ✅ **WhatsApp automatically khulcha** (order confirm garna)
7. ✅ **Success page dekhaucha** 🎉

---

## 🔧 Kasari Change Garne? (How to Change?)

### Price Change Garna:
File: `src/components/sb106/utils/constants.ts`
```typescript
price: 1499,          // Yo number change garnus
originalPrice: 2100,  // Yo pani change garnus
```

### SMS Message Change Garna:
File: `src/components/sb106/utils/smsService.ts`
- Customer ko message: `createCustomerMessage()` function ma
- Sales team ko message: `createSalesTeamMessage()` function ma

### WhatsApp Message Change Garna:
File: `src/components/sb106/utils/googleSheetsService.ts`
- `redirectToWhatsApp()` function ma

---

## 🐛 Problem Ayo? (Troubleshooting)

### SMS aairako chaina?
→ Vercel ma `NEXT_PUBLIC_AAKASH_SMS_TOKEN` check garnus
→ SMS credit balance check garnus: https://sms.aakashsms.com

### Google Sheets ma save bhairako chaina?
→ Vercel ma `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` check garnus
→ Google Apps Script properly deployed cha ki chaina check garnus

### WhatsApp khulirako chaina?
→ Phone number format check garnus (9779802359033)

### Image load bhairako chaina?
→ Internet connection check garnus
→ Cloudflare R2 URLs public chan ki chaina check garnus

---

## 📞 Important Numbers

**Sales Team** (SMS jancha yo numbers ma):
- 9802359033
- 9802359035
- 9802200110

**WhatsApp Business**: +977 9802359033

---

## 📋 Testing Checklist (Test Garna Nabirsinu!)

Customer lai announce garna agadi:

- [ ] Local site check garnus (`localhost:3000/sb106`)
- [ ] Production site check garnus (`seetara.com.np/sb106`)
- [ ] **Afno phone number halera test order garnus**
- [ ] SMS aayo ki check garnus (customer SMS)
- [ ] Sales team lai SMS gayo ki check garnus (3 numbers)
- [ ] Google Sheet ma order save bhayo ki check garnus
- [ ] WhatsApp message correct cha ki check garnus
- [ ] Mobile phone ma pani check garnus
- [ ] 4 color options sabai kaam garcha ki check garnus
- [ ] Video play huncha ki check garnus
- [ ] "Buy" ra "Inquiry" duitai mode test garnus

---

## 🎯 Tapai Ready Hunuhuncha! (You're Ready!)

**Live URL**: https://seetara.com.np/sb106

Steps 1-5 follow garnus ani tapai ko SB106 landing page live huncha! 🎉

Detailed English guide chahiyo bhane: **SB106_DEPLOYMENT_GUIDE.md** hernus

---

## 📚 Aru Documents

1. **SB106_QUICK_START.md** - 5 minute setup (English)
2. **SB106_DEPLOYMENT_GUIDE.md** - Complete guide (English)
3. **src/components/sb106/README.md** - Technical details

---

**Successful deployment ko lagi Good Luck!** 🚀

*Seetara Team*

