'use client';

import { useState } from 'react';

/**
 * Fachada de YouTube.
 *
 * Un <iframe> de YouTube arrastra ~1 MB de JS de terceros y varias conexiones
 * antes de que el usuario decida ver algo. En /casos-de-exito había 21 iframes
 * montados a la vez: ~20 MB y decenas de peticiones a dominios externos en la
 * carga inicial.
 *
 * Aquí sólo se pinta la miniatura (una imagen de ~15 KB). El iframe se inserta
 * al primer clic, ya con autoplay, de modo que el usuario ve el video igual
 * pero paga el costo únicamente si lo quiere.
 */
interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
  /** `true` sólo para el primero de la lista: precarga su miniatura. */
  priority?: boolean;
}

export default function YouTubeFacade({
  videoId,
  title,
  className = '',
  priority = false,
}: YouTubeFacadeProps) {
  const [activo, setActivo] = useState(false);

  if (activo) {
    return (
      <iframe
        className={`w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivo(true)}
      aria-label={`Reproducir video: ${title}`}
      className={`group relative block w-full h-full cursor-pointer overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element --
          Deliberado: la miniatura de YouTube ya viene optimizada (~15 KB) desde
          el CDN de Google. Pasarla por next/image añadiría un salto extra y
          consumiría cuota de optimización de imágenes en Vercel, 21 veces por
          visita a esta página, sin ganar un solo byte. */}
      <img
        // hqdefault existe siempre; maxresdefault falla en videos antiguos y
        // deja un hueco gris sin aviso.
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        width={480}
        height={360}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <span className="absolute inset-0 bg-slate-950/30 transition-colors duration-300 group-hover:bg-slate-950/10" />

      {/* Botón de play */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
          <svg className="ml-1 h-7 w-7 fill-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
