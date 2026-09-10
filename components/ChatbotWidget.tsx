'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export default function ChatbotWidget() {
  const pathname = usePathname();
  
  // Condición para evaluar si estamos en la página de Inteligencia Artificial
  const isAIPage = pathname === '/inteligencia-artificial';

  // Oculta o remueve el widget si el usuario navega a la ruta excluida mediante enlaces internos
  useEffect(() => {
    // Si el widget inyecta un elemento global en el DOM, nos aseguramos de controlar su visibilidad
    const widgetFrame = document.querySelector('[id*="chatbot"], [class*="chatbot"]');
    if (widgetFrame) {
      if (isAIPage) {
        (widgetFrame as HTMLElement).style.display = 'none';
      } else {
        (widgetFrame as HTMLElement).style.display = 'block';
      }
    }
  }, [pathname, isAIPage]);

  // Si estamos en la página de Inteligencia Artificial, no carga el script
  if (isAIPage) {
    return null;
  }

  return (
    <Script
      src="https://humanytek-chatbot.humanytek.workers.dev/widget.js?v=7"
      strategy="afterInteractive"
    />
  );
}