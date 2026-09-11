'use client';

/**
 * Único punto del sitio que necesita ser cliente para reproducir video.
 *
 * Existe para que las páginas que sólo tenían `onContextMenu` en un <video>
 * puedan volver a ser Server Components y así exportar su propia `metadata`.
 * El costo en JS es de unos pocos bytes; antes esa única línea obligaba a
 * enviar la página entera al navegador.
 */
interface VideoPlayerProps {
  src: string;
  className?: string;
  /** Imagen mostrada antes de reproducir. Recomendado para no descargar el MP4 de entrada. */
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  controlsList?: string;
  /** 'none' evita la descarga hasta que el usuario le da play. */
  preload?: 'none' | 'metadata' | 'auto';
  /** Texto accesible del reproductor para lectores de pantalla. */
  label: string;
}

export default function VideoPlayer({
  src,
  className,
  poster,
  autoPlay = false,
  loop = false,
  controls = true,
  controlsList = 'nodownload',
  preload = 'metadata',
  label,
}: VideoPlayerProps) {
  return (
    <video
      src={src}
      className={className}
      poster={poster}
      preload={preload}
      controls={controls}
      controlsList={controlsList}
      autoPlay={autoPlay}
      loop={loop}
      muted={autoPlay}
      playsInline
      aria-label={label}
      onContextMenu={(e) => e.preventDefault()}
    >
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
