import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humanytek | Tecnología y Soluciones Digitales",
  description: "Modernizamos tu empresa con soluciones digitales a la medida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}