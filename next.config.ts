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
        // Video, posters y logos cambian muy rara vez. Un año de caché
        // inmutable evita redescargarlos en cada visita; si se reemplaza un
        // archivo, se sube con nombre nuevo.
        source: '/:path*.(mp4|webm|jpg|jpeg|png|webp|avif|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
