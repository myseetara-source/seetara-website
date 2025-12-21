# 🎨 Seetara Logo Setup Guide - Cloudflare R2

This guide will help you upload and configure your Seetara brand logo to be loaded from Cloudflare R2.

---

## 📋 Prerequisites

- Cloudflare account with R2 enabled
- Your Seetara logo file (PNG or JPG)
- R2 bucket already created: `seetara-assets`

---

## 🖼️ Logo File Requirements

### Recommended Specifications:
- **Format:** PNG (with transparent background) or JPG
- **Size:** 200x200px to 512x512px (square)
- **File Size:** Under 500KB for fast loading
- **Quality:** High resolution for sharp display
- **Background:** Transparent (PNG) preferred

### File Naming:
- **Filename:** `seetara-logo.png` (or `.jpg`)

---

## 📤 Step 1: Upload Logo to Cloudflare R2

### Option A: Using Cloudflare Dashboard (Easiest)

1. **Login to Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Navigate to: **R2 Object Storage**

2. **Open Your Bucket:**
   - Click on bucket: `seetara-assets`
   - Navigate to folder: `SB106`

3. **Upload Logo:**
   - Click **"Upload"** button
   - Select your logo file: `seetara-logo.png`
   - Wait for upload to complete ✅

4. **Verify Upload:**
   - You should see `seetara-logo.png` in the file list
   - Note the full URL (will be similar to):
     ```
     https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/seetara-logo.png
     ```

### Option B: Using Shell Script (Advanced)

If you prefer command line, use the provided upload script:

```bash
# Make sure you have rclone configured (see CLOUDFLARE_R2_SETUP.md)

# Upload logo
./upload-to-r2.sh path/to/your/seetara-logo.png

# The script will automatically upload to the correct location
```

---

## 🔧 Step 2: Verify Logo URL

Test that your logo is publicly accessible:

1. **Copy the URL:**
   ```
   https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/seetara-logo.png
   ```

2. **Open in Browser:**
   - Paste the URL in your browser
   - Your logo should display ✅
   - If it doesn't load, check R2 bucket public access settings

---

## 🎯 Step 3: Update Configuration (Already Done!)

The code is already configured to load the logo from R2. Here's what was set up:

### File: `src/config/r2Config.js`

```javascript
// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = `${R2_BASE_URL}/seetara-logo.png`;

// Helper function to get logo URL
export const getLogoUrl = () => {
  return SEETARA_LOGO_URL;
};
```

### File: `src/components/Header.jsx`

The Header component now:
- ✅ Imports logo URL from R2 config
- ✅ Displays logo as `<img>` element
- ✅ Has fallback to text logo if image fails

---

## 🧪 Step 4: Test Your Logo

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Open Browser:**
   ```
   http://localhost:5173
   ```

3. **Check Header:**
   - Your Seetara logo should appear in the top left
   - It should be clear and properly sized
   - On mobile, it should still look good

4. **Test Fallback:**
   - If logo doesn't load, text "Se'etara." will show instead

---

## 🎨 Logo Display Settings

The logo is configured with these CSS properties:

```jsx
<img 
  src={logoUrl} 
  alt="Seetara Logo" 
  className="h-8 w-auto object-contain"
/>
```

### Current Settings:
- **Height:** 32px (h-8)
- **Width:** Auto (maintains aspect ratio)
- **Object Fit:** Contain (logo won't be cropped)

### To Adjust Size:

**Make Logo Bigger:**
```jsx
className="h-10 w-auto object-contain"  // 40px height
className="h-12 w-auto object-contain"  // 48px height
```

**Make Logo Smaller:**
```jsx
className="h-6 w-auto object-contain"   // 24px height
className="h-7 w-auto object-contain"   // 28px height
```

---

## 🔥 Step 5: Clear Cache & Deploy

### For Development:
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### For Production:
```bash
# Build production version
npm run build

# Deploy to your hosting
# (Vercel, Netlify, etc.)
```

---

## 🎯 Current Logo URL Structure

```
Base R2 URL:
https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/

Bucket & Folder:
SB106/

Logo File:
seetara-logo.png

Full Logo URL:
https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/seetara-logo.png
```

---

## 🆘 Troubleshooting

### Problem: Logo Not Showing

**Solution 1: Check File Name**
- Make sure file is named exactly: `seetara-logo.png`
- Case sensitive! (use lowercase)

**Solution 2: Check R2 Bucket Access**
```bash
# Verify bucket is public
# In Cloudflare Dashboard:
R2 > seetara-assets > Settings > Public Access = Enabled
```

**Solution 3: Check URL**
- Open browser console (F12)
- Look for 404 errors
- Verify URL is correct

**Solution 4: Clear Browser Cache**
```bash
# Hard refresh
Ctrl + F5
```

### Problem: Logo Too Big/Small

Edit `src/components/Header.jsx`:
```jsx
// Change h-8 to h-10 (bigger) or h-6 (smaller)
className="h-8 w-auto object-contain"
```

### Problem: Logo Quality Poor

Upload higher resolution:
- Minimum: 400x400px
- Recommended: 512x512px
- Format: PNG with transparency

---

## ✅ Success Checklist

- [ ] Logo file created (PNG, 200x200px+)
- [ ] Logo uploaded to R2 bucket: `seetara-assets/SB106/`
- [ ] Filename is exactly: `seetara-logo.png`
- [ ] Logo URL accessible in browser
- [ ] Development server running
- [ ] Logo displays correctly on website
- [ ] Logo looks good on mobile
- [ ] Fallback text works (if logo fails)

---

## 📚 Related Documentation

- [Cloudflare R2 Setup](./CLOUDFLARE_R2_SETUP.md)
- [Product Images Upload Guide](./CLOUDFLARE_R2_SETUP.md#step-3-upload-product-images)

---

## 🎉 You're Done!

Your Seetara logo is now loading from Cloudflare R2 CDN for:
- ⚡ Fast loading worldwide
- 💰 Low bandwidth costs
- 🔒 Secure HTTPS delivery
- 📈 Scalable infrastructure

Questions? Check the main README or raise an issue!

---

**Created:** 2025-12-21  
**Version:** 1.0.0  
**Project:** SB106 Landing Page

