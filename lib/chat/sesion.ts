import { CHAT } from './config';

/** El Worker rechaza cualquier sessionId que no sea UUID v4 (`isUuid`). */
export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/**
 * Id de sesión estable mientras dure la pestaña. Es lo que permite que el
 * Worker recupere el historial y que el lead se envíe con la conversación
 * completa adjunta.
 *
 * Solo debe llamarse desde el navegador: sessionStorage no existe en el
 * servidor, y generar el id durante el render provocaría un desajuste de
 * hidratación.
 */
export function obtenerSessionId(): string {
  try {
    const guardado = sessionStorage.getItem(CHAT.claveSesion);
    if (guardado) return guardado;
    const nuevo = uuid();
    sessionStorage.setItem(CHAT.claveSesion, nuevo);
    return nuevo;
  } catch {
    // Modo privado o cookies bloqueadas: la conversación no persiste, pero funciona.
    return uuid();
  }
}
