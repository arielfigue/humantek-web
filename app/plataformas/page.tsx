import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Página de Plataformas.
 *
 * El copy habla de la operación del cliente, no de la tecnología: pedidos que
 * se pierden, datos que nadie sabe cuál es la buena, horas capturando. Las
 * palabras del oficio ("plataforma", "dashboard", "KPI") quedan fuera a
 * propósito; "plataforma web a la medida" solo aparece donde hace falta para
 * búsqueda (title, description y JSON-LD).
 *
 * El orden sigue al visitante que ya se reconoció en el problema:
 * dolor → qué se resuelve → qué gana → cómo trabajamos → caso real → cierre.
 */

const DOLORES = [
  {
    titulo: 'Cada área tiene su versión de la verdad',
    texto:
      'Los datos viven en hojas de cálculo, correos y chats. Nadie sabe cuál cifra es la buena y las decisiones se toman con información de la semana pasada.',
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
    titulo: 'Pagas por un sistema que no es tuyo',
    texto:
      'Licencias caras por funciones que nadie usa, y un sistema que te obliga a trabajar como él quiere, no como trabaja tu empresa.',
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
    titulo: 'Los errores cuestan clientes',
    texto:
      'Doble captura, pedidos que se pierden y nadie sabe en qué paso se quedó. El cliente reclama y hay que reconstruir la historia a mano.',
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
    titulo: 'Tus clientes se atienden solos',
    texto:
      'Cotizan, revisan su pedido, descargan su factura y dan seguimiento sin llamar a tu equipo. Menos llamadas, menos errores y respuesta a cualquier hora.',
  },
  {
    titulo: 'Sabes cómo va el negocio sin pedir reportes',
    texto:
      'Inventario, ventas y márgenes del día en una pantalla. No en un archivo que alguien arma cada viernes.',
  },
  {
    titulo: 'Las aprobaciones dejan de vivir en el correo',
    texto:
      'Solicitudes, autorizaciones y reportes con un solo camino y el registro de quién aprobó qué y cuándo.',
  },
  {
    titulo: 'Cotas en minutos y al precio correcto',
    texto:
      'El sistema aplica tus reglas de precio, descuentos y volúmenes. Sin errores de cálculo y sin depender de la memoria de un vendedor.',
  },
];

const BENEFICIOS = [
  {
    titulo: 'Tu equipo trabaja desde donde esté',
    texto: 'Desde la computadora, la tableta o el celular. Sin instalar nada.',
  },
  {
    titulo: 'Recuperas horas cada semana',
    texto:
      'Lo que hoy se captura y se consolida a mano se hace solo. Esas horas se van a vender, no a copiar datos.',
  },
  {
    titulo: 'Es tuyo, no una renta permanente',
    texto:
      'La plataforma crece al ritmo de tu negocio. Nadie te sube la licencia ni te obliga a migrar de sistema.',
  },
  {
    titulo: 'Cada quien ve solo lo suyo',
    texto:
      'Tu cliente ve su pedido, el vendedor su cartera, el director todo. La información sensible no se filtra.',
  },
];

const PASOS = [
  {
    titulo: 'Entendemos cómo trabajas hoy',
    texto:
      'Vemos dónde se pierde tiempo y dinero, y qué vale la pena cambiar primero.',
  },
  {
    titulo: 'Lo pruebas antes de que exista',
    texto:
      'Ves y usas las pantallas antes de que se construyan. Si algo no es claro, se corrige en ese momento.',
  },
  {
    titulo: 'Lo ponemos a funcionar',
    texto:
      'Sale a producción y entrenamos a tu gente en su trabajo diario, no en teoría.',
  },
  {
    titulo: 'Seguimos ahí',
    texto:
      'Ajustes y nuevas necesidades conforme cambia la operación, con un solo responsable.',
  },
];

/** Lo que ya opera sin intervención humana en Le Paté. */
const AUTOMATIZADO_LEPATE = [
  'Cobros y confirmación de pago',
  'Pedidos y notas de venta',
  'Reposición por suscripción',
  'Guías de envío',
  'Correos al cliente',
  'Cupones con reglas',
];

export const metadata: Metadata = pageMetadata({
  title: 'Plataformas a la medida',
  description:
    'Unificamos la operación de tu empresa en una sola plataforma, con tus reglas de negocio. Entre 2 y 6 meses según la complejidad.',
  path: '/plataformas',
  keywords: [
    'plataforma web a la medida',
    'software a la medida México',
    'portal de clientes y proveedores',
    'automatizar procesos de negocio',
    'sustituir hojas de cálculo',
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
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Deja de perseguir información:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                tu operación completa en un solo lugar
              </span>
              .
            </h1>

            <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Tus clientes cotizan y consultan solos, tu equipo deja de copiar
              datos de un lado a otro y la dirección ve los números del día sin
              pedir un reporte.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <Link
                href="/contacto"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Agendar diagnóstico de procesos
              </Link>
              <Link
                href="#casos-de-uso"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Ver ejemplos por tipo de negocio →
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
                ¿Excel ya no alcanza para operar tu empresa?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Cuando el negocio crece más rápido que las herramientas, los
                síntomas son siempre los mismos.
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

            <div className="mt-12 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8">
              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
                <strong className="font-semibold text-white">
                  Tiempo típico:
                </strong>{' '}
                entre 2 y 6 meses, según el tipo y la complejidad del proyecto.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CASO REAL --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Le Paté: la tienda que se opera casi sola
              </h2>
              <p className="text-base text-slate-300 font-light leading-relaxed">
                Una marca de patés y caldos para perros y gatos que vende en
                línea. Reconstruimos su tienda para que el pedido se cobre, se
                registre, se confirme y se reponga sin que nadie capture nada
                dos veces.
              </p>
              <Link
                href="/plataformas/le-pate"
                className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Ver el caso completo →
              </Link>
            </div>

            <ul className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {AUTOMATIZADO_LEPATE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
                  <span aria-hidden="true" className="mt-0.5 text-cyan-400">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CIERRE --- */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 p-8 sm:p-12 backdrop-blur-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              ¿Qué proceso te está costando más tiempo y dinero?
            </h2>

            <p className="mx-auto max-w-2xl text-base text-slate-300 font-light leading-relaxed">
              Cuéntanoslo en una llamada de 15 minutos. Te decimos qué se puede
              resolver, qué no, y por dónde empezarías.
            </p>

            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Agendar llamada de 15 min
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
              'Diseño y construcción de plataformas a la medida para centralizar la operación de una empresa: pedidos, cobros, inventario, reportes y atención a clientes en un solo lugar.',
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
