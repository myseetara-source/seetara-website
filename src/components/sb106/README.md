# SB106 Landing Page - Next.js Integration

This folder contains the complete SB106 landing page integrated into the Next.js application.

## 📁 Structure

```
sb106/
├── SB106LandingPage.tsx       # Main container component
├── components/                 # All UI components
│   ├── Header.tsx             # Top navigation with flash sale timer
│   ├── Hero.tsx               # Product image carousel
│   ├── Features.tsx           # Trust badges and reviews
│   ├── VideoSection.tsx       # Product video player
│   ├── OrderForm.tsx          # Checkout form (Buy/Inquiry)
│   ├── BottomBar.tsx          # Mobile sticky CTA
│   ├── Notification.tsx       # Social proof notifications
│   └── SuccessMessage.tsx     # Order confirmation screen
├── config/
│   └── r2Config.ts            # Cloudflare R2 image URLs
├── utils/
│   ├── constants.ts           # Product data and configurations
│   ├── smsService.ts          # Aakash SMS API integration
│   └── googleSheetsService.ts # Google Sheets + WhatsApp integration
└── styles/
    └── sb106.css              # Custom animations and styles
```

## 🚀 Usage

The landing page is automatically available at:
- **Local**: `http://localhost:3000/sb106`
- **Production**: `https://seetara.com.np/sb106`

## 🔧 Configuration

All configuration is done through environment variables:

```env
NEXT_PUBLIC_AAKASH_SMS_TOKEN=your-token
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035,9802200110
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your-script-url
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

## 📝 Features

- ✅ 4 product color variants
- ✅ Product video integration
- ✅ SMS notifications (customer + sales team)
- ✅ Google Sheets order tracking
- ✅ WhatsApp auto-redirect
- ✅ Mobile responsive design
- ✅ Social proof notifications
- ✅ Flash sale countdown timer
- ✅ Stock urgency display
- ✅ Customer reviews section

## 🛠️ Customization

### Change Product Prices
Edit `utils/constants.ts`:
```typescript
price: 1499,
originalPrice: 2100,
```

### Change SMS Messages
Edit `utils/smsService.ts`:
- `createCustomerMessage()` - for customer SMS
- `createSalesTeamMessage()` - for sales team alert

### Change WhatsApp Message
Edit `utils/googleSheetsService.ts`:
- `redirectToWhatsApp()` function

### Add/Remove Colors
1. Upload images to Cloudflare R2
2. Update `config/r2Config.ts`
3. Update `utils/constants.ts`

## 📚 Documentation

- **Quick Start**: See `../../SB106_QUICK_START.md`
- **Full Deployment Guide**: See `../../SB106_DEPLOYMENT_GUIDE.md`
- **Original Project**: See `../../SB106-Landing-Page/`

## 🐛 Troubleshooting

Common issues and solutions are documented in `SB106_DEPLOYMENT_GUIDE.md`.

## 📞 Support

For questions about this integration, check the deployment guide or contact the development team.

