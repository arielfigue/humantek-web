'use client';

import { useState } from 'react';
import Image from 'next/image';
import { mediaUrl } from '@/lib/media';

/**
 * Reproductor de video del sitio.
 *
 * Existe por dos razones:
 *
 * 1. Encapsula el `onContextMenu`, que era lo único que obligaba a varias
 *    páginas a ser Client Components y por tanto les impedía exportar metadata.
 * 2. Por defecto NO descarga el MP4. Pinta el poster (unos 40 KB) y monta el
 *    <video> al primer clic. Antes, entrar a /nosotros disparaba la descarga de
 *    un archivo de 28 MB que la mayoría de las visitas nunca llega a ver.
 *
 * `autoPlay` sigue disponible para el video ambiental del hero, donde el
 * movimiento es parte del diseño; ahí sí se descarga al cargar la página.
 */
interface VideoPlayerProps {
  /** Ruta desde la raíz, p. ej. '/vmi.mp4'. mediaUrl() le antepone el CDN si está configurado. */
  src: string;
  /** Imagen del primer fotograma. Sin ella no hay click-to-play posible. */
  poster?: string;
  className?: string;
  /** Reproduce al cargar (silenciado). Úsalo sólo para video decorativo. */
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  controlsList?: string;
  /** Texto accesible del reproductor. */
  label: string;
}

export default function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  controls = true,
  controlsList = 'nodownload',
  label,
}: VideoPlayerProps) {
  // Sin autoPlay esperamos al clic del usuario antes de tocar la red.
  const [iniciado, setIniciado] = useState(false);

  if (!autoPlay && poster && !iniciado) {
    return (
      <button
        type="button"
        onClick={() => setIniciado(true)}
        aria-label={`Reproducir: ${label}`}
        className={`group relative block w-full h-full cursor-pointer overflow-hidden ${className ?? ''}`}
      >
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-slate-950/25 transition-colors duration-300 group-hover:bg-slate-950/5" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/90 shadow-2xl ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-500">
            <svg className="ml-1 h-7 w-7 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <video
      src={mediaUrl(src)}
      poster={poster}
      className={className}
      // 'none' cubre el caso sin poster: no se descarga hasta darle play.
      preload={autoPlay || iniciado ? 'auto' : 'none'}
      // Si llegó por clic, el usuario ya pidió verlo: arranca y con sonido.
      autoPlay={autoPlay || iniciado}
      muted={autoPlay}
      loop={loop}
      controls={controls}
      controlsList={controlsList}
      playsInline
      aria-label={label}
      onContextMenu={(e) => e.preventDefault()}
    >
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
