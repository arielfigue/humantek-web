/**
 * Única fuente de verdad para datos del sitio.
 * Lo consumen: metadata de cada página, JSON-LD, sitemap.ts y robots.ts.
 * Si un dato cambia (teléfono, dirección, red social) se cambia SOLO aquí.
 */

export const SITE_URL = 'https://humanytek.com';

export const SITE = {
  url: SITE_URL,
  name: 'Humanytek',
  legalName: 'Humanytek SAPI de CV',
  locale: 'es_MX',
  description:
    'Optimizamos la productividad de tu empresa con metodologías lógicas e implementación experta de sistemas ERP como Odoo y SAP Business ByDesign.',
  email: 'contacto@humanytek.com',
  phone: '+523319831083',
  phoneDisplay: '+52 (33) 1983 1083',
  whatsapp: '+528148131032',
  address: {
    street: 'Calle Coral #2766, Col. Residencial Victoria',
    city: 'Zapopan',
    region: 'Jalisco',
    postalCode: '45089',
    country: 'MX',
  },
  geo: { lat: 20.642141, lng: -103.3997716 },
  sameAs: [
    'https://click2deploy.com',
    'https://www.youtube.com/@humanytek',
    'https://www.linkedin.com/company/humanytek/',
  ],
  /** Imagen Open Graph por defecto: JPG 1200x630 (AVIF no lo renderizan WhatsApp ni LinkedIn). */
  ogImage: {
    url: '/og-humanytek.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'Humanytek — Implementación de ERP Odoo y SAP en México',
  },
} as const;

/**
 * Fecha de última revisión del contenido, para el sitemap.
 * Se actualiza a mano al publicar cambios: usar `new Date()` haría que
 * lastModified cambiara en cada build sin que el contenido cambie.
 */
export const CONTENT_LAST_MODIFIED = '2026-09-14';
