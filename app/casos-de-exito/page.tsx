import fs from 'fs';
import path from 'path';
import CasosClient, { CaseStudy } from './CasosClient';

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

    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    // Procesa giros como arreglo
    const rawGiro = obj.giro || '';
    const cleanedGiro = rawGiro.replace(/[\[\]]/g, '');
    obj.giro = cleanedGiro
      ? cleanedGiro.split(',').map((g: string) => g.trim()).filter(Boolean)
      : [];

    // Procesa tipos como arreglo
    const rawTipo = obj.tipo || '';
    const cleanedTipo = rawTipo.replace(/[\[\]]/g, '');
    obj.tipo = cleanedTipo
      ? cleanedTipo.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    result.push(obj as CaseStudy);
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

  return <CasosClient initialCases={cases} />;
}