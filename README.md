# Seetara Website

Official e-commerce website for **Seetara** - Premium Handcrafted Leather Bags from Nepal.

🌐 **Live**: [seetara.com.np](https://seetara.com.np)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React Framework (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Supabase | - | Database (shared with ERP) |
| Cloudflare R2 | - | Media Storage/CDN |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/seetara/seetara-website.git
cd seetara-website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp env.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
seetara-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── sb106/              # SB106 Landing Page
│   │   ├── sb107/              # SB107 Landing Page
│   │   ├── sb104/              # SB104 Landing Page
│   │   ├── luna/               # Luna Landing Page
│   │   ├── sw101/              # SW101 Landing Page
│   │   ├── order-success/      # Order confirmation
│   │   ├── checkout/           # Main checkout
│   │   ├── careers/            # Job listings
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── sb106/              # SB106 product components
│   │   ├── sb107/              # SB107 product components
│   │   ├── sb104/              # SB104 product components
│   │   ├── luna/               # Luna product components
│   │   ├── sw101/              # SW101 product components
│   │   ├── sections/           # Homepage sections
│   │   ├── premium/            # Premium UI components
│   │   ├── ui/                 # Shadcn UI components
│   │   └── common/             # Shared utilities
│   ├── context/                # React Context providers
│   ├── lib/                    # Utilities & services
│   │   ├── supabase/           # Database client
│   │   ├── services/           # Business logic
│   │   └── images.ts           # R2 image URLs
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── meta-conversions-api/       # Google Apps Script for Meta CAPI
└── scripts/                    # Utility scripts
```

---

## 🛒 Product Landing Pages

| Route | Product | Description |
|-------|---------|-------------|
| `/sb106` | Viral Chain Bag | High-converting landing page |
| `/sb107` | Premium Bag | Premium product showcase |
| `/sb104` | Multi-Functional | Versatile everyday bag |
| `/luna` | Luna Crescent | Moon-inspired design |
| `/sw101` | Smart Wallet | Compact smart wallet |

---

## ⚙️ Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Supabase (same as ERP)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_R2_PUBLIC_URL=your-r2-public-url

# Aakash SMS
NEXT_PUBLIC_AAKASH_SMS_TOKEN=your-sms-token
NEXT_PUBLIC_SALES_NUMBERS=9802359033,9802359035

# Google Apps Script
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your-script-url

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=9779802359033
```

---

## 🔒 Security

This project implements several security measures:

### API Security
- **Server-side API Keys**: SMS tokens, Google Script URLs are stored server-side only
- **Rate Limiting**: 10 requests/minute per IP on notification APIs
- **Input Validation**: Phone numbers and required fields validated

### Security Headers
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options` (Clickjacking protection)
- `X-Content-Type-Options` (MIME sniffing protection)
- `X-XSS-Protection` (XSS filter)
- `Referrer-Policy` (Privacy)

### Environment Variables
```bash
# 🔒 PRIVATE (server-side only - never exposed to browser):
AAKASH_SMS_TOKEN=xxx        # SMS API token
SALES_NUMBERS=xxx           # Sales team numbers
GOOGLE_SCRIPT_URL=xxx       # Google Apps Script URL
R2_SECRET_ACCESS_KEY=xxx    # Storage credentials

# ✅ PUBLIC (safe to expose):
NEXT_PUBLIC_SUPABASE_URL=xxx       # Protected by RLS
NEXT_PUBLIC_WHATSAPP_NUMBER=xxx    # Public contact info
```

---

## 🔗 Integrations

### Meta Conversions API (CAPI)
- Located in `/meta-conversions-api/`
- Google Apps Script for server-side tracking
- Automatic Purchase/Refund events
- Deduplication with browser pixel

### Aakash SMS API
- Order notifications to customers
- Sales team alerts
- Nepali language support

### Supabase (Shared Database)
- Same database as ERP system
- Orders flow directly to order management
- Real-time product sync

---

## 📦 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## 🚀 Deployment

Deployed on **Vercel** with auto-deploys from `main` branch.

```bash
# Manual deploy
vercel --prod
```

---

## 📞 Support

- **Email**: support@seetara.com.np
- **WhatsApp**: +977 980-2359033

---

<p align="center">
  Made with ❤️ in Nepal 🇳🇵
</p>
