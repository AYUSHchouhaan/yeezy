import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-context";
import Header from "@/components/header";

const dmmono = DM_Mono({
  weight:  "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yeezy",
  description: "fake yeezy website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    suppressHydrationWarning>
      <body
        className={`${dmmono.className}`}
      >
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
