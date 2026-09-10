import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "ERP's", href: "/erps" },
    { name: "Metodología", href: "/metodologia" },
    { name: "Casos de éxito", href: "/casos-de-exito" },
    { name: "Industria 4.0", href: "/#industria-40" },
    { name: "Nosotros", href: "/#nosotros" },
    { name: "Contacto", href: "/contacto" },
    { name: "Aviso de privacidad", href: "/aviso-de-privacidad" },
  ];

  return (
    <footer className="sticky bottom-0 w-full z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-300 shadow-2xl">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        
        {/* Fila superior: Descripción e iconos */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-3">
          <div className="max-w-3xl space-y-1 text-xs leading-relaxed text-slate-400">
            <p>
              Lo que nos destaca no es el software sino el proceso enfocado en las personas que tendrán que aprovecharlo, nuestra metodología está totalmente centrada en el usuario. De nada sirve conocer o programar funcionalidad en un software si no logras que las personas que lo tienen que saber usar lo puedan aprovechar al máximo y como la empresa lo necesita.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@humanytek"
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
              href="https://www.linkedin.com/company/humanytek/?viewAsMember=true"
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

        {/* Fila inferior: Menú horizontal */}
        <div className="pt-3 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs">
          {menuItems.map((item, index) => (
            <div key={item.name} className="flex items-center gap-x-3">
              <Link href={item.href} className="hover:text-blue-400 transition-colors">
                {item.name}
              </Link>
              {index < menuItems.length - 1 && (
                <span className="text-slate-600 select-none">-</span>
              )}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-2 text-center text-[10px] text-slate-500">
          Copyright © {currentYear} Humanytek
        </div>
      </div>
    </footer>
  );
}