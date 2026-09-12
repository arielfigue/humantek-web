import { readFileSync, writeFileSync } from 'node:fs';
import * as topojson from 'topojson-client';
import { presimplify, simplify } from 'topojson-simplify';
import { geoEquirectangular, geoPath, geoCentroid } from 'd3-geo';

const AMERICA = new Set(['032','068','076','084','124','152','170','188','192','214','218','222','320','328','332','340','388','484','558','591','600','604','630','740','780','840','858','862',
  // Islas Malvinas. El dataset (Natural Earth) las trae como territorio
  // aparte con código 238; no forman parte del polígono de Argentina.
  '238']);
const DESTACADOS = ['840','484','558','591','170','862','218','152','032'];

// Territorios que se pintan igual que un país destacado pero NO llevan
// marcador ni cuentan en el total: el marcador señala dónde hubo proyecto, y
// el total es de países. Las Malvinas se muestran con la misma luz que
// Argentina por decisión editorial del sitio.
const ANEXOS = ['238'];
const ANCHO = 760;

function construir(umbral) {
  const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
  // presimplify asigna un "peso" a cada vértice; simplify descarta los que
  // aportan menos que el umbral. Conserva la topología: los países vecinos
  // siguen compartiendo frontera, sin huecos ni solapes.
  const simple = simplify(presimplify(topo), umbral);
  const todos = topojson.feature(simple, simple.objects.countries).features;
  const base = todos.filter(f => AMERICA.has(String(f.id)));
  // Ventana geográfica explícita en vez de ajustar al bounding box de los
  // países: las Aleutianas cruzan el antimeridiano y algunas islas atlánticas
  // de Brasil estiraban el marco, dejando el continente arrinconado.
  const VENTANA = {
    type: 'Polygon',
    coordinates: [[[-168, 62], [-34, 62], [-34, -56], [-168, -56], [-168, 62]]],
  };
  // Se ajusta al ancho y el alto del lienzo se deriva de la ventana, para que
  // no queden franjas de océano vacío arriba y abajo.
  const proyeccion = geoEquirectangular().fitWidth(ANCHO - 20, VENTANA);
  const limites = geoPath(proyeccion).bounds(VENTANA);
  const altoReal = Math.ceil(limites[1][1] - limites[0][1]) + 20;
  proyeccion.translate([
    proyeccion.translate()[0] + 10 - limites[0][0],
    proyeccion.translate()[1] + 10 - limites[0][1],
  ]);
  proyeccion.clipExtent([[0, 0], [ANCHO, altoReal]]);
  const ruta = geoPath(proyeccion);
  const red = (d) => d.replace(/-?\d+\.\d+/g, n => String(Math.round(parseFloat(n)*10)/10));

  const paises = [];
  for (const f of base) {
    const d = ruta(f);
    if (!d) continue;
    const id = String(f.id);
    const item = {
      id,
      nombre: f.properties.name,
      d: red(d),
      destacado: DESTACADOS.includes(id),
      anexo: ANEXOS.includes(id),
    };
    if (item.destacado) {
      const [x,y] = proyeccion(geoCentroid(f));
      item.cx = Math.round(x*10)/10; item.cy = Math.round(y*10)/10;
    }
    paises.push(item);
  }
  return { ancho: ANCHO, alto: altoReal, paises };
}

for (const u of [0.02, 0.05, 0.1, 0.2]) {
  const r = construir(u);
  const kb = Math.round(JSON.stringify(r).length/1024);
  const pan = r.paises.find(p=>p.id==='591');
  console.log(`umbral ${u}: ${kb} KB | Panamá ${pan ? pan.d.length + ' chars' : 'DESAPARECIÓ'}`);
}
const elegido = construir(0.05);
writeFileSync('paises.json', JSON.stringify(elegido));
console.log('\nguardado con umbral 0.05');
