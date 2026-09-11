'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Frontera de error de la aplicación. Cubre cualquier excepción lanzada al
 * renderizar una página; el layout (navbar y footer) se conserva.
 *
 * Tiene que ser Client Component: React necesita montarlo en el cliente para
 * poder ofrecer el reintento.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción el mensaje viene ofuscado; `digest` es lo que permite
    // cruzarlo con el log del servidor en Vercel.
    console.error('error_de_pagina', error.digest ?? error.message);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12">
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Algo falló de nuestro lado
        </h1>
        <p className="text-slate-300 font-light leading-relaxed">
          No pudimos cargar esta sección. Puedes reintentar; si vuelve a ocurrir,
          escríbenos y lo revisamos.
        </p>

        {error.digest && (
          <p className="text-xs text-slate-500">
            Código de referencia:{' '}
            <code className="font-mono text-slate-400">{error.digest}</code>
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Reintentar
          </button>
          <Link
            href="/contacto"
            className="rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
