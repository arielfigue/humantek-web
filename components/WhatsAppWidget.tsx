'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const phoneNumber = "528148131032";

  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      // Formatear la hora local a la zona horaria 'America/Mexico_City'
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Mexico_City',
        weekday: 'short',
        hour: 'numeric',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      let day = '';
      let hour = 0;

      parts.forEach((part) => {
        if (part.type === 'weekday') day = part.value;
        if (part.type === 'hour') hour = parseInt(part.value, 10);
      });

      // Validar: Lunes a Viernes (Mon-Fri) de 9:00 a 17:59 hrs
      const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
      const isWorkingHours = hour >= 9 && hour < 18;

      setIsOnline(isWeekday && isWorkingHours);
    };

    checkOnlineStatus();
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim() || "¡Hola! Quisiera más información sobre sus servicios.";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Ventana flotante de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Encabezado dinámico */}
          <div className={`p-4 text-white flex items-center justify-between ${isOnline ? 'bg-emerald-600' : 'bg-slate-800'}`}>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                H
                <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-900 rounded-full ${isOnline ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Humanytek</h4>
                <p className="text-xs text-slate-200">
                  {isOnline ? 'En línea • Respuesta rápida' : 'Fuera de horario de atención'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Cuerpo del Mensaje segun horario */}
          <div className="p-4 bg-slate-950/90 min-h-[140px] flex flex-col justify-end space-y-3">
            {isOnline ? (
              <div className="bg-slate-800 text-slate-100 p-3 rounded-2xl rounded-tl-none text-sm max-w-[90%] shadow-md">
                ¡Hola! 👋 ¿En qué podemos ayudarte hoy?
                <span className="block text-[10px] text-slate-400 mt-1 text-right">Ahora</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-800 text-slate-100 p-3.5 rounded-2xl rounded-tl-none text-sm shadow-md leading-relaxed">
                  <p className="font-medium text-amber-400 mb-1">⏰ Fuera de horario</p>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Nuestro equipo atiende de <strong className="text-white">Lunes a Viernes de 9:00 a 18:00 hrs</strong> (Hora Centro de México).
                  </p>
                </div>

                <div className="bg-blue-950/60 border border-blue-800/50 text-blue-200 p-3 rounded-xl text-xs sm:text-sm flex items-start gap-2.5">
                  <span className="text-lg">🤖</span>
                  <div>
                    <p className="font-semibold text-blue-100">Atención 24/7 disponible</p>
                    <p className="text-blue-300/90 text-xs mt-0.5">
                      Te invitamos a chatear con nuestro <strong>asistente virtual</strong> en la esquina inferior izquierda de tu pantalla. 👈
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Formulario/Acción final */}
          {isOnline ? (
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-full transition-all"
                title="Iniciar chat en WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
              <a
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("Hola, vi que están fuera de horario pero me gustaría dejar un mensaje...")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 underline transition-colors"
              >
                Dejar un mensaje por WhatsApp de todos modos
              </a>
            </div>
          )}
        </div>
      )}

      {/* Botón Burbuja */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOnline ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-slate-700 hover:bg-slate-600'
        } text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative`}
        aria-label="Contacto por WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.636-.916-2.233-.242-.581-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </button>
    </div>
  );
}