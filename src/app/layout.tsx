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
  title: "Seetara | Premium Handcrafted Bags from Nepal",
  description: "Discover exquisite handcrafted leather bags from Nepal. Seetara combines timeless craftsmanship with modern elegance for the discerning woman.",
  keywords: ["Seetara", "Nepali bags", "leather bags", "premium handbags", "handcrafted bags", "Nepal", "luxury bags"],
  authors: [{ name: "Seetara Global" }],
  openGraph: {
    title: "Seetara | Premium Handcrafted Bags from Nepal",
    description: "Discover exquisite handcrafted leather bags from Nepal.",
    type: "website",
    locale: "en_US",
    siteName: "Seetara",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seetara | Premium Handcrafted Bags from Nepal",
    description: "Discover exquisite handcrafted leather bags from Nepal.",
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
