'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const VMI_BENEFICIOS = [
  "Reducción significativa del inventario total en la cadena.",
  "Reducción de costos generales de almacenaje y custodia de stock.",
  "Aumento en la rotación del inventario reduciendo la inversión requerida.",
  "Disminución drástica del riesgo de escasez o productos agotados.",
  "Incremento del intercambio de datos precisos en tiempo real cliente/proveedor.",
  "Priorización inteligente de órdenes de reposición en cada punto de suministro.",
  "Confiabilidad de inventarios superior al 95% en plazos de 4 a 5 meses."
];

const VMI_FRASES = [
  "“Te repongo lo que se te está vendiendo sin que me lo pidas…”",
  "“Cuando vendes, me pagas…”",
  "“Si no vendes el producto, me lo regresas…”",
  "“Aquí no hay ningún truco…”"
];

export default function VMIPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Luces y degradados de fondo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* --- HERO SECTION --- */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              En vez de vender solo un producto, ofrece un servicio para vender mucho más de tu producto
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Vendor Managed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Inventory (VMI)</span>
            </h1>
            <p className="text-xl text-cyan-300 font-medium tracking-wide">
              Una potente propuesta de negocios
            </p>
          </div>
        </ScrollReveal>

        {/* --- VIDEO DEL MODELO VMI --- */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto relative rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
              <video
                src="/vmi.mp4"
                controls
                controlsList="novolume nodownload" // <- nodownload ocultará el botón de descarga
                onContextMenu={(e) => e.preventDefault()} // <- Evitará clic derecho > Guardar video como
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain [&::-webkit-media-controls-volume-slider]:hidden [&::-webkit-media-controls-mute-button]:hidden"
              />
            </div>
            <p className="text-center text-xs text-slate-400 font-light mt-3">
              Flujo automático de reabastecimiento continuo entre fábrica, plataforma en la nube y punto de venta.
            </p>
          </div>
        </ScrollReveal>

        {/* --- TARJETAS DE PROPUESTA COMERCIAL --- */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white">
                Imagínate poder reunirte con un cliente nuevo y decirle:
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VMI_FRASES.map((frase, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex items-center gap-4 hover:border-cyan-500/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-100 italic">
                    {frase}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-300 font-light text-base sm:text-lg max-w-3xl mx-auto pt-2">
              Estas frases plantean una propuesta de negocios que podría hacer sospechar a cualquiera de ser <strong className="text-white font-medium">“demasiado buena para ser verdad”</strong>.
            </p>
          </div>
        </ScrollReveal>

        {/* --- CONTEXTO CORPORATIVO VS PYMES --- */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  El Desafío Tradicional
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Exclusivo para los gigantes de la industria
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Este modelo no es nuevo, pero históricamente ha sido económicamente inalcanzable para las PyMEs. Gigantes como <strong className="text-white font-medium">Walmart, Canon, General Motors y Adidas</strong> se benefician de este formato gracias a su capacidad financiera para adquirir costosa tecnología y consultoría especializada.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 italic">
                Posicionándolas como líderes indiscutibles en sus respectivos segmentos.
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/20 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  La Solución Humanytek
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Democratizando el VMI para la Pequeña y Mediana Empresa
                </h3>
                <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed">
                  En <strong className="text-cyan-300 font-semibold">Humanytek</strong> desarrollamos la suite tecnológica necesaria para acercar estos modelos de gestión a la PyME. Transformamos la relación comercial de ventas de tipo <strong className="text-white font-medium">“Push”</strong> hacia un modelo eficiente <strong className="text-white font-medium">“Pull”</strong>, en un entorno real de <strong className="text-cyan-300 font-medium">Win-Win-Win</strong>.
                </p>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Ofrecemos costos altamente accesibles, flexibilidad de condiciones, sin contratos forzosos e incluso periodos de prueba para validar los resultados antes de realizar cualquier desembolso.
                </p>
              </div>

              <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-cyan-300 font-medium">
                  Pruebas sin riesgo • Sin contratos forzosos
                </span>
                <Link
                  href="/contacto"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
                >
                  Consultar implementación
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* --- BENEFICIOS CLAVE --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10 backdrop-blur-xl space-y-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Impacto Directo en la Operación y Finanzas
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                Resultados medibles que transforman la rentabilidad del negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VMI_BENEFICIOS.map((beneficio, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3 hover:border-blue-500/40 transition-all"
                >
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-slate-200 font-light leading-relaxed">
                    {beneficio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- PÚBLICO OBJETIVO --- */}
        <ScrollReveal>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl space-y-3">
            <h4 className="text-lg font-bold text-white">
              ¿A quién va dirigido este modelo?
            </h4>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Ideal para empresas que producen, comercializan y/o distribuyen productos en sus propios puntos de venta, centros de distribución o los de sus clientes, y que hoy sufren por excesos de inventario y faltantes que ocasionan pérdida de ventas.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}