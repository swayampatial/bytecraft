import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });
import { CartProvider } from "../components/CartContext";
import { FavoriteProvider } from "@/components/FavoriteContext";
export const metadata: Metadata = {
  title: "Next Storefront",
  description: "A nifty store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <FavoriteProvider>
            <CartProvider>
              <Navbar />
              <Container className="py-20">{children}</Container>
            </CartProvider>
          </FavoriteProvider>
        </Providers>
      </body>
    </html>
  );
}
