'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const phoneNumber = "528148131032";

  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
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
    trackEvent('whatsapp_click', { origen: 'formulario_widget', dentro_de_horario: isOnline });
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Ventana flotante de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Encabezado */}
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

          {/* Mensaje según disponibilidad */}
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

          {/* Pie de ventana / Formulario */}
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
                onClick={() => trackEvent('whatsapp_click', { origen: 'fuera_de_horario' })}
                className="text-xs text-slate-400 hover:text-emerald-400 underline transition-colors"
              >
                Dejar un mensaje por WhatsApp de todos modos
              </a>
            </div>
          )}
        </div>
      )}

      {/* Botón Burbuja con Vector Corregido */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOnline ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-slate-700 hover:bg-slate-600'
        } text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center`}
        aria-label="Contacto por WhatsApp"
      >
        <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.508 0-9.989 4.481-9.989 9.989 0 1.764.459 3.486 1.332 5.006l-1.415 5.171 5.291-1.388c1.468.802 3.129 1.222 4.781 1.222 5.508 0 9.989-4.481 9.989-9.989s-4.481-9.99-9.989-9.99zm5.952 14.185c-.25.702-1.442 1.337-2.013 1.423-.52.078-1.168.113-1.882-.114-.492-.156-1.127-.361-1.957-.719-3.454-1.488-5.711-4.992-5.885-5.223-.173-.231-1.41-1.877-1.41-3.58 0-1.703.892-2.54 1.209-2.887.317-.347.692-.433.923-.433.231 0 .462.002.664.012.214.01.501-.081.785.6.288.692.98 2.398 1.066 2.571.087.173.144.375.029.605-.115.231-.173.375-.346.577-.173.202-.364.452-.52.606-.173.173-.354.361-.152.708.202.347.898 1.48 1.927 2.397 1.325 1.181 2.443 1.547 2.79 1.72.347.173.549.144.751-.087.202-.231.865-1.01 1.096-1.356.231-.347.462-.288.779-.173.317.115 2.019.952 2.365 1.125.347.173.577.26.664.404.087.144.087.837-.163 1.539z"/>
        </svg>
      </button>
    </div>
  );
}