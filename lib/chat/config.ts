/**
 * Configuración del chat.
 *
 * Antes vivía duplicada en dos lugares: los defaults de `widget.js` en el
 * Worker y una copia desactualizada dentro de la página de IA. Ahora el sitio
 * lee de aquí y el Worker se limita a ser API.
 *
 * `maxCaracteres` debe coincidir con MAX_MESSAGE_CHARS del Worker (1500): si el
 * cliente permite más, el servidor responde 413 y el usuario pierde lo escrito.
 */
export const CHAT = {
  endpoint: (
    process.env.NEXT_PUBLIC_CHAT_ENDPOINT ??
    'https://humanytek-chatbot.humanytek.workers.dev'
  ).replace(/\/$/, ''),

  // Site key de Turnstile: es pública por diseño (el secreto vive en el Worker).
  turnstileSiteKey:
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAAEqp0RP72xq6_sAO',

  titulo: 'HumanyTek-IA',
  saludo:
    'Soy el asistente automático de HumanyTek, te puedo asesorar bastante bien',
  placeholder: 'Charlemos...',
  maxCaracteres: 1500,
  etiquetaLead: 'Contáctenme',
  urlPrivacidad: '/aviso-de-privacidad',

  /** Clave de sessionStorage. El Worker usa este id para hilar la conversación en KV. */
  claveSesion: 'hty_chat_sid',
} as const;
