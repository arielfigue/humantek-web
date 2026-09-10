'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "ERP's", href: "#erps" },
    { name: "Casos de éxito", href: "#casos-de-exito" },
    { name: "Metodología", href: "#metodologia" },
    { name: "Industria 4.0", href: "#industria-40" },
    { name: "VMI", href: "#vmi" },
    { name: "Inteligencia Artificial", href: "#inteligencia-artificial" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="z-50 relative" onClick={() => setIsOpen(false)}>
            <span className="text-2xl font-black text-blue-600 tracking-tighter">Humanytek.</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none group"
            aria-label="Alternar menú"
          >
            <span className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-out ${isOpen ? 'translate-y-2 rotate-45' : 'group-hover:w-8'}`} />
            <span className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-out ${isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
            <span className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-out ${isOpen ? '-translate-y-2 -rotate-45' : 'group-hover:w-6'}`} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col space-y-3 sm:space-y-4 text-center w-full px-6 max-h-screen overflow-y-auto py-24">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
              style={{ transitionDelay: isOpen ? `${index * 30}ms` : '0ms' }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}