import type { Metadata } from 'next';
import CasosClient from './CasosClient';
import { cargarCasos } from '@/lib/casos';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema, videoSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Casos de éxito',
  description:
    'Testimonios en video de clientes reales: implementaciones de ERP y proyectos rescatados en manufactura, distribución, retail y servicios en México.',
  path: '/casos-de-exito',
  keywords: [
    'casos de éxito ERP México',
    'testimonios implementación Odoo',
    'rescate de proyecto ERP',
  ],
});

export default function CasosDeExitoPage() {
  const cases = cargarCasos();

  // VideoObject por cada testimonial: sin esto los 21 videos son invisibles
  // para Google Video y para el carrusel de video en resultados de búsqueda.
  const videos = cases
    .filter((item) => item.youtubeId)
    .map((item) =>
      videoSchema({
        name: item.title,
        description: item.description,
        youtubeId: item.youtubeId,
      })
    );

  return (
    <>
      <CasosClient initialCases={cases} />
      <JsonLd
        data={[
          itemListSchema(videos, 'Casos de éxito de Humanytek'),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Casos de éxito', path: '/casos-de-exito' },
          ]),
        ]}
      />
    </>
  );
}