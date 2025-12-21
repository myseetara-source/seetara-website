# Seetara Bag Landing Page

This is a React application built with Vite and Tailwind CSS for the Seetara Bag Flash Sale.

## Project Structure

- `src/components`: Reusable UI components (Header, Hero, OrderForm, etc.)
- `src/utils`: Constants and helper functions (SMS, Google Sheets integration)
- `src/config`: Configuration files (R2 image URLs, logo)
- `public`: Static assets (videos)

## Setup Guides

### 📋 Quick Start:
1. [Cloudflare R2 Setup](./CLOUDFLARE_R2_SETUP.md) - Product images & logo hosting
2. [Logo Setup Guide](./LOGO_SETUP.md) - Upload & configure brand logo
3. [SMS Integration](./ENV_SETUP.md) - Aakash SMS API configuration
4. [Google Sheets](./GOOGLE_SHEETS_SETUP.md) - Order data sync

## Image & Logo Setup (Cloudflare R2)

Product images and brand logo are loaded from Cloudflare R2 CDN for optimal performance.

### Quick Setup:
1. Upload product images and logo to Cloudflare R2 bucket
2. Update `src/config/r2Config.js` with your R2 URLs
3. See detailed guides:
   - **Product Images:** [CLOUDFLARE_R2_SETUP.md](./CLOUDFLARE_R2_SETUP.md)
   - **Brand Logo:** [LOGO_SETUP.md](./LOGO_SETUP.md)

**Note:** Automatic fallback if images/logo don't load.

## API Integrations

### 1. SMS Notifications (Aakash SMS API)
- Customer order confirmations
- Sales team notifications
- Setup guide: [ENV_SETUP.md](./ENV_SETUP.md)

### 2. Google Sheets Integration
- Automatic order data sync
- Real-time tracking
- Setup guide: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### 3. WhatsApp Redirect
- Pre-filled order details
- Direct customer communication
- Configured in: `src/utils/googleSheetsService.js`

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure integrations:**
    - Add SMS API token to `src/utils/smsService.js`
    - Add Google Sheets URL to `src/utils/googleSheetsService.js`
    - Upload logo and images to R2 (see setup guides)

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Features

-   **Flash Sale Timer**: Persistent countdown timer using LocalStorage
-   **Dynamic Product Selection**: Color switching with smooth animations
-   **Video Integration**: Product video showcase with modal
-   **Smart Order Form**: 
    - Dual mode: "Buy" and "Inquiry"
    - Nepal phone validation (98/97 prefix)
    - Auto name capitalization
    - Real-time delivery charge calculation
-   **SMS Notifications**: Automated order/inquiry alerts
-   **Google Sheets Sync**: Automatic data backup
-   **WhatsApp Integration**: Direct customer communication
-   **Social Proof**: Live notifications and viewer counts
-   **R2 CDN**: Fast image & logo loading worldwide

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Storage:** Cloudflare R2
- **APIs:** Aakash SMS, Google Sheets
- **Messaging:** WhatsApp Business
