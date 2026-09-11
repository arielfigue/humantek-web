import type { Metadata } from 'next';
import { SITE } from './site';

interface PageMetaInput {
  /** Título sin el sufijo "| Humanytek": la plantilla del layout lo añade. */
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz, p. ej. '/erps'. Se usa para canonical y og:url. */
  path: string;
  /** Imagen propia de la página (opcional). Debe ser JPG o PNG de 1200x630. */
  image?: { url: string; alt: string };
  keywords?: string[];
}

/**
 * Construye la metadata de una página resolviendo canonical, Open Graph y
 * Twitter Card de forma consistente. Evita duplicar 20 líneas por archivo.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: PageMetaInput): Metadata {
  const og = image
    ? { ...SITE.ogImage, url: image.url, alt: image.alt }
    : SITE.ogImage;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
      images: [
        {
          url: og.url,
          width: og.width,
          height: og.height,
          type: og.type,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [og.url],
    },
  };
}
