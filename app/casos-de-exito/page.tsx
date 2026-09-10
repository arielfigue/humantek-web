import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function CasosDeExitoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Fondos y luces de ambientación */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-20">
        
        {/* --- HERO SECTION DE CASOS DE ÉXITO --- */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Resultados Reales
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Casos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Éxito</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
              Descubra cómo hemos ayudado a diversas empresas a transformar sus operaciones, optimizar sus procesos y alcanzar el máximo desempeño financiero.
            </p>
          </div>
        </ScrollReveal>

        {/* --- CONTENEDOR PARA TUS SECCIONES --- */}
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-slate-800 border-dashed bg-slate-900/40 p-12 sm:p-20 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Lienzo en blanco para Casos de Éxito</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Esta es la estructura inicial. Por favor envíame las imágenes, textos, o capturas de cómo quieres que se vea el contenido de esta página para comenzar a maquetarlo.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}