'use client';

/**
 * Última red de seguridad: solo se usa si el fallo ocurre en el propio
 * RootLayout, cuando ni navbar ni footer existen. Por eso este archivo
 * renderiza sus propias etiquetas <html> y <body>, y no puede depender de
 * globals.css ni de la tipografía: los estilos van en línea.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es-MX">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020617',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            El sitio no pudo cargar
          </h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Ocurrió un error inesperado. Intenta recargar la página.
          </p>
          {error.digest && (
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
              Código de referencia: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 0,
              borderRadius: '999px',
              padding: '0.85rem 1.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
