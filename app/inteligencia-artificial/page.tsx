'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

declare global {
  interface Window {
    HUMANYTEK_CHAT?: any;
    __humanytekChatLoaded?: boolean;
  }
}

export default function InteligenciaArtificialPage() {
  useEffect(() => {
    // 1. Limpieza de instancias y banderas de sesiones previas en navegación SPA
    window.__humanytekChatLoaded = false;
    const oldHost = document.getElementById('humanytek-chat');
    if (oldHost) oldHost.remove();

    // 2. Parámetros globales del chat
    window.HUMANYTEK_CHAT = {
      target: '#humanytek-chat-box',
      height: '560px',
      title: 'HumanyTek-IA',
      greeting: 'Cuéntame... ¿Qué te gustaría saber sobre nuestras soluciones ERP, Odoo, SAP o metodología?',
      turnstileSiteKey: '0x4AAAAAAEqp0RP72xq6_sAO',
      privacyUrl: '/aviso-de-privacidad'
    };

    // 3. Retardo breve para garantizar que React haya montado el div #humanytek-chat-box
    const initTimer = setTimeout(() => {
      if (window.__humanytekChatLoaded) return;

      (function () {
        'use strict';

        function start() {
          if (window.__humanytekChatLoaded) return;

          var CFG = Object.assign(
            {
              endpoint: 'https://humanytek-chatbot.humanytek.workers.dev',
              target: null,
              height: '540px',
              floatingFallback: false,
              title: 'HumanyTek-IA',
              greeting: '¿Qué puedo hacer por ti?',
              placeholder: 'Pregúntame lo que quieras…',
              color: '#0b6e99',
              showHeader: true,
              autoOpen: false,
              maxChars: 1500,
              leadLabel: 'Contáctenme',
              turnstileSiteKey: '',
              privacyUrl: ''
            },
            window.HUMANYTEK_CHAT || {}
          );

          var mount = CFG.target ? document.querySelector(CFG.target) : null;
          if (!mount) return;

          window.__humanytekChatLoaded = true;

          var sessionId = (function () {
            var gen = function () {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0;
                return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
              });
            };
            try {
              var id = sessionStorage.getItem('hty_chat_sid');
              if (!id) {
                id = crypto.randomUUID ? crypto.randomUUID() : gen();
                sessionStorage.setItem('hty_chat_sid', id);
              }
              return id;
            } catch (e) {
              return gen();
            }
          })();

          var host = document.createElement('div');
          host.id = 'humanytek-chat';
          host.style.cssText = 'all:initial;display:block;width:100%;height:' + CFG.height + ';';
          mount.appendChild(host);

          var root = host.attachShadow({ mode: 'open' });

          var base = [
            ':host{--brand:' + CFG.color + ';}',
            '*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;}',
            '.hdr{background:var(--brand);color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex:0 0 auto;}',
            '.hdr h3{font-size:15px;font-weight:600;}',
            '.hdr button{background:transparent;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;opacity:.85;}',
            '.hdr button:hover{opacity:1;}',
            '.log{flex:1;min-height:0;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f5f8fc;}',
            '.msg{max-width:85%;padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.55;color:#1c2733;word-wrap:break-word;overflow-wrap:anywhere;}',
            '.user{align-self:flex-end;background:var(--brand);color:#fff;border-bottom-right-radius:4px;}',
            '.bot{align-self:flex-start;background:#fff;border:1px solid #e3e8ee;border-bottom-left-radius:4px;}',
            '.err{align-self:center;background:#fdecef;color:#b00020;font-size:13px;}',
            '.dots span{display:inline-block;width:6px;height:6px;margin-right:3px;border-radius:50%;background:#8b98a5;animation:b 1.2s infinite;}',
            '.dots span:nth-child(2){animation-delay:.2s;}.dots span:nth-child(3){animation-delay:.4s;}',
            '@keyframes b{0%,60%,100%{opacity:.3;}30%{opacity:1;}}',
            '.bar{display:flex;gap:8px;padding:12px;border-top:1px solid #e3e8ee;background:#fff;flex:0 0 auto;}',
            'textarea{flex:1;resize:none;border:1px solid #cfd8e3;border-radius:10px;padding:10px 12px;font-size:14.5px;max-height:110px;outline:none;color:#1c2733;background:#fff;}',
            'textarea:focus{border-color:var(--brand);}',
            '.bar button{background:var(--brand);color:#fff;border:0;border-radius:10px;padding:0 18px;font-size:14px;font-weight:600;cursor:pointer;}',
            '.bar button:disabled{opacity:.45;cursor:default;}',
            '.bar .lead{background:#fff;color:var(--brand);border:1px solid var(--brand);padding:0 12px;font-size:13px;white-space:nowrap;}',
            '.bar .lead:hover{background:#eef6fa;}',
            '.form{position:absolute;inset:0;background:#fff;padding:20px;overflow-y:auto;display:none;flex-direction:column;gap:10px;}',
            '.form.open{display:flex;}',
            '.form h4{font-size:15px;font-weight:600;color:#1c2733;}',
            '.form p{font-size:13px;color:#5b6b7c;line-height:1.5;}',
            '.form input{border:1px solid #cfd8e3;border-radius:9px;padding:9px 11px;font-size:14px;outline:none;color:#1c2733;width:100%;}',
            '.form input:focus{border-color:var(--brand);}',
            '.form .row{display:flex;gap:8px;margin-top:4px;}',
            '.form .row button{flex:1;border-radius:9px;padding:10px;font-size:14px;font-weight:600;cursor:pointer;}',
            '.form .ok{background:var(--brand);color:#fff;border:0;}',
            '.form .cancel{background:#fff;color:#5b6b7c;border:1px solid #cfd8e3;}',
            '.form .msg{font-size:13px;color:#b00020;min-height:18px;}',
            '.form a{color:var(--brand);}',
            '::slotted(div){margin:2px 0;min-height:65px;}'
          ];

          var modeCss = [
            ':host{display:block;}',
            '.wrap{height:100%;}',
            '.launcher{display:none;}',
            '.panel{position:relative;display:flex;flex-direction:column;width:100%;height:100%;max-height:100%;background:#fff;border:1px solid #e3e8ee;border-radius:14px;overflow:hidden;}',
            '.log{overscroll-behavior:contain;}',
            '.hdr .close{display:none;}'
          ];

          var style = document.createElement('style');
          style.textContent = base.concat(modeCss).join('');

          var wrap = document.createElement('div');
          wrap.className = 'wrap';
          wrap.innerHTML =
            '<section class="panel open" role="region">' +
            (CFG.showHeader ? '<div class="hdr"><h3></h3><button class="close" aria-label="Cerrar">&times;</button></div>' : '') +
            '<div class="log" role="log" aria-live="polite"></div>' +
            '<div class="bar"><button class="lead" type="button"></button><textarea rows="1" maxlength="' + CFG.maxChars + '"></textarea><button class="send">Enviar</button></div>' +
            '<div class="form"><h4>¿Quieres que te contactemos?</h4><p>Déjanos tus datos y un consultor te buscará. Enviaremos esta conversación al equipo para que llegue con contexto.</p><input class="f-nombre" type="text" placeholder="Nombre *" maxlength="120"><input class="f-empresa" type="text" placeholder="Empresa" maxlength="120"><input class="f-correo" type="email" placeholder="Correo *" maxlength="120"><input class="f-telefono" type="tel" placeholder="Teléfono" maxlength="120"><slot name="ts"></slot><div class="msg"></div>' +
            (CFG.privacyUrl ? '<p>Al enviar aceptas nuestro <a target="_blank" rel="noopener" href="' + CFG.privacyUrl + '">aviso de privacidad</a>.</p>' : '') +
            '<div class="row"><button class="cancel" type="button">Cancelar</button><button class="ok" type="button">Enviar</button></div></div></section>';

          root.append(style, wrap);

          var panel = root.querySelector('.panel') as HTMLElement;
          var log = root.querySelector('.log') as HTMLElement;
          var box = root.querySelector('textarea') as HTMLTextAreaElement;
          var sendBtn = root.querySelector('.send') as HTMLButtonElement;

          box.placeholder = CFG.placeholder;
          if (CFG.showHeader) (root.querySelector('.hdr h3') as HTMLElement).textContent = CFG.title;

          function bubble(cls: string, text?: string) {
            var el = document.createElement('div');
            el.className = 'msg ' + cls;
            if (text) el.textContent = text;
            log.appendChild(el);
            log.scrollTop = log.scrollHeight;
            return el;
          }

          function render(el: HTMLElement, text: string) {
            el.textContent = '';
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
              if (i) el.appendChild(document.createElement('br'));
              var parts = lines[i].split(/\*\*(.+?)\*\*/g);
              for (var j = 0; j < parts.length; j++) {
                if (!parts[j]) continue;
                if (j % 2) {
                  var b = document.createElement('strong');
                  b.textContent = parts[j];
                  el.appendChild(b);
                } else {
                  el.appendChild(document.createTextNode(parts[j]));
                }
              }
            }
          }

          box.addEventListener('input', function () {
            box.style.height = 'auto';
            box.style.height = Math.min(box.scrollHeight, 110) + 'px';
          });

          box.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
          });

          sendBtn.addEventListener('click', send);

          var busy = false;

          async function send() {
            var message = box.value.trim();
            if (!message || busy) return;

            busy = true;
            sendBtn.disabled = true;
            bubble('user', message);
            box.value = '';
            box.style.height = 'auto';

            var out = bubble('bot');
            out.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';

            var full = '';
            var shown = 0;
            var closed = false;
            var typing = false;

            var tick = function () {
              if (shown < full.length) {
                shown += Math.max(1, Math.ceil((full.length - shown) / 14));
                render(out, full.slice(0, shown));
                log.scrollTop = log.scrollHeight;
              }
              if (!closed || shown < full.length) requestAnimationFrame(tick);
              else typing = false;
            };

            var startTyping = function () {
              if (!typing) { typing = true; requestAnimationFrame(tick); }
            };

            try {
              var res = await fetch(CFG.endpoint + '/api/chat', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ sessionId: sessionId, message: message })
              });

              if (!res.ok || !res.body) {
                var info = await res.json().catch(function () { return {}; });
                throw new Error(info.error || 'El asistente no está disponible.');
              }

              var reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
              var buf = '';

              for (;;) {
                var chunk = await reader.read();
                if (chunk.done) break;
                buf += chunk.value;

                var sep;
                while ((sep = buf.indexOf('\n\n')) !== -1) {
                  var line = buf.slice(0, sep).trim();
                  buf = buf.slice(sep + 2);
                  if (line.indexOf('data:') !== 0) continue;

                  var payload = line.slice(5).trim();
                  if (!payload || payload === '[DONE]') continue;

                  try {
                    var data = JSON.parse(payload);
                    if (data.t) {
                      full += data.t;
                      startTyping();
                    } else if (data.e && !full) {
                      full = data.e;
                      startTyping();
                    }
                  } catch (e) {}
                }
              }

              closed = true;
              if (!full) out.textContent = 'No recibí respuesta. Intenta de nuevo.';
            } catch (err: any) {
              closed = true;
              full = full.slice(0, shown);
              out.remove();
              bubble('err', err.message || 'Error de conexión.');
            } finally {
              busy = false;
              sendBtn.disabled = false;
              box.focus();
            }
          }

          var form = root.querySelector('.form') as HTMLElement;
          var leadBtn = root.querySelector('.lead') as HTMLButtonElement;
          var msg = root.querySelector('.msg') as HTMLElement;
          var tsBox = document.createElement('div');
          tsBox.setAttribute('slot', 'ts');
          host.appendChild(tsBox);
          var tsId: any = null;
          var sent = false;

          leadBtn.textContent = CFG.leadLabel;

          function withTurnstile(cb: () => void) {
            if (!CFG.turnstileSiteKey) return cb();
            if ((window as any).turnstile) return cb();
            var id = 'cf-turnstile-api';
            var existingEl = document.getElementById(id);
            if (existingEl) { existingEl.addEventListener('load', cb); return; }
            var scriptEl = document.createElement('script');
            scriptEl.id = id;
            scriptEl.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            scriptEl.async = true;
            scriptEl.defer = true;
            scriptEl.onload = cb;
            document.head.appendChild(scriptEl);
          }

          leadBtn.addEventListener('click', function () {
            if (sent) return;
            form.classList.add('open');
            withTurnstile(function () {
              if (!CFG.turnstileSiteKey || tsId !== null || !(window as any).turnstile) return;
              tsId = (window as any).turnstile.render(tsBox, {
                sitekey: CFG.turnstileSiteKey,
                'error-callback': function (code: string) {
                  console.error('turnstile_render_error', code);
                  msg.textContent = 'No cargó la verificación de seguridad (' + code + ').';
                  return true;
                }
              });
            });
            (root.querySelector('.f-nombre') as HTMLElement).focus();
          });

          (root.querySelector('.cancel') as HTMLElement).addEventListener('click', function () {
            form.classList.remove('open');
            msg.textContent = '';
          });

          (root.querySelector('.ok') as HTMLElement).addEventListener('click', async function () {
            var okBtn = this as HTMLButtonElement;
            var datos = {
              sessionId: sessionId,
              nombre: (root.querySelector('.f-nombre') as HTMLInputElement).value.trim(),
              empresa: (root.querySelector('.f-empresa') as HTMLInputElement).value.trim(),
              correo: (root.querySelector('.f-correo') as HTMLInputElement).value.trim(),
              telefono: (root.querySelector('.f-telefono') as HTMLInputElement).value.trim(),
              turnstileToken: ''
            };

            if (!datos.nombre || !datos.correo) {
              msg.textContent = 'Nombre y correo son obligatorios.';
              return;
            }

            if (CFG.turnstileSiteKey) {
              datos.turnstileToken = (window as any).turnstile && tsId !== null
                ? (window as any).turnstile.getResponse(tsId)
                : '';
              if (!datos.turnstileToken) {
                msg.textContent = 'Espera a que termine la verificación de seguridad.';
                return;
              }
            }

            okBtn.disabled = true;
            msg.textContent = 'Enviando…';

            try {
              var res = await fetch(CFG.endpoint + '/api/lead', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(datos)
              });
              var out = await res.json().catch(function () { return {}; });
              if (!res.ok || !out.ok) throw new Error(out.error || 'No se pudo enviar.');

              sent = true;
              form.classList.remove('open');
              leadBtn.disabled = true;
              bubble('bot', '¡Listo, ' + datos.nombre + '! Enviamos tus datos al equipo junto con esta conversación. Te contactaremos pronto.');
            } catch (err: any) {
              msg.textContent = err.message;
              if ((window as any).turnstile && tsId !== null) (window as any).turnstile.reset(tsId);
            } finally {
              okBtn.disabled = false;
            }
          });

          bubble('bot', CFG.greeting);
        }

        start();
      })();
    }, 100);

    // 4. Limpieza al desmontar el componente
    return () => {
      clearTimeout(initTimer);
      window.__humanytekChatLoaded = false;
      const host = document.getElementById('humanytek-chat');
      if (host) host.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-16">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Asistente Virtual e Inteligencia Artificial
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Inteligencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Artificial</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Consulte a nuestro asistente especializado sobre metodologías, soluciones ERP (Odoo y SAP) y estrategias tecnológicas para su empresa.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[580px]">
              <div id="humanytek-chat-box" className="w-full rounded-xl overflow-hidden bg-white shadow-inner min-h-[560px]"></div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  ¿Qué puede preguntar?
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Metodología Humanytek:</strong> Diferenciadores respecto a implementaciones tradicionales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Sistemas ERP:</strong> Alcance, módulos y arquitectura de Odoo y SAP Business ByDesign.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>Casos de Éxito:</strong> Ejemplos de proyectos por industria o tamaño de empresa.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span><strong>VMI & Industria 4.0:</strong> Modelos de gestión de inventarios y automatización.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6 backdrop-blur-xl space-y-3">
                <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider">
                  Atención Personalizada
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Si prefiere hablar directamente con uno de nuestros consultores senior, puede solicitar una reunión de diagnóstico sin costo.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Contactar Consultor
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}