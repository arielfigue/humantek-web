import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ContactoClient from './ContactoClient';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, ORG_ID } from '@/lib/schema';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contacto',
  description: `Consultoría e implementación de ERP en ${SITE.address.city}, ${SITE.address.region}. Escríbanos a ${SITE.email} o llame al ${SITE.phoneDisplay} para agendar una reunión.`,
  path: '/contacto',
  keywords: [
    'consultoría ERP Guadalajara',
    'implementador Odoo Zapopan',
    'contacto Humanytek',
  ],
});

export default function ContactoPage() {
  return (
    <>
      <ContactoClient />
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: `${SITE_URL}/contacto`,
            name: 'Contacto | Humanytek',
            inLanguage: 'es-MX',
            about: { '@id': ORG_ID },
          },
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contacto' },
          ]),
        ]}
      />
    </>
  );
}
