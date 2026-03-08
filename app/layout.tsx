import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Mika Saveur Authentique - Jus naturels et repas",
  description: "Le goût naturel, la saveur authentique. Préparation et livraison de nourriture & jus naturels à Yaoundé.",
  keywords: ["Mika", "Jus Naturel", "Yaoundé", "Cameroun", "Repas", "Livraison", "Saveur Authentique"],
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${nunito.variable} font-sans antialiased text-text-dark bg-bg-light`}>
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
