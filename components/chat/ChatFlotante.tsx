'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ChatPanel from './ChatPanel';

/** La página de IA lleva el chat incrustado en el contenido; ahí sobra la burbuja. */
const RUTAS_SIN_BURBUJA = ['/inteligencia-artificial'];

/**
 * Reemplaza a `ChatbotWidget`, que cargaba `widget.js` desde el Worker y luego
 * intentaba esconder el resultado buscando `[id*="chatbot"], [class*="chatbot"]`
 * en el DOM. Ahora la burbuja es un componente más: si no debe aparecer,
 * simplemente no se renderiza.
 *
 * Va abajo a la izquierda porque el widget de WhatsApp ocupa la derecha.
 */
export default function ChatFlotante() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    document.addEventListener('keydown', alPresionar);
    return () => document.removeEventListener('keydown', alPresionar);
  }, [abierto]);

  if (RUTAS_SIN_BURBUJA.includes(pathname)) return null;

  if (abierto) {
    return (
      <div
        className="fixed inset-0 z-50 sm:inset-auto sm:bottom-6 sm:left-6 sm:h-[min(560px,calc(100vh-3rem))] sm:w-[380px]"
        role="dialog"
        aria-label="Asistente virtual de HumanyTek"
      >
        <div className="h-full w-full shadow-2xl sm:rounded-2xl">
          <ChatPanel variante="flotante" onCerrar={() => setAbierto(false)} />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAbierto(true)}
      aria-label="Abrir asistente virtual"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-2xl transition-transform duration-200 hover:scale-110 hover:bg-cyan-400"
    >
      <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      </svg>
    </button>
  );
}
