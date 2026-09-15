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
 * Usa `softwareSchema` y no `serviceSchema`: Click2Deploy es una plataforma que
 * el cliente usa, no un servicio que presta un equipo. Google los distingue.
 *
 * La página NO repite el catálogo de click2deploy.com. Ese sitio describe la
 * plataforma en autoservicio; esta describe lo que se suma cuando el proyecto
 * lo lleva Humanytek. Es una distinción que hay que decir en voz alta: sin
 * ella, un visitante que compare ambas listas concluye que se contradicen.
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
 * Las capacidades. Viven en una constante y no dispersas en el marcado para
 * poder agregar, quitar o reordenar sin tocar estilos.
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

      <div className="mx-auto max-w-6xl space-y-16">

        {/* --- ENCABEZADO ---
            El logo va DENTRO del h1, no en lugar del h1: así la página conserva
            su encabezado y el `alt` aporta el texto que leen los buscadores y
            los lectores de pantalla. */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-6">
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
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Como cliente de Humanytek{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  nos encargamos de customizar el rendimiento de tu sistema al nivel mas optimo.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                La plataforma la puedes contratar por tu cuenta y va a funcionar.
                Pero si algo se te complica no lo sabremos.
              </p>
            </div>

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
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {c.titulo}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {c.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- AGENTE DE DESARROLLO ---
            Va aparte y a todo lo ancho porque es el diferenciador más difícil
            de copiar: usar tus propios tokens elimina el margen que cobra
            cualquier competidor por revender inferencia. */}
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

        {/* --- LLAMADO A LA ACCIÓN ---
            El botón principal es hablar con nosotros, no ir a la plataforma:
            todo lo de arriba existe únicamente por esa vía. El enlace a
            click2deploy.com queda como la opción de autoservicio, que también
            es legítima pero es otra cosa. */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10 backdrop-blur-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Cómo quieres empezar?
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contacto" className={BOTON_PRIMARIO}>
                Quiero que lo lleven ustedes
              </Link>
              <a href="https://click2deploy.com" target="_blank" rel="noopener" className={BOTON_SECUNDARIO}>
                Ver la plataforma por mi cuenta
              </a>
            </div>

            <p className="text-sm text-slate-400 font-light">
              En click2deploy.com están los planes, el catálogo completo de
              características y el alta.
            </p>
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