import { MetadataRoute } from 'next';
import { CONTENT_LAST_MODIFIED, SITE_URL } from '@/lib/site';

/**
 * Rutas declaradas con su prioridad y frecuencia reales.
 *
 * `lastModified` sale de una constante y no de `new Date()`: con new Date()
 * el sitemap cambiaba en cada build y Google terminaba ignorando la señal
 * porque nunca correspondía a un cambio real de contenido.
 */
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/erps', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/click2deploy', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/metodologia', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/casos-de-exito', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/retail', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vendor-managed-inventory', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/inteligencia-artificial', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/contacto', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/aviso-de-privacidad', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_MODIFIED);

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
