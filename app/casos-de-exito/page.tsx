import fs from 'fs';
import path from 'path';
import CasosClient, { CaseStudy } from './CasosClient';

function parseCSV(text: string): CaseStudy[] {
  const result: any[] = [];
  const lines = text.split(/\r?\n/);
  
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Separa por comas respetando comillas
    const matches = line.match(/(\\.|[^",]+|"[^"]*")+/g);
    
    if (matches) {
      const obj: any = {};
      headers.forEach((header, index) => {
        let val = matches[index] || '';
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1).replace(/""/g, '"');
        }
        obj[header] = val.trim();
      });

      // Transforma el giro en un arreglo borrando corchetes [ ]
      const rawGiro = obj.giro || '';
      const cleanedGiro = rawGiro.replace(/[\[\]]/g, '');
      obj.giro = cleanedGiro
        ? cleanedGiro.split(',').map((g: string) => g.trim()).filter(Boolean)
        : [];

      result.push(obj);
    }
  }

  return result as CaseStudy[];
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