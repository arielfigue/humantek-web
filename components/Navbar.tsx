'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ID_MENU = 'menu-principal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "ERP's", href: "/erps" },
    { name: "Metodología", href: "/metodologia" },
    { name: "Casos de éxito", href: "/casos-de-exito" },
    { name: "VMI", href: "/vendor-managed-inventory" },
    { name: "Inteligencia Artificial", href: "/inteligencia-artificial" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  // Escape cierra el menú y devuelve el foco al botón, que es de donde salió.
  useEffect(() => {
    if (!isOpen) return;

    const alPresionar = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
      botonRef.current?.focus();
    };

    const alHacerClic = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener('keydown', alPresionar);
    document.addEventListener('mousedown', alHacerClic);
    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.removeEventListener('mousedown', alHacerClic);
    };
  }, [isOpen]);

  return (
    // Navbar principal también ligeramente más transparente y con menos blur
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-slate-800/50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
            <div className="relative h-10 w-36">
              <Image
                src="/cropped-Logo-Humanytek-Cool-5-153x53.png"
                alt="Humanytek Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Botón único de 3 rayas horizontales */}
          <button
            ref={botonRef}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            // focus:outline-none sin reemplazo dejaba a quien navega con teclado
            // sin ninguna pista de dónde está parado.
            className="inline-flex items-center justify-center p-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-200 border border-slate-800/40"
            aria-expanded={isOpen}
            aria-controls={ID_MENU}
            aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          >
            <svg className="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Menú desplegable: Fondo muy sutil (20%) y blur medio */}
      <div
        id={ID_MENU}
        className={`grid transition-all duration-500 ease-in-out border-b bg-slate-950/20 backdrop-blur-md shadow-2xl ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 border-slate-800/30'
            : 'grid-rows-[0fr] opacity-0 border-transparent'
        }`}
      >
        {/* `inert` saca del árbol de accesibilidad y del orden de tabulación todo
            lo que hay dentro cuando el menú está colapsado. Antes los ocho
            enlaces seguían siendo enfocables aunque midieran cero de alto: con
            Tab se atravesaba un menú invisible. */}
        <div className="overflow-hidden" inert={!isOpen}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  // Tarjetas con un leve tinte blanco (5%) para asemejar cristal esmerilado
                  className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-200 group flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                >
                  <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {link.name}
                  </span>
                  <span className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}