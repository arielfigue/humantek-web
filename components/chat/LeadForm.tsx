'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { CHAT } from '@/lib/chat/config';
import { obtenerSessionId } from '@/lib/chat/sesion';
import { useTurnstile } from '@/lib/chat/useTurnstile';
import { validarLead, type CampoLead } from '@/lib/chat/validacion';

interface LeadFormProps {
  /** Se llama con el nombre capturado cuando el Worker confirma el alta. */
  onEnviado: (nombre: string) => void;
  onCancelar: () => void;
}

const CAMPOS: { clave: CampoLead; etiqueta: string; tipo: string; autoComplete: string }[] = [
  { clave: 'nombre', etiqueta: 'Nombre', tipo: 'text', autoComplete: 'name' },
  { clave: 'empresa', etiqueta: 'Empresa', tipo: 'text', autoComplete: 'organization' },
  { clave: 'correo', etiqueta: 'Correo', tipo: 'email', autoComplete: 'email' },
  { clave: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', autoComplete: 'tel' },
];

export default function LeadForm({ onEnviado, onCancelar }: LeadFormProps) {
  const [valores, setValores] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const refs = useRef<Partial<Record<CampoLead, HTMLInputElement | null>>>({});

  const {
    contenedorRef: turnstileRef,
    obtenerToken,
    reiniciar: reiniciarTurnstile,
    error: errorTurnstile,
  } = useTurnstile(CHAT.turnstileSiteKey, true);

  const actualizar = (campo: CampoLead, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
  };

  const enviar = async () => {
    const datos = {
      nombre: valores.nombre.trim(),
      empresa: valores.empresa.trim(),
      correo: valores.correo.trim(),
      telefono: valores.telefono.trim(),
    };

    const fallo = validarLead(datos);
    if (fallo) {
      setError(fallo.mensaje);
      refs.current[fallo.campo]?.focus();
      return;
    }

    let turnstileToken = '';
    if (CHAT.turnstileSiteKey) {
      turnstileToken = obtenerToken();
      if (!turnstileToken) {
        setError('Espera a que termine la verificación de seguridad.');
        return;
      }
    }

    setEnviando(true);
    setError('Enviando…');

    try {
      const res = await fetch(`${CHAT.endpoint}/api/lead`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sessionId: obtenerSessionId(),
          ...datos,
          turnstileToken,
        }),
      });

      const salida = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !salida.ok) {
        throw new Error(salida.error || 'No se pudo enviar.');
      }

      onEnviado(datos.nombre);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.');
      // Un token de Turnstile es de un solo uso: sin reset, el reintento falla.
      reiniciarTurnstile();
    } finally {
      setEnviando(false);
    }
  };

  const aviso = errorTurnstile ?? error;

  return (
    <div className="absolute inset-0 z-10 flex flex-col gap-3 overflow-y-auto rounded-2xl bg-slate-900 p-5">
      <h4 className="text-base font-semibold text-white">
        ¿Quieres que te contactemos?
      </h4>
      <p className="text-xs leading-relaxed text-slate-400">
        Déjanos tus datos y un consultor te buscará. Enviaremos esta conversación
        al equipo para que llegue con contexto.
      </p>

      {CAMPOS.map((campo) => (
        <input
          key={campo.clave}
          ref={(el) => {
            refs.current[campo.clave] = el;
          }}
          type={campo.tipo}
          autoComplete={campo.autoComplete}
          placeholder={`${campo.etiqueta} *`}
          maxLength={campo.clave === 'telefono' ? 20 : 120}
          value={valores[campo.clave]}
          onChange={(e) => actualizar(campo.clave, e.target.value)}
          aria-label={campo.etiqueta}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
        />
      ))}

      {/* Turnstile se monta aquí una vez que carga su script. */}
      <div ref={turnstileRef} className="min-h-[65px]" />

      <p className="min-h-[18px] text-xs text-rose-400" role="alert">
        {aviso}
      </p>

      <p className="text-xs text-slate-500">
        Al enviar aceptas nuestro{' '}
        <Link
          href={CHAT.urlPrivacidad}
          className="text-cyan-400 hover:text-cyan-300"
        >
          aviso de privacidad
        </Link>
        .
      </p>

      <div className="mt-auto flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancelar}
          className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={enviar}
          disabled={enviando}
          className="flex-1 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:opacity-45"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
