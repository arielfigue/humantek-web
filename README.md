# humantek-web

Sitio de [humanytek.com](https://humanytek.com) — consultoría e implementación de
ERP (Odoo y SAP Business ByDesign) en Guadalajara, México.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 · TypeScript ·
desplegado en Vercel.

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npx eslint .         # debe salir sin problemas
```

No hace falta configurar nada para desarrollar: todas las variables de entorno
tienen valores por defecto apuntando a producción. Copia `.env.example` a
`.env.local` solo si necesitas apuntar a otro Worker o probar analytics.

## Estructura

```
app/                    rutas (App Router). Cada page.tsx es Server Component
  <ruta>/page.tsx       metadata + contenido
  <ruta>/*Client.tsx    la parte interactiva, aislada
components/             UI compartida
  chat/                 el asistente: panel, burbuja, formulario de lead
lib/                    lógica sin UI
  site.ts               datos del negocio: única fuente de verdad
  seo.ts                pageMetadata(): canonical + Open Graph + Twitter
  schema.ts             builders de JSON-LD
  chat/                 config, sesión, validación y hooks del chat
  media.ts              resolución de URLs de video
  analytics.ts          trackEvent() tipado
data/casos.csv          casos de éxito
public/logos/           logos de clientes (carrusel y casos comparten carpeta)
public/posters/         primer fotograma de cada video
scripts/                utilidades de mantenimiento
```

## Reglas que conviene no romper

**Las páginas son Server Components.** Si una necesita estado, la parte
interactiva se extrae a un componente aparte (`ContactoClient`,
`MetodologiaClient`, `ValoresAccordion`). Poner `'use client'` en un `page.tsx` le
quita la capacidad de exportar `metadata` y el SEO de esa ruta se cae en silencio.

**Los datos del negocio viven en `lib/site.ts`.** Teléfono, dirección, redes,
imagen Open Graph. No se repiten en las páginas.

**Video nuevo: pasarlo por `scripts/optimizar-media.sh`.** Recomprime y genera el
poster. Subir un MP4 directo a `public/` es lo que llevó a tener 77 MB ahí.

**Los videos de YouTube van por `YouTubeFacade`**, no por `<iframe>` directo. Un
iframe carga ~1 MB de JavaScript de terceros; la fachada carga una miniatura de
~15 KB y monta el iframe al primer clic.

**La validación del lead del chat (`lib/chat/validacion.ts`) es un espejo de la
del Worker.** Si cambian las reglas allá, hay que cambiarlas aquí, o el usuario
pasa la validación local y recibe un 400.

**La imagen Open Graph debe ser JPG o PNG de 1200x630.** AVIF no lo renderizan
WhatsApp ni LinkedIn: los links compartidos salen sin imagen.

## Servicios externos

| Servicio | Qué hace |
|---|---|
| Worker `humanytek-chatbot` | API del asistente: `/api/chat`, `/api/lead`, `/api/reset`. Crea el lead en Odoo CRM |
| Worker `humanytek-contacto` | Formulario de contacto embebido en `/contacto` |
| Cloudflare Turnstile | Anti-bots del formulario de lead |
| Google Analytics 4 | Opcional, vía `NEXT_PUBLIC_GA_ID` |

Los dos Workers validan el origen contra su variable `ALLOWED_ORIGINS`. **Las URLs
de preview de Vercel no están en esa lista**, así que el chat y el formulario no
responden en los previews. Es lo esperado, no un bug.

## Seguridad

`next.config.ts` publica HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` y `Permissions-Policy`.

El CSP está en modo **Report-Only**: reporta violaciones en la consola del
navegador pero no bloquea nada. Para activarlo de verdad hay que navegar el sitio
completo (incluyendo enviar un mensaje en el chat y un lead), confirmar que no se
reporten violaciones, y cambiar la clave del header a `Content-Security-Policy`.

## Despliegue

Push a `main` va a producción. Push a cualquier otra rama genera un preview con
URL propia, que es donde conviene validar antes de mergear.
