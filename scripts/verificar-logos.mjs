#!/usr/bin/env node
/**
 * Verifica la coherencia entre tres fuentes que tienen que estar alineadas:
 *
 *   1. Los archivos de public/logos/
 *   2. El arreglo LOGOS de components/LogoCarousel.tsx
 *   3. La columna logoUrl de data/casos.csv
 *
 * Ninguno de estos desajustes rompe el build: un logo mal escrito o un archivo
 * que sobra se manifiesta como un hueco en el carrusel o como un cliente que
 * nunca se enciende, en producción y sin aviso.
 *
 * Uso:  node scripts/verificar-logos.mjs
 * Sale con código 1 si hay problemas, para poder encadenarlo en un hook.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const raiz = process.cwd();
const DIR = path.join(raiz, 'public', 'logos');

const archivos = new Set(readdirSync(DIR).map((f) => `/logos/${f}`));

const fuente = readFileSync(path.join(raiz, 'components', 'LogoCarousel.tsx'), 'utf8');
const entradas = [...fuente.matchAll(/\{ src: '([^']+)',\s*alt: '([^']+)' \}/g)]
  .map((m) => ({ src: m[1], alt: m[2] }));
const enCarrusel = new Set(entradas.map((e) => e.src));

const csv = readFileSync(path.join(raiz, 'data', 'casos.csv'), 'utf8').split('\n');
const columnas = csv[0].split(',').map((c) => c.trim());
const iLogo = columnas.indexOf('logoUrl');
const logosDeCasos = new Set(
  csv.slice(1)
    .map((l) => (l.split(',')[iLogo] || '').trim().replace(/^"|"$/g, ''))
    .filter(Boolean)
);

let problemas = 0;
const reportar = (titulo, lista, nota) => {
  if (!lista.length) return;
  problemas += lista.length;
  console.log(`\n✗ ${titulo} (${lista.length})`);
  console.log(`  ${nota}`);
  lista.forEach((x) => console.log(`    ${x}`));
};

reportar(
  'En el carrusel pero SIN archivo',
  entradas.filter((e) => !archivos.has(e.src)).map((e) => `${e.src}  (${e.alt})`),
  'Hueco en blanco en el carrusel. Revisa el nombre y la extensión.'
);

reportar(
  'Archivos que NADIE usa',
  [...archivos].filter((f) => !enCarrusel.has(f)),
  'Están en public/logos pero no salen en el carrusel. ¿Falta agregarlos?'
);

reportar(
  'Casos cuyo logo no está en el carrusel',
  [...logosDeCasos].filter((l) => !enCarrusel.has(l)),
  'El caso existe pero su cliente no aparece en la home, así que nadie llega a él desde ahí.'
);

reportar(
  'Casos cuyo logo no existe como archivo',
  [...logosDeCasos].filter((l) => !archivos.has(l)),
  'La tarjeta del caso saldrá sin logo.'
);

// Duplicados dentro del arreglo
const vistos = new Set();
reportar(
  'Repetidos en el carrusel',
  entradas.map((e) => e.src).filter((s) => (vistos.has(s) ? true : (vistos.add(s), false))),
  'Aparecerían dos veces en cada vuelta.'
);

// Reparto de encendidos y apagados
const patron = entradas.map((e) => (logosDeCasos.has(e.src) ? 'C' : '.')).join('');
const rachas = [...patron.matchAll(/C+|\.+/g)].map((m) => m[0]);
const maxApagados = Math.max(0, ...rachas.filter((r) => r[0] === '.').map((r) => r.length));
const maxCasos = Math.max(0, ...rachas.filter((r) => r[0] === 'C').map((r) => r.length));

console.log(`\n── Resumen ──`);
console.log(`  archivos en public/logos : ${archivos.size}`);
console.log(`  entradas en el carrusel  : ${entradas.length}`);
console.log(`  con caso publicado       : ${[...enCarrusel].filter((s) => logosDeCasos.has(s)).length}`);
console.log(`\n  patrón (C=caso, .=apagado), el ciclo une el final con el inicio:`);
console.log(`  ${patron}`);
console.log(`  racha máxima: ${maxCasos} casos seguidos, ${maxApagados} apagados seguidos`);

if (problemas === 0) {
  console.log('\n✓ Todo coherente.\n');
} else {
  console.log(`\n✗ ${problemas} problema(s). Ver arriba.\n`);
  process.exit(1);
}
