import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import MetodologiaClient from './MetodologiaClient';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Server Component. La interactividad (tabs y acordeón de la comparativa) vive
 * en MetodologiaClient; aquí queda la metadata, que un Client Component no
 * puede exportar.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Metodología Visión Viable',
  description:
    'El enfoque tradicional de implementación de ERP frente a la respuesta de Humanytek: proyecto en el tiempo planificado, sin costo extra, con el alcance completo y el cliente autosuficiente.',
  path: '/metodologia',
  keywords: [
    'metodología implementación ERP',
    'Visión Viable',
    'por qué fracasan las implementaciones de ERP',
    'implementación organizacional ERP',
  ],
});

export default function MetodologiaPage() {
  return (
    <>
      <MetodologiaClient />
      <JsonLd
        data={[
          serviceSchema({
            name: 'Implementación de ERP con metodología Visión Viable',
            description:
              'Metodología de implementación de ERP centrada en las personas, con enfoque sistémico y entrega en el tiempo y costo originalmente planificados.',
            path: '/metodologia',
            serviceType: 'Consultoría de implementación de ERP',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Metodología', path: '/metodologia' },
          ]),
        ]}
      />
    </>
  );
}
