import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ChatInlineClient from './ChatInlineClient';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Server Component envolvente. El asistente vive en ChatInlineClient porque
 * monta el widget en el DOM; esta capa existe para poder exportar metadata.
 *
 * Pendiente (punto 3 del diagnóstico): ChatInlineClient duplica el código del
 * Worker `widget.js`. Al unificarlo, este archivo no cambia.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Inteligencia Artificial aplicada a su ERP',
  description:
    'Cómo aplicamos inteligencia artificial sobre la operación de su ERP. Pruebe aquí mismo nuestro asistente y pregúntele sobre Odoo, SAP o nuestra metodología.',
  path: '/inteligencia-artificial',
  keywords: [
    'inteligencia artificial ERP',
    'IA aplicada a Odoo',
    'agentes de IA para empresas México',
  ],
});

export default function InteligenciaArtificialPage() {
  return (
    <>
      <ChatInlineClient />
      <JsonLd
        data={[
          serviceSchema({
            name: 'Inteligencia Artificial aplicada al ERP',
            description:
              'Asistentes y automatizaciones con inteligencia artificial integradas a la operación del ERP.',
            path: '/inteligencia-artificial',
            serviceType: 'Consultoría en inteligencia artificial',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Inteligencia Artificial', path: '/inteligencia-artificial' },
          ]),
        ]}
      />
    </>
  );
}
