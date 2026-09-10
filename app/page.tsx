import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center sm:py-40 lg:px-8 overflow-hidden">
        
        {/* Fondo decorativo sutil (Gradiente borroso) */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-blue-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Etiqueta superior opcional (Badge) */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all">
              Preparando la nueva versión de Humanytek.{' '}
              <span className="font-semibold text-blue-600">
                Próximamente
              </span>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Tecnología que impulsa el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">potencial humano</span>
          </h1>
          
          {/* Propuesta de valor (Subtítulo) */}
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Modernizamos tu empresa con soluciones digitales a la medida. 
            Desarrollo de software, automatización y diseño enfocado en escalar el crecimiento de tu negocio.
          </p>
          
          {/* Botones de acción */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contacto"
              className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:scale-105 transition-all duration-200"
            >
              Contáctanos
            </Link>
            <Link
              href="#servicios"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              Ver servicios <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Aquí abajo agregaremos las siguientes secciones después */}
    </main>
  );
}