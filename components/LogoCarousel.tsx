'use client';

import Image from 'next/image';

const LOGOS = [
  { src: '/carrusel/inoquos_logo.jpg', alt: 'Inoquos' },
  { src: '/carrusel/logo-121.png', alt: '121' },
  { src: '/carrusel/logo-aceves-spirits.png', alt: 'Aceves Spirits' },
  { src: '/carrusel/logo-afamjal.jpg', alt: 'Afamjal' },
  { src: '/carrusel/logo-agrobiz.png', alt: 'Agrobiz' },
  { src: '/carrusel/logo-borderi.jpg', alt: 'Borderi' },
  { src: '/carrusel/logo-demsa.jpg', alt: 'Demsa' },
  { src: '/carrusel/logo-empaques-nova.png', alt: 'Empaques Nova' },
  { src: '/carrusel/logo-felisa.png', alt: 'Felisa' },
  { src: '/carrusel/logo-ferremayoreo-150x150.jpg', alt: 'Ferremayoreo' },
  { src: '/carrusel/logo-huizapol.png', alt: 'Huizapol' },
  { src: '/carrusel/logo-inmeza-copia_244x.avif', alt: 'Inmeza' },
  { src: '/carrusel/logo-intarlix.jpg', alt: 'Intarlix' },
  { src: '/carrusel/logo-itc.jpg', alt: 'ITC' },
  { src: '/carrusel/logo-jacona.png', alt: 'Jacona' },
  { src: '/carrusel/logo-jaguen.jpg', alt: 'Jaguen' },
  { src: '/carrusel/logo-Joya_De_Nicaragua.png', alt: 'Joya De Nicaragua' },
  { src: '/carrusel/logo-lycan.jpg', alt: 'Lycan' },
  { src: '/carrusel/logo-marvelsa.jpg', alt: 'Marvelsa' },
  { src: '/carrusel/logo-mdhbikes.png', alt: 'MDH Bikes' },
  { src: '/carrusel/logo-melotraes.jpg', alt: 'Melotraes' },
  { src: '/carrusel/logo-noe.png', alt: 'Noe' },
  { src: '/carrusel/logo-paomx.png', alt: 'PaoMx' },
  { src: '/carrusel/logo-pare.jpg', alt: 'Pare' },
  { src: '/carrusel/logo-pp-300x150.png', alt: 'PP' },
  { src: '/carrusel/logo-requiez.png', alt: 'Requiez' },
  { src: '/carrusel/logo-teknova.jpg', alt: 'Teknova' },
  { src: '/carrusel/logo-valan.jpg', alt: 'Valan' },
  { src: '/carrusel/logo-wholies.jpg', alt: 'Wholies' },
  { src: '/carrusel/rizer_logo-300x104.jpg', alt: 'Rizer' },
];

export default function LogoCarousel() {
  return (
    <div className="w-full py-10 overflow-hidden bg-slate-950/60 border-y border-slate-800/80 relative">
      {/* Degradados laterales de transición */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit animate-carousel">
        {/* Duplicamos el array para el efecto de scroll infinito sin saltos */}
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-[160px] sm:w-[200px] h-16 sm:h-20 mx-3 sm:mx-4 shrink-0 rounded-xl bg-slate-900/40 border border-slate-800/60 p-3 opacity-60 hover:opacity-100 hover:border-cyan-500/40 transition-all duration-300 grayscale hover:grayscale-0"
          >
            <div className="relative w-full h-full">
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
          /* Duración ajustada a 75s para dar fluidez continua a los 30 logos */
          animation: carousel 75s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}