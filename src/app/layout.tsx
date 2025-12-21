import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import GlobalModals from "@/components/GlobalModals";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seetara.com.np"),
  title: "Seetara | Be The Star You Are ✨ Handcrafted in Nepal",
  description: "Be The Star You Are! Discover premium handcrafted leather bags born from generations of Nepali craftsmanship. Elevate your style with Seetara today.",
  keywords: ["Seetara", "Be The Star You Are", "Nepali bags", "leather bags", "premium handbags", "handcrafted bags", "Nepal", "luxury bags", "heritage craftsmanship"],
  authors: [{ name: "Seetara Global" }],
  openGraph: {
    title: "Seetara | Be The Star You Are ✨",
    description: "Be The Star You Are! Discover premium handcrafted leather bags born from generations of Nepali craftsmanship. Elevate your style with Seetara today.",
    type: "website",
    locale: "en_US",
    siteName: "Seetara",
    url: "https://seetara.com.np",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Seetara - Be The Star You Are | Premium Handcrafted Bags from Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seetara | Be The Star You Are ✨",
    description: "Be The Star You Are! Discover premium handcrafted leather bags born from generations of Nepali craftsmanship. Elevate your style with Seetara today.",
    creator: "@myseetara",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2046274132882959');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2046274132882959&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
            <GlobalModals />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
