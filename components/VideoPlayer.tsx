'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { mediaUrl } from '@/lib/media';

/**
 * Reproductor de video del sitio. Dos modos, según se pase `autoPlay`:
 *
 * 1. Sin autoPlay (predeterminado): pinta el poster y NO toca la red hasta que
 *    el usuario hace clic. Es lo correcto para videos largos como el
 *    institucional, que la mayoría de las visitas nunca llega a ver.
 *
 * 2. Con autoPlay: arranca solo, silenciado y en bucle, como fondo vivo de la
 *    sección. Pero no al cargar la página: espera a que el video entre en
 *    pantalla. En una página con dos videos eso evita que ambos se descarguen a
 *    la vez peleándose el ancho de banda, y en móvil, donde se apilan, el
 *    segundo no se descarga hasta que alguien baja a verlo.
 *
 * En ambos modos el archivo lleva `preload="none"`: nada se descarga por
 * adelantado. El poster cubre el hueco.
 */
interface VideoPlayerProps {
  /** Ruta desde la raíz, p. ej. '/vmi.mp4'. mediaUrl() le antepone el CDN si está configurado. */
  src: string;
  /** Imagen del primer fotograma. Necesaria para el click-to-play y para que el autoplay no muestre un hueco negro. */
  poster?: string;
  className?: string;
  /** Arranca solo, silenciado, cuando el video entra en pantalla. */
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
  // Con autoPlay esperamos a que el video entre en pantalla.
  const [enPantalla, setEnPantalla] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const nodo = videoRef.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setEnPantalla(true);
        observador.unobserve(nodo);
      },
      // Margen generoso: empieza a cargar un poco antes de asomarse, para que
      // al llegar ya esté reproduciendo en vez de arrancar en ese instante.
      { rootMargin: '300px' }
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [autoPlay]);

  useEffect(() => {
    if (!enPantalla) return;
    const nodo = videoRef.current;
    if (!nodo) return;

    // Silenciar ANTES de llamar a play() es lo que permite que el navegador
    // deje arrancar el video sin interacción del usuario. No se vuelve a tocar
    // después: si el visitante sube el volumen con los controles, se queda así.
    nodo.muted = true;
    nodo.play().catch(() => {
      // Algunos navegadores o el modo de ahorro de batería bloquean el
      // arranque automático. No es un fallo: quedan el poster y los controles.
    });
  }, [enPantalla]);

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

  // El `src` se monta solo cuando toca: por clic, o al entrar en pantalla.
  const listoParaCargar = autoPlay ? enPantalla : true;

  return (
    <video
      ref={videoRef}
      src={listoParaCargar ? mediaUrl(src) : undefined}
      poster={poster}
      className={className}
      preload="none"
      muted={autoPlay}
      // Si llegó por clic, el usuario ya pidió verlo: arranca y con sonido.
      autoPlay={!autoPlay && iniciado}
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
