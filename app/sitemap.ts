import { MetadataRoute } from 'next';
import { CONTENT_LAST_MODIFIED, SITE_URL } from '@/lib/site';

/**
 * Rutas declaradas con su prioridad y frecuencia reales.
 *
 * `lastModified` sale de fechas escritas a mano y no de `new Date()`: con
 * new Date() el sitemap cambiaba en cada build y Google terminaba ignorando
 * la señal porque nunca correspondía a un cambio real de contenido.
 *
 * Cada página lleva su propia fecha y solo se toca cuando cambia su contenido.
 * Las que no declaran `updated` heredan CONTENT_LAST_MODIFIED, que es la fecha
 * del último cambio global del sitio: así una página nueva no "actualiza" a
 * las trece restantes.
 */
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  /** Último cambio real de esta página, en formato YYYY-MM-DD. */
  updated?: string;
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly', updated: '2026-10-27' },
  { path: '/erps', priority: 0.9, changeFrequency: 'monthly' },
  // Página de servicio principal: mismo nivel que /erps desde que tiene caso y
  // tiempos de implementación propios.
  { path: '/plataformas', priority: 0.9, changeFrequency: 'monthly', updated: '2026-10-27' },
  // El caso cambia cuando cambia el proyecto, no cada mes.
  { path: '/plataformas/le-pate', priority: 0.6, changeFrequency: 'yearly', updated: '2026-10-27' },
  { path: '/click2deploy', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/metodologia', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/casos-de-exito', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/retail', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vendor-managed-inventory', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/administratibot', priority: 0.8, changeFrequency: 'monthly', updated: '2026-10-27' },
  { path: '/inteligencia-artificial', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/contacto', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/aviso-de-privacidad', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency, updated }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(updated ?? CONTENT_LAST_MODIFIED),
    changeFrequency,
    priority,
  }));
}
