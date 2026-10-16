import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'AdministratiBOT: Soporte Administrativo',
  description:
    'Servicio semi-automatizado de soporte administrativo que mantiene al día la información de tu sistema: estados de cuenta, facturación vs pagos, comisiones de venta y compras vs entradas de mercancía.',
  path: '/administratibot',
  keywords: [
    'soporte administrativo ERP',
    'conciliación bancaria Odoo',
    'cruce de facturas y pagos',
    'información financiera en tiempo real',
    'AdministratiBOT',
  ],
});

const CASOS_DE_USO = [
  {
    etiqueta: 'Bancos',
    titulo: 'Captura periódica de estados de cuenta',
    texto:
      'Los movimientos bancarios entran al sistema con la frecuencia que tu operación necesita, no al cierre del mes.',
  },
  {
    etiqueta: 'Facturación vs Pagos',
    titulo: 'Cruces de facturación contra pagos',
    texto:
      'Cada factura queda conciliada con el pago que la liquida; lo pendiente se identifica a tiempo.',
  },
  {
    etiqueta: 'Ventas',
    titulo: 'Comisiones de venta',
    texto:
      'Cálculo de comisiones con la información ya conciliada, sin hojas de cálculo paralelas.',
  },
  {
    etiqueta: 'Compras vs Entradas',
    titulo: 'Compras contra entradas de mercancía',
    texto:
      'Lo que se compró se compara con lo que realmente se recibió, para detectar diferencias antes de pagar.',
  },
  {
    etiqueta: 'Aduanas',
    titulo: 'Importaciones y aduanas',
    texto:
      'Seguimiento y registro de pedimentos y costos de importación para que el costo de lo importado quede completo en el sistema.',
  },
  {
    etiqueta: 'Manufactura',
    titulo: 'Planeación de Manufactura',
    texto:
      'Información de inventarios, compras y órdenes actualizada para planear la producción con datos confiables.',
  },
  {
    etiqueta: 'Combinado',
    titulo: 'Cierre administrativo integral',
    texto:
      'Varios casos de uso corriendo al mismo tiempo: estados de cuenta, facturación vs pagos, comisiones y compras vs entradas se concilian en conjunto para tener cifras confiables en tiempo real.',
  },
];

const PASOS_CICLO = [
  {
    n: 1,
    titulo: 'Nos entregas la información',
    texto: 'La información que se tiene que procesar: PDF\'s, Excel, imágenes, etc.',
    opcion: null,
    lg: 'lg:col-start-2 lg:row-start-1',
  },
  {
    n: 2,
    titulo: 'Procesamos la información',
    texto: 'La convertimos en datos útiles para una carga.',
    opcion: null,
    lg: 'lg:col-start-3 lg:row-start-2',
  },
  {
    n: 3,
    titulo: 'Generamos el reporte',
    texto: 'Si tu equipo tiene que poner al día los datos.',
    opcion: 'Opción A',
    lg: 'lg:col-start-2 lg:row-start-3',
  },
  {
    n: 4,
    titulo: 'Tu equipo pone al día los datos',
    texto: 'A partir del reporte que generamos.',
    opcion: 'Opción A',
    lg: 'lg:col-start-1 lg:row-start-2 lg:justify-self-end',
  },
];

/** Arcos del anillo (viewBox 240, centro 120, radio 90) entre nodos en sentido horario. */
const ARCOS_CICLO = [
  'M147.8 34.4 A90 90 0 0 1 205.6 92.2',
  'M205.6 147.8 A90 90 0 0 1 147.8 205.6',
  'M92.2 205.6 A90 90 0 0 1 34.4 147.8',
  'M34.4 92.2 A90 90 0 0 1 92.2 34.4',
];
const NODOS_CICLO = [
  { x: 120, y: 30, n: '1' },
  { x: 210, y: 120, n: '2' },
  { x: 120, y: 210, n: '3' },
  { x: 30, y: 120, n: '4' },
];

export default function AdministratiBOTPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Luces y degradados de fondo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-6xl space-y-16">

        {/* --- HERO --- */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Administrati<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">BOT</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
              Un servicio semi-automatizado que mantiene la información de tu sistema al día con precisión absoluta, para generar información financiera en tiempo real con una confiabilidad inmejorable.
            </p>
            <p className="inline-block rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-base sm:text-lg font-semibold text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              No requiere contrataciones ni plazos forzosos
            </p>
          </div>
        </ScrollReveal>

        {/* --- CASOS DE USO --- */}
        <ScrollReveal>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Qué mantenemos al día por ti</h2>
              <p className="text-sm text-slate-400 font-light mt-1">Casos de uso comunes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CASOS_DE_USO.map((caso) => (
                <article
                  key={caso.titulo}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col gap-3 hover:border-cyan-500/40 transition-all"
                >
                  <span className="self-start text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    {caso.etiqueta}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{caso.titulo}</h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">{caso.texto}</p>
                </article>
              ))}

              <article className="lg:col-span-2 rounded-2xl border border-dashed border-cyan-500/45 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-6 backdrop-blur-xl flex flex-col gap-3">
                <span className="self-start text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30">
                  Entre otros
                </span>
                <h3 className="text-lg font-semibold text-white">Definamos el tuyo juntos</h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Cuéntanos qué información de tu sistema se queda atrás y diseñamos el caso de uso a la medida de tu operación.
                </p>
              </article>
            </div>
          </div>
        </ScrollReveal>

        {/* --- CICLO DEL SERVICIO --- */}
        <ScrollReveal>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Cómo funciona</h2>
              <p className="text-sm text-slate-400 font-light mt-1">Un ciclo que se repite cada vez que hay información por procesar.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px_1fr] lg:gap-x-6 lg:gap-y-2">
              {/* Anillo: solo en pantallas grandes. En móvil la secuencia se lee por los números de cada tarjeta. */}
              <div
                className="hidden lg:flex lg:col-start-2 lg:row-start-2 items-center justify-center"
                aria-hidden="true"
              >
                <svg viewBox="0 0 240 240" className="h-60 w-60" fill="none">
                  <defs>
                    <linearGradient id="ciclo-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <marker id="ciclo-flecha" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M0 0 L10 5 L0 10 z" fill="#22d3ee" />
                    </marker>
                  </defs>
                  <circle cx="120" cy="120" r="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 5" />
                  {ARCOS_CICLO.map((d) => (
                    <path key={d} d={d} stroke="url(#ciclo-grad)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#ciclo-flecha)" />
                  ))}
                  {NODOS_CICLO.map((nodo) => (
                    <g key={nodo.n}>
                      <circle cx={nodo.x} cy={nodo.y} r="18" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
                      <text x={nodo.x} y={nodo.y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#f1f5f9">
                        {nodo.n}
                      </text>
                    </g>
                  ))}
                  <text x="120" y="116" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="#22d3ee">
                    CICLO
                  </text>
                  <text x="120" y="132" textAnchor="middle" fontSize="9" fill="#94a3b8">
                    se repite
                  </text>
                </svg>
              </div>

              {PASOS_CICLO.map((paso) => (
                <article
                  key={paso.n}
                  className={`w-full max-w-sm self-center justify-self-center rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all ${paso.lg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/50 bg-cyan-500/10 text-sm font-bold text-cyan-300">
                      {paso.n}
                    </span>
                    <h3 className="text-base font-semibold text-white leading-snug">{paso.titulo}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">{paso.texto}</p>
                  {paso.opcion && (
                    <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {paso.opcion}
                    </span>
                  )}
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-dashed border-cyan-500/45 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-5 sm:p-6 text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">Pasos 3 y 4 · Opción B</span>
              <p className="mt-1 text-base sm:text-lg font-medium text-white">
                Generamos el reporte y cargamos la información, previa autorización tuya.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* --- MODALIDADES DE ENTREGA --- */}
        <ScrollReveal>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Tú decides cómo se completan los registros</h2>
              <p className="text-sm text-slate-400 font-light mt-1">El mismo servicio, con dos formas de entrega.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Opción A</span>
                <h3 className="text-xl font-semibold text-white">Reporte para tu equipo</h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Generamos un reporte con lo que falta o no cuadra, y tu equipo completa los registros en el sistema.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/20 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Opción B</span>
                <h3 className="text-xl font-semibold text-white">Nosotros generamos los registros</h3>
                <p className="text-sm text-slate-200 font-light leading-relaxed">
                  El servicio captura directamente los registros en tu sistema, y tu equipo solo revisa y valida.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* --- PRUEBA SIN COSTO --- */}
        <ScrollReveal>
          <section
            aria-labelledby="prueba-sin-costo"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 px-6 py-6 sm:px-10 sm:py-8 text-center shadow-[0_0_70px_rgba(52,211,153,0.35)]"
          >
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/30 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl"></div>

            <div className="relative mx-auto max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-slate-950 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-lime-300">
                Sin costo · Sin compromiso
              </span>
              <h2
                id="prueba-sin-costo"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight"
              >
                Pruébalo sin ningún costo y sin compromiso
              </h2>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                Te ordenamos una semana de atrasos para que valides la potencia del servicio.
              </p>
              <Link
                href="/contacto"
                className="inline-block rounded-xl bg-slate-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-slate-800 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300"
              >
                Quiero mi semana de prueba
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* --- CTA --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-medium text-white max-w-xl">
              ¿Quieres ver cómo quedaría con la información de tu empresa?
            </p>
            <Link
              href="/contacto"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Solicitar información
            </Link>
          </div>
        </ScrollReveal>

      </div>

      <JsonLd
        data={[
          serviceSchema({
            name: 'AdministratiBOT: Soporte Administrativo',
            description:
              'Servicio semi-automatizado que mantiene al día la información del sistema ERP: captura de estados de cuenta, cruces de facturación contra pagos, comisiones de venta y compras contra entradas de mercancía.',
            path: '/administratibot',
            serviceType: 'Soporte administrativo',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'AdministratiBOT', path: '/administratibot' },
          ]),
        ]}
      />
    </main>
  );
}
