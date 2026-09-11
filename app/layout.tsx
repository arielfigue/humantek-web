import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatFlotante from '@/components/chat/ChatFlotante';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import { SITE, SITE_URL } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Humanytek | Consultoría e Implementación de ERP (Odoo y SAP)',
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

export const viewport: Viewport = {
  themeColor: '#020617', // slate-950: tiñe la barra del navegador en móvil
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Las variables de Geist se declaran en <html> para que también apliquen a
    // los portales y a cualquier nodo montado fuera de <body>.
    <html lang="es-MX" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {/* Sin JavaScript, ScrollReveal dejaría todo el contenido en opacity-0.
            Esta anulación garantiza que la página siga siendo legible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {/* Structured data global: se declara una vez y el resto de páginas
            referencia este nodo por @id en lugar de repetirlo. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        {/* Primer elemento enfocable de la página: permite a quien navega con
            teclado saltarse el menú en cada carga. Invisible hasta recibir foco. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Saltar al contenido
        </a>

        <Navbar />
        <div id="contenido">{children}</div>
        <ChatFlotante />
        <WhatsAppWidget />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
