'use client';

import { useEffect, useRef, useState } from 'react';
import { CHAT } from '@/lib/chat/config';
import { useChat } from '@/lib/chat/useChat';
import TextoFormateado from './TextoFormateado';
import LeadForm from './LeadForm';

/**
 * El chat, completo. Un solo componente para los dos modos:
 * - `incrustado`: bloque dentro del contenido, en /inteligencia-artificial.
 * - `flotante`: panel de la burbuja, en el resto del sitio.
 *
 * Antes eran dos implementaciones distintas del mismo chat, una en el Worker y
 * otra copiada dentro de la página. Lo único que cambia entre modos es si se
 * pinta el botón de cerrar.
 */
interface ChatPanelProps {
  variante: 'incrustado' | 'flotante';
  onCerrar?: () => void;
}

export default function ChatPanel({ variante, onCerrar }: ChatPanelProps) {
  const { mensajes, enviar, agregarBot, ocupado } = useChat();
  const [entrada, setEntrada] = useState('');
  const [formAbierto, setFormAbierto] = useState(false);
  const [leadEnviado, setLeadEnviado] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const cajaRef = useRef<HTMLTextAreaElement>(null);

  // Seguir el hilo hacia abajo conforme llega la respuesta.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [mensajes]);

  const manejarEnvio = () => {
    if (!entrada.trim() || ocupado) return;
    void enviar(entrada);
    setEntrada('');
    if (cajaRef.current) cajaRef.current.style.height = 'auto';
  };

  const alEnviarLead = (nombre: string) => {
    setLeadEnviado(true);
    setFormAbierto(false);
    agregarBot(
      `¡Listo, ${nombre}! Enviamos tus datos al equipo junto con esta conversación. Te contactaremos pronto.`
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
      <div className="flex flex-none items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          {CHAT.titulo}
        </h3>
        {variante === 'flotante' && (
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar chat"
            className="text-xl leading-none text-slate-400 transition-colors hover:text-white"
          >
            ×
          </button>
        )}
      </div>

      {/* min-h-0 es obligatorio: sin él este hijo flex no se encoge por debajo
          de su contenido, crece con los mensajes y empuja la barra de escritura
          fuera del panel. */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversación"
        className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain p-4"
      >
        {mensajes.map((m) => {
          if (m.rol === 'error') {
            return (
              <div
                key={m.id}
                className="self-center rounded-xl bg-rose-950/60 px-3 py-2 text-xs text-rose-300"
              >
                {m.texto}
              </div>
            );
          }

          const esUsuario = m.rol === 'usuario';

          return (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed [overflow-wrap:anywhere] ${
                esUsuario
                  ? 'self-end rounded-br-sm bg-blue-600 text-white'
                  : 'self-start rounded-bl-sm border border-slate-800 bg-slate-950/80 text-slate-200'
              }`}
            >
              {m.texto ? (
                <TextoFormateado texto={m.texto} />
              ) : (
                <span className="flex gap-1 py-1" aria-label="Escribiendo">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-none items-end gap-2 border-t border-slate-800 bg-slate-900 p-3">
        <button
          type="button"
          onClick={() => setFormAbierto(true)}
          disabled={leadEnviado}
          className="flex-none whitespace-nowrap rounded-lg border border-cyan-500/60 px-3 py-2 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/10 disabled:opacity-45"
        >
          {CHAT.etiquetaLead}
        </button>

        <textarea
          ref={cajaRef}
          rows={1}
          maxLength={CHAT.maxCaracteres}
          placeholder={CHAT.placeholder}
          aria-label="Escribe tu mensaje"
          value={entrada}
          onChange={(e) => {
            setEntrada(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 110)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              manejarEnvio();
            }
          }}
          className="max-h-[110px] flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={manejarEnvio}
          disabled={ocupado || !entrada.trim()}
          className="flex-none rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:opacity-45"
        >
          Enviar
        </button>
      </div>

      {formAbierto && (
        <LeadForm
          onEnviado={alEnviarLead}
          onCancelar={() => setFormAbierto(false)}
        />
      )}
    </div>
  );
}
