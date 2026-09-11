'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Turnstile de Cloudflare, con render explícito.
 *
 * El script solo se descarga cuando el usuario abre el formulario de contacto:
 * no tiene sentido cargarlo en cada visita a la página.
 *
 * Nota: el widget anterior vivía dentro de un Shadow DOM y Turnstile no lo
 * soporta, así que tenía que montar el contenedor fuera y proyectarlo con un
 * `<slot name="ts">`. Al salir del Shadow DOM ese rodeo desaparece.
 */
interface ApiTurnstile {
  render: (el: HTMLElement, opciones: Record<string, unknown>) => string;
  getResponse: (id: string) => string | undefined;
  reset: (id: string) => void;
}

const ID_SCRIPT = 'cf-turnstile-api';
const SRC_SCRIPT =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function api(): ApiTurnstile | undefined {
  return (globalThis as { turnstile?: ApiTurnstile }).turnstile;
}

export function useTurnstile(siteKey: string, activo: boolean) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activo || !siteKey) return;

    let cancelado = false;

    const montar = () => {
      if (cancelado || widgetIdRef.current !== null) return;
      const turnstile = api();
      const contenedor = contenedorRef.current;
      if (!turnstile || !contenedor) return;

      widgetIdRef.current = turnstile.render(contenedor, {
        sitekey: siteKey,
        theme: 'dark',
        'error-callback': (codigo: string) => {
          console.error('turnstile_render_error', codigo);
          setError(`No cargó la verificación de seguridad (${codigo}).`);
          return true; // ya lo manejamos: que no lance excepción
        },
      });
    };

    if (api()) {
      montar();
      return () => {
        cancelado = true;
      };
    }

    const existente = document.getElementById(ID_SCRIPT);
    if (existente) {
      existente.addEventListener('load', montar);
      return () => {
        cancelado = true;
        existente.removeEventListener('load', montar);
      };
    }

    const script = document.createElement('script');
    script.id = ID_SCRIPT;
    script.src = SRC_SCRIPT;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', montar);
    document.head.appendChild(script);

    return () => {
      cancelado = true;
      script.removeEventListener('load', montar);
    };
  }, [activo, siteKey]);

  const obtenerToken = useCallback((): string => {
    const turnstile = api();
    if (!turnstile || widgetIdRef.current === null) return '';
    return turnstile.getResponse(widgetIdRef.current) ?? '';
  }, []);

  const reiniciar = useCallback(() => {
    const turnstile = api();
    if (turnstile && widgetIdRef.current !== null) {
      turnstile.reset(widgetIdRef.current);
    }
  }, []);

  return { contenedorRef, obtenerToken, reiniciar, error };
}
