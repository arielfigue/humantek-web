/**
 * Resolución de URLs de video.
 *
 * Los MP4 viven hoy en /public, que Vercel sirve desde su CDN pero sin
 * streaming adaptativo: el navegador descarga el archivo completo.
 *
 * Definiendo `NEXT_PUBLIC_MEDIA_BASE` (por ejemplo el dominio de un bucket R2
 * o de Cloudflare Stream) los videos salen del repositorio y del bundle de
 * despliegue sin tocar una sola línea de los componentes.
 */
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? '').replace(/\/$/, '');

export function mediaUrl(path: string): string {
  return MEDIA_BASE ? `${MEDIA_BASE}${path}` : path;
}
