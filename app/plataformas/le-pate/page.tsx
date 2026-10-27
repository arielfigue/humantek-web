import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * Caso Le Paté.
 *
 * Vive bajo /plataformas y no bajo /casos-de-exito a propósito: es la prueba
 * de lo que se puede automatizar, no un testimonio de cliente para el carrusel.
 *
 * Todo lo que aquí se afirma sale del README del proyecto: no hay métricas
 * inventadas. Donde el sistema todavía depende de algo (Skydropx sin validar,
 * correos con Resend) se describe la función, no un resultado.
 */

/** La cadena que se ejecuta sin que nadie capture nada a mano. */
const CADENA = [
  {
    titulo: 'El cliente compra y paga dentro de la tienda',
    texto:
      'Sin salir a otra página ni pasar por una pasarela que asuste. El formulario de tarjeta se abre sobre la misma tienda.',
  },
  {
    titulo: 'El pedido se registra solo',
    texto:
      'Nace pendiente con su número correlativo del año y su nota de venta en PDF. Los precios se recalculan en el servidor: nadie puede alterarlos desde el navegador.',
  },
  {
    titulo: 'El pago se confirma solo',
    texto:
      'Cuando el banco confirma el cobro, el pedido cambia a pagado y el cliente recibe su correo con el resumen. Nadie marca nada a mano.',
  },
  {
    titulo: 'La guía de envío se genera desde el panel',
    texto:
      'Se cotiza con la paquetería, se elige la tarifa más barata y la guía en PDF queda ligada al pedido con su número de rastreo.',
  },
  {
    titulo: 'La reposición se cobra y se repone sola',
    texto:
      'Cada cobro de una suscripción genera su pedido nuevo, vinculado al mismo cliente. Sin recordatorios ni llamadas.',
  },
  {
    titulo: 'Al cliente se le avisa en cada paso',
    texto:
      'Pago confirmado, guía generada, suscripción activa, cobro rechazado y cuenta creada. Cinco correos que salen sin que nadie los escriba.',
  },
];

const AUTOMATIZADO = [
  {
    titulo: 'La tienda se administra sola',
    texto:
      'Productos, precios, existencias, galería de fotos, videos de portada y cupones se editan desde un panel, sin llamar a nadie. Las fotos se optimizan al subirlas: una de 1.3 MB quedó en 120 KB.',
  },
  {
    titulo: 'Cada peso cuadra',
    texto:
      'Los importes se guardan en centavos para que no haya diferencias de redondeo, y todo se valida dos veces: en la pantalla y en el servidor. Un cupón nunca se consume si el pago no se completa.',
  },
  {
    titulo: 'Suscripciones con entrega recurrente',
    texto:
      'El cliente elige reponer cada 2, 4, 6 u 8 semanas y recibe su descuento. Cada entrega entra al panel como un pedido nuevo, y puede cancelar desde su cuenta cuando quiera.',
  },
  {
    titulo: 'Los envíos no se cotizan a mano',
    texto:
      'La tienda cotiza el envío nacional, genera la guía y aplica las reglas del negocio: los alimentos húmedos solo se entregan en la zona metropolitana de Guadalajara y el sistema bloquea la compra fuera de ella.',
  },
  {
    titulo: 'El cliente se atiende solo',
    texto:
      'Consulta sus pedidos, sus suscripciones, sus direcciones y hasta las mascotas registradas. La atención deja de ser "mándame un WhatsApp y lo reviso".',
  },
  {
    titulo: 'La información se captura una vez',
    texto:
      'Cupones con reglas (compra mínima, usos, vigencia, límite por cliente), encuestas con panel de respuestas y videos ordenables. Nada vive en una hoja de cálculo paralela.',
  },
];

/** Lo que resuelve el asistente de la tienda. */
const ASISTENTE_RESUELVE = [
  'Recomienda producto según especie, edad, tamaño o problema: dientes, peso, premios.',
  'Explica envíos, suscripciones, cupones y cómo usar la cuenta.',
  'Con sesión iniciada, responde por pedidos, pagos, guías, suscripción y mascotas del cliente.',
  'Si algo se sale de su alcance, pasa la conversación a una persona con el correo del cliente.',
];

/** Los límites que el asistente no puede cruzar, ni con instrucciones del dueño. */
const ASISTENTE_LIMITES = [
  'No inventa precios, existencias ni tiempos de entrega.',
  'No ve datos de otras personas: solo los de quien está conectado.',
  'No da consejos veterinarios ni diagnósticos.',
  'No pide datos de tarjeta ni contraseñas.',
];

/** Lo que cambia en la operación diaria, en una línea cada uno. */
const SIN_MANOS = [
  'Nadie captura un pedido dos veces.',
  'Nadie persigue un pago: el pedido entra pagado y confirmado.',
  'Nadie arma una guía de envío a mano.',
  'Nadie recuerda cuándo toca reponer: el cobro y el pedido se generan solos.',
  'Nadie contesta la misma duda veinte veces: el asistente responde lo repetitivo.',
  'Nadie busca el historial del cliente en tres sistemas distintos.',
];

export const metadata: Metadata = pageMetadata({
  title: 'Caso Le Paté',
  description:
    'Tienda autoadministrable para Le Paté: cobros, suscripciones y guías automáticas, más un asistente con IA que atiende, recomienda y resuelve dudas a cualquier hora.',
  path: '/plataformas/le-pate',
  keywords: [
    'tienda en línea autoadministrable',
    'asistente de IA para tienda en línea',
    'automatización de pedidos',
    'suscripciones con reposición automática',
    'caso de plataforma a la medida',
  ],
});

export default function LePatePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* --- HERO --- */}
      <section className="relative px-6 pt-32 pb-20 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.20),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Le Paté:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                una tienda que se opera casi sola
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Patés y caldos para perros y gatos, vendidos en línea. Reconstruimos
              su tienda para que el pedido se cobre, se registre, se confirme y
              se reponga sin que nadie capture nada dos veces. Y le integramos un
              asistente con IA que atiende, recomienda y resuelve dudas a
              cualquier hora.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <Link
                href="/contacto"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Quiero algo así en mi operación
              </Link>
              <a
                href="https://www.lepate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Ver la tienda en vivo ↗
              </a>
            </div>

            <p>
              <Link
                href="/plataformas"
                className="text-xs text-slate-400 underline transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                ← Volver a Plataformas
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* --- LA CADENA AUTOMATIZADA --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                De la compra a la reposición, sin manos
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Esta es la cadena completa que hoy corre sola. En la mayoría de
                las empresas, cada uno de estos pasos es una persona copiando
                datos de un lado a otro.
              </p>
            </div>

            <ol className="mt-12 space-y-10">
              {CADENA.map((paso, indice) => (
                <li key={paso.titulo} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-sm font-bold text-cyan-400">
                      {indice + 1}
                    </span>
                    {indice < CADENA.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-500/40 to-transparent"
                      />
                    )}
                  </div>

                  <div className="pb-2 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {paso.titulo}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                      {paso.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </section>

      {/* --- QUÉ SE AUTOMATIZÓ --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Qué quedó automatizado
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Seis frentes que antes dependían de una persona y hoy dependen
                del sistema.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {AUTOMATIZADO.map((item) => (
                <div
                  key={item.titulo}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-3 transition-colors hover:border-cyan-500/40"
                >
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {item.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- ASISTENTE DE IA --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80 relative">
        <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Nutri: el asistente que atiende y vende
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Al cliente nuevo lo ayuda a elegir; al frecuente le resuelve la
                duda de siempre sin que nadie del equipo repita la misma
                respuesta. Funciona dentro de la tienda, a cualquier hora.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lo que sí hace */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                <h3 className="text-lg font-bold text-white leading-snug">
                  Qué resuelve
                </h3>
                <ul className="mt-6 space-y-4">
                  {ASISTENTE_RESUELVE.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Los límites */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col">
                <h3 className="text-lg font-bold text-white leading-snug">
                  Lo que no hace
                </h3>
                <ul className="mt-6 space-y-3 flex-1">
                  {ASISTENTE_LIMITES.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-slate-300 font-light leading-relaxed"
                    >
                      <span aria-hidden="true" className="text-slate-500">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-slate-800 pt-4 text-xs text-slate-400 leading-relaxed">
                  El tono y lo que recomienda se editan desde el panel del
                  negocio. Estas reglas no se tocan desde ahí.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="https://www.lepate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-7 py-3.5 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Probar el asistente en lepate.com ↗
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* --- QUÉ SIGNIFICA EN LA OPERACIÓN --- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Qué significa en el día a día
            </h2>

            <ul className="space-y-4">
              {SIN_MANOS.map((linea) => (
                <li key={linea} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <p className="text-base text-slate-200 font-light leading-relaxed">
                    {linea}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CIERRE --- */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 border-t border-slate-800/80">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 p-8 sm:p-12 backdrop-blur-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              ¿Tu operación tiene las mismas fugas?
            </h2>

            <p className="mx-auto max-w-2xl text-base text-slate-300 font-light leading-relaxed">
              Pedidos que se capturan dos veces, cobros que alguien persigue,
              guías que se arman a mano. En 15 minutos te decimos cuál de esas
              se puede quitar de tu camino.
            </p>

            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Agendar llamada de 15 min
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Plataformas', path: '/plataformas' },
            { name: 'Le Paté', path: '/plataformas/le-pate' },
          ]),
        ]}
      />
    </main>
  );
}
