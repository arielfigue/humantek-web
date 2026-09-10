import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-28 pb-16 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.20),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

        <ScrollReveal>
          <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
        </ScrollReveal>
      </section>

      {/* --- SECCIÓN PROBLEMÁTICA ERP --- */}
      <section id="erps" className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                ¿Sabía usted que a nivel mundial y sin importar la marca{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-orange-400">
                  más del 70%
                </span>{" "}
                de las implementaciones de ERP son fracasos?
              </h2>

              <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  Las situaciones más críticas en las <strong className="text-white font-semibold">"malas implementaciones"</strong> tienen que ver con cuestiones humanas y casi nunca son tecnológicas.
                </p>
                <p>
                  Aún y con toda la abrumadora cantidad de evidencia estadística / histórica que hay de esto, los implementadores y las empresas en su mayoría le siguen prestando más atención al software ERP que al proceso humano de implementación de un software que deberá ser usado por personas.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-3xl bg-blue-600/20 blur-xl -z-10"></div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
                <Image
                  src="/images/photo-1522071820081-009f0129c71c.avif"
                  alt="Proceso humano y colaboración en la implementación ERP"
                  width={800}
                  height={600}
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECCIÓN LA DIFERENCIA / METODOLOGÍA --- */}
      <section id="metodologia" className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-1 rounded-3xl bg-blue-500/10 blur-xl -z-10"></div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
                <Image
                  src="/images/photo-1454165804606-c3d57bc86b40.avif"
                  alt="Claridad y metodología Humanytek"
                  width={800}
                  height={600}
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Tenemos perfecta claridad de lo que realmente hace la diferencia ...
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                En Humanytek tenemos perfecta claridad de que lo que realmente hace la diferencia es la <strong className="text-white font-semibold">"manera"</strong>, por eso hemos diseñado una metodología lógica en un proceso de implementación que asegura el éxito de su proyecto.
              </p>

              <div className="pt-2">
                <Link
                  href="#vision-viable"
                  className="inline-block rounded-full bg-blue-500 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 hover:scale-105 transition-all duration-200"
                >
                  Conoce más
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECCIÓN VISIÓN VIABLE --- */}
      <section id="vision-viable" className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-5 relative flex flex-col">
              <div className="absolute -inset-1 rounded-3xl bg-blue-500/10 blur-xl -z-10"></div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl h-full flex flex-col">
                <Image
                  src="/images/photo-1517245386807-bb43f82c33c4.avif"
                  alt="Planificación e Implementación Humanytek"
                  width={800}
                  height={600}
                  className="w-full h-full min-h-[380px] object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Visión Viable
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    ★
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wider uppercase">INFORMACIÓN</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      Mientras todos ofrecen herramientas nosotros ofrecemos información para implementar y aprovechar correctamente el software. <span className="text-slate-400 italic">(¿de qué sirve tener un avión si no lo puedes volar solo?)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    ★
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wider uppercase">VALOR</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      Implementamos en los lugares de su empresa en donde realmente genera valor, nos enfocamos en el problema medular, eliminando el "ruido" en su organización.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    ★
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wider uppercase">OBJETIVO</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      Implementamos la herramienta adecuándonos a los objetivos primordiales de cada empresa, con enfoque, claridad y procesos simples <span className="text-slate-400 italic">(lo sofisticado se ve bien pero tarda mucho)</span>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    ★
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wider uppercase">ARMONIZACIÓN</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      Implementamos procesos de trabajo simples y lógicos con las personas de la empresa que producen una operación más fácil, predecible y fluida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECCIÓN IMPLEMENTACIÓN EN TIEMPO RÉCORD --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Visión Viable significa implementar el ERP en su organización en un tiempo récord
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Visión Viable significa implementar el ERP en su organización en un tiempo récord que <strong className="text-white font-semibold">nadie en el mercado puede ofrecer</strong> asegurando implementar la tecnología en los lugares de su empresa en donde realmente genera valor y dando total control a su empresa de la implementación y <strong className="text-white font-semibold">además</strong> ayudarlo a <strong className="text-white font-semibold">crecer su rentabilidad financiera</strong> enfocando esfuerzos en lograr <strong className="text-white font-semibold">el máximo desempeño en su empresa</strong>.
              </p>

              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="inline-block rounded-full bg-blue-500 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 hover:scale-105 transition-all duration-200"
                >
                  Conoce más
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-3xl bg-blue-500/10 blur-xl -z-10"></div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
                <Image
                  src="/images/photo-1499750310107-5fef28a66643.avif"
                  alt="Espacio de trabajo humano y organizado Humanytek"
                  width={800}
                  height={600}
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECCIÓN PRODUCTIVIDAD Y ANALOGÍA FÓRMULA 1 --- */}
      <section className="relative py-24 px-6 lg:px-12 border-t border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
            alt="Navegación y Productividad Humanytek"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80"></div>
        </div>

        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Creer que con solo implementar un ERP es suficiente para mejorar sus resultados ...
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-slate-800 lg:pl-10">
              <p className="text-lg sm:text-xl text-blue-200 font-medium leading-relaxed">
                Es como creer que se puede participar en la Fórmula 1 solo por tener el auto de carreras.
              </p>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Permítanos explicarle todo lo que se requiere para implementar con éxito su ERP y <strong className="text-white font-semibold">VERDADERAMENTE</strong> incrementar su desempeño financiero.
              </p>

              <p className="text-sm sm:text-base text-slate-400 italic">
                Nos tomamos muy en serio el significado de la palabra «Productividad».
              </p>

              <div className="pt-4">
                <Link
                  href="/contacto"
                  className="inline-block rounded-full border border-blue-400/50 bg-blue-600/20 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200 shadow-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Conoce más
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}