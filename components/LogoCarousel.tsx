'use client';

import Image from 'next/image';
import Link from 'next/link';

const LOGOS = [
  { src: '/logos/inoquos_logo.jpg',              alt: 'Inoquos' },
  { src: '/logos/logo-121.png',                  alt: '121' },  // caso
  { src: '/logos/logo-afamjal.jpg',              alt: 'Afamjal' },
  { src: '/logos/logo-aceves-spirits.png',       alt: 'Aceves Spirits' },  // caso
  { src: '/logos/logo-shimano.png',              alt: 'Shimano' },
  { src: '/logos/logo-demsa.jpg',                alt: 'Demsa' },  // caso
  { src: '/logos/logo-agrobiz.png',              alt: 'Agrobiz' },
  { src: '/logos/logo-empaques-nova.png',        alt: 'Empaques Nova' },  // caso
  { src: '/logos/logo-borderi.jpg',              alt: 'Borderi' },
  { src: '/logos/logo-felisa.png',               alt: 'Felisa' },  // caso
  { src: '/logos/logo-agrobolder.jpg',           alt: 'AgroBolder' },
  { src: '/logos/logo-ferremayoreo-150x150.jpg', alt: 'Ferremayoreo' },  // caso
  { src: '/logos/logo-axtech.png',               alt: 'AXTech' },
  { src: '/logos/logo-inmeza-copia_244x.avif',   alt: 'Inmeza' },  // caso
  { src: '/logos/logo-huizapol.png',             alt: 'Huizapol' },
  { src: '/logos/logo-intarlix.jpg',             alt: 'Intarlix' },  // caso
  { src: '/logos/logo-quipron.jpg',              alt: 'Quipron' },
  { src: '/logos/logo-itc.jpg',                  alt: 'ITC' },  // caso
  { src: '/logos/logo-jaguen.jpg',               alt: 'Jaguen' },
  { src: '/logos/logo-jacona.png',               alt: 'Jacona' },  // caso
  { src: '/logos/logo-Joya_De_Nicaragua.png',    alt: 'Joya De Nicaragua' },
  { src: '/logos/logo-lycan.jpg',                alt: 'Lycan' },  // caso
  { src: '/logos/logo-scott.jpg',                alt: 'Scott' },
  { src: '/logos/logo-marvelsa.jpg',             alt: 'Marvelsa' },  // caso
  { src: '/logos/logo-interjoya.jpg',            alt: 'Interjoya' },
  { src: '/logos/logo-mdhbikes.png',             alt: 'MDH Bikes' },  // caso
  { src: '/logos/logo-melotraes.jpg',            alt: 'Melotraes' },
  { src: '/logos/logo-noe.png',                  alt: 'Noe' },  // caso
  { src: '/logos/logo-paomx.png',                alt: 'PaoMx' },  // caso
  { src: '/logos/logo-pare.jpg',                 alt: 'Pare' },
  { src: '/logos/logo-pp-300x150.png',           alt: 'Pollo Pepe' },  // caso
  { src: '/logos/logo-elja.png',                 alt: 'Elja' },
  { src: '/logos/logo-requiez.png',              alt: 'Requiez' },  // caso
  { src: '/logos/logo-teknova.jpg',              alt: 'Teknova' },
  { src: '/logos/logo-wholies.jpg',              alt: 'Wholies' },  // caso
  { src: '/logos/logo-valan.jpg',                alt: 'Valan' },
  { src: '/logos/rizer_logo-300x104.jpg',        alt: 'Rizer' },  // caso
];

/** logoUrl -> caso publicado. Lo arma la home desde el CSV (ver lib/casos.ts). */
interface LogoCarouselProps {
  casos?: Record<string, { id: string; title: string }>;
}

export default function LogoCarousel({ casos = {} }: LogoCarouselProps) {
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
          const caso = casos[logo.src];

          const imagen = (
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
                className={
                  caso
                    ? 'object-contain'
                    : 'object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100'
                }
              />
            </div>
          );

          const caja =
            'group relative flex items-center justify-center w-[160px] sm:w-[200px] h-16 sm:h-20 mx-3 sm:mx-4 shrink-0 rounded-xl p-3 transition-all duration-300';

          // Con caso publicado: a color, con marco encendido y enlace al caso.
          if (caso) {
            return (
              <Link
                key={index}
                href={`/casos-de-exito#caso-${caso.id}`}
                // La copia duplicada existe solo para el bucle visual: sin esto
                // el teclado recorrería 19 enlaces repetidos.
                tabIndex={esCopia ? -1 : undefined}
                aria-hidden={esCopia || undefined}
                aria-label={`Ver el caso de éxito de ${logo.alt}`}
                className={`${caja} border border-cyan-500/40 bg-cyan-500/[0.07] shadow-[0_0_18px_rgba(34,211,238,0.10)] hover:border-cyan-400/80 hover:bg-cyan-500/15 hover:shadow-[0_0_26px_rgba(34,211,238,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
              >
                {imagen}
                {/* Aparece al pasar el cursor, momento en que el carrusel ya
                    está pausado y la etiqueta se puede leer. */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-slate-950/85 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-cyan-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Ver caso →
                </span>
              </Link>
            );
          }

          // Sin caso: exactamente como estaba antes.
          return (
            <div
              key={index}
              aria-hidden={esCopia || undefined}
              className={`${caja} bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/40`}
            >
              {imagen}
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
        .animate-carousel:hover,
        .animate-carousel:focus-within,
        .animate-carousel:active {
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