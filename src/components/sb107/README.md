# SB107 Landing Page

This is the SB107 product landing page for Seetara Nepal.

## URL
`https://seetara.com.np/sb107`

## Structure

```
src/
├── app/sb107/
│   └── page.tsx           # Main page with metadata
└── components/sb107/
    ├── SB107LandingPage.tsx  # Main landing page component
    ├── config/
    │   └── r2Config.ts       # Cloudflare R2 image/video URLs
    ├── utils/
    │   ├── constants.ts      # Product data, colors, prices
    │   ├── smsService.ts     # Aakash SMS integration
    │   └── googleSheetsService.ts  # Google Sheets & WhatsApp
    └── components/
        ├── Header.tsx
        ├── Hero.tsx
        ├── Features.tsx
        ├── VideoSection.tsx
        ├── OrderForm.tsx
        ├── BottomBar.tsx
        ├── Notification.tsx
        ├── ProcessingOverlay.tsx
        └── SuccessMessage.tsx
```

## TODO Before Launch

1. **Update Product Images** - Upload SB107 product images to Cloudflare R2:
   - `SB107/maroon-handbag.webp`
   - `SB107/coffee-handbag.webp`
   - `SB107/black-handbag.webp`
   - `SB107/brown-handbag.webp`

2. **Update Product Video** - Upload product video:
   - `SB107/sb107-video.mp4`

3. **Update Product Details** in `utils/constants.ts`:
   - Product SKU name
   - Product colors (if different)
   - Prices
   - Original prices

4. **Update Metadata** in `app/sb107/page.tsx`:
   - Page title
   - Meta description
   - Keywords
   - OG Image (if different)

5. **Update SMS Messages** in `utils/smsService.ts`:
   - Customer confirmation message
   - Sales team notification

## Environment Variables Required

Same as SB106:
- `NEXT_PUBLIC_AAKASH_SMS_TOKEN`
- `NEXT_PUBLIC_SALES_NUMBERS`
- `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_MESSENGER_PAGE_ID`

