'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Se copia el nodo a una variable local: en el cleanup, ref.current ya puede
    // apuntar a otro elemento (o a null) y unobserve fallaría en silencio.
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dejamos de observar una vez que ya apareció para que no parpadee al subir y bajar
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px', // Un pequeño margen para que la animación se sienta natural
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // data-reveal permite que globals.css anule la animación cuando el
      // usuario pidió menos movimiento, y que <noscript> la anule cuando no hay
      // JavaScript. Sin ese escape, `opacity-0` dejaba la página en blanco.
      data-reveal
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  );
}