'use client';

import Image from 'next/image';

const LOGOS = [
  { src: '/logos/inoquos_logo.jpg', alt: 'Inoquos' },
  { src: '/logos/logo-121.png', alt: '121' },
  { src: '/logos/logo-aceves-spirits.png', alt: 'Aceves Spirits' },
  { src: '/logos/logo-afamjal.jpg', alt: 'Afamjal' },
  { src: '/logos/logo-agrobiz.png', alt: 'Agrobiz' },
  { src: '/logos/logo-borderi.jpg', alt: 'Borderi' },
  { src: '/logos/logo-demsa.jpg', alt: 'Demsa' },
  { src: '/logos/logo-empaques-nova.png', alt: 'Empaques Nova' },
  { src: '/logos/logo-felisa.png', alt: 'Felisa' },
  { src: '/logos/logo-ferremayoreo-150x150.jpg', alt: 'Ferremayoreo' },
  { src: '/logos/logo-huizapol.png', alt: 'Huizapol' },
  { src: '/logos/logo-inmeza-copia_244x.avif', alt: 'Inmeza' },
  { src: '/logos/logo-intarlix.jpg', alt: 'Intarlix' },
  { src: '/logos/logo-itc.jpg', alt: 'ITC' },
  { src: '/logos/logo-jacona.png', alt: 'Jacona' },
  { src: '/logos/logo-jaguen.jpg', alt: 'Jaguen' },
  { src: '/logos/logo-Joya_De_Nicaragua.png', alt: 'Joya De Nicaragua' },
  { src: '/logos/logo-lycan.jpg', alt: 'Lycan' },
  { src: '/logos/logo-marvelsa.jpg', alt: 'Marvelsa' },
  { src: '/logos/logo-mdhbikes.png', alt: 'MDH Bikes' },
  { src: '/logos/logo-melotraes.jpg', alt: 'Melotraes' },
  { src: '/logos/logo-noe.png', alt: 'Noe' },
  { src: '/logos/logo-paomx.png', alt: 'PaoMx' },
  { src: '/logos/logo-interjoya.jpg', alt: 'Interjoya' },
  { src: '/logos/logo-pare.jpg', alt: 'Pare' },
  { src: '/logos/logo-pp-300x150.png', alt: 'PP' },
  { src: '/logos/logo-requiez.png', alt: 'Requiez' },
  { src: '/logos/logo-teknova.jpg', alt: 'Teknova' },
  { src: '/logos/logo-valan.jpg', alt: 'Valan' },
  { src: '/logos/logo-wholies.jpg', alt: 'Wholies' },
  { src: '/logos/rizer_logo-300x104.jpg', alt: 'Rizer' },
  { src: '/logos/logo-elja.png', alt: 'Elja' },
];

export default function LogoCarousel() {
  return (
    <div className="w-full py-10 overflow-hidden bg-slate-950/60 border-y border-slate-800/80 relative">
      {/* Degradados laterales de transición */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit animate-carousel">
        {/* Duplicamos el array para el efecto de scroll infinito sin saltos.
            La segunda copia es puramente visual: aria-hidden evita que el
            lector de pantalla lea 60 logos en vez de 30. */}
        {[...LOGOS, ...LOGOS].map((logo, index) => {
          const esCopia = index >= LOGOS.length;

          return (
            <div
              key={index}
              aria-hidden={esCopia || undefined}
              className="flex items-center justify-center w-[160px] sm:w-[200px] h-16 sm:h-20 mx-3 sm:mx-4 shrink-0 rounded-xl bg-slate-900/40 border border-slate-800/60 p-3 opacity-60 hover:opacity-100 hover:border-cyan-500/40 transition-all duration-300 grayscale hover:grayscale-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={esCopia ? '' : logo.alt}
                  fill
                  // Sin `sizes`, next/image asume ancho completo de viewport y
                  // sirve una variante enorme para una caja de 200px.
                  sizes="200px"
                  quality={70}
                  loading="lazy"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
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
        /* El movimiento perpetuo marea a quien tiene sensibilidad vestibular. */
        @media (prefers-reduced-motion: reduce) {
          .animate-carousel {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}