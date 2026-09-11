import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import VideoPlayer from '@/components/VideoPlayer';
import JsonLd from '@/components/JsonLd';
import ValoresAccordion from './ValoresAccordion';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Nosotros: qué hacemos y por qué',
  description:
    'Nuestro manifiesto: en cada proyecto de ERP lo más importante son las personas. Conozca cómo trabaja Humanytek y los principios que rigen nuestras implementaciones.',
  path: '/nosotros',
});


export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Luces y ambiente de fondo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.20),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* --- ENCABEZADO Y VIDEO INSTITUCIONAL CENTRADO --- */}
        <ScrollReveal>
          <div className="text-center space-y-6">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              ¿Qué <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">hacemos?</span>
            </h1>

            {/* REPRODUCTOR DE VIDEO */}
            <div className="pt-4 max-w-4xl mx-auto relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-2xl -z-10"></div>
              
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
                  <VideoPlayer
                    src="/Institucional.mp4"
                    label="Video institucional de Humanytek"
                    autoPlay
                    loop
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* --- MANIFIESTO E INTRODUCCIÓN --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10 backdrop-blur-xl space-y-6">
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed">
              Espero poder atrapar tu atención con este breve, pero claro y sobre todo, <strong className="text-white font-semibold">honesto manifiesto</strong> que he decidido hacer. Quisieramos hablar de lo que hacemos hoy y podemos lograr para tu empresa.
            </p>

            <div className="border-l-4 border-cyan-500 pl-6 py-2 bg-cyan-500/5 rounded-r-xl">
              <p className="text-xl sm:text-2xl text-cyan-300 font-medium tracking-wide">
                La pregunta más poderosa que te puedo hacer es …
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                ¿Te pusiste a pensar realmente cuál es el problema más relevante que tiene tu empresa?
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* --- TARJETAS DE SOLUCIONES Y RETOS --- */}
        <ScrollReveal>
          <div className="space-y-6">
            
            {/* RETO 1: ERP */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-3 hover:border-blue-500/40 transition-all">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                01. Implementación ERP & Finanzas
              </span>
              <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed">
                Si necesitas implementar un ERP y generar estados financieros en tiempo real y lo has intentado N veces y aún no lo logras, te ofrecemos hacerlo de una manera muy segura y totalmente diferente a todo lo que conoces, <strong className="text-white font-semibold">te ASEGURO que vas a poder ver los resultados que está logrando tu empresa en tiempo real</strong> cuando terminemos de hacer la implementación.
              </p>
            </div>

            {/* RETO 2: DISTRIBUCIÓN E INVENTARIOS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-3 hover:border-cyan-500/40 transition-all">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                02. Comercialización y Distribución
              </span>
              <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed">
                Si eres una empresa que comercializa y distribuye productos y ¿no sabes cómo hacer para mejorar el ROI, te tapan los inventarios y al mismo tiempo pierdes ventas constantemente por falta de disponibilidad para entrega inmediata?, te vamos a plantear la implementación de políticas, procesos y herramientas que te permitirán erradicar para siempre estos efectos nocivos para tu negocio para que en un tiempo no mayor a los 6 meses puedas ver una <strong className="text-cyan-300 font-semibold">mejora de 2 dígitos (sí 2 dígitos) en rentabilidad</strong> de toda la empresa.
              </p>
            </div>

            {/* RETO 3: MANUFACTURA */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-3 hover:border-blue-500/40 transition-all">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                03. Sector Manufactura
              </span>
              <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed">
                ¿Eres una empresa del mundo de la manufactura que no puede cumplir sus promesas de tiempo de entrega a los clientes? ¿Vives teniendo problemas de cumplimiento? En menos de 2 meses podemos ayudarte que tus promesas de tiempo de entrega sean el referente que haga que los clientes, aunque paguen más caro por tu producto, te elijan a ti porque no tendrás competencia que logre ofrecer esos tiempos tan retadores.
              </p>
            </div>

          </div>
        </ScrollReveal>

        {/* --- VALOR Y CIERRE --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 p-8 sm:p-10 backdrop-blur-xl space-y-8 text-center sm:text-left">
            <div className="space-y-4">
              <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed">
                En definitiva, si te vamos a ayudar a solucionar problemas, queremos que estos problemas sean los más retadores y ambiciosos, porque la verdad es que cualquiera puede solucionar detalles.
              </p>
              
              <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  Cuando hablamos de valor en Humanytek nos referimos a hacer que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ganes más dinero con lo mismo o incluso menos recursos</span> de los que tienes hoy.
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed pt-2">
                Todo esto es posible, pero usando medios y formas muy propias, permíteme una reunión con tiempo de calidad para que sepas cómo lo hacemos y hables con empresas que ya lo han logrado.
              </p>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105"
              >
                Agendar reunión con tiempo de calidad
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* --- PRINCIPIOS Y FILOSOFÍA (ACORDEÓN) --- */}
        <ValoresAccordion />

      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Nosotros', path: '/nosotros' },
        ])}
      />
    </main>
  );
}