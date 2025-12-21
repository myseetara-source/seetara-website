# SB106 Landing Page - Complete Deployment Guide

## Congratulations! 🎉

Your SB106 Landing Page has been successfully integrated into the main Seetara website and will be accessible at:
- **Local**: `http://localhost:3000/sb106`
- **Production**: `https://seetara.com.np/sb106`

---

## 📁 Project Structure

The SB106 landing page has been integrated as follows:

```
src/
├── app/
│   └── sb106/
│       └── page.tsx                    # Main route page
├── components/
│   └── sb106/
│       ├── SB106LandingPage.tsx       # Main container component
│       ├── components/                 # All UI components
│       │   ├── Header.tsx
│       │   ├── Hero.tsx
│       │   ├── Features.tsx
│       │   ├── VideoSection.tsx
│       │   ├── OrderForm.tsx
│       │   ├── BottomBar.tsx
│       │   ├── Notification.tsx
│       │   └── SuccessMessage.tsx
│       ├── config/
│       │   └── r2Config.ts            # Cloudflare R2 configuration
│       ├── utils/
│       │   ├── constants.ts           # Product data & constants
│       │   ├── smsService.ts          # Aakash SMS integration
│       │   └── googleSheetsService.ts # Google Sheets integration
│       └── styles/
│           └── sb106.css              # Custom styles
```

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Set Up Environment Variables

1. **Copy the env.example file:**
   ```bash
   cp env.example .env.local
   ```

2. **Fill in the SB106-specific environment variables in `.env.local`:**

   ```env
   # ===== SB106 Landing Page Configuration =====
   
   # Aakash SMS API Token
   NEXT_PUBLIC_AAKASH_SMS_TOKEN=933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032
   
   # Sales Team Phone Numbers (comma separated, no spaces)
   NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110
   
   # Google Apps Script URL (from your deployed Google Apps Script)
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec
   
   # WhatsApp Business Number
   NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
   ```

   > **Note**: The values above are from your original SB106 project. Copy them exactly!

### Step 2: Test Locally

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000/sb106
   ```

4. **Test all features:**
   - ✅ Product images load correctly
   - ✅ Color selection works
   - ✅ Video plays
   - ✅ Order form submission works
   - ✅ SMS notifications are sent
   - ✅ WhatsApp redirect works
   - ✅ Google Sheets integration works

---

### Step 3: Commit to GitHub

1. **Check git status:**
   ```bash
   git status
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit with a meaningful message:**
   ```bash
   git commit -m "feat: Add SB106 landing page at /sb106 route

   - Integrated complete SB106 landing page into Next.js app
   - Added all components, services, and configurations
   - Set up SMS and Google Sheets integrations
   - Page accessible at seetara.com.np/sb106"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

---

### Step 4: Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)

If your Vercel project is already connected to GitHub:

1. **Vercel will automatically detect the push and start deploying**
2. **Go to your Vercel dashboard**: https://vercel.com/dhirajs-projects-29720397
3. **Click on your "seetara-website" project**
4. **Watch the deployment progress**

#### Option B: Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

### Step 5: Configure Environment Variables in Vercel

**IMPORTANT**: You must add the environment variables to Vercel for the SMS and Google Sheets features to work in production!

1. **Go to your Vercel project**: https://vercel.com/dhirajs-projects-29720397/seetara-website

2. **Navigate to**: `Settings` → `Environment Variables`

3. **Add the following variables** (one by one):

   | Variable Name | Value | Environment |
   |---------------|-------|-------------|
   | `NEXT_PUBLIC_AAKASH_SMS_TOKEN` | `933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032` | Production, Preview, Development |
   | `NEXT_PUBLIC_SALES_NUMBERS` | `9802359033,9802359035,9802200110` | Production, Preview, Development |
   | `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec` | Production, Preview, Development |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `9779802359033` | Production, Preview, Development |

4. **Save all variables**

5. **Redeploy your project** to apply the new environment variables:
   - Go to `Deployments` tab
   - Click the three dots (`...`) on the latest deployment
   - Click `Redeploy`
   - Select `Use existing Build Cache` → Click `Redeploy`

---

### Step 6: Test Production Deployment

Once deployment is complete:

1. **Visit your production URL:**
   ```
   https://seetara.com.np/sb106
   ```

2. **Test all features again in production:**
   - ✅ Page loads correctly
   - ✅ Images and videos display
   - ✅ Forms work
   - ✅ SMS notifications are sent (test with your phone number!)
   - ✅ WhatsApp redirect works
   - ✅ Orders are saved to Google Sheets

---

## 🔧 Troubleshooting

### Issue: Images not loading
**Solution**: Check the Cloudflare R2 URLs in `src/components/sb106/config/r2Config.ts`. Make sure they are publicly accessible.

### Issue: SMS not sending
**Solution**: 
1. Verify `NEXT_PUBLIC_AAKASH_SMS_TOKEN` is set in Vercel
2. Check SMS credit balance at https://sms.aakashsms.com
3. Verify phone numbers are in correct format (10 digits, starting with 98 or 97)

### Issue: Google Sheets not saving data
**Solution**:
1. Verify `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is set in Vercel
2. Make sure the Google Apps Script is deployed as a web app
3. Check that permissions are set to "Anyone" in the script deployment

### Issue: WhatsApp redirect not working
**Solution**: Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` includes country code (9779802359033)

### Issue: Video not playing
**Solution**: The video URL is at `https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/SB106%20Dhamaka%20Sales.mp4`. Make sure it's accessible.

---

## 📝 Important Notes

### Environment Variables
- All variables starting with `NEXT_PUBLIC_` are exposed to the browser
- These are safe for public APIs like SMS and WhatsApp
- Never put sensitive credentials in `NEXT_PUBLIC_` variables

### Route Configuration
- The landing page is at `/sb106` route
- This does NOT affect your main website at `/`
- Both routes work independently

### SMS Integration
- Uses Aakash SMS API v3
- Sends confirmation to customer
- Alerts sales team immediately
- Check credit balance regularly!

### Google Sheets Integration
- Uses `no-cors` mode (this is normal for Google Apps Script)
- Data is sent even if no response is received
- Check your Google Sheet to verify orders are being saved

### Asset Storage
- Product images are stored on Cloudflare R2
- Video is also on R2
- All assets are publicly accessible
- No need to store files in the repository

---

## 🎯 Quick Command Reference

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Commit and push to GitHub
git add .
git commit -m "your message"
git push origin main

# Deploy to Vercel (manual)
vercel --prod

# View production logs
vercel logs seetara.com.np
```

---

## 📞 Support Contacts

- **Sales Team**: 9802359033, 9802359035, 9802200110
- **WhatsApp**: +977 9802359033
- **SMS Provider**: Aakash SMS (https://sms.aakashsms.com)

---

## ✅ Deployment Checklist

Before going live, make sure:

- [ ] Local testing completed successfully
- [ ] All environment variables added to Vercel
- [ ] GitHub repository updated
- [ ] Vercel deployment successful
- [ ] Production site tested at `seetara.com.np/sb106`
- [ ] SMS notifications tested with real phone number
- [ ] Order appears in Google Sheets
- [ ] WhatsApp redirect works
- [ ] Video plays correctly
- [ ] All product images load
- [ ] Mobile responsive design verified

---

## 🎉 Next Steps

Your SB106 landing page is now live! Here's what you can do:

1. **Share the URL**: `https://seetara.com.np/sb106`
2. **Monitor orders** in your Google Sheet
3. **Check SMS notifications** are working
4. **Track conversions** and optimize
5. **Update product images** by uploading to R2
6. **Adjust prices** in `src/components/sb106/utils/constants.ts`

---

**Need help?** Check the original documentation in:
- `SB106-Landing-Page/README.md`
- `SB106-Landing-Page/GOOGLE_SHEETS_SETUP.md`
- `SB106-Landing-Page/CLOUDFLARE_R2_SETUP.md`
- `SB106-Landing-Page/ENV_SETUP.md`

