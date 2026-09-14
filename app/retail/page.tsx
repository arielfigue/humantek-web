import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import VideoPlayer from '@/components/VideoPlayer';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Página de Retail.
 *
 * El argumento central es la disponibilidad: el cliente llega a la tienda y el
 * producto no está. Por eso el h1 nombra el problema en vez de nombrar la
 * herramienta; "ERP para retail" describe lo que vendemos, "la disponibilidad"
 * describe lo que le duele a quien está leyendo.
 *
 * La animación abre la página: arranca sola, silenciada y en bucle, como
 * ilustración del problema. Si llegara a llevar narración, hay que quitarle
 * `autoPlay` y `loop` para que se reproduzca al primer clic y con sonido.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Retail',
  description:
    'En unas tiendas sobra lo que no se vende y en otras falta lo que piden. El gran dolor de cabeza del retail es la disponibilidad, y tiene solución.',
  path: '/retail',
  keywords: [
    'disponibilidad de inventario retail',
    'ventas perdidas por faltantes',
    'ERP para retail México',
    'reposición entre tiendas',
  ],
});

export default function RetailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-5xl space-y-14">

        {/* --- ENCABEZADO --- */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Sector Retail
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              El gran dolor de cabeza del retail es la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                disponibilidad
              </span>
            </h1>
          </div>
        </ScrollReveal>

        {/* --- ANIMACIÓN --- */}
        <ScrollReveal>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-2xl -z-10"></div>
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
                <VideoPlayer
                  src="/animacion_retail.mp4"
                  poster="/posters/animacion_retail.jpg"
                  label="Animación: el cliente pide un producto y la tienda no lo tiene"
                  controlsList="novolume nodownload"
                  autoPlay
                  loop
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* --- EL PLANTEAMIENTO --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-12 backdrop-blur-xl space-y-8">
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed">
              Inviertes en publicidad, redes sociales, marketing, software,
              capacitación. Todo para lograr que un cliente entre a tu tienda. Y
              cuando por fin te pide un producto,{' '}
              <strong className="font-semibold text-white">no lo tienes</strong>.
            </p>

            <div className="border-l-4 border-cyan-500 pl-6 py-2 bg-cyan-500/5 rounded-r-xl">
              <p className="text-xl sm:text-2xl font-bold text-cyan-300">
                Eso es una venta perdida.
              </p>
            </div>

            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed">
              Y rara vez es un problema de falta de mercancía. En ciertas tiendas
              tienes{' '}
              <strong className="font-semibold text-white">
                lo que no se vende
              </strong>
              , mientras que en otras te falta{' '}
              <strong className="font-semibold text-white">
                lo que te están pidiendo
              </strong>
              .
            </p>
          </div>
        </ScrollReveal>

        {/* --- LLAMADO A LA ACCIÓN --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 p-8 sm:p-12 backdrop-blur-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              ¿Quieres resolver el problema que tanto dolor le causa a tu negocio?
            </h2>

            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Hablemos de tu operación
              </Link>
            </div>

            <p className="text-sm text-slate-400 font-light">
              También puedes conocer el modelo de{' '}
              <Link
                href="/vendor-managed-inventory"
                className="rounded text-cyan-400 underline transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Vendor Managed Inventory
              </Link>
              , con el que atacamos este mismo problema desde la cadena de
              suministro.
            </p>
          </div>
        </ScrollReveal>

      </div>

      <JsonLd
        data={[
          serviceSchema({
            name: 'Disponibilidad de inventario para Retail',
            description:
              'Implementación de ERP y modelos de reposición para eliminar faltantes y sobreinventario entre tiendas.',
            path: '/retail',
            serviceType: 'Implementación de ERP',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Retail', path: '/retail' },
          ]),
        ]}
      />
    </main>
  );
}
