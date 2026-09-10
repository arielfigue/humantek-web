'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface ComparativaItem {
  id: number;
  categoria: string;
  tradicional: {
    titulo: string;
    descripcion: string;
  };
  humanytek: {
    titulo: string;
    descripcion: string;
  };
}

const COMPARATIVA_DATA: ComparativaItem[] = [
  {
    id: 1,
    categoria: "Visión Global",
    tradicional: {
      titulo: "Enfoque \"por partes\"",
      descripcion: "Es común que cliente e implementador encaren el reto implementando el sistema por partes, lo que significa que no se ve al sistema como tal sino de manera anti-sistémica."
    },
    humanytek: {
      titulo: "Enfoque sistémico",
      descripcion: "Si se trata de implementar un sistema, lo más apropiado es un enfoque sistémico, ya que el software será implementado sobre el sistema humano \"empresa\"."
    }
  },
  {
    id: 2,
    categoria: "Propósito",
    tradicional: {
      titulo: "Implementación tecnológica",
      descripcion: "Es común creer que se trata de un proyecto puramente técnico, solo porque el entregable final es la instalación de un software."
    },
    humanytek: {
      titulo: "Implementación organizacional",
      descripcion: "Se trata de dotar a las personas con las habilidades y herramientas necesarias para exprimir al máximo la potencia de la tecnología."
    }
  },
  {
    id: 3,
    categoria: "Gestión Humana",
    tradicional: {
      titulo: "Los conflictos los debe resolver el cliente",
      descripcion: "Durante el proceso surgen roces entre áreas; lo común es que el implementador se desentienda y exija soluciones al cliente."
    },
    humanytek: {
      titulo: "Gestión y administración de conflictos",
      descripcion: "Entendiendo que este es un proyecto de personas, intervenimos activamente para resolver fricciones de forma propositiva."
    }
  },
  {
    id: 4,
    categoria: "Alineación",
    tradicional: {
      titulo: "Sin objetivos o con objetivos enfrentados",
      descripcion: "Pocas veces se tiene claridad sobre el destino común, generando \"necesidades\" individuales por departamento que quedan sin resolver."
    },
    humanytek: {
      titulo: "Objetivos claros",
      descripcion: "Alineamos a todo el equipo directivo y operativo sobre las metas reales de la empresa, logrando que todos remen en la misma dirección."
    }
  },
  {
    id: 5,
    categoria: "Análisis Previo",
    tradicional: {
      titulo: "Análisis de requerimientos ilimitado",
      descripcion: "Un levantamiento extenso da una falsa sensación de control, que posteriormente detona interminables solicitudes de cambio."
    },
    humanytek: {
      titulo: "Descubrimiento natural (Sin GAP Analysis excesivo)",
      descripcion: "Omitimos el GAP Analysis que busca excusas para programar. Priorizamos el estándar del ERP para cuidar tiempo y presupuesto."
    }
  },
  {
    id: 6,
    categoria: "Procesos y Código",
    tradicional: {
      titulo: "Considerar desarrollos a la medida",
      descripcion: "Se adapta el sistema a los vicios operativos actuales, volviendo las futuras migraciones lentas, costosas y complejas."
    },
    humanytek: {
      titulo: "Re-definir procesos (Desarrollos mínimos o nulos)",
      descripcion: "Guiamos al cliente para adoptar las buenas prácticas nativas del ERP, enseñando nuevas formas de trabajo eficientes."
    }
  },
  {
    id: 7,
    categoria: "Evolución",
    tradicional: {
      titulo: "Migraciones de versión complejas",
      descripcion: "Contar con un sistema sobre-modificado convierte cada actualización de versión en un doloroso y nuevo proyecto."
    },
    humanytek: {
      titulo: "Migraciones de versión rápidas y simples",
      descripcion: "Al mantener el core del ERP sin alteraciones innecesarias, la evolución tecnológica a futuras versiones se realiza sin fricción."
    }
  },
  {
    id: 8,
    categoria: "Inversión",
    tradicional: {
      titulo: "Pago de anticipo requerido",
      descripcion: "La práctica habitual exige al cliente pagar fuertes suma por adelantado, incluso antes de haber recibido valor tangible."
    },
    humanytek: {
      titulo: "Pagos después de los avances",
      descripcion: "Buscamos certidumbre mutua: cobramos únicamente conforme el cliente valida los avances reales del proyecto."
    }
  },
  {
    id: 9,
    categoria: "Control de Tiempos",
    tradicional: {
      titulo: "Consumo de paquetes de horas",
      descripcion: "La venta de bolsas de horas no da ninguna garantía de fecha final de entrega; solo vende tiempo transcurrido."
    },
    humanytek: {
      titulo: "Monitoreo del tiempo total del proyecto",
      descripcion: "Controlamos el tiempo restante para alcanzar la salida a producción en la fecha pactada, en lugar de vender horas consumidas."
    }
  },
  {
    id: 10,
    categoria: "Planificación",
    tradicional: {
      titulo: "Planificación rígida por tareas",
      descripcion: "Se asume que cada tarea se cumplirá al pie de la letra, colapsando el cronograma cuando surgen los imponderables típicos."
    },
    humanytek: {
      titulo: "Planificación por proyecto",
      descripcion: "Administramos la incertidumbre con amortiguadores, enfocando toda la prioridad en el cumplimiento de la fecha final del proyecto."
    }
  },
  {
    id: 11,
    categoria: "Licenciamiento",
    tradicional: {
      titulo: "Adquirir todas las licencias al inicio",
      descripcion: "Exigen comprar el 100% de licencias por adelantado. Si el proyecto se frena, el cliente pierde esa inversión inicial."
    },
    humanytek: {
      titulo: "Licencias mínimas para avanzar",
      descripcion: "Sugerimos adquirir solo las licencias indispensables para arrancar, escalando el volumen únicamente cuando el avance lo requiera."
    }
  },
  {
    id: 12,
    categoria: "Autonomía",
    tradicional: {
      titulo: "Alta dependencia de soporte posterior",
      descripcion: "El proveedor mantiene cautivo al cliente con rentas o contratos de soporte eternos para poder operar el sistema."
    },
    humanytek: {
      titulo: "Independencia del cliente (Sin ataduras)",
      descripcion: "Capacitamos para lograr autosuficiencia total. Su empresa resuelve sus necesidades internas con máxima velocidad y libertad."
    }
  },
  {
    id: 13,
    categoria: "Experiencia",
    tradicional: {
      titulo: "\"El implementador es el experto\"",
      descripcion: "Se vende el mito de que por haber atendido empresas similares saben exactamente qué necesita su negocio."
    },
    humanytek: {
      titulo: "\"El cliente es el experto en su negocio\"",
      descripcion: "Unimos el conocimiento profundo que el cliente tiene de su empresa con nuestro dominio del ERP para formar un equipo ganador."
    }
  },
  {
    id: 14,
    categoria: "Datos e Información",
    tradicional: {
      titulo: "\"Los datos son problema del cliente\"",
      descripcion: "Si se ingresa basura al sistema, dará reportes basura. El proveedor tradicional se desentiende de la calidad de la información."
    },
    humanytek: {
      titulo: "Depuración cercana de datos",
      descripcion: "Nos hacemos corresponsables de auditar y limpiar los datos maestros para garantizar reportes confiables desde el día 1."
    }
  },
  {
    id: 15,
    categoria: "Velocidad",
    tradicional: {
      titulo: "Entregas lentas y desgastantes",
      descripcion: "Proyectos que se extienden por años hasta que la empresa aborta el esfuerzo por agotamiento financiero y humano."
    },
    humanytek: {
      titulo: "Tiempo récord en la entrega",
      descripcion: "Nuestra metodología permite salir a producción en tiempos significativamente menores y con un costo total inferior."
    }
  },
  {
    id: 16,
    categoria: "Sostenibilidad",
    tradicional: {
      titulo: "Ciclo de vida mediano / bajo",
      descripcion: "El enfoque tradicional provoca que el software deba reemplazarse cada 2 a 4 años por desorden u obsolescencia."
    },
    humanytek: {
      titulo: "Ciclo de vida muy largo",
      descripcion: "Nuestras implementaciones se arraigan orgánicamente en la cultura de la empresa, permaneciendo funcionales durante muchos años."
    }
  }
];

export default function MetodologiaPage() {
  const [activeTab, setActiveTab] = useState<'todos' | 'humanytek' | 'tradicional'>('todos');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenItems(COMPARATIVA_DATA.map((item) => item.id));
  const collapseAll = () => setOpenItems([]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Fondos y luces ambientadas */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* --- CABECERA Y CITA DE ALBERT EINSTEIN --- */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Transformación sin Rodeos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Metodología</span>
            </h1>

            {/* Cita en tarjeta Glassmorphism */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl relative">
              <span className="text-6xl text-blue-500/20 font-serif absolute top-2 left-4 select-none">“</span>
              <p className="text-xl sm:text-2xl italic font-light text-slate-200 leading-relaxed relative z-10">
                Locura es hacer lo mismo una y otra vez esperando obtener resultados diferentes.
              </p>
              <span className="block mt-3 text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                — Albert Einstein
              </span>
            </div>

            {/* Definición del Éxito según Humanytek */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl mx-auto pt-2">
              Para nosotros el éxito de un proyecto es que concluya en el <strong className="text-white font-medium">tiempo original planificado</strong>, que <strong className="text-white font-medium">no cueste ni un centavo extra</strong> y cumpla el alcance total; pero además, que el sistema <strong className="text-white font-medium">permanezca en la empresa por muchos años</strong> de manera totalmente autosuficiente.
            </p>
          </div>
        </ScrollReveal>

        {/* --- CONTROLES DE VISTA --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                El Enfoque Tradicional vs. La Respuesta Humanytek
              </h2>
              <p className="text-xs text-slate-400 font-light mt-1">
                Haga clic en cualquier punto para desplegar el detalle explicativo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Botones Expandir / Colapsar todo */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mr-2">
                <button
                  onClick={expandAll}
                  className="hover:text-cyan-400 underline transition-colors"
                >
                  Expandir todo
                </button>
                <span>|</span>
                <button
                  onClick={collapseAll}
                  className="hover:text-cyan-400 underline transition-colors"
                >
                  Colapsar todo
                </button>
              </div>

              {/* Selector de filtro de vista */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('todos')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'todos'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Par a Par
                </button>
                <button
                  onClick={() => setActiveTab('humanytek')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'humanytek'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Solo Humanytek
                </button>
                <button
                  onClick={() => setActiveTab('tradicional')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'tradicional'
                      ? 'bg-slate-800 text-slate-300 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Solo Tradicional
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* --- MATRIZ DESPLEGABLE DE 16 PUNTOS --- */}
        <div className="space-y-4">
          {COMPARATIVA_DATA.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <ScrollReveal key={item.id}>
                <div
                  className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                    isOpen
                      ? 'border-cyan-500/50 bg-slate-900/80 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Encabezado interactivo del punto */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-400 shrink-0 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {item.categoria}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-xs text-slate-400 font-mono">
                        Punto {item.id < 10 ? `0${item.id}` : item.id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <span className="text-xs font-medium text-cyan-400/80 group-hover:text-cyan-300">
                        {isOpen ? 'Ocultar detalles' : 'Ver detalle'}
                      </span>
                      <svg
                        className={`w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Resumen de Títulos e Información Desplegable */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 space-y-4">
                    
                    {/* Grid de Títulos / Contenido */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      
                      {/* LADO TRADICIONAL */}
                      {(activeTab === 'todos' || activeTab === 'tradicional') && (
                        <div
                          onClick={() => toggleItem(item.id)}
                          className={`cursor-pointer rounded-xl border p-4 space-y-2 transition-all ${
                            isOpen
                              ? 'border-red-500/30 bg-red-950/20'
                              : 'border-red-500/15 bg-red-950/10 hover:border-red-500/25'
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold uppercase tracking-wider">
                            ❌ Método Tradicional
                          </div>
                          <h3 className="text-base font-bold text-slate-200">
                            {item.tradicional.titulo}
                          </h3>

                          {/* Descripción explicativa (visible solo cuando se abre) */}
                          {isOpen && (
                            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-2 border-t border-red-500/20 animate-fadeIn">
                              {item.tradicional.descripcion}
                            </p>
                          )}
                        </div>
                      )}

                      {/* LADO HUMANYTEK */}
                      {(activeTab === 'todos' || activeTab === 'humanytek') && (
                        <div
                          onClick={() => toggleItem(item.id)}
                          className={`cursor-pointer rounded-xl border p-4 space-y-2 transition-all ${
                            isOpen
                              ? 'border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                              : 'border-cyan-500/20 bg-cyan-950/15 hover:border-cyan-400/30'
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider">
                            ✨ La Respuesta Humanytek
                          </div>
                          <h3 className="text-base font-bold text-white">
                            {item.humanytek.titulo}
                          </h3>

                          {/* Descripción explicativa (visible solo cuando se abre) */}
                          {isOpen && (
                            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed pt-2 border-t border-cyan-500/20 animate-fadeIn">
                              {item.humanytek.descripcion}
                            </p>
                          )}
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </main>
  );
}