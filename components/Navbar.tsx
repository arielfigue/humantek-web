'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "ERP's", href: "/erps" },
    { name: "Metodología", href: "/metodologia" },
    { name: "Casos de éxito", href: "/casos-de-exito" },
    { name: "Industria 4.0", href: "/#industria-40" },
    { name: "VMI", href: "/vendor-managed-inventory" },
    { name: "Inteligencia Artificial", href: "/inteligencia-artificial" },
    { name: "Nosotros", href: "/#nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Botón Hamburguesa Móvil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-6 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-cyan-400 py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}