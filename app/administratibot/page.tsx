import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import VideoPlayer from '@/components/VideoPlayer';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

/**
 * Página de AdministratiBOT.
 *
 * El discurso es el del producto, no el de un servicio acompañado: el sujeto
 * de las acciones es AdministratiBOT (lee, valida, escribe, corre sola), nunca
 * "nosotros". No se dice en ningún momento que no dependa de personas; se
 * muestra describiendo lo que el sistema hace por su cuenta.
 *
 * Todo lo que se afirma aquí está en la plataforma publicada
 * (administratibot.com): conexión a Odoo, DryRun con valores exactos,
 * ejecución programada, archivos como insumo e importación masiva.
 */

const URL_APP = 'https://www.administratibot.com';

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

const PASOS = [
  {
    n: 1,
    titulo: 'Conectas tu Odoo',
    texto:
      'URL, base de datos, usuario y API key. La conexión se crea con permisos de escritura y tus credenciales nunca se muestran.',
  },
  {
    n: 2,
    titulo: 'Describes la tarea',
    texto:
      'Con tus palabras, como se la explicarías a un asistente. Si hace falta, adjuntas el PDF, el Excel, el Word o la imagen donde viene la información.',
  },
  {
    n: 3,
    titulo: 'Revisas el plan',
    texto:
      'Una simulación en seco te muestra exactamente qué registros crearía o modificaría, con los valores, antes de tocar tu base.',
  },
  {
    n: 4,
    titulo: 'Corre sola',
    texto:
      'Defines el horario en tu zona horaria y AdministratiBOT ejecuta cada corrida escribiendo en el sistema, sin que alguien autorice nada.',
  },
];

const CONTROLES = [
  {
    titulo: 'Nada se escribe a ciegas',
    texto:
      'Antes de cada puesta en marcha, la simulación muestra el antes y el después de cada registro. Ves el resultado exacto, no una promesa.',
  },
  {
    titulo: 'Tus credenciales quedan cifradas',
    texto:
      'La conexión se guarda cifrada y se genera una llave propia para el servicio de escritura. Ni la URL del servicio ni las llaves se muestran en pantalla.',
  },
  {
    titulo: 'Cada cuenta ve solo lo suyo',
    texto:
      'Una base por cliente. Toda consulta filtra por la cuenta que la hace: nadie ve información de otra empresa.',
  },
  {
    titulo: 'Funciona con tu Odoo',
    texto:
      'Odoo 12 en adelante, en todas las versiones intermedias: Odoo Online (SaaS), Odoo.sh y OnPremise.',
  },
];

export const metadata: Metadata = pageMetadata({
  title: 'Automatización administrativa para tu ERP',
  description:
    'AdministratiBOT conecta tu Odoo y ejecuta tareas administrativas solo: concilia pagos, captura estados de cuenta y crea registros en el horario que definas. Prueba con cupón del 100%.',
  path: '/administratibot',
  keywords: [
    'automatización administrativa Odoo',
    'bot para Odoo',
    'conciliación automática de pagos',
    'automatización ERP México',
    'AdministratiBOT',
  ],
});

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
              Tu administración en Odoo, en piloto automático. Conectas tu base,
              le describes la tarea como se la explicarías a un asistente y
              AdministratiBOT la ejecuta: crea registros, concilia pagos,
              actualiza contactos y arma reportes. Sin capturas y sin instalar
              nada.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-block rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm sm:text-base font-semibold text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                Cupón del 100% para probarlo sin compromiso
              </span>
              <span className="inline-block rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm sm:text-base font-medium text-slate-300">
                Sin contrataciones ni plazos forzosos
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <a
                href={`${URL_APP}/register`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Crear cuenta y probar ↗
              </a>
              <Link
                href="/contacto"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Pedir mi cupón
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* --- VIDEO --- */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950">
              <VideoPlayer
                src="/cambio-vs-innova-v2.mp4"
                poster="/posters/cambio-vs-innova-v2.jpg"
                label="Video de presentación de AdministratiBOT"
                autoPlay
                loop
                controlsList="novolume nodownload noplaybackrate"
                className="h-full w-full object-contain [&::-webkit-media-controls-volume-slider]:hidden [&::-webkit-media-controls-mute-button]:hidden"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* --- CASOS DE USO --- */}
        <ScrollReveal>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Qué mantiene al día</h2>
              <p className="text-sm text-slate-400 font-light mt-1">
                Casos de uso comunes. Todos corren sobre tu propia base de Odoo.
              </p>
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
                <h3 className="text-lg font-semibold text-white">También corre tu propio caso</h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  No hay un catálogo cerrado: describes con tus palabras la tarea
                  que hoy te quita tiempo y AdministratiBOT la ejecuta sobre tu
                  base, con tus reglas y tus datos.
                </p>
              </article>
            </div>
          </div>
        </ScrollReveal>

        {/* --- CÓMO FUNCIONA --- */}
        <ScrollReveal>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Cómo funciona</h2>
              <p className="text-sm text-slate-400 font-light mt-1">
                Cuatro pasos y tu administración queda corriendo sola.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PASOS.map((paso) => (
                <article
                  key={paso.n}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all flex flex-col gap-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/50 bg-cyan-500/10 text-sm font-bold text-cyan-300">
                    {paso.n}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug">{paso.titulo}</h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">{paso.texto}</p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-dashed border-cyan-500/45 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-5 sm:p-6 text-center">
              <p className="text-base sm:text-lg font-medium text-white">
                Del paso 4 en adelante ya no hay nada que hacer: la tarea se
                ejecuta en su horario, escribe en el sistema y deja el registro
                de lo que tocó.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* --- CONTROL --- */}
        <ScrollReveal>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Por qué se puede delegar</h2>
              <p className="text-sm text-slate-400 font-light mt-1">
                Automatizar no sirve si no hay forma de revisar qué va a pasar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONTROLES.map((control) => (
                <article
                  key={control.titulo}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex gap-4 hover:border-cyan-500/40 transition-all"
                >
                  <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-white">{control.titulo}</h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">{control.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- CUPÓN DE PRUEBA --- */}
        <ScrollReveal>
          <section
            aria-labelledby="prueba-sin-costo"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 px-6 py-6 sm:px-10 sm:py-8 text-center shadow-[0_0_70px_rgba(52,211,153,0.35)]"
          >
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/30 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl"></div>

            <div className="relative mx-auto max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-slate-950 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-lime-300">
                Cupón · 100% de descuento
              </span>
              <h2
                id="prueba-sin-costo"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight"
              >
                Pruébalo completo, sin costo y sin compromiso
              </h2>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                Te damos un cupón del 100% para que corras tus primeras
                automatizaciones sobre tu propia base y compruebes el resultado.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Link
                  href="/contacto"
                  className="inline-block rounded-xl bg-slate-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-slate-800 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300"
                >
                  Quiero mi cupón
                </Link>
                <a
                  href={`${URL_APP}/register`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl border border-slate-900/40 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 transition-all hover:bg-slate-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                >
                  Crear cuenta ↗
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* --- CTA --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl space-y-1">
              <p className="text-lg font-medium text-white">
                ¿Quieres ver qué haría con la información de tu empresa?
              </p>
              <p className="text-sm text-slate-300 font-light">
                Conecta una base y corre una simulación: verás el plan exacto
                antes de que se escriba un solo registro.
              </p>
            </div>
            <a
              href={URL_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Ver la plataforma ↗
            </a>
          </div>
        </ScrollReveal>

      </div>

      <JsonLd
        data={[
          serviceSchema({
            name: 'AdministratiBOT: automatización administrativa para Odoo',
            description:
              'Automatización administrativa sobre Odoo: AdministratiBOT conecta tu base y ejecuta tareas como conciliación de pagos, captura de estados de cuenta, comisiones de venta y compras contra entradas, en el horario definido y con simulación previa del plan.',
            path: '/administratibot',
            serviceType: 'Automatización administrativa',
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
