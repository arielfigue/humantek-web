import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // AVIF primero: pesa ~20% menos que WebP, y los navegadores que no lo
    // soportan reciben WebP automáticamente.
    formats: ['image/avif', 'image/webp'],
    // Los logos se pintan en cajas de ~200px; no hace falta generar variantes
    // gigantes que nadie descarga.
    imageSizes: [16, 32, 64, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/:path*.(mp4|webm|jpg|jpeg|png|webp|avif|svg)',
        headers: [
          {
            // Sin `immutable`: estos archivos no llevan hash en el nombre, así
            // que reemplazar uno debe surtir efecto en horas, no en un año.
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
