/**
 * Validación del formulario de lead.
 *
 * Es un espejo deliberado de `handleLead` en el Worker (`looksLikeEmail`,
 * `looksLikePhone`, y los cuatro campos obligatorios). El cliente existe para
 * dar respuesta inmediata; el servidor es el que manda. Nunca solo uno.
 *
 * La copia anterior en la página de IA solo exigía nombre y correo, así que un
 * visitante que dejaba empresa o teléfono vacíos pasaba la validación local y
 * se estrellaba contra un 400 del Worker. Si un día cambian las reglas allá,
 * hay que cambiarlas aquí.
 */

export type CampoLead = 'nombre' | 'empresa' | 'correo' | 'telefono';

export interface DatosLead {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
}

export interface ErrorLead {
  campo: CampoLead;
  mensaje: string;
}

const RE_CORREO =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export function correoValido(valor: string): boolean {
  return RE_CORREO.test(valor) && !valor.includes('..') && valor.length <= 100;
}

export function telefonoValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '');
  if (digitos.length < 10 || digitos.length > 15) return false;
  // Rechaza 1111111111 y secuencias tipo 1234567890.
  if (/^(\d)\1+$/.test(digitos)) return false;
  if (/^0?1?234567/.test(digitos)) return false;
  return true;
}

/** Devuelve el primer error encontrado, o null si todo está bien. */
export function validarLead(datos: DatosLead): ErrorLead | null {
  if (!datos.nombre || datos.nombre.length < 2) {
    return { campo: 'nombre', mensaje: 'Escribe tu nombre.' };
  }
  if (!datos.empresa) {
    return { campo: 'empresa', mensaje: 'Escribe el nombre de tu empresa.' };
  }
  if (!correoValido(datos.correo)) {
    return {
      campo: 'correo',
      mensaje: 'Revisa el correo: debe tener el formato nombre@dominio.com',
    };
  }
  if (!telefonoValido(datos.telefono)) {
    return {
      campo: 'telefono',
      mensaje: 'Escribe un teléfono válido: 10 dígitos (o con lada internacional).',
    };
  }
  return null;
}
