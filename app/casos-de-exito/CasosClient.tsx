'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * useLayoutEffect avisa en consola cuando el componente se renderiza en el
 * servidor, y este se prerenderiza. Se resuelve una vez, fuera del componente,
 * así que la llamada de abajo sigue siendo incondicional.
 */
const useLayoutEffectSeguro =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import YouTubeFacade from '@/components/YouTubeFacade';

export interface CaseStudy {
  id: string;
  title: string;
  youtubeId: string;
  logoUrl?: string;
  description: string;
  tamano: string;
  giro: string[] | string;
  tipo: string[] | string;
}

interface CasosClientProps {
  initialCases: CaseStudy[];
  /**
   * Caso al que apuntaba el enlace del carrusel de logos. Llega como prop y no
   * de useSearchParams para que este componente siga siendo prerenderizable:
   * el HTML estático con los 21 casos es lo que leen los buscadores.
   * Quien lee el parámetro es CasosConParametro.
   */
  casoDestacadoId?: string | null;
}

/**
 * El CSV entrega giro y tipo como arreglo o como texto separado por comas, a
 * veces con corchetes. Esta normalización estaba escrita tres veces dentro de
 * getMatchScore; ahora vive en un solo lugar.
 */
function aLista(valor: string[] | string | undefined): string[] {
  if (Array.isArray(valor)) return valor.map((v) => v.trim()).filter(Boolean);
  if (typeof valor === 'string') {
    return valor
      .replace(/[[\]]/g, '')
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

function getValidLogoUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed.toLowerCase() === 'undefined' || trimmed.toLowerCase() === 'null') {
    return null;
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return trimmed;
  }
  return `/${trimmed}`;
}

export default function CasosClient({
  initialCases,
  casoDestacadoId = null,
}: CasosClientProps) {
  // Al llegar desde el carrusel de logos la URL trae ?caso=N. Ese caso se
  // coloca al principio de la lista y se preseleccionan sus giros, de modo que
  // el visitante vea el selector de criterios justo encima del video y, debajo,
  // otros casos del mismo giro. Antes el ancla lo dejaba a media página, con el
  // selector fuera de vista y sin pista de que hubiera casos similares.
  const casoDestacado = casoDestacadoId
    ? initialCases.find((c) => c.id === casoDestacadoId)
    : undefined;

  /**
   * El caso que llegó por ?caso=N encabeza la lista, pero solo hasta que el
   * visitante toca el selector. A partir de ahí manda él: si el ancla no se
   * soltara, ese caso quedaría clavado arriba para siempre y ningún criterio
   * podría subir otro, que es justo lo que uno espera del selector.
   */
  const [anclado, setAnclado] = useState(() => Boolean(casoDestacado));
  const idAnclado = anclado ? casoDestacadoId : null;

  const [selectedTamano, setSelectedTamano] = useState<string | null>(null);
  // Inicialización perezosa: se resuelve en el primer render, sin efectos ni
  // un segundo pintado con la lista en el orden equivocado.
  const [selectedGiro, setSelectedGiro] = useState<string[]>(() =>
    aLista(casoDestacado?.giro)
  );
  const [selectedTipo, setSelectedTipo] = useState<string[]>([]);

  const hasActiveFilters = Boolean(selectedTamano || selectedGiro.length > 0 || selectedTipo.length > 0);

  // Cálculo de puntos de coincidencia flexible
  const getMatchScore = (item: CaseStudy): number => {
    let score = 0;

    // 1. Tamaño (compatible con singular y plural: Mediana / Medianas, etc.)
    if (selectedTamano) {
      const itemTamano = (item.tamano || '').trim().toLowerCase();
      const selTamano = selectedTamano.trim().toLowerCase();

      if (
        itemTamano === selTamano ||
        (selTamano.startsWith('mediana') && itemTamano.startsWith('mediana')) ||
        (selTamano.startsWith('grande') && itemTamano.startsWith('grande')) ||
        (selTamano.startsWith('pequeña') && itemTamano.startsWith('pequeña'))
      ) {
        score += 1;
      }
    }

    // 2. Giro (normaliza arreglos y texto separado por comas)
    if (selectedGiro.length > 0) {
      const itemGiros = aLista(item.giro);

      const hasGiroMatch = itemGiros.some((g) =>
        selectedGiro.some((sel) => sel.trim().toLowerCase() === g.trim().toLowerCase())
      );

      if (hasGiroMatch) {
        score += 1;
      }
    }

    // 3. Tipo (normaliza arreglos y texto separado por comas)
    if (selectedTipo.length > 0) {
      const itemTipos = aLista(item.tipo);

      const hasTipoMatch = itemTipos.some((t) =>
        selectedTipo.some((sel) => sel.trim().toLowerCase() === t.trim().toLowerCase())
      );

      if (hasTipoMatch) {
        score += 1;
      }
    }

    return score;
  };

  // Reordenamiento dinámico: las coincidencias flotan a la parte superior.
  // El score se calcula UNA vez por caso; antes se recalculaba dentro del
  // comparador (O(n log n) llamadas) y otra vez al pintar cada tarjeta.
  const sortedCases = initialCases
    .map((item) => ({ item, score: hasActiveFilters ? getMatchScore(item) : 0 }))
    .sort((a, b) => {
      // El caso al que apuntaba el enlace encabeza la lista pase lo que pase;
      // el resto se ordena por coincidencia con los criterios.
      if (a.item.id === idAnclado) return -1;
      if (b.item.id === idAnclado) return 1;
      return b.score - a.score;
    });

  /**
   * Reacomodo animado de la lista (técnica FLIP).
   *
   * React reordena los nodos de golpe: sin esto las tarjetas aparecen ya en su
   * sitio nuevo, de un salto. Aquí se mide dónde quedó cada una, se la devuelve
   * con un transform a donde estaba, y se suelta en el cuadro siguiente. El
   * navegador interpola y el resultado es que las tarjetas se deslizan.
   *
   * Se anima el envoltorio y no la tarjeta porque esta ya usa transform para su
   * `scale` al coincidir con los criterios, y ambos se pisarían.
   */
  const listaRef = useRef<HTMLDivElement>(null);
  const posicionesRef = useRef<Map<string, number>>(new Map());
  const ordenActual = sortedCases.map(({ item }) => item.id).join('|');

  useLayoutEffectSeguro(() => {
    const contenedor = listaRef.current;
    if (!contenedor) return;

    const nodos = Array.from(
      contenedor.querySelectorAll<HTMLElement>('[data-caso]')
    );
    const previas = posicionesRef.current;
    const nuevas = new Map<string, number>();
    const movimientoReducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let huboCambio = false;
    for (const nodo of nodos) {
      const id = nodo.dataset.caso;
      if (!id) continue;
      const actual = nodo.offsetTop;
      nuevas.set(id, actual);

      const anterior = previas.get(id);
      if (movimientoReducido || anterior === undefined || anterior === actual) {
        continue;
      }
      // Invertir: dejarla visualmente donde estaba, sin transición.
      nodo.style.transition = 'none';
      nodo.style.transform = `translateY(${anterior - actual}px)`;
      huboCambio = true;
    }

    posicionesRef.current = nuevas;
    if (!huboCambio) return;

    // Soltar en el cuadro siguiente: el navegador anima el regreso a cero.
    const marco = requestAnimationFrame(() => {
      for (const nodo of nodos) {
        nodo.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
        nodo.style.transform = '';
      }
    });
    return () => cancelAnimationFrame(marco);
  }, [ordenActual]);

  const GRUPOS_DE_CRITERIOS = [
    {
      etiqueta: 'Tamaño',
      opciones: ['Grande', 'Medianas', 'Pequeñas'],
      estaActivo: (v: string) => selectedTamano === v,
      alternar: (v: string) =>
        toggleSingleFilter(selectedTamano, setSelectedTamano, v),
    },
    {
      etiqueta: 'Giro',
      opciones: [
        'Servicios',
        'Manufactura',
        'Comercialización',
        'Retail',
        'Distribución',
        'Metalmecánica',
      ],
      estaActivo: (v: string) => selectedGiro.includes(v),
      alternar: (v: string) => toggleGiroFilter(v),
    },
    {
      etiqueta: 'Tipo',
      opciones: ['Implementación', 'Rescatado', 'Mejora de Resultados'],
      estaActivo: (v: string) => selectedTipo.includes(v),
      alternar: (v: string) => toggleTipoFilter(v),
    },
  ];

  const toggleSingleFilter = (current: string | null, setter: (val: string | null) => void, value: string) => {
    setAnclado(false);
    setter(current === value ? null : value);
  };

  const toggleGiroFilter = (value: string) => {
    setAnclado(false);
    setSelectedGiro((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleTipoFilter = (value: string) => {
    setAnclado(false);
    setSelectedTipo((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setAnclado(false);
    setSelectedTamano(null);
    setSelectedGiro([]);
    setSelectedTipo([]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>

      <div className="mx-auto max-w-7xl space-y-12">
        {/* --- ENCABEZADO --- */}
        <ScrollReveal>
          <div className="max-w-3xl space-y-4 text-left">
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
        </ScrollReveal>

        {/* --- SELECTOR DE CRITERIOS --- */}
        {/*
          Barra pegada bajo el navbar: permite cambiar de criterio sin volver
          arriba mientras se recorre la lista.

          Va fuera de ScrollReveal a propósito: ese componente envuelve su
          contenido en un div de la altura justa, y un elemento sticky solo
          puede desplazarse dentro de su contenedor. Envuelto ahí no se
          despegaría nunca.

          Todo en una sola fila que se envuelve, sin encabezado y sin una fila
          por categoría: al quedar fija, cada píxel de alto es espacio que le
          quita a los casos. Sticky solo desde lg, porque en pantallas
          estrechas los chips ocupan varias líneas.
        */}
        <div className="lg:sticky lg:top-24 z-30 lg:-mx-2 lg:px-2 lg:py-2">
          <div className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {GRUPOS_DE_CRITERIOS.map((grupo) => (
                <div key={grupo.etiqueta} className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {grupo.etiqueta}
                  </span>
                  {grupo.opciones.map((opcion) => {
                    const activo = grupo.estaActivo(opcion);
                    return (
                      <button
                        key={opcion}
                        type="button"
                        onClick={() => grupo.alternar(opcion)}
                        aria-pressed={activo}
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          activo
                            ? 'border-blue-400 bg-blue-600 text-white'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {opcion}
                      </button>
                    );
                  })}
                </div>
              ))}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-auto rounded text-[11px] text-slate-400 underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- LISTADO DE CASOS DE ÉXITO --- */}
        {anclado && casoDestacado && (
          <p className="-mt-6 text-sm text-slate-400">
            Mostrando primero el caso de{' '}
            <strong className="font-semibold text-white">{casoDestacado.title}</strong>
            {selectedGiro.length > 0 && <> y, debajo, otros casos del mismo giro.</>}{' '}
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Ver todos
            </button>
          </p>
        )}

        <div ref={listaRef} className="space-y-8">
          {sortedCases.map(({ item, score }, index) => {
            const matches = hasActiveFilters && score > 0;
            const validLogoUrl = getValidLogoUrl(item.logoUrl);

            const girosList = Array.isArray(item.giro)
              ? item.giro
              : typeof item.giro === 'string'
              ? (item.giro as string).replace(/[\[\]]/g, '').split(',').map((s) => s.trim()).filter(Boolean)
              : [];

            const tiposList = Array.isArray(item.tipo)
              ? item.tipo
              : typeof item.tipo === 'string'
              ? (item.tipo as string).replace(/[\[\]]/g, '').split(',').map((s) => s.trim()).filter(Boolean)
              : [];

            return (
              <div key={item.id} data-caso={item.id} className="will-change-transform">
              <div
                id={`caso-${item.id}`}
                data-destacado={item.id === idAnclado || undefined}
                className={`transition-all duration-500 rounded-2xl p-6 sm:p-8 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border ${
                  matches
                    ? 'border-cyan-400/80 bg-slate-900/90 shadow-[0_0_35px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/40 scale-[1.01]'
                    : 'border-slate-800/80 bg-slate-900/40 opacity-85 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="lg:col-span-6 relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  <YouTubeFacade
                    videoId={item.youtubeId}
                    title={item.title}
                    priority={index === 0}
                  />
                </div>

                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      {validLogoUrl ? (
                        <div className="relative h-10 w-32">
                          <Image
                            src={validLogoUrl}
                            alt={item.title}
                            fill
                            sizes="128px"
                            className="object-contain object-left"
                          />
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
                    {item.tamano && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">
                        {item.tamano}
                      </span>
                    )}
                    {girosList.map((g) => (
                      <span key={g} className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">
                        {g}
                      </span>
                    ))}
                    {tiposList.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
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