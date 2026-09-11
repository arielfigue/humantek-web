import type { NextConfig } from 'next';

/**
 * Orígenes externos que el sitio necesita. Se listan aquí para que la política
 * de seguridad de contenido sea legible y para que agregar un servicio nuevo
 * sea evidente en el diff.
 */
const ORIGENES = {
  chatbot: 'https://humanytek-chatbot.humanytek.workers.dev',
  formulario: 'https://humanytek-contacto.humanytek.workers.dev',
  turnstile: 'https://challenges.cloudflare.com',
  youtube: 'https://www.youtube-nocookie.com https://www.youtube.com',
  miniaturas: 'https://i.ytimg.com',
  maps: 'https://www.google.com https://maps.googleapis.com https://maps.gstatic.com',
  analytics: 'https://www.googletagmanager.com',
  analyticsDatos: 'https://www.google-analytics.com https://*.analytics.google.com',
};

/**
 * CSP en modo Report-Only.
 *
 * Report-Only NO bloquea nada: solo reporta las violaciones en la consola del
 * navegador. Se publica así a propósito, porque una política mal enumerada
 * rompería el chat, los videos o el mapa en silencio.
 *
 * Cómo pasarlo a modo bloqueante: navegar el sitio completo (home, contacto,
 * casos de éxito, el chat con un mensaje enviado y un lead), revisar que la
 * consola no reporte violaciones, y entonces cambiar la clave del header a
 * 'Content-Security-Policy'.
 *
 * 'unsafe-inline' en script-src es necesario mientras Next no use nonces para
 * sus scripts de arranque; quitarlo requiere migrar a middleware con nonce.
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${ORIGENES.turnstile} ${ORIGENES.analytics}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${ORIGENES.miniaturas} ${ORIGENES.maps} ${ORIGENES.analyticsDatos}`,
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self' ${ORIGENES.chatbot} ${ORIGENES.turnstile} ${ORIGENES.analyticsDatos}`,
  `frame-src ${ORIGENES.youtube} ${ORIGENES.maps} ${ORIGENES.formulario} ${ORIGENES.turnstile}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const CABECERAS_SEGURIDAD = [
  {
    // Dos años, con precarga. Solo tiene sentido si el sitio ya sirve todo por
    // HTTPS, que es el caso en Vercel.
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Impide que el navegador adivine el tipo de un archivo e interprete como
    // script algo que se sirvió como texto.
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Nadie puede meter humanytek.com dentro de un iframe ajeno (clickjacking).
    // No afecta a los iframes que el sitio inserta: esto regula lo contrario.
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    // Al salir del sitio se envía el origen, no la URL completa.
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // El sitio no usa cámara, micrófono ni ubicación: se declaran apagados.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: CSP,
  },
];

const nextConfig: NextConfig = {
  // Deja de anunciar en cada respuesta que el sitio corre Next.js.
  poweredByHeader: false,

  images: {
    // AVIF primero: pesa ~20% menos que WebP, y los navegadores que no lo
    // soportan reciben WebP automáticamente.
    formats: ['image/avif', 'image/webp'],
    // Los logos se pintan en cajas de ~200px; no hace falta generar variantes
    // gigantes que nadie descarga.
    imageSizes: [16, 32, 64, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: CABECERAS_SEGURIDAD,
      },
      {
        // Video, posters y logos cambian muy rara vez. Sin `immutable` a
        // propósito: estos archivos no llevan hash en el nombre, así que
        // reemplazar uno debe surtir efecto en horas, no en un año.
        source: '/:path*.(mp4|webm|jpg|jpeg|png|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
