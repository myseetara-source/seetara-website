# 🎯 SB106 - Quick Reference Cheat Sheet

## 📍 URLs

| Environment | URL |
|-------------|-----|
| **Local** | http://localhost:3000/sb106 |
| **Production** | https://seetara.com.np/sb106 |

---

## 🔑 Environment Variables (Required!)

```env
NEXT_PUBLIC_AAKASH_SMS_TOKEN=933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

**⚠️ IMPORTANT**: Add these to both `.env.local` (local) AND Vercel (production)!

---

## 🚀 Deployment Commands

```bash
# 1. Test locally
npm run dev

# 2. Commit changes
git add .
git commit -m "Add SB106 landing page"
git push origin main

# 3. Vercel will auto-deploy
# Then add env variables in Vercel dashboard
```

---

## 📂 Key Files & What They Do

| File | Purpose |
|------|---------|
| `src/app/sb106/page.tsx` | Route entry point |
| `src/components/sb106/SB106LandingPage.tsx` | Main container |
| `src/components/sb106/utils/constants.ts` | **Change prices here** |
| `src/components/sb106/utils/smsService.ts` | **Edit SMS messages** |
| `src/components/sb106/config/r2Config.ts` | Image/video URLs |

---

## 💰 Change Product Price

**File**: `src/components/sb106/utils/constants.ts`

```typescript
'Brown': { 
  price: 1499,           // ← Change current price
  originalPrice: 2100,   // ← Change original price
}
```

---

## 📱 SMS Flow

```
Customer Orders
    ↓
SMS #1 → Customer (confirmation)
SMS #2 → 9802359033 (sales alert)
SMS #3 → 9802359035 (sales alert)
SMS #4 → 9802200110 (sales alert)
```

---

## ✅ Testing Checklist

- [ ] Local: http://localhost:3000/sb106
- [ ] Production: https://seetara.com.np/sb106
- [ ] Place test order with YOUR phone
- [ ] Check SMS received (yours)
- [ ] Check SMS received (sales team - 3 numbers)
- [ ] Verify order in Google Sheets
- [ ] WhatsApp opens correctly
- [ ] Test on mobile device

---

## 🐛 Quick Fixes

### SMS not working?
1. Check Vercel environment variables
2. Check credit: https://sms.aakashsms.com
3. Verify phone format (10 digits, starts with 98/97)

### Google Sheets not saving?
1. Check `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` in Vercel
2. Verify script is deployed as web app

### Images not loading?
- Check internet connection
- Verify R2 URLs are public

---

## 📞 Important Contacts

| Role | Number |
|------|--------|
| Sales Team 1 | 9802359033 |
| Sales Team 2 | 9802359035 |
| Sales Team 3 | 9802200110 |
| WhatsApp | +977 9802359033 |

---

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| `SB106_QUICK_START.md` | 5-minute setup |
| `SB106_DEPLOYMENT_GUIDE.md` | Complete guide |
| `SB106_NEPALI_GUIDE.md` | Nepali version |
| `SB106_INTEGRATION_SUMMARY.md` | Technical details |

---

## 🎨 Product Colors

1. **Brown** (#8B5A2B)
2. **Black** (#222222)
3. **Maroon** (#800000)
4. **Coffee** (#5D4037)

---

## 🔗 External Services

| Service | Dashboard |
|---------|-----------|
| **SMS** | https://sms.aakashsms.com |
| **Vercel** | https://vercel.com/dhirajs-projects-29720397 |
| **R2 Images** | https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106 |

---

## 💡 Common Customizations

### Add New Color
1. Upload image to R2: `/SB106/[color]-handbag.jpg`
2. Add to `r2Config.ts`
3. Add to `constants.ts` products object

### Change SMS Message
- Customer: `smsService.ts` → `createCustomerMessage()`
- Sales: `smsService.ts` → `createSalesTeamMessage()`

### Change WhatsApp Message
- `googleSheetsService.ts` → `redirectToWhatsApp()`

---

## ⚡ Quick Terminal Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Git push
git add . && git commit -m "update" && git push

# View Vercel logs
vercel logs seetara.com.np
```

---

## 🎯 Success Metrics

Track these:
- Total orders (Google Sheets)
- SMS delivery rate (Aakash SMS dashboard)
- WhatsApp conversations
- Mobile vs Desktop traffic

---

## 🔐 Security Notes

✅ Safe to expose:
- `NEXT_PUBLIC_*` variables
- Phone numbers
- SMS token (send-only)

❌ Never expose:
- Database credentials
- Admin passwords
- API secret keys

---

## 📊 Monitor Health

Daily checks:
- [ ] SMS credit balance > 100
- [ ] Vercel deployment successful
- [ ] No errors in logs
- [ ] Orders appearing in sheets

---

**Print this page for quick reference!** 📄

---

*Seetara SB106 - Quick Reference v1.0*

