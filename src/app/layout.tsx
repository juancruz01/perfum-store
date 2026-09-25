import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Perfumes originales`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className={`${montserrat.variable} ${playfair.variable} flex min-h-screen flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
