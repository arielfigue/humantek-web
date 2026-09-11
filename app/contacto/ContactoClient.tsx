'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const FORM_ORIGIN = 'https://humanytek-contacto.humanytek.workers.dev';

export default function ContactoClient() {
  const [frameHeight, setFrameHeight] = useState<number>(600);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Sólo aceptamos mensajes del Worker que sirve el formulario.
      // Sin esta comprobación cualquier ventana podía redimensionar el iframe.
      if (e.origin !== FORM_ORIGIN) return;
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

        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Cuéntanos de su{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              proyecto.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Dos horas de conversación bastan para entender qué hacer y, sobre todo,
            qué NO hacer para lograr un resultado sobresaliente. Escríbanos y lo contactamos.
          </p>
        </div>

        {/* Formulario de contacto con animación de entrada (0.8s) */}
        <ScrollReveal>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
          <iframe
            id="humanytek-contact-frame"
            src={FORM_ORIGIN}
            // El documento del Worker se sirve con fondo transparente para
            // apoyarse sobre esta tarjeta; el iframe tampoco debe pintar uno.
            style={{
              width: '100%',
              height: `${frameHeight}px`,
              border: 'none',
              display: 'block',
              background: 'transparent',
              colorScheme: 'dark',
            }}
            scrolling="no"
            title="Formulario de contacto"
          />
        </div>
        </ScrollReveal>

        {/* Bloque de Mapa e Información de Ubicación con animación escalonada (1s) */}
        <ScrollReveal>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
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
                +52 (33) 1983 1083 / 4  |  (33) 3641 1439
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
        </ScrollReveal>

      </div>
    </main>
  );
}