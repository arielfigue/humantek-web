'use client';

import Image from 'next/image';

// Sustituye estos nombres por los archivos reales que tienes en public/carrusel/
const LOGOS = [
  { src: '/carrusel/odoo-logo.png', alt: 'Odoo' },
  { src: '/carrusel/sap-logo.png', alt: 'SAP' },
  { src: '/carrusel/logo3.png', alt: 'Empresa 3' },
  { src: '/carrusel/logo4.png', alt: 'Empresa 4' },
  { src: '/carrusel/logo5.png', alt: 'Empresa 5' },
  { src: '/carrusel/logo6.png', alt: 'Empresa 6' },
];

export default function LogoCarousel() {
  return (
    <div className="w-full py-12 overflow-hidden bg-slate-950/50 border-y border-slate-800/80 relative">
      {/* Sombras en los bordes para dar efecto de desvanecimiento */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-fit animate-carousel">
        {/* Renderizamos la lista dos veces para crear el bucle infinito visualmente */}
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-[150px] sm:w-[200px] md:w-[250px] mx-4 sm:mx-8 shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
          >
            <div className="relative w-full h-12 sm:h-16">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Animación personalizada inyectada directamente */}
      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}