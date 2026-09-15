import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, softwareSchema } from '@/lib/schema';

/**
 * Página de Click2Deploy.
 *
 * A diferencia del resto del sitio, esta usa `softwareSchema` y no
 * `serviceSchema`: Click2Deploy es una plataforma que el cliente usa, no un
 * servicio que presta un equipo. Google distingue ambas cosas.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Click2Deploy',
  description:
    'Odoo administrado sobre servidor dedicado: monitoreo con IA, pruebas de estrés, afinación de más de 20 parámetros y expertos DevOps incluidos.',
  path: '/click2deploy',
  keywords: [
    'Odoo supervisado por IA administrado por expertos',
    'hosting Odoo dedicado',
    'Odoo en Kubernetes',
    'monitoreo y afinación de Odoo',
    'Click2Deploy',
  ],
});

/**
 * Las capacidades de la plataforma. Viven en una constante y no dispersas en el
 * marcado para poder agregar, quitar o reordenar sin tocar estilos.
 */
const CAPACIDADES = [
  {
    titulo: 'Monitoreo asistido por IA',
    texto:
      'Monitoreo continuo y pruebas de estrés automáticas que detectan los cuellos de botella antes de que tu operación los sufra.',
  },
  {
    titulo: 'Expertos DevOps de verdad',
    texto:
      'Recomendaciones de aumento o reducción de recursos hechas por especialistas humanos, no por un algoritmo. Incluidas en el costo del servicio.',
    destacar: true,
  },
  {
    titulo: 'Más de 20 parámetros afinados',
    texto:
      'Configuración personalizada para optimizar el desempeño de tu sistema. Cada cliente tiene necesidades distintas y ninguna instalación se configura igual.',
  },
  {
    titulo: 'Servidor dedicado desde el día uno',
    texto: 'Tu proyecto nace en un servidor dedicado, no compartido.',
  },
  {
    titulo: 'Orquestación con Kubernetes',
    texto:
      'Mueve tu sistema automáticamente al servidor más adecuado cuando hace falta, sin que tengas que intervenir.',
  },
  {
    titulo: 'Respaldos con tu estrategia',
    texto:
      'Configuración de la estrategia de respaldos y del tiempo de permanencia de tus copias, según lo que tu operación necesite.',
  },
];

/** Clases de los botones, fuera del marcado para que las líneas no sean enormes. */
const BOTON_PRIMARIO =
  'inline-block rounded-full bg-cyan-500 px-9 py-4 text-sm font-extrabold uppercase tracking-wider text-slate-950 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';

const BOTON_SECUNDARIO =
  'inline-block rounded-full border border-slate-700 bg-slate-900/60 px-9 py-4 text-sm font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';

export default function Click2DeployPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-6xl space-y-14">

        {/* --- ENCABEZADO --- */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* El logo va DENTRO del h1, no en lugar del h1: la etiqueta sigue
                siendo el encabezado de la página y el `alt` aporta el texto que
                leen los buscadores y los lectores de pantalla. Un h1 sustituido
                por una imagen pierde esa señal por completo.

                `unoptimized` porque un SVG no necesita pasar por el optimizador
                de imágenes: ya es vectorial y se sirve tal cual. */}
            <h1 className="flex justify-center">
              <Image
                src="/click2deploy-logo.png"
                alt="Click2Deploy"
                width={524}
                height={68}
                priority
                className="h-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]"
              />
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              Tu Odoo desplegado, monitoreado y afinado. Sin que tu equipo tenga
              que administrar servidores.
            </p>
          </div>
        </ScrollReveal>

        {/* --- CAPACIDADES --- */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CAPACIDADES.map((c) => (
              <div
                key={c.titulo}
                className={`rounded-2xl border p-6 sm:p-7 backdrop-blur-xl space-y-3 transition-colors ${
                  c.destacar
                    ? 'border-cyan-500/40 bg-cyan-500/[0.07] hover:border-cyan-400/60'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {c.titulo}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {c.texto}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* --- AGENTE DE DESARROLLO --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-blue-950/30 p-8 sm:p-10 backdrop-blur-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Incluido
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Agente de desarrollo integrado
            </h2>
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Funciona con OpenAI, Claude, Gemini y DeepSeek. Puedes usar{' '}
              <strong className="font-semibold text-white">tus propios tokens</strong>{' '}
              y trabajar con el agente sin costo adicional.
            </p>
          </div>
        </ScrollReveal>

        {/* --- LLAMADO A LA ACCIÓN --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10 backdrop-blur-xl text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Conoce la plataforma
              </h2>
              <p className="text-slate-300 font-light">
                Planes, características completas y alta en click2deploy.com
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://click2deploy.com" target="_blank" rel="noopener" className={BOTON_PRIMARIO}>
                Ir a Click2Deploy
              </a>
              <Link href="/contacto" className={BOTON_SECUNDARIO}>
                Hablar con un consultor
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>

      <JsonLd
        data={[
          softwareSchema({
            name: 'Click2Deploy',
            description:
              'Plataforma de Odoo administrado sobre servidor dedicado, con orquestación en Kubernetes, monitoreo asistido por IA, afinación de parámetros y respaldos configurables.',
            path: '/click2deploy',
            sitioOficial: 'https://click2deploy.com',
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Click2Deploy', path: '/click2deploy' },
          ]),
        ]}
      />
    </main>
  );
}