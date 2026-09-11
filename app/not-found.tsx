import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * 404 propia. Sin este archivo Next sirve su página por defecto: sin navbar,
 * sin footer, sin marca y en inglés.
 */
export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La dirección que buscas no existe en humanytek.com.',
  robots: { index: false, follow: true },
};

const DESTINOS = [
  { nombre: "ERP's", href: '/erps', detalle: 'Odoo y SAP Business ByDesign' },
  { nombre: 'Metodología', href: '/metodologia', detalle: 'Visión Viable' },
  { nombre: 'Casos de éxito', href: '/casos-de-exito', detalle: 'Testimonios de clientes' },
  { nombre: 'Contacto', href: '/contacto', detalle: 'Hablemos de su proyecto' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-2xl space-y-10 text-center">
        <div className="space-y-4">
          <p className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Esta página no existe
          </h1>
          <p className="text-slate-300 font-light leading-relaxed">
            Puede que la dirección haya cambiado o que el enlace esté mal escrito.
            Estos son los destinos más buscados del sitio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {DESTINOS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-cyan-500/50 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="block text-sm font-semibold text-white">
                {d.nombre}
              </span>
              <span className="block text-xs text-slate-400">{d.detalle}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
