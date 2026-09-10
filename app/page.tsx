import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-28 pb-16 lg:px-12 overflow-hidden">
        
        {/* Fondo con degradado y rejilla tecnológica */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.20),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA: Textos institucionales */}
          <div className="flex flex-col items-start text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Productividad es el acto de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                acercar a la empresa a su meta.
              </span>
            </h1>

            <div className="mt-6 space-y-2 text-base sm:text-lg text-slate-300 leading-relaxed font-light border-l-2 border-blue-500/50 pl-4">
              <p>
                Un buen sistema no hace una buena implementación... Una buena implementación no hace una empresa más rentable...
              </p>
              <p className="font-medium text-white">
                ¿Estás abierto a aprender como mejorar tu empresa?
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                href="#erps"
                className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-105 transition-all duration-200"
              >
                Saber más
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Contactar
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Reproductor de Video Local */}
          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-25 blur-2xl -z-10"></div>
            
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover rounded-lg"
                >
                  <source src="/humanytek-video.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}