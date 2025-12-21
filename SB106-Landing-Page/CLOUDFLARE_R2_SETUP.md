# Cloudflare R2 Setup Guide

Yo guide le Cloudflare R2 ma images upload garera website ma use garna help garxa.

## Step 1: Cloudflare R2 Setup

### 1.1 Cloudflare Account banaunu hos
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) ma login garnu hos
2. R2 Object Storage section ma jaanu hos

### 1.2 R2 Bucket Create Garnu
1. "Create bucket" button click garnu hos
2. Bucket name: `seetara-bags` (or aafno choice)
3. Location select garnu hos (nearest to Nepal: Asia Pacific)
4. Create garnu hos

### 1.3 Public Access Setup
1. Bucket settings ma jaanu hos
2. "Public Access" enable garnu hos
3. Custom domain setup garna saknu huncha (optional but recommended)

## Step 2: Images Upload

### Option A: Cloudflare Dashboard bata (Easy)
1. Bucket ma jaanu hos
2. "Upload" button click garnu hos
3. 4 ota images upload garnu hos:
   - `brown-handbag.jpg` - Brown color ko bag
   - `black-handbag.jpg` - Black color ko bag
   - `maroon-handbag.jpg` - Maroon color ko bag
   - `coffee-handbag.jpg` - Coffee/Dark Brown color ko bag

### Option B: Wrangler CLI bata (Fast - Recommended)
1. Wrangler install garnu hos:
   ```bash
   npm install -g wrangler
   ```

2. Cloudflare account ma login garnu hos:
   ```bash
   wrangler login
   ```

3. Upload script run garnu hos:
   ```bash
   # Images folder ma images haru rakhnu hos
   wrangler r2 object put seetara-bags/brown-handbag.jpg --file=./images/brown-handbag.jpg
   wrangler r2 object put seetara-bags/black-handbag.jpg --file=./images/black-handbag.jpg
   wrangler r2 object put seetara-bags/maroon-handbag.jpg --file=./images/maroon-handbag.jpg
   wrangler r2 object put seetara-bags/coffee-handbag.jpg --file=./images/coffee-handbag.jpg
   ```

### Option C: Using Upload Script (Automated)
Project root ma `upload-to-r2.sh` script chha, tyo use garna saknu huncha.

## Step 3: Get Public URLs

### Method 1: Using R2 Public URL
1. Bucket settings ma jaanu hos
2. "Public URL" copy garnu hos
3. Format: `https://your-account-id.r2.cloudflarestorage.com/seetara-bags`

### Method 2: Using Custom Domain (Recommended - Fast)
1. Cloudflare DNS ma custom domain add garnu hos (e.g., `cdn.yourdomain.com`)
2. R2 bucket ma custom domain connect garnu hos
3. Format: `https://cdn.yourdomain.com`

## Step 4: Environment Variable Setup

1. Project root ma `.env` file create garnu hos:
   ```bash
   cp .env.example .env
   ```

2. `.env` file ma R2 URL add garnu hos:
   ```env
   VITE_R2_BASE_URL=https://your-account-id.r2.cloudflarestorage.com/seetara-bags
   # OR if using custom domain:
   # VITE_R2_BASE_URL=https://cdn.yourdomain.com
   ```

3. Development server restart garnu hos:
   ```bash
   npm run dev
   ```

## Step 5: Verify

1. Browser ma `localhost:5173` open garnu hos
2. Color selector use garera images check garnu hos
3. Network tab ma check garnu hos - images R2 bata load huna parcha
4. Images fast load huna parcha

## Image Optimization Tips

1. **Image Size**: 800x800px to 1200x1200px recommended
2. **Format**: JPG with 80-85% quality (good balance)
3. **File Size**: Keep under 500KB per image
4. **Naming**: Use lowercase with hyphens (e.g., `brown-handbag.jpg`)

## Troubleshooting

### Images load hudaina
- Check `.env` file ma correct URL cha ki nai
- Browser console ma errors check garnu hos
- R2 bucket ma public access enable cha ki nai check garnu hos

### Images slow load huncha
- Custom domain use garnu hos (faster than R2 public URL)
- Images optimize garnu hos (file size kam garnu hos)
- CDN cache check garnu hos

### CORS Errors
- R2 bucket settings ma CORS enable garnu hos
- Allow origin ma `*` or aafno domain add garnu hos

## Support

Kunai problem aayo bhane:
1. Check Cloudflare R2 documentation
2. Browser console ma errors check garnu hos
3. Network tab ma request status check garnu hos
