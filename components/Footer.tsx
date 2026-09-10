import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* COLUMNA 1: Descripción institucional */}
          <div className="md:col-span-2 space-y-3 text-xs leading-relaxed text-slate-400">
            <p>
              Lo que nos destaca no es el software sino el proceso enfocado en las personas que tendrán que aprovecharlo, nuestra metodología está totalmente centrada en el usuario.
            </p>
            <p>
              De nada sirve conocer un software si no logras que las personas que lo tienen que saber usar lo puedan aprovechar al máximo y como la empresa lo necesita.
            </p>
          </div>

          {/* COLUMNA 2: Menú principal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Menu</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
              <li><Link href="#erps" className="hover:text-blue-400 transition-colors">ERP's</Link></li>
              <li><Link href="#metodologia" className="hover:text-blue-400 transition-colors">Metodología</Link></li>
              <li><Link href="#casos-de-exito" className="hover:text-blue-400 transition-colors">Casos de éxito</Link></li>
              <li><Link href="#industria-40" className="hover:text-blue-400 transition-colors">Industria 4.0</Link></li>
              <li><Link href="#nosotros" className="hover:text-blue-400 transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
              <li><Link href="/aviso-de-privacidad" className="hover:text-blue-400 transition-colors">Aviso de privacidad</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Redes Sociales */}
          <div className="flex items-start md:justify-end">
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT DINÁMICO */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        Copyright © {currentYear} Humanytek
      </div>
    </footer>
  );
}