/**
 * Eventos de conversión del sitio.
 *
 * Se declaran aquí como unión de literales para que no se cuelen nombres
 * inventados: en GA4 un typo crea un evento nuevo en silencio y la métrica
 * queda partida en dos sin que nadie se entere.
 */
export type ConversionEvent =
  | 'whatsapp_click'
  | 'contacto_submit'
  | 'chatbot_lead'
  | 'caso_video_play';

type GtagFn = (
  command: 'event',
  eventName: string,
  params?: Record<string, unknown>
) => void;

/**
 * Registra un evento si gtag está cargado. Si no hay analytics configurado
 * simplemente no hace nada: nunca debe romper la interacción del usuario.
 */
export function trackEvent(
  event: ConversionEvent,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', event, {
    ...params,
    // Permite ver en GA4 desde qué página se genera cada lead.
    page_path: window.location.pathname,
  });
}
