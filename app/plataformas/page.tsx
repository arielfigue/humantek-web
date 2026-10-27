import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Página de Plataformas.
 *
 * El argumento es el techo de las herramientas genéricas: Excel deja de
 * sostener la operación y el software empaquetado obliga a cambiar la forma de
 * trabajar. Por eso el h1 nombra el resultado (digitalizar y centralizar) y no
 * la tecnología; "plataforma web" es cómo se entrega, no lo que se vende.
 *
 * El orden de las secciones sigue el del visitante que ya se reconoció en el
 * problema: dolor → casos de uso → retorno → cómo trabajamos → cierre.
 */

const DOLORES = [
  {
    titulo: 'Información dispersa',
    texto:
      'Datos críticos repartidos en hojas de cálculo, correos y chats sin control central.',
    icono: (
      // Carpeta abierta con documentos sueltos: el expediente que nadie sabe
      // dónde quedó.
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
        />
      </svg>
    ),
  },
  {
    titulo: 'Software comercial rígido',
    texto:
      'Programas empaquetados que cobran licencias costosas por funciones que no usas o que exigen cambiar tu forma de trabajar.',
    icono: (
      // Candado: la caja cerrada a la que solo se le puede pedir lo que ya trae.
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
  {
    titulo: 'Errores operativos manuales',
    texto:
      'Doble captura de información, pérdida de pedidos y falta de trazabilidad.',
    icono: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.6 13.17A1.5 1.5 0 004.03 20.2h15.94a1.5 1.5 0 001.29-2.25l-7.6-13.17a1.5 1.5 0 00-2.6 0z"
        />
      </svg>
    ),
  },
];

const CASOS_DE_USO = [
  {
    titulo: 'Portales de clientes y proveedores',
    texto:
      'Plataformas seguras para cotizaciones, seguimiento de pedidos, descarga de facturas y soporte 24/7 sin saturar a tu equipo de atención.',
  },
  {
    titulo: 'Paneles de gestión interna (dashboards)',
    texto:
      'Visualización en tiempo real del inventario, ventas, operaciones y métricas clave de rendimiento (KPIs).',
  },
  {
    titulo: 'Automatización de flujos de trabajo',
    texto:
      'Formularios inteligentes, generación automática de reportes y aprobaciones internas digitales.',
  },
  {
    titulo: 'Sistemas de reservas y cotización avanzada',
    texto:
      'Herramientas que calculan precios dinámicos según reglas específicas de tu modelo comercial.',
  },
];

const BENEFICIOS = [
  {
    titulo: 'Accesibilidad total',
    texto:
      'Tu equipo accede desde cualquier navegador, tableta o dispositivo sin instalar programas locales.',
  },
  {
    titulo: 'Ahorro de horas hombre',
    texto:
      'Reducción drástica del tiempo invertido en tareas repetitivas de captura y consolidación de datos.',
  },
  {
    titulo: 'Propiedad y control',
    texto:
      'La plataforma evoluciona al ritmo de tu negocio; no dependes de las restricciones de un software de terceros.',
  },
  {
    titulo: 'Seguridad y roles',
    texto:
      'Cada usuario (empleado, cliente o directivo) ve únicamente la información autorizada para su perfil.',
  },
];

const PASOS = [
  {
    titulo: 'Diagnóstico del flujo de trabajo',
    texto:
      'Analizamos cómo opera tu empresa hoy, dónde están los cuellos de botella y qué objetivos se buscan.',
  },
  {
    titulo: 'Diseño y validación visual',
    texto:
      'Creamos las pantallas y la interacción para asegurar que sea intuitivo antes de construirlo.',
  },
  {
    titulo: 'Puesta en marcha e integración',
    texto:
      'Implementamos la solución y capacitamos a tu equipo en el uso diario.',
  },
  {
    titulo: 'Soporte y escalamiento',
    texto:
      'Acompañamiento continuo conforme surgen nuevas necesidades en la operación.',
  },
];

export const metadata: Metadata = pageMetadata({
  title: 'Plataformas web a la medida',
  description:
    'Digitalizamos y centralizamos la operación de tu empresa en una sola plataforma web: portales de clientes, dashboards y automatización de procesos.',
  path: '/plataformas',
  keywords: [
    'plataforma web a la medida',
    'portal de clientes y proveedores',
    'dashboard de gestión interna',
    'automatización de procesos México',
    'desarrollo de software a la medida',
  ],
});

export default function PlataformasPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* --- HERO --- */}
      <section className="relative px-6 pt-32 pb-20 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.20),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Plataformas a la medida
            </span>

            {/* `text-balance` reparte las líneas del titular: sin él, "web."
                caía sola en una tercera línea. */}
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Digitaliza y centraliza la operación de tu empresa en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                una sola plataforma web
              </span>
              .
            </h1>

            <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Diseñamos herramientas en la nube a la medida de tus procesos:
              desde portales para clientes hasta paneles de control interno que
              sustituyen hojas de cálculo desordenadas.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <Link
                href="/contacto"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Solicitar diagnóstico de procesos
              </Link>
              <Link
                href="#casos-de-uso"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Ver casos de aplicación →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- EL PROBLEMA --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                ¿Tu empresa ya superó la capacidad de Excel y las soluciones
                estándar?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Muchas organizaciones enfrentan cuellos de botella cuando sus
                procesos crecen más rápido que sus herramientas.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {DOLORES.map((dolor) => (
                <div
                  key={dolor.titulo}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 transition-colors hover:border-red-500/40"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    {dolor.icono}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {dolor.titulo}
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {dolor.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CASOS DE USO --- */}
      <section
        id="casos-de-uso"
        className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative"
      >
        <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-5">
              <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Casos de uso
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Soluciones típicas
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Ejemplos concretos para que reconozcas tu propia necesidad.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASOS_DE_USO.map((caso, indice) => (
                <div
                  key={caso.titulo}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex gap-5 transition-colors hover:border-cyan-500/40"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-sm font-bold text-cyan-400/70 group-hover:text-cyan-400 transition-colors"
                  >
                    0{indice + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {caso.titulo}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {caso.texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- BENEFICIOS --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-5">
              <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                El retorno de inversión
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Beneficios tangibles
              </h2>
            </div>

            <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {BENEFICIOS.map((beneficio) => (
                  <li key={beneficio.titulo} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                      <svg
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">
                        {beneficio.titulo}
                      </h3>
                      <p className="text-sm text-slate-300 font-light leading-relaxed">
                        {beneficio.texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- METODOLOGÍA --- */}
      <section
        id="metodologia"
        className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80"
      >
        <ScrollReveal>
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Metodología de trabajo
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Cuatro etapas, fáciles de seguir y de la mano con tu equipo.
              </p>
            </div>

            <ol className="mt-12 space-y-10">
              {PASOS.map((paso, indice) => (
                <li key={paso.titulo} className="flex gap-6">
                  {/* Columna del número y el hilo vertical que une las etapas. */}
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-sm font-bold text-cyan-400">
                      {indice + 1}
                    </span>
                    {indice < PASOS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-500/40 to-transparent"
                      />
                    )}
                  </div>

                  <div className="pb-2 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {paso.titulo}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                      {paso.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CIERRE --- */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 p-8 sm:p-12 backdrop-blur-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              Convirtamos tus procesos manuales en una herramienta digital
              eficiente.
            </h2>

            <p className="mx-auto max-w-2xl text-base text-slate-300 font-light leading-relaxed">
              Cuéntanos qué proceso consume más tiempo en tu operación y te
              mostraremos cómo automatizarlo con una plataforma web.
            </p>

            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Agendar llamada de diagnóstico (15 min)
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <JsonLd
        data={[
          serviceSchema({
            name: 'Plataformas web a la medida',
            description:
              'Desarrollo de plataformas web en la nube: portales de clientes y proveedores, paneles de gestión interna, automatización de flujos y sistemas de cotización avanzada.',
            path: '/plataformas',
            serviceType: 'Desarrollo de software a la medida',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Plataformas', path: '/plataformas' },
          ]),
        ]}
      />
    </main>
  );
}
