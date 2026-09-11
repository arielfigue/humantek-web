'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const VALORES_NOSOTROS = [
  {
    titulo: "SOBRE NOSOTROS",
    puntos: [
      "Primero nuestro bienestar.",
      "Después el de nuestras familias.",
      "Solo así estaremos bien y podremos ofrecer un servicio sobresaliente."
    ]
  },
  {
    titulo: "SOBRE CÓMO CREEMOS QUE DEBE SER",
    puntos: [
      "El esfuerzo debe ser mucho, mutuo y compartido el beneficio también.",
      "Si nos costó trabajo lograrlo lo vamos a valorar mucho y cuidaremos que no se derrumbe.",
      "Los conflictos son inevitables, la gestión inteligente del problema no lo es."
    ]
  },
  {
    titulo: "SOBRE LO QUE HACEMOS",
    puntos: [
      "En cada proyecto lo más importante son las personas.",
      "Armar un equipo es condición necesaria para que lo logremos.",
      "Cuando le enseñamos a la gente cómo lograr un resultado trascendemos junto con ellos."
    ]
  },
  {
    titulo: "SOBRE LOS HECHOS QUE SON INNEGABLES",
    puntos: [
      "Las empresas necesitan conocimiento y luego herramientas.",
      "La solución no es la tecnología, es un cúmulo de enseñanzas, capacidades y experiencias que sirvan para resolver problemas actuales y futuros.",
      "El dinero es importante pero no más que todo lo anterior."
    ]
  }
];

/**
 * Acordeón de principios. Es la ÚNICA parte interactiva de /nosotros, por eso
 * vive aquí como Client Component: así `app/nosotros/page.tsx` puede volver a
 * ser Server Component y exportar su propia metadata.
 */
export default function ValoresAccordion() {
  // null = todos cerrados.
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <ScrollReveal>
      <div className="max-w-3xl mx-auto space-y-4 pt-4">
        {VALORES_NOSOTROS.map((item, index) => {
          const isOpen = openAccordion === index;

          return (
            <div
              key={index}
              className={`rounded-2xl border bg-slate-900/60 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* HEADER DEL ACORDEÓN (Botón) */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between rounded-2xl p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-expanded={isOpen}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  {item.titulo}:
                </h3>
                <div className="ml-4 flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* CONTENIDO DEL ACORDEÓN (Animado con grid-rows) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-0">
                    <div className="border-t border-slate-800/80 pt-4">
                      <ul className="space-y-3">
                        {item.puntos.map((punto, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                            <span className="text-cyan-400 font-bold mt-1 text-xs">◆</span>
                            <span>{punto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}
