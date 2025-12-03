import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/CartDrawer";

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
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
