'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export interface CaseStudy {
  id: string;
  title: string;
  youtubeId: string;
  logoUrl?: string;
  description: string;
  tamano: string;
  giro: string;
  tipo: string;
}

interface CasosClientProps {
  initialCases: CaseStudy[];
}

export default function CasosClient({ initialCases }: CasosClientProps) {
  const [selectedTamano, setSelectedTamano] = useState<string | null>(null);
  const [selectedGiro, setSelectedGiro] = useState<string[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);

  const hasActiveFilters = Boolean(selectedTamano || selectedGiro.length > 0 || selectedTipo);

  const isMatch = (item: CaseStudy) => {
    if (selectedTamano && item.tamano !== selectedTamano) return false;
    if (selectedGiro.length > 0 && !selectedGiro.includes(item.giro)) return false;
    if (selectedTipo && item.tipo !== selectedTipo) return false;
    return true;
  };

  const sortedCases = [...initialCases].sort((a, b) => {
    if (!hasActiveFilters) return 0;
    const matchA = isMatch(a) ? 1 : 0;
    const matchB = isMatch(b) ? 1 : 0;
    return matchB - matchA;
  });

  const toggleSingleFilter = (current: string | null, setter: (val: string | null) => void, value: string) => {
    setter(current === value ? null : value);
  };

  const toggleGiroFilter = (value: string) => {
    setSelectedGiro((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedTamano(null);
    setSelectedGiro([]);
    setSelectedTipo(null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>

      <div className="mx-auto max-w-7xl space-y-12">
        {/* --- ENCABEZADO + SELECTOR DE CRITERIOS --- */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800/80 pb-10">
            
            {/* LADO IZQUIERDO: TEXTO */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Casos de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Éxito
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                Conozca la experiencia directa de nuestros clientes y seleccione los criterios de su interés para destacar casos similares.
              </p>
            </div>

            {/* LADO DERECHO: SELECTOR DE CRITERIOS */}
            <div className="lg:col-span-7 flex flex-col items-start lg:items-end w-full">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl w-full space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                    </svg>
                    Selecciona los que te interese ver
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-slate-400 hover:text-white underline transition-colors"
                    >
                      Limpiar selección
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Categoría: Tamaño (Selección Simple) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Tamaño:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Grande', 'Mediana', 'Pequeña'].map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleSingleFilter(selectedTamano, setSelectedTamano, item)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            selectedTamano === item
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categoría: Giro (Selección Múltiple) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Giro:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Servicios', 'Manufactura', 'Comercialización', 'Retail'].map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleGiroFilter(item)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            selectedGiro.includes(item)
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categoría: Tipo (Selección Simple) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Tipo:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Implementación', 'Rescatado', 'Mejora de Resultados'].map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleSingleFilter(selectedTipo, setSelectedTipo, item)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            selectedTipo === item
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* --- LISTADO DE CASOS DE ÉXITO --- */}
        <div className="space-y-8">
          {sortedCases.map((item) => {
            const matches = hasActiveFilters && isMatch(item);

            return (
              <div
                key={item.id}
                className={`transition-all duration-500 rounded-2xl p-6 sm:p-8 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border ${
                  matches
                    ? 'border-cyan-400/80 bg-slate-900/90 shadow-[0_0_35px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/40 scale-[1.01]'
                    : 'border-slate-800/80 bg-slate-900/40 opacity-85 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="lg:col-span-6 relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      {item.logoUrl && item.logoUrl.trim() !== '' ? (
                        <div className="relative h-10 w-32">
                          <Image src={item.logoUrl} alt={item.title} fill className="object-contain object-left" />
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-white tracking-tight">{item.title}</span>
                      )}

                      {matches && (
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 animate-pulse">
                          Coincidencia
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed font-light">{item.description}</p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">{item.tamano}</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">{item.giro}</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">{item.tipo}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}