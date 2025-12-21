# Environment Variables Setup

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Cloudflare R2 URL:
   ```env
   VITE_R2_BASE_URL=https://your-account-id.r2.cloudflarestorage.com/seetara-bags
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

## Variables

### `VITE_R2_BASE_URL`
- **Required**: No (has fallback)
- **Description**: Base URL for Cloudflare R2 bucket containing product images
- **Format**: `https://your-account-id.r2.cloudflarestorage.com/bucket-name` or `https://cdn.yourdomain.com`
- **Example**: `https://abc123.r2.cloudflarestorage.com/seetara-bags`

## Notes

- If `VITE_R2_BASE_URL` is not set or contains placeholder, the app will use fallback Facebook CDN URLs
- The `.env` file is gitignored for security
- Never commit your `.env` file to version control

