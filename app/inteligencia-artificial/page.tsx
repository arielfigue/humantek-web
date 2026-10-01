import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ChatPanel from '@/components/chat/ChatPanel';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Server Component.
 *
 * Antes esta página era un Client Component de 493 líneas: ~350 de JavaScript
 * imperativo (copia desactualizada del widget.js del Worker) dentro de un
 * useEffect, más el marcado. Ahora el chat es <ChatPanel /> y el resto es HTML
 * que se renderiza en el servidor.
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

const SUGERENCIAS = [
  {
    titulo: 'Metodología Humanytek',
    texto: 'Diferenciadores respecto a implementaciones tradicionales.',
  },
  {
    titulo: 'Sistemas ERP',
    texto: 'Alcance, módulos y arquitectura de Odoo y SAP Business ByDesign.',
  },
  {
    titulo: 'Casos de Éxito',
    texto: 'Ejemplos de proyectos por industria o tamaño de empresa.',
  },
  {
    titulo: 'VMI',
    texto: 'Modelos de gestión de inventarios y automatización.',
  },
];

export default function InteligenciaArtificialPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-16">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Asistente Virtual e Inteligencia Artificial
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Inteligencia{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Artificial
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Consulte a nuestro asistente especializado sobre metodologías,
              soluciones ERP (Odoo y SAP) y estrategias tecnológicas para su empresa.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
              {/* Altura fija: el panel es flex en columna y necesita un contenedor
                  con altura definida para que el log haga scroll en vez de crecer. */}
              <div className="h-[560px] w-full">
                <ChatPanel variante="incrustado" />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  ¿Qué puede preguntar?
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
                  {SUGERENCIAS.map((s) => (
                    <li key={s.titulo} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>
                        <strong className="text-white">{s.titulo}:</strong> {s.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6 backdrop-blur-xl space-y-3">
                <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider">
                  Atención Personalizada
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Si prefiere hablar directamente con uno de nuestros consultores
                  senior, puede solicitar una reunión de diagnóstico sin costo.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Contactar Consultor
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(14,116,144,0.2),transparent_45%)]"></div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            <div className="max-w-5xl mx-auto space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Nuevo Servicio
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  MCP HiperProductividad
                </h2>
              </div>

              <div className="space-y-4 text-slate-200">
                <p className="rounded-2xl border border-cyan-300/15 bg-cyan-500/5 px-5 py-4 text-sm sm:text-base leading-relaxed transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:text-cyan-50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  En Humanytek ofrecemos el servicio de conexión vía Protocolo MCP:
                  conectamos su ERP a los modelos de IA más potentes del mercado para
                  convertir su suscripción con estos proveedores en un bot que interactúa
                  directamente con sus procesos de negocio.
                </p>
                <p className="rounded-2xl border border-blue-300/15 bg-blue-500/5 px-5 py-4 text-sm sm:text-base leading-relaxed transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:bg-blue-400/15 hover:text-blue-50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                  No importa la versión de su sistema: nuestro servicio es compatible
                  incluso con versiones obsoletas, permitiendo modernizar operaciones
                  sin forzar migraciones costosas ni detener la operación diaria.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Casos de uso comunes
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm sm:text-base text-slate-100">
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Conciliaciones bancarias tediosas: un bot las resuelve en minutos y
                    con altísima precisión.
                  </li>
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Precaptura de documentos para revisión: los usuarios solo validan y
                    confirman en lugar de capturar manualmente.
                  </li>
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Unión de información de diferentes orígenes para entregar datos al ERP
                    de forma organizada y homogénea.
                  </li>
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Generación automática de órdenes de compra sugeridas según consumo,
                    inventario y tiempos de entrega.
                  </li>
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Detección de anomalías en facturas y pólizas antes de su registro para
                    reducir errores y retrabajo administrativo.
                  </li>
                  <li className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-800/90 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                    Respuestas operativas en lenguaje natural para consultar estatus de
                    pedidos, cuentas por cobrar y KPIs en segundos.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>

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
    </main>
  );
}
