import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import VideoPlayer from "@/components/VideoPlayer";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "ERP: Odoo y SAP Business ByDesign",
  description:
    "Primer partner de Odoo para México e implementadores de SAP Business ByDesign. Proyectos en algunas de las empresas más grandes del país, con la experiencia que eso implica.",
  path: "/erps",
  keywords: [
    "partner Odoo México",
    "implementación Odoo",
    "SAP Business ByDesign",
    "ERP en la nube México",
  ],
});

export default function ErpsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Fondos y luces de ambientación */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* --- SECCIÓN PRINCIPAL: ODOO Y SAP BUSINESS BYDESIGN --- */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* TARJETA ODOO */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                <VideoPlayer
                  src="/odoo_es_video.mp4"
                  poster="/posters/odoo_es_video.jpg"
                  label="Video de presentación de Odoo"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  Odoo
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  SOMOS EL PRIMER PARTNER DE ODOO PARA MÉXICO
                </h2>
                <div className="text-sm text-slate-300 font-light leading-relaxed space-y-2">
                  <p>Hemos hecho proyectos en las empresas más grandes de México.</p>
                  <p className="font-medium text-white">Esto solo significa una cosa, tenemos la mayor experiencia.</p>
                </div>
              </div>
            </div>

            {/* TARJETA SAP BUSINESS BYDESIGN */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                <VideoPlayer
                  src="/sap_Business_ByDesign.mp4"
                  poster="/posters/sap_Business_ByDesign.jpg"
                  label="Video de presentación de SAP Business ByDesign"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  SAP
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  SAP BUSINESS BYDESIGN
                </h2>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  ERP en la nube para el mercado medio con el respaldo de la marca que hizo nacer este tipo de herramientas.
                </p>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* --- SECCIÓN: ALCANCE DE ODOO & INNOVACIÓN EMPRESARIAL --- */}
        <section className="py-4">
          <ScrollReveal>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 lg:p-12 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Columna Izquierda: Odoo y Apps con imagen local */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  Odoo: un ERP de gran alcance y con más de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    10,000 apps
                  </span>
                </h3>
                <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 flex items-center justify-center">
                  <Image
                    src="/images/multi-odoo.png"
                    alt="Ecosistema de aplicaciones Odoo ERP"
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Columna Derecha: SAP Business ByDesign con imagen local */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 flex items-center justify-center">
                  <Image
                    src="/images/SAP-Business-ByDesign-responsive-768x422.png"
                    alt="Interfaz SAP Business ByDesign Responsive"
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  <p>
                    Innove con un enfoque en soluciones y procesos de negocio que abarcan diferentes productos relevantes para sus divisiones empresariales, clientes e industrias en su totalidad. Eche un vistazo a nuestro roadmap para explorar sus opciones actuales, así como innovaciones planificadas y la dirección futura.
                  </p>
                  <p className="text-base font-medium text-white border-l-2 border-purple-500 pl-4 py-1">
                    El software es muy necesario pero no es suficiente.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </section>

        {/* --- TITULAR Y CONTEXTO --- */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
            {/* Aquí se eliminó la etiqueta "Soluciones ERP a Medida" */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Decida la herramienta más conveniente de acuerdo a sus necesidades y las de su empresa.
            </h1>
          </div>
        </ScrollReveal>

        {/* --- SECCIÓN DE CONSULTORÍA Y TAMAÑO DE EMPRESA --- */}
        <section className="py-4">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              {/* Columna Izquierda */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6 border-l-2 border-blue-500/60 pl-6 lg:pl-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  Implementamos sistemas ERP para{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                    Startups, empresas medianas
                  </span>{" "}
                  y grandes corporativos internacionales.
                </h2>
              </div>

              {/* Columna Derecha */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
                  <div className="relative w-full h-48 overflow-hidden rounded-xl bg-slate-950">
                    <Image
                      src="/images/photo-1522071820081-009f0129c71c.avif"
                      alt="Consultoría e Implementación ERP Humanytek"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Independientemente de la marca de su elección nuestra metodología está pensada para empresas u organizaciones que necesiten un gran trabajo de consultoría y que nos permita entregar el sueño dorado de cualquier director o empresario:
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Una empresa alineada en sus procesos y personal a las buenas prácticas del software, así como un sistema ERP alineado a las necesidades del cliente con <strong className="text-white font-semibold">estados financieros en tiempo real</strong>.
                  </p>
                  <div className="relative w-full h-48 overflow-hidden rounded-xl bg-slate-950">
                    <Image
                      src="/images/photo-1454165804606-c3d57bc86b40.avif"
                      alt="Infraestructura y Corporativos ERP"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </section>

      </div>

      <JsonLd
        data={[
          serviceSchema({
            name: "Implementación de ERP Odoo",
            description:
              "Implementación de Odoo para empresas medianas y grandes en México, incluyendo cumplimiento fiscal mexicano y CFDI.",
            path: "/erps",
            serviceType: "Implementación de ERP",
          }),
          serviceSchema({
            name: "Implementación de SAP Business ByDesign",
            description:
              "Implementación de SAP Business ByDesign, ERP en la nube para el mercado medio.",
            path: "/erps",
            serviceType: "Implementación de ERP",
          }),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "ERP's", path: "/erps" },
          ]),
        ]}
      />
    </main>
  );
}