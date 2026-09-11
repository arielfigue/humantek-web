import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import { SITE, SITE_URL } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Humanytek | Consultoría e Implementación de ERP',
    template: '%s | Humanytek',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.legalName,
  // El canonical de cada página lo sobrescribe pageMetadata(); éste cubre la raíz.
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Humanytek | Consultoría e Implementación de ERP',
    description:
      'Acercamos a tu empresa a su meta mediante implementaciones lógicas de ERP enfocadas en el factor humano.',
    url: SITE_URL,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        type: SITE.ogImage.type,
        alt: SITE.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humanytek | Consultoría e Implementación de ERP',
    description: SITE.description,
    images: [SITE.ogImage.url],
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
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {/* Structured data global: se declara una vez y el resto de páginas
            referencia este nodo por @id en lugar de repetirlo. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <Navbar />
        {children}
        <ChatbotWidget />
        <WhatsAppWidget />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
