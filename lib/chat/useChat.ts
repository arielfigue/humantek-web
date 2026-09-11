'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAT } from './config';
import { obtenerSessionId, uuid } from './sesion';

export type RolMensaje = 'usuario' | 'bot' | 'error';

export interface Mensaje {
  id: string;
  rol: RolMensaje;
  texto: string;
}

/**
 * Toda la lógica de conversación del chat.
 *
 * Reemplaza las ~350 líneas imperativas que vivían dentro de un useEffect en
 * la página de IA. El comportamiento que se conserva a propósito:
 *
 * - Parseo de SSE por bloques `data: {...}\n\n`, con `[DONE]` como terminador.
 * - Animación de escritura: el stream llega en ráfagas de 20-100 caracteres;
 *   en vez de volcarlas de golpe se revelan poco a poco, acelerando cuando hay
 *   rezago, para que nunca se quede atrás pero tampoco dé brincos.
 * - En caso de error, la burbuja a medio escribir se descarta y se muestra el
 *   mensaje del servidor.
 */
export function useChat() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 'saludo', rol: 'bot', texto: CHAT.saludo },
  ]);
  const [ocupado, setOcupado] = useState(false);

  const frameRef = useRef<number | null>(null);
  const abortoRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      abortoRef.current?.abort();
    };
  }, []);

  /** Añade una burbuja del bot sin pasar por el servidor (confirmaciones, avisos). */
  const agregarBot = useCallback((texto: string) => {
    setMensajes((prev) => [...prev, { id: uuid(), rol: 'bot', texto }]);
  }, []);

  const enviar = useCallback(
    async (entrada: string) => {
      const texto = entrada.trim();
      if (!texto || ocupado) return;

      setOcupado(true);

      const idBot = uuid();
      setMensajes((prev) => [
        ...prev,
        { id: uuid(), rol: 'usuario', texto },
        // Texto vacío = la vista pinta los tres puntos de "escribiendo".
        { id: idBot, rol: 'bot', texto: '' },
      ]);

      let completo = ''; // texto ya recibido del stream
      let mostrados = 0; // caracteres pintados en pantalla
      let cerrado = false;
      let animando = false;

      const escribir = () => {
        if (mostrados < completo.length) {
          mostrados += Math.max(1, Math.ceil((completo.length - mostrados) / 14));
          const parcial = completo.slice(0, mostrados);
          setMensajes((prev) =>
            prev.map((m) => (m.id === idBot ? { ...m, texto: parcial } : m))
          );
        }
        if (!cerrado || mostrados < completo.length) {
          frameRef.current = requestAnimationFrame(escribir);
        } else {
          animando = false;
        }
      };

      const arrancarEscritura = () => {
        if (animando) return;
        animando = true;
        frameRef.current = requestAnimationFrame(escribir);
      };

      const control = new AbortController();
      abortoRef.current = control;

      try {
        const res = await fetch(`${CHAT.endpoint}/api/chat`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            sessionId: obtenerSessionId(),
            message: texto,
          }),
          signal: control.signal,
        });

        if (!res.ok || !res.body) {
          const info = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(info.error || 'El asistente no está disponible.');
        }

        const lector = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = '';

        for (;;) {
          const { value, done } = await lector.read();
          if (done) break;
          buffer += value;

          let corte = buffer.indexOf('\n\n');
          while (corte !== -1) {
            const linea = buffer.slice(0, corte).trim();
            buffer = buffer.slice(corte + 2);
            corte = buffer.indexOf('\n\n');

            if (!linea.startsWith('data:')) continue;
            const carga = linea.slice(5).trim();
            if (!carga || carga === '[DONE]') continue;

            let dato: { t?: string; e?: string };
            try {
              dato = JSON.parse(carga);
            } catch {
              // Fragmento SSE partido entre dos chunks: el siguiente lo completa.
              continue;
            }

            if (dato.t) {
              completo += dato.t;
              arrancarEscritura();
            } else if (dato.e && !completo) {
              completo = dato.e;
              arrancarEscritura();
            }
          }
        }

        cerrado = true;

        if (!completo) {
          setMensajes((prev) =>
            prev.map((m) =>
              m.id === idBot
                ? { ...m, texto: 'No recibí respuesta. Intenta de nuevo.' }
                : m
            )
          );
        }
      } catch (err) {
        cerrado = true;
        // Corta la animación en seco donde iba.
        completo = completo.slice(0, mostrados);

        if (control.signal.aborted) return; // desmontaje, no es un error del usuario

        const mensaje = err instanceof Error ? err.message : 'Error de conexión.';
        setMensajes((prev) => [
          ...prev.filter((m) => m.id !== idBot),
          { id: uuid(), rol: 'error', texto: mensaje },
        ]);
      } finally {
        setOcupado(false);
      }
    },
    [ocupado]
  );

  return { mensajes, enviar, agregarBot, ocupado };
}
