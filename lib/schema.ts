import { SITE, SITE_URL } from './site';

/** Nodo raíz reutilizable: el resto de los schemas apuntan aquí con @id. */
export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/**
 * Organization + LocalBusiness en un solo nodo (ProfessionalService hereda de
 * LocalBusiness). Google acepta el tipo múltiple y evita nodos duplicados.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/cropped-Logo-Humanytek-Cool-5-153x53.png`,
    image: `${SITE_URL}${SITE.ogImage.url}`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: [
      { '@type': 'Country', name: 'México' },
      { '@type': 'Place', name: 'América Latina' },
    ],
    knowsAbout: [
      'Odoo',
      'SAP Business ByDesign',
      'Implementación de ERP',
      'Teoría de las Restricciones',
      'Vendor Managed Inventory',
      'CFDI y cumplimiento fiscal en México',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: 'MX',
        availableLanguage: ['es', 'en'],
      },
    ],
    sameAs: [...SITE.sameAs],
  };
}

/** WebSite: habilita el sitelinks searchbox y da nombre al sitio en SERP. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: 'es-MX',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * Servicio ofrecido. Úsalo en páginas de oferta (/erps, /vendor-managed-inventory)
 * para que Google entienda qué se vende, no solo qué se describe.
 */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    serviceType: input.serviceType ?? input.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'México' },
  };
}

/**
 * VideoObject para los testimoniales de YouTube. Sin esto los 21 videos de
 * /casos-de-exito son invisibles para Google Video y para el carrusel de video
 * en resultados de búsqueda.
 */
export function videoSchema(input: {
  name: string;
  description: string;
  youtubeId: string;
  uploadDate?: string;
}) {
  return {
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${input.youtubeId}/maxresdefault.jpg`],
    embedUrl: `https://www.youtube.com/embed/${input.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    uploadDate: input.uploadDate ?? '2023-01-01',
    publisher: { '@id': ORG_ID },
  };
}

/** Envuelve una lista de nodos (p. ej. VideoObject) en un ItemList numerado. */
export function itemListSchema(items: object[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })),
  };
}

/** Migas de pan: mejora cómo se ve la URL en los resultados de Google. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

export function faqSchema(entries: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}
