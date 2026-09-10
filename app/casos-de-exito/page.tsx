import fs from 'fs';
import path from 'path';
import CasosClient, { CaseStudy } from './CasosClient';

// Función segura y nativa para convertir CSV a objetos manejando comas dentro de las comillas
function parseCSV(text: string): CaseStudy[] {
  const result: any[] = [];
  const lines = text.split(/\r?\n/);
  
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Expresión regular para separar por comas ignorando las que están dentro de comillas
    const matches = line.match(/(\\.|[^",]+|"[^"]*")+/g);
    
    if (matches) {
      const obj: any = {};
      headers.forEach((header, index) => {
        let val = matches[index] || '';
        // Si el valor está entre comillas, quitárselas
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1).replace(/""/g, '"'); // Reemplazar comillas dobles escapadas
        }
        obj[header] = val.trim();
      });
      result.push(obj);
    }
  }

  return result as CaseStudy[];
}

export default async function CasosDeExitoPage() {
  let cases: CaseStudy[] = [];

  try {
    // Buscamos el archivo en la carpeta "data" en la raíz del proyecto
    const filePath = path.join(process.cwd(), 'data', 'casos.csv');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    cases = parseCSV(fileContents);
  } catch (error) {
    console.error("Error leyendo el archivo CSV de Casos de Éxito:", error);
    // Casos de respaldo en caso de que el archivo no exista o tenga un error
    cases = [];
  }

  // Pasamos los casos parseados al Componente Cliente
  return <CasosClient initialCases={cases} />;
}