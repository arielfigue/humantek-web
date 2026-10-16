import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'AdministratiBot: Soporte Administrativo',
  description:
    'Servicio semi-automatizado de soporte administrativo que mantiene al día la información de tu sistema: estados de cuenta, facturación vs pagos, comisiones de venta y compras vs entradas de mercancía.',
  path: '/administratibot',
  keywords: [
    'soporte administrativo ERP',
    'conciliación bancaria Odoo',
    'cruce de facturas y pagos',
    'información financiera en tiempo real',
    'AdministratiBot',
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
];

export default function AdministratiBotPage() {
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
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Soporte Administrativo
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Administrati<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Bot</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
              Un servicio semi-automatizado que mantiene la información de tu sistema al día y con mucha precisión, para generar información financiera en tiempo real con muy alta confiabilidad.
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

              <article className="rounded-2xl border border-dashed border-cyan-500/45 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-6 backdrop-blur-xl flex flex-col gap-3">
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
            name: 'AdministratiBot: Soporte Administrativo',
            description:
              'Servicio semi-automatizado que mantiene al día la información del sistema ERP: captura de estados de cuenta, cruces de facturación contra pagos, comisiones de venta y compras contra entradas de mercancía.',
            path: '/administratibot',
            serviceType: 'Soporte administrativo',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'AdministratiBot', path: '/administratibot' },
          ]),
        ]}
      />
    </main>
  );
}
