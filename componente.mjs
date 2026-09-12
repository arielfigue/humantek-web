import { readFileSync, writeFileSync } from 'node:fs';
const { ancho, alto, paises } = JSON.parse(readFileSync('paises.json', 'utf8'));

// Nombres en español. El dataset viene en inglés ("Falkland Is.").
const ES = {
  '238': 'Islas Malvinas',
  '840': 'Estados Unidos', '484': 'México', '558': 'Nicaragua', '591': 'Panamá',
  '170': 'Colombia', '862': 'Venezuela', '218': 'Ecuador', '152': 'Chile', '032': 'Argentina',
};

const base = paises.filter(p => !p.destacado && !p.anexo);
const dest = paises.filter(p => p.destacado);
const anexos = paises.filter(p => p.anexo);
// Orden geográfico de norte a sur, que es como se lee el mapa.
dest.sort((a, b) => a.cy - b.cy);

// Los países de contexto no llevan etiqueta: son decorado. La excepción son
// los que estén nombrados en ES, que se incluyeron a propósito.
const pathsBase = base.map(p => ES[p.id]
  ? `        <path d="${p.d}">\n          <title>${ES[p.id]}</title>\n        </path>`
  : `        <path d="${p.d}" />`
).join('\n');
// Anexos: mismo relleno y trazo que un país destacado, sin marcador.
const pathsAnexos = anexos.map(p =>
  `        <path d="${p.d}" className="fill-[url(#gradPais)] stroke-cyan-400/70 [stroke-width:1.1]">\n          <title>${ES[p.id]}</title>\n        </path>`
).join('\n');

const pathsDest = dest.map(p =>
  `        <path d="${p.d}" className="fill-[url(#gradPais)] stroke-cyan-400/70 [stroke-width:1.1]">\n          <title>${ES[p.id]}</title>\n        </path>`
).join('\n');
const puntos = dest.map((p, i) =>
  `        <g style={{ ['--retraso' as string]: '${(i * 0.35).toFixed(2)}s' }} className="mapa-pulso">\n          <circle cx="${p.cx}" cy="${p.cy}" r="11" className="fill-cyan-400/20" />\n          <circle cx="${p.cx}" cy="${p.cy}" r="3.4" className="fill-cyan-300" />\n        </g>`
).join('\n');

const tsx = `/**
 * Mapa de países donde Humanytek ha implementado proyectos.
 *
 * Es un SVG generado a partir de world-atlas (Natural Earth) proyectado con
 * equirectangular y simplificado conservando la topología: los países vecinos
 * siguen compartiendo frontera exacta. Se incrusta en línea, no como imagen,
 * para que herede los colores del sitio, se vea nítido en cualquier pantalla y
 * no cueste una petición extra.
 *
 * PARA CAMBIAR LOS PAÍSES MARCADOS no basta con editar este archivo: hay que
 * volver a generar los trazados. Los países destacados llevan su <title>, que
 * es lo que anuncia un lector de pantalla al recorrer el mapa.
 *
 * Server Component: no hay interactividad, así que no suma nada al bundle.
 */
export const PAISES_CON_PROYECTOS = [
${dest.map(p => `  '${ES[p.id]}',`).join('\n')}
] as const;

export default function MapaProyectos() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg
        viewBox="0 0 ${ancho} ${alto}"
        className="h-auto w-full"
        role="img"
        aria-label="Mapa del continente americano con los países donde Humanytek ha implementado proyectos: ${dest.map(p => ES[p.id]).join(', ')}."
      >
        <defs>
          <linearGradient id="gradPais" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Resto del continente: presente pero discreto, para dar contexto. */}
        <g className="fill-slate-900 stroke-slate-800 [stroke-width:0.7]">
${pathsBase}
        </g>

        {/* Países con proyectos, y territorios pintados con la misma luz. */}
        <g>
${pathsDest}
${pathsAnexos}
        </g>

        {/* Marcadores. El pulso lo apaga globals.css con prefers-reduced-motion. */}
${puntos}
      </svg>
    </div>
  );
}
`;
writeFileSync('MapaProyectos.tsx', tsx);
console.log('componente generado |', Math.round(tsx.length / 1024), 'KB |', dest.length, 'países destacados');
