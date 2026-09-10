'use client';

import { useEffect, useState } from 'react';

export default function ContactoPage() {
  const [frameHeight, setFrameHeight] = useState<number>(600);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'humanytek-contact-height') {
        if (typeof e.data.height === 'number') {
          setFrameHeight(e.data.height);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-6 lg:px-12 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        {/* Tarjeta contenedora con estilo Glassmorphism */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
          <iframe
            id="humanytek-contact-frame"
            src="https://humanytek-contacto.humanytek.workers.dev"
            style={{ width: '100%', height: `${frameHeight}px`, border: 'none', display: 'block' }}
            scrolling="no"
            title="Formulario de contacto"
          />
        </div>
      </div>
    </main>
  );
}