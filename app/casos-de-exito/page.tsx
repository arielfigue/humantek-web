import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import CasosClient, { CaseStudy } from './CasosClient';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema, videoSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Casos de éxito',
  description:
    'Testimonios en video de clientes reales: implementaciones de ERP y proyectos rescatados en manufactura, distribución, retail y servicios en México.',
  path: '/casos-de-exito',
  keywords: [
    'casos de éxito ERP México',
    'testimonios implementación Odoo',
    'rescate de proyecto ERP',
  ],
});

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

export default async function CasosDeExitoPage() {
  let cases: CaseStudy[] = [];

  try {
    const filePath = path.join(process.cwd(), 'data', 'casos.csv');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    cases = parseCSV(fileContents);
  } catch (error) {
    console.error("Error leyendo el archivo CSV de Casos de Éxito:", error);
    cases = [];
  }

  // VideoObject por cada testimonial: sin esto los 21 videos son invisibles
  // para Google Video y para el carrusel de video en resultados de búsqueda.
  const videos = cases
    .filter((item) => item.youtubeId)
    .map((item) =>
      videoSchema({
        name: item.title,
        description: item.description,
        youtubeId: item.youtubeId,
      })
    );

  return (
    <>
      <CasosClient initialCases={cases} />
      <JsonLd
        data={[
          itemListSchema(videos, 'Casos de éxito de Humanytek'),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Casos de éxito', path: '/casos-de-exito' },
          ]),
        ]}
      />
    </>
  );
}