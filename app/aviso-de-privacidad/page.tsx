import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Aviso de privacidad",
    description:
      "Aviso de privacidad de Humanytek: qué datos personales recabamos, para qué los usamos y cómo ejercer sus derechos ARCO.",
    path: "/aviso-de-privacidad",
  }),
  // Página legal: se indexa pero no debe competir por posiciones ni aparecer
  // en resultados enriquecidos.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function AvisoDePrivacidadPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Botón para regresar al inicio */}
        <Link 
          href="/" 
          className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          ← Volver a la página principal
        </Link>

        {/* Tarjeta contenedora con diseño Glassmorphism */}
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-12 backdrop-blur-xl shadow-2xl space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <header className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Aviso de Privacidad
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Última actualización: {currentYear} • Humanytek
            </p>
          </header>

          <section className="space-y-4">
            <p>
              El presente documento constituye el Aviso de Privacidad para efectos de lo dispuesto en la 
              <strong> Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y las disposiciones que emanan de ella.
            </p>
            <p>
              Este Aviso de Privacidad (en lo sucesivo referido como &ldquo;Aviso&rdquo;) aplica a la información personal recopilada sobre el Titular por 
              <strong> HUMANYTEK</strong> en su carácter de Responsable, con domicilio ubicado en:
            </p>
            
            {/* Cuadro Domicilio Fiscal */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs leading-relaxed space-y-1">
              <p className="font-semibold text-white">HUMANYTEK</p>
              <p>Calle Coral #2766, Col. Residencial Victoria</p>
              <p>Zapopan, Jalisco, México, C.P. 45089</p>
              <p className="pt-2 text-slate-400">Teléfonos: +52 (33) 1983 1083 / 4 | +52 33 3641 1439</p>
              <p className="text-slate-400">Correo electrónico: contacto@humanytek.com</p>
            </div>

            <p>
              El presente tiene por objeto la protección de tus datos personales mediante su tratamiento legítimo, controlado e informado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">¿Qué información recopilamos?</h2>
            <p>
              El Responsable recolecta información que puede identificarle de manera razonable para la prestación de nuestros servicios tecnológicos, por ejemplo:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Nombre y apellidos</li>
              <li>Empresa o institución donde labora</li>
              <li>Dirección de correo electrónico empresarial</li>
              <li>Número telefónico de contacto</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">¿Cómo usamos y tratamos la información?</h2>
            <p>
              Al completar formularios de contacto en el sitio web o enviar correo electrónico a nuestros representantes, autorizas a HUMANYTEK a utilizar tus datos personales para las siguientes finalidades:
            </p>
            
            <strong className="block text-slate-200 mt-2">Finalidades Primarias:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identificarte, comunicarte y contactarte.</li>
              <li>Atender solicitudes de información, cotizaciones y asesoría sobre nuestros servicios ERP, Industria 4.0 y software a la medida.</li>
              <li>Actualizar nuestra base de datos de clientes y prospectos.</li>
            </ul>

            <strong className="block text-slate-200 mt-2">Finalidades Secundarias:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>Envío de boletines informativos, actualizaciones tecnológicas y material promocional sobre soluciones de Humanytek.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Transferencia de Datos Personales</h2>
            <p>
              HUMANYTEK no vende, alquila ni comparte tus datos personales con terceros no relacionados sin tu consentimiento previo, salvo las excepciones previstas en el artículo 37 de la LFPDPPP o requerimientos legales de autoridades competentes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Medidas de Seguridad</h2>
            <p>
              HUMANYTEK se compromete a guardar estricta confidencialidad de tus datos personales, manteniendo medidas de seguridad administrativas, técnicas y físicas que permitan protegerlos contra daño, pérdida, alteración, acceso o tratamiento no autorizado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">¿Cómo ejercer sus Derechos ARCO?</h2>
            <p>
              Tienes derecho en cualquier momento a ejercer tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> mediante solicitud enviada a nuestro Departamento de Datos Personales al correo:
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-blue-400 text-xs w-fit">
              contacto@humanytek.com
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Dicha solicitud deberá incluir: a) Nombre y correo de contacto; b) Documento que acredite identidad o representación legal; c) Descripción clara de los datos sobre los que busca ejercer sus derechos ARCO. La respuesta se emitirá en los plazos establecidos por la Ley.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-white">Cambios al Aviso de Privacidad</h2>
            <p className="text-xs text-slate-400">
              HUMANYTEK se reserva el derecho de actualizar periódicamente el presente Aviso para reflejar cambios en nuestras prácticas de información. Dichas modificaciones estarán disponibles siempre en este apartado de nuestro sitio web.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}