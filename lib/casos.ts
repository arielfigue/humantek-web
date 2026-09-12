import fs from 'fs';
import path from 'path';
import type { CaseStudy } from '@/app/casos-de-exito/CasosClient';

/**
 * Carga de casos de éxito desde data/casos.csv.
 *
 * Vive aquí y no dentro de la página porque ahora hay dos consumidores: la
 * lista de /casos-de-exito y el carrusel de logos de la home, que necesita
 * saber qué clientes tienen caso publicado para enlazarlos.
 *
 * Solo se ejecuta en el servidor: usa `fs`.
 */
// Lector de líneas CSV que respeta campos vacíos y comillas
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  fields.push(current.trim());

  return fields.map((field) => {
    let clean = field;
    if (clean.startsWith('"') && clean.endsWith('"')) {
      clean = clean.slice(1, -1).replace(/""/g, '"');
    }
    return clean.trim();
  });
}

function parseCSV(text: string): CaseStudy[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const result: CaseStudy[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    const obj: Record<string, string | string[]> = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    // Procesa giros como arreglo
    const rawGiro = typeof obj.giro === 'string' ? obj.giro : '';
    const cleanedGiro = rawGiro.replace(/[\[\]]/g, '');
    obj.giro = cleanedGiro
      ? cleanedGiro.split(',').map((g: string) => g.trim()).filter(Boolean)
      : [];

    // Procesa tipos como arreglo
    const rawTipo = typeof obj.tipo === 'string' ? obj.tipo : '';
    const cleanedTipo = rawTipo.replace(/[\[\]]/g, '');
    obj.tipo = cleanedTipo
      ? cleanedTipo.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    result.push(obj as unknown as CaseStudy);
  }

  return result;
}

/** Lee y parsea data/casos.csv. Devuelve [] si el archivo falta o está roto. */
export function cargarCasos(): CaseStudy[] {
  try {
    const ruta = path.join(process.cwd(), 'data', 'casos.csv');
    return parseCSV(fs.readFileSync(ruta, 'utf8'));
  } catch (error) {
    console.error('Error leyendo data/casos.csv:', error);
    return [];
  }
}

/**
 * Índice de logo -> caso, para que el carrusel resuelva el enlace sin volver a
 * parsear el CSV ni duplicar la ruta de cada imagen.
 */
export function mapaLogoACaso(): Record<string, { id: string; title: string }> {
  const indice: Record<string, { id: string; title: string }> = {};
  for (const caso of cargarCasos()) {
    if (caso.logoUrl) {
      indice[caso.logoUrl] = { id: caso.id, title: caso.title };
    }
  }
  return indice;
}
