import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://humanytek.com'),
  title: {
    default: 'Humanytek | Consultoría e Implementación de ERP (Odoo y SAP)',
    template: '%s | Humanytek',
  },
  description: 'Optimizamos la productividad de tu empresa con metodologías lógicas e implementación experta de sistemas ERP como Odoo y SAP Business ByDesign.',
  keywords: [
    'ERP México',
    'Implementación Odoo',
    'SAP Business ByDesign',
    'Consultoría ERP',
    'Productividad empresarial',
    'Humanytek',
  ],
  authors: [{ name: 'Humanytek' }],
  creator: 'Humanytek',
  openGraph: {
    title: 'Humanytek | Consultoría e Implementación de ERP',
    description: 'Acercamos a tu empresa a su meta mediante implementaciones lógicas de ERP enfocadas en el factor humano.',
    url: 'https://humanytek.com',
    siteName: 'Humanytek',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/images/photo-1522071820081-009f0129c71c.avif',
        width: 1200,
        height: 630,
        alt: 'Humanytek ERP',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}