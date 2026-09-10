'use client';

import { useEffect, useState } from 'react';

export default function ContactoPage() {
  const [frameHeight, setFrameHeight] = useState<number>(600);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Activa la animación de entrada al montar la página
    setIsVisible(true);

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
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        
        {/* Formulario de contacto con animación de entrada (0.8s) */}
        <div 
          className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-800 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <iframe
            id="humanytek-contact-frame"
            src="https://humanytek-contacto.humanytek.workers.dev"
            style={{ width: '100%', height: `${frameHeight}px`, border: 'none', display: 'block' }}
            scrolling="no"
            title="Formulario de contacto"
          />
        </div>

        {/* Bloque de Mapa e Información de Ubicación con animación escalonada (1s) */}
        <div 
          className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all duration-1000 delay-200 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Google Maps Incrustado */}
          <div className="relative w-full h-56 sm:h-64 bg-slate-900">
            <iframe
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 transition-all duration-300"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3941426463945!2d-103.3997716!3d20.642141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae492b952287%3A0xb33bec81b752065a!2sHumanyTek!5e0!3m2!1ses!2smx!4v1710000000000!5m2!1ses!2smx"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación HumanyTek Google Maps"
            />
          </div>

          {/* Datos de Contacto */}
          <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2">
                Dirección
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Calle Coral #2766, Col. Residencial Victoria
              </p>
              <p className="text-sm leading-relaxed text-slate-300 mt-4">
                Zapopan, Jalisco, Mexico, C.P. 45089
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2">
                Contáctanos
              </h3>
              <p className="text-xs text-slate-400">Telefono:</p>
              <p className="text-sm leading-relaxed text-slate-200 mt-1 font-medium">
                +52 (33) 1983 1083 / 4
              </p>
              <p className="text-sm leading-relaxed text-slate-200 mt-4">
                Email :{" "}
                <a 
                  href="mailto:contacto@humanytek.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  contacto@humanytek.com
                </a>
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}