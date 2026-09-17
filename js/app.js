/* =========================================================
   DATOS DE EJEMPLO
   Los puntajes GE de los equipos marcados con fuente:"PDF"
   provienen del ejemplo de clasificación de equipos del
   material del curso, para mantener consistencia metodológica.
========================================================= */

let equipos = [
  {
    id:"EQ-0142", nombre:"Equipo de anestesia", marca:"Dräger Perseus A500", serie:"DR-2021-3391",
    area:"Quirófano 1", categoria:"Terapéutico", estado:"Operativo",
    adquisicion:"2021-03-14", instalacion:"2021-04-05", fechaAlta:"2025-08-28", vidaUtilAnios:12,
    proveedor:"Dräger México", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Alto",
    ge:{funcion:10, aplicacion:5, mantenimiento:5, antecedentes:0},
    accesorios:["Vaporizador de agente inhalado","Circuito de paciente reutilizable","Sensor de CO₂"],
    manuales:["Manual de operador (ES)", "Manual de servicio técnico"],
    garantia:"Vigente hasta marzo 2026 · cobertura total con proveedor.",
    historial:[
      {fecha:"2026-07-02", tipo:"Preventivo", detalle:"IMP trimestral completado sin hallazgos."},
      {fecha:"2026-04-01", tipo:"Preventivo", detalle:"IMP trimestral, calibración de flujómetro."},
      {fecha:"2025-11-20", tipo:"Correctivo", detalle:"Reemplazo de sensor de O₂ por desgaste."}
    ]
  },
  {
    id:"EQ-0198", nombre:"Desfibrilador / monitor", marca:"Philips HeartStart XL+", serie:"PH-2020-1187",
    area:"Urgencias", categoria:"Terapéutico", estado:"Operativo",
    adquisicion:"2020-06-02", instalacion:"2020-06-20", fechaAlta:"2025-08-28", vidaUtilAnios:10,
    proveedor:"Philips Healthcare", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Alto",
    ge:{funcion:9, aplicacion:5, mantenimiento:4, antecedentes:0},
    accesorios:["Palas de desfibrilación adulto/pediátrico","Cable de 3 derivaciones"],
    manuales:["Manual de operador (ES)"],
    garantia:"Vencida · en contrato de mantenimiento por evento.",
    historial:[
      {fecha:"2026-08-10", tipo:"Preventivo", detalle:"IMP semestral, prueba de descarga OK."},
      {fecha:"2026-02-05", tipo:"Preventivo", detalle:"IMP semestral, reemplazo de batería."}
    ]
  },
  {
    id:"EQ-0231", nombre:"Electrocardiógrafo, 3 canales", marca:"GE MAC 2000", serie:"GE-2019-0765",
    area:"Cardiología", categoria:"Diagnóstico", estado:"Operativo",
    adquisicion:"2019-09-18", instalacion:"2019-10-02", fechaAlta:"2025-08-28", vidaUtilAnios:8,
    proveedor:"GE Healthcare", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Medio",
    ge:{funcion:6, aplicacion:3, mantenimiento:5, antecedentes:2},
    accesorios:["Cable de paciente 10 derivaciones","Electrodos reutilizables"],
    manuales:["Manual de operador (ES)","Guía rápida"],
    garantia:"Vencida.",
    historial:[
      {fecha:"2026-06-14", tipo:"Correctivo", detalle:"Falla intermitente de trazo, cable reemplazado."},
      {fecha:"2026-01-10", tipo:"Preventivo", detalle:"IMP semestral realizado."}
    ]
  },
  {
    id:"EQ-0305", nombre:"Sistema de videoendoscopia", marca:"Olympus EVIS X1", serie:"OL-2022-4402",
    area:"Endoscopía", categoria:"Diagnóstico", estado:"Operativo",
    adquisicion:"2022-01-25", instalacion:"2022-02-10", fechaAlta:"2025-08-28", vidaUtilAnios:8,
    proveedor:"Olympus Latinoamérica", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Medio",
    ge:{funcion:6, aplicacion:3, mantenimiento:3, antecedentes:0},
    accesorios:["Endoscopio flexible","Fuente de luz LED","Monitor 4K"],
    manuales:["Manual de operador (ES/EN)"],
    garantia:"Vigente hasta enero 2027.",
    historial:[
      {fecha:"2026-05-19", tipo:"Preventivo", detalle:"IMP anual, verificación óptica sin hallazgos."}
    ]
  },
  {
    id:"EQ-0356", nombre:"Unidad electroquirúrgica", marca:"Valleylab FT10", serie:"VL-2021-9012",
    area:"Quirófano 2", categoria:"Terapéutico", estado:"En mantenimiento",
    adquisicion:"2021-11-03", instalacion:"2021-11-22", fechaAlta:"2025-08-28", vidaUtilAnios:10,
    proveedor:"Medtronic", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Alto",
    ge:{funcion:9, aplicacion:4, mantenimiento:3, antecedentes:0},
    accesorios:["Lápiz electroquirúrgico","Placa de retorno de paciente"],
    manuales:["Manual de operador (ES)"],
    garantia:"Vigente hasta noviembre 2025 · por vencer.",
    historial:[
      {fecha:"2026-08-24", tipo:"Correctivo", detalle:"En taller: verificación de potencia de salida."}
    ]
  },
  {
    id:"EQ-0410", nombre:"Monitor fetal", marca:"Edan F9 Express", serie:"ED-2020-7734",
    area:"Tococirugía", categoria:"Diagnóstico", estado:"Operativo",
    adquisicion:"2020-04-11", instalacion:"2020-04-28", fechaAlta:"2025-08-28", vidaUtilAnios:8,
    proveedor:"Edan Instruments", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Medio",
    ge:{funcion:7, aplicacion:3, mantenimiento:3, antecedentes:0},
    accesorios:["Transductor de FCF","Transductor de actividad uterina"],
    manuales:["Manual de operador (ES)"],
    garantia:"Vencida.",
    historial:[
      {fecha:"2026-03-29", tipo:"Preventivo", detalle:"IMP anual completado."}
    ]
  },
  {
    id:"EQ-0512", nombre:"Lámpara quirúrgica portátil", marca:"Welch Allyn LS-150", serie:"WA-2018-2290",
    area:"Quirófano 2", categoria:"Otros", estado:"Operativo",
    adquisicion:"2018-02-20", instalacion:"2018-03-05", fechaAlta:"2025-08-28", vidaUtilAnios:12,
    proveedor:"Welch Allyn", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Bajo",
    ge:{funcion:2, aplicacion:4, mantenimiento:3, antecedentes:-1},
    accesorios:["Batería de respaldo"],
    manuales:["Manual de operador (ES)"],
    garantia:"Vencida.",
    historial:[
      {fecha:"2025-09-02", tipo:"Correctivo", detalle:"Reemplazo de foco LED."}
    ]
  },
  {
    id:"EQ-0577", nombre:"Fuente de luz para fibra óptica", marca:"Storz Xenon 300", serie:"ST-2019-5581",
    area:"Endoscopía", categoria:"Otros", estado:"Operativo",
    adquisicion:"2019-07-30", instalacion:"2019-08-15", fechaAlta:"2025-08-28", vidaUtilAnios:8,
    proveedor:"Karl Storz", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"Bajo",
    ge:{funcion:7, aplicacion:3, mantenimiento:3, antecedentes:-2},
    accesorios:["Cable de fibra óptica"],
    manuales:["Manual de operador (ES)"],
    garantia:"Vencida.",
    historial:[]
  },
  {
    id:"EQ-0640", nombre:"Computadora, micro (PC)", marca:"Dell OptiPlex", serie:"DL-2023-1120",
    area:"Administración", categoria:"TI / Activo", estado:"Operativo",
    adquisicion:"2023-05-08", instalacion:"2023-05-15", fechaAlta:"2025-08-28", vidaUtilAnios:5,
    proveedor:"Dell México", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"No aplica",
    ge:{funcion:3, aplicacion:3, mantenimiento:1, antecedentes:-2},
    accesorios:[],
    manuales:[],
    garantia:"Vigente hasta mayo 2026.",
    historial:[]
  },
  {
    id:"EQ-0701", nombre:"Laptop de coordinación", marca:"Lenovo ThinkPad E14", serie:"LN-2024-3312",
    area:"Coordinación Biomédica", categoria:"TI / Activo", estado:"Operativo",
    adquisicion:"2024-01-10", instalacion:"2024-01-12", fechaAlta:"2025-08-28", vidaUtilAnios:4,
    proveedor:"Lenovo México", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"No aplica",
    ge:{funcion:3, aplicacion:1, mantenimiento:1, antecedentes:-2},
    accesorios:["Cargador", "Mochila protectora"],
    manuales:[],
    garantia:"Vigente hasta enero 2027.",
    historial:[]
  },
  {
    id:"EQ-0702", nombre:"Celular de guardias técnicas", marca:"Samsung Galaxy A54", serie:"SM-2024-8871",
    area:"Ingeniería Biomédica", categoria:"TI / Activo", estado:"Operativo",
    adquisicion:"2024-03-02", instalacion:"2024-03-02", fechaAlta:"2025-08-28", vidaUtilAnios:3,
    proveedor:"Samsung México", proveedorServicio:"SimplicAI — Gestión integral (contrato vigente)", tipoRiesgo:"No aplica",
    ge:{funcion:2, aplicacion:1, mantenimiento:1, antecedentes:-2},
    accesorios:["Case protector"],
    manuales:[],
    garantia:"Vigente hasta marzo 2026.",
    historial:[]
  }
];

let checklists = {}; // por equipo.id: {items:[{label, checked}], responsable, nota, guardadoHoy:bool, hora}
let solicitudes = []; // reportes generados desde el modal
let correctivo = [
  {folio:"MC-0891", equipoId:"EQ-0356", origen:"Ronda de piso", categoria:"Regular", estado:"Resuelto por proveedor", tecnico:"J. Alvarado", fecha:"2026-08-24",
    notasProveedor:"Se verificó potencia de salida y se ajustó calibración del generador. Equipo probado en vacío y con carga, funcionando dentro de parámetros.", resueltoPor:"simplicai_admin", fechaResuelto:"2026-08-26", validadoPor:"", fechaCierre:"", comentarioValidacion:"", costoEstimado:1450,
    bitacora:[
      {fecha:"2026-08-24", hora:"10:05", usuario:"J. Alvarado", evento:"Orden creada durante ronda de piso."},
      {fecha:"2026-08-26", hora:"15:30", usuario:"simplicai_admin", evento:"Marcada como resuelta por el proveedor."}
    ]},
  {folio:"MC-0887", equipoId:"EQ-0231", origen:"Reporte de usuario", categoria:"Urgente", estado:"Cerrada", tecnico:"L. Ramírez", fecha:"2026-08-18",
    notasProveedor:"Se sustituyó el cable de paciente dañado y se realizó prueba de trazo en las 10 derivaciones. Sin hallazgos adicionales.", resueltoPor:"simplicai_admin", fechaResuelto:"2026-08-19", validadoPor:"esaupreciado", fechaCierre:"2026-08-20", comentarioValidacion:"Verificado en sitio, equipo operando con normalidad.", costoEstimado:2400,
    bitacora:[
      {fecha:"2026-08-18", hora:"09:12", usuario:"Personal del hospital", evento:"Orden creada — reporte de usuario."},
      {fecha:"2026-08-19", hora:"14:50", usuario:"simplicai_admin", evento:"Marcada como resuelta por el proveedor."},
      {fecha:"2026-08-20", hora:"09:40", usuario:"esaupreciado", evento:"Validada y cerrada por el hospital."}
    ]},
  {folio:"MC-0879", equipoId:"EQ-0512", origen:"IMP programado", categoria:"Pospuesta", estado:"Abierta", tecnico:"Antonio Pérez", fecha:"2026-08-11",
    notasProveedor:"", resueltoPor:"", fechaResuelto:"", validadoPor:"", fechaCierre:"", comentarioValidacion:"",
    bitacora:[{fecha:"2026-08-11", hora:"08:00", usuario:"Sistema", evento:"Orden creada — mantenimiento preventivo programado."}]}
];
let correctivoFolioSeq = 892;
let solicitudFolioSeq = 1;

// Solicitudes generadas por el Técnico Biomédico (rutina con hallazgos, o envío a
// servicio) que deben ser aprobadas por el Coordinador/Director antes de convertirse
// en una orden real de Órdenes de Mantenimiento.
let solicitudesPendientes = [
  {id:"AP-0001", tipo:"checklist", equipoId:"EQ-0410", motivo:"Verificación de alarmas audibles y visuales: la alarma de FCF se escucha muy baja, posible falla del altavoz.",
    urgencia:"Regular", solicitadoPor:"octaviorojas", fecha:"2026-08-27", hora:"08:20", estado:"Pendiente", motivoRechazo:"", ordenFolio:""},
  {id:"AP-0002", tipo:"servicio", equipoId:"EQ-0577", motivo:"La fuente de luz parpadea intermitentemente al usarse en endoscopías, dificultando la visualización.",
    urgencia:"Urgente", solicitadoPor:"octaviorojas", fecha:"2026-08-27", hora:"12:05", estado:"Pendiente", motivoRechazo:"", ordenFolio:""}
];
let solicitudPendienteSeq = 3;

/* =========================================================
   DATOS DEL PORTAL DE PROVEEDOR (CLÉRA)
   "Hospital General del Valle" (HOSP-1) es el mismo hospital
   modelado arriba: sus equipos y órdenes son los mismos arreglos
   `equipos` y `correctivo`, así que lo que cierre el proveedor
   aquí se refleja también en el software del hospital.
   Los otros dos hospitales son clientes de ejemplo, con datos
   propios y más simples (solo para este portal).
========================================================= */
// Técnicos de campo del proveedor disponibles para asignar a una orden.
// "Antonio Pérez" tiene su propio login (antonioperez); los demás son de ejemplo.
const TECNICOS_PROVEEDOR = ["Antonio Pérez", "Diana Cortés", "Marco Salinas"];

let hospitales = [
  {
    id:"HOSP-1", nombre:"Hospital General del Valle", esReal:true,
    tipo:"Privado", ciudad:"Zapopan, Jalisco", direccion:"Av. Patria 1450, Col. Jardines de Guadalupe",
    contacto:"M. Gutiérrez — Coordinación Biomédica", telefono:"33 1234 5678",
    contrato:"Gestión integral (preventivo + correctivo)", inicioServicio:"2024-02-01",
    contratoValor:"$68,000 MXN / mes", contratoRenovacion:"2027-02-01",
    modeloServicio:"Autogestionado"
  },
  {
    id:"HOSP-2", nombre:"Clínica Santa Fe", esReal:false,
    tipo:"Privado", ciudad:"Zapopan, Jalisco", direccion:"Av. Acueducto 890, Puerta de Hierro",
    contacto:"Dr. Raúl Beltrán — Dirección Médica", telefono:"33 2233 4455",
    contrato:"Mantenimiento preventivo trimestral", inicioServicio:"2025-05-14",
    contratoValor:"$22,500 MXN / mes", contratoRenovacion:"2026-10-15",
    modeloServicio:"Gestionado por SimplicAI",
    equiposResumen:[
      {id:"HOSP2-EQ1", nombre:"Incubadora neonatal", marca:"Dräger Caleo", area:"Neonatología", estado:"Operativo", serie:"DR-2022-1145"},
      {id:"HOSP2-EQ2", nombre:"Ventilador de transporte", marca:"Hamilton T1", area:"Urgencias", estado:"Operativo", serie:"HM-2021-3390"},
      {id:"HOSP2-EQ3", nombre:"Monitor de signos vitales", marca:"Mindray uMEC12", area:"Hospitalización", estado:"En mantenimiento", serie:"MD-2020-7712"},
      {id:"HOSP2-EQ4", nombre:"Bomba de infusión", marca:"B. Braun Infusomat", area:"UCI", estado:"Fuera de servicio", serie:"BB-2019-4481"}
    ],
    ordenesResumen:[
      {folio:"MC-S201", equipoId:"HOSP2-EQ4", equipoNombre:"Bomba de infusión", origen:"Reporte de usuario", detalle:"Pantalla no enciende, posible falla de fuente interna.", categoria:"Urgente", estado:"Abierta", tecnico:"Antonio Pérez", fecha:"2026-08-22", notasProveedor:"", resueltoPor:"", fechaResuelto:"", validadoPor:"", fechaCierre:"", comentarioValidacion:"",
        bitacora:[{fecha:"2026-08-22", hora:"09:14", usuario:"Personal del hospital", evento:"Orden creada — reporte de usuario."}]},
      {folio:"MC-S198", equipoId:"HOSP2-EQ3", equipoNombre:"Monitor de signos vitales", origen:"IMP programado", detalle:"Mantenimiento preventivo trimestral en curso.", categoria:"Regular", estado:"En proceso", tecnico:"J. Alvarado", fecha:"2026-08-19", notasProveedor:"", resueltoPor:"", fechaResuelto:"", validadoPor:"", fechaCierre:"", comentarioValidacion:"",
        bitacora:[{fecha:"2026-08-19", hora:"08:00", usuario:"Sistema", evento:"Orden creada — mantenimiento preventivo programado."}, {fecha:"2026-08-19", hora:"11:20", usuario:"simplicai_admin", evento:"Técnico asignado, orden puesta en proceso."}]},
      {folio:"MC-S190", equipoId:"HOSP2-EQ1", equipoNombre:"Incubadora neonatal", origen:"Reporte de usuario", detalle:"Alarma de temperatura se activaba sin causa aparente.", categoria:"Urgente emergencia", estado:"Cerrada", tecnico:"L. Ramírez", fecha:"2026-07-30", notasProveedor:"Se recalibró sensor de temperatura y se sustituyó cable dañado. Equipo probado 24h sin incidentes.", resueltoPor:"simplicai_admin", fechaResuelto:"2026-08-01", validadoPor:"Dr. Raúl Beltrán", fechaCierre:"2026-08-02", comentarioValidacion:"Confirmado con enfermería del área, sin nuevas alarmas.",
        bitacora:[
          {fecha:"2026-07-30", hora:"07:45", usuario:"Personal del hospital", evento:"Orden creada — reporte de usuario (urgente por emergencia)."},
          {fecha:"2026-08-01", hora:"16:10", usuario:"simplicai_admin", evento:"Marcada como resuelta por el proveedor."},
          {fecha:"2026-08-02", hora:"10:05", usuario:"Dr. Raúl Beltrán", evento:"Validada y cerrada por el hospital."}
        ]}
    ]
  },
  {
    id:"HOSP-3", nombre:"Hospital Regional Tonalá", esReal:false,
    tipo:"Público", ciudad:"Tonalá, Jalisco", direccion:"Calz. Tonalá 456, Col. Loma Dorada",
    contacto:"Ing. Patricia Loza — Ingeniería Biomédica", telefono:"33 5566 7788",
    contrato:"Servicio por tiempo y material", inicioServicio:"2025-11-02",
    contratoValor:"Por evento (tarifa + refacciones)", contratoRenovacion:"2027-03-01",
    modeloServicio:"Autogestionado",
    equiposResumen:[
      {id:"HOSP3-EQ1", nombre:"Rayos X portátil", marca:"GE AMX 240", area:"Urgencias", estado:"Operativo", serie:"GE-2018-5521"},
      {id:"HOSP3-EQ2", nombre:"Autoclave de vapor", marca:"Tuttnauer 3870", area:"CEyE", estado:"Operativo", serie:"TT-2020-2290"},
      {id:"HOSP3-EQ3", nombre:"Ultrasonido portátil", marca:"Sonosite Edge II", area:"Urgencias", estado:"Operativo", serie:"SS-2021-8834"}
    ],
    ordenesResumen:[
      {folio:"MC-S310", equipoId:"HOSP3-EQ2", equipoNombre:"Autoclave de vapor", origen:"Reporte de usuario", detalle:"Fuga de vapor en junta de puerta.", categoria:"Regular", estado:"Abierta", tecnico:"Sin asignar", fecha:"2026-08-20", notasProveedor:"", resueltoPor:"", fechaResuelto:"", validadoPor:"", fechaCierre:"", comentarioValidacion:"",
        bitacora:[{fecha:"2026-08-20", hora:"13:40", usuario:"Personal del hospital", evento:"Orden creada — reporte de usuario."}]},
      {folio:"MC-S305", equipoId:"HOSP3-EQ1", equipoNombre:"Rayos X portátil", origen:"IMP programado", detalle:"Verificación anual de blindaje y calibración.", categoria:"Pospuesta", estado:"Abierta", tecnico:"Sin asignar", fecha:"2026-08-05", notasProveedor:"", resueltoPor:"", fechaResuelto:"", validadoPor:"", fechaCierre:"", comentarioValidacion:"",
        bitacora:[{fecha:"2026-08-05", hora:"08:00", usuario:"Sistema", evento:"Orden creada — mantenimiento preventivo programado."}]}
    ]
  }
];

const CHECK_ITEMS = [
  "Verificación visual de carcasa, cables y conectores",
  "Prueba de encendido y arranque",
  "Verificación de alarmas audibles y visuales",
  "Limpieza superficial según protocolo",
  "Verificación de batería / respaldo de energía"
];

function initChecklists(){
  equipos.filter(esEquipoMedico).forEach(e=>{
    checklists[e.id] = {
      items: CHECK_ITEMS.map(label=>({label, checked:false})),
      responsable:"",
      nota:"",
      guardadoHoy:false,
      hora:"",
      incidencias:[]
    };
  });
}
initChecklists();

/* ===================== HELPERS ===================== */
function geTotal(ge){ return ge.funcion + ge.aplicacion + ge.mantenimiento + ge.antecedentes; }
function geClasificacion(total){ return total >= 12 ? "I" : "N"; }
function geFrecuencia(total){
  if(total < 12) return "—";
  if(total >= 19) return "Trimestral";
  if(total >= 15) return "Semestral";
  return "Anual";
}
function geFrecPill(total){
  if(total < 12) return '<span class="pill pill-gray">No aplica</span>';
  if(total >= 19) return '<span class="pill pill-red">Trimestral</span>';
  if(total >= 15) return '<span class="pill pill-amber">Semestral</span>';
  return '<span class="pill pill-green">Anual</span>';
}
function fmtDate(iso){
  const d = new Date(iso+"T00:00:00");
  return d.toLocaleDateString('es-MX',{day:'2-digit', month:'short', year:'numeric'});
}
function equipoById(id){ return equipos.find(e=>e.id===id); }

// Traduce el puntaje de "función" del cálculo GE a la descripción clínica de la
// tabla del programa de mantenimiento (Apoyo vital, Cirugía y cuidados intensivos, etc).
const FUNCION_CLINICA_LABELS = {
  10:"Apoyo vital", 9:"Cirugía y cuidados intensivos", 8:"Fisioterapia y tratamiento",
  7:"Control de cirugía y cuidados intensivos", 6:"Control fisiológico adicional y diagnóstico",
  5:"Análisis de laboratorio", 4:"Accesorios de laboratorio", 3:"Computadoras y afines",
  2:"Relacionados con el paciente y otros"
};
function funcionClinicaLabel(e){ return FUNCION_CLINICA_LABELS[e.ge.funcion] || 'Sin clasificar'; }

// Vida útil estimada en texto, con el año en que se cumpliría según la fecha de adquisición.
function vidaUtilLabel(e){
  if(!e.vidaUtilAnios) return 'Sin registrar';
  const anioAdquisicion = new Date(e.adquisicion + 'T00:00:00').getFullYear();
  const anioVence = anioAdquisicion + e.vidaUtilAnios;
  return e.vidaUtilAnios + ' años (vence ' + anioVence + ')';
}
const TOAST_ICONS = {
  info: '<path d="M20 6L9 17l-5-5"/>',
  success: '<path d="M20 6L9 17l-5-5"/>',
  warning: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/>',
  danger: '<path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9"/>'
};
function showToast(msg, tone){
  tone = tone || 'info';
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = 'toast-item tone-' + tone;
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">${TOAST_ICONS[tone] || TOAST_ICONS.info}</svg><span>${msg}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  setTimeout(()=>{
    el.classList.remove('show');
    setTimeout(()=> el.remove(), 300);
  }, 4200);
}

/* ---- Notificaciones al iniciar sesión, según el rol ---- */
function pctCumplimientoHoy(){
  const total = Object.keys(checklists).length;
  const completados = Object.values(checklists).filter(c=>c.guardadoHoy).length;
  return {completados, total, pct: total ? Math.round((completados/total)*100) : 0};
}
function equiposNoOperativos(){
  return {
    fueraServicio: equipos.filter(e=>e.estado==='Fuera de servicio').length,
    enMantenimiento: equipos.filter(e=>e.estado==='En mantenimiento').length
  };
}
function ordenesEmergenciaActivas(){
  return correctivo.filter(c=>c.categoria==='Urgente emergencia' && c.estado!=='Cerrada');
}
function equiposConIMPVencido(){
  // Compara la fecha del último mantenimiento preventivo registrado contra la
  // frecuencia que le corresponde según su clasificación GE (4 / 6 / 12 meses).
  const hoy = new Date();
  return equipos.filter(e=>{
    const total = geTotal(e.ge);
    if(geClasificacion(total) !== 'I') return false;
    const freq = geFrecuencia(total);
    const meses = freq === 'Trimestral' ? 4 : (freq === 'Semestral' ? 6 : 12);
    const preventivos = (e.historial || []).filter(h=>h.tipo==='Preventivo').sort((a,b)=> b.fecha.localeCompare(a.fecha));
    if(preventivos.length === 0) return true;
    const limite = new Date(preventivos[0].fecha + 'T00:00:00');
    limite.setMonth(limite.getMonth() + meses);
    return hoy >= limite;
  });
}
function showLoginNotifications(user){
  const role = USER_ROLES[user].role;
  const prog = pctCumplimientoHoy();
  const progMsg = `Revisión diaria: ${prog.pct}% completado (${prog.completados}/${prog.total} equipos)`;
  const queue = [{msg: progMsg, tone: prog.pct === 100 ? 'success' : 'info'}];

  if(role !== 'tecnico'){
    const {fueraServicio, enMantenimiento} = equiposNoOperativos();
    if(fueraServicio > 0 || enMantenimiento > 0){
      queue.push({msg:`${fueraServicio} equipo(s) fuera de servicio · ${enMantenimiento} en mantenimiento`, tone:'warning'});
    }

    const emergencias = ordenesEmergenciaActivas();
    if(emergencias.length > 0){
      const nombres = emergencias.map(o=>{ const eq = equipoById(o.equipoId); return eq ? eq.nombre : null; }).filter(Boolean);
      const listado = nombres.slice(0,2).join(', ') + (nombres.length>2 ? '…' : '');
      queue.push({msg:`${emergencias.length} emergencia(s) activa(s): ${listado}`, tone:'danger'});
    }

    const vencidos = equiposConIMPVencido();
    if(vencidos.length > 0){
      const msg = role === 'admin'
        ? `${vencidos.length} equipo(s) requieren su mantenimiento preventivo programado`
        : `Tienes ${vencidos.length} equipo(s) por agendar su mantenimiento preventivo`;
      queue.push({msg, tone:'warning'});
    }

    const porAprobar = solicitudesPendientes.filter(p=>p.estado==='Pendiente').length;
    if(porAprobar > 0){
      queue.push({msg:`${porAprobar} solicitud(es) del técnico esperando tu aprobación`, tone:'warning'});
    }
  }

  queue.forEach((t,i)=> setTimeout(()=> showToast(t.msg, t.tone), 500 + i*650));
}
function statusPill(estado){
  if(estado==="Operativo") return `<span class="pill pill-green">Operativo</span>`;
  if(estado==="En mantenimiento") return `<span class="pill pill-amber">En mantenimiento</span>`;
  return `<span class="pill pill-red">Fuera de servicio</span>`;
}
function urgenciaPill(u){
  if(u==="Urgente por emergencia") return `<span class="pill pill-red">Urgente · emergencia</span>`;
  if(u==="Urgente") return `<span class="pill pill-amber">Urgente</span>`;
  return `<span class="pill pill-green">Regular</span>`;
}
function assetTag(id){
  return `<span class="asset-tag"><span class="dot"></span>${id}</span>`;
}
function geBarHTML(ge, size){
  const total = geTotal(ge);
  const maxTotal = 22; // 10+5+5+2 techo teórico aproximado
  const w = (v)=> Math.max(0,(v/maxTotal)*100) + "%";
  return `
    <div class="ge-bar">
      <div class="ge-track" style="${size==='sm'?'height:7px':''}">
        <div class="ge-seg funcion" style="width:${w(ge.funcion)}"></div>
        <div class="ge-seg aplicacion" style="width:${w(ge.aplicacion)}"></div>
        <div class="ge-seg mantenimiento" style="width:${w(ge.mantenimiento)}"></div>
        <div class="ge-seg antecedentes" style="width:${w(Math.max(ge.antecedentes,0))}"></div>
      </div>
      <div class="ge-num">${total}</div>
    </div>`;
}

/* ===================== NAVIGATION ===================== */
const viewTitles = {
  dashboard:"Panel General", inventario:"Inventario de Equipos", mantenimiento:"Programa de Mantenimiento",
  revisiones:"Revisiones Diarias", correctivo:"Órdenes de Mantenimiento", indicadores:"Indicadores de Desempeño"
};
document.querySelectorAll('.nav-item[data-view]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('view-'+btn.dataset.view).classList.add('active');
    document.getElementById('topbarTitle').textContent = viewTitles[btn.dataset.view];
    window.scrollTo({top:0,behavior:'instant'});
  });
});

/* ===================== RENDER: INVENTARIO ===================== */
function populateAreaFilter(){
  const sel = document.getElementById('filtroArea');
  const areas = [...new Set(equipos.map(e=>e.area))].sort();
  sel.innerHTML = '<option value="">Todas las áreas</option>' + areas.map(a=>`<option>${a}</option>`).join('');
}

function renderInventario(){
  const texto = document.getElementById('filtroTexto').value.toLowerCase();
  const area = document.getElementById('filtroArea').value;
  const cat = document.getElementById('filtroCategoria').value;
  const estado = document.getElementById('filtroEstado').value;
  const clasif = document.getElementById('filtroClasif').value;

  const filtrados = equipos.filter(e=>{
    const matchTexto = !texto || (e.nombre+e.id+e.serie).toLowerCase().includes(texto);
    const matchArea = !area || e.area===area;
    const matchCat = !cat || e.categoria===cat;
    const matchEstado = !estado || e.estado===estado;
    const matchClasif = !clasif || geClasificacion(geTotal(e.ge))===clasif;
    return matchTexto && matchArea && matchCat && matchEstado && matchClasif;
  });

  const body = document.getElementById('inventarioBody');
  if(filtrados.length===0){
    body.innerHTML = `<tr><td colspan="8"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      <div class="t">Sin resultados</div>Ajusta los filtros o el término de búsqueda.</div></td></tr>`;
    return;
  }

  body.innerHTML = filtrados.map(e=>{
    const total = geTotal(e.ge);
    const clasif = geClasificacion(total);
    const geCell = requiereIMP(e) ? geBarHTML(e.ge,'sm') : `<span class="pill pill-gray">No aplica</span>`;
    const clasifCell = requiereIMP(e)
      ? (clasif==='I' ? '<span class="pill pill-green">Incluido</span>' : '<span class="pill pill-gray">No incluido</span>')
      : '<span class="pill pill-gray">No requiere IMP</span>';
    return `
    <tr class="clickable" onclick="openDrawer('${e.id}')">
      <td>
        <div class="cell-primary">${e.nombre}</div>
        <div class="cell-sub">${e.marca}</div>
      </td>
      <td>${assetTag(e.id)}<div class="cell-sub mono">${e.serie}</div></td>
      <td>${e.area}</td>
      <td><span class="pill pill-teal">${e.categoria}</span></td>
      <td>${statusPill(e.estado)}</td>
      <td style="min-width:150px;">${geCell}</td>
      <td>${clasifCell}</td>
      <td style="text-align:right;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </td>
    </tr>`;
  }).join('');
}

/* ===================== RENDER: MANTENIMIENTO ===================== */
let mantenimientoSort = {key:'ge', dir:'desc'};
function resumenMantenimiento(e){
  const hist = (e.historial || []).filter(h=> h.tipo==='Preventivo' || h.tipo==='Correctivo').slice().sort((a,b)=> b.fecha.localeCompare(a.fecha));
  const ultimo = hist.length ? hist[0] : null;
  const d = datosPreventivo(e); // null si el equipo no está incluido en el programa (clasificación N)
  return {
    ultimoFecha: ultimo ? ultimo.fecha : null,
    ultimoTipo: ultimo ? ultimo.tipo : null,
    proxima: d ? d.proxima : null,
    incluido: !!d
  };
}
function ordenarMantenimiento(key){
  if(mantenimientoSort.key === key){
    mantenimientoSort.dir = mantenimientoSort.dir === 'asc' ? 'desc' : 'asc';
  } else {
    mantenimientoSort.key = key;
    mantenimientoSort.dir = (key === 'nombre') ? 'asc' : 'desc';
  }
  renderMantenimiento();
}
function renderMantenimiento(){
  const body = document.getElementById('mantenimientoBody');

  const items = equipos.filter(requiereIMP).map(e=>({e, r: resumenMantenimiento(e)}));
  const {key, dir} = mantenimientoSort;
  const valor = (item) => {
    if(key === 'nombre') return item.e.nombre.toLowerCase();
    if(key === 'ge') return geTotal(item.e.ge);
    if(key === 'ultimo') return item.r.ultimoFecha ? new Date(item.r.ultimoFecha+'T00:00:00').getTime() : -Infinity;
    if(key === 'proximo') return item.r.proxima ? item.r.proxima.getTime() : Infinity; // sin próxima fecha va al final
    return 0;
  };
  items.sort((a,b)=>{
    const va = valor(a), vb = valor(b);
    if(va < vb) return dir === 'asc' ? -1 : 1;
    if(va > vb) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  document.querySelectorAll('th.sortable').forEach(th=>{
    const thKey = th.id.replace('th-','');
    th.classList.toggle('sort-active', thKey === key);
    const arrow = th.querySelector('.sort-arrow');
    if(arrow) arrow.textContent = (thKey === key && dir === 'asc') ? '▲' : '▼';
  });

  body.innerHTML = items.map(({e, r})=>{
    const total = geTotal(e.ge);
    const ultimoHTML = r.ultimoFecha
      ? `${fmtDate(r.ultimoFecha)} <span class="pill ${r.ultimoTipo==='Preventivo' ? 'pill-teal' : 'pill-clay'}" style="margin-left:4px;">${r.ultimoTipo}</span>`
      : `<span style="color:var(--muted);">Sin registro</span>`;
    const proximoHTML = !r.incluido
      ? `<span class="pill pill-gray">No aplica</span>`
      : (r.proxima ? fmtDate(toISODateLocal(r.proxima)) : `<span style="color:var(--muted);">Por definir</span>`);
    return `
    <tr class="clickable" onclick="openDrawer('${e.id}')">
      <td>
        <div class="cell-primary">${e.nombre}</div>
        <div class="cell-sub">${assetTag(e.id)} · ${e.area}</div>
      </td>
      <td>${geBarHTML(e.ge,'sm')}</td>
      <td class="mono" style="font-weight:700; font-size:15px;">${total}</td>
      <td>${geClasificacion(total)==='I' ? '<span class="pill pill-green">Incluido (I)</span>' : '<span class="pill pill-gray">No incluido (N)</span>'}</td>
      <td>${geFrecPill(total)}</td>
      <td class="mono" style="font-size:12.5px;">${ultimoHTML}</td>
      <td class="mono" style="font-size:12.5px; font-weight:600;">${proximoHTML}</td>
      <td style="text-align:right;"><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openGECalc('${e.id}')">Reclasificar</button></td>
    </tr>`;
  }).join('');
  renderProgramacionMes();
}

/* ---- Mantenimiento preventivo programado para el mes actual ---- */
function mesesPorFrecuencia(freq){ return freq === 'Trimestral' ? 4 : (freq === 'Semestral' ? 6 : 12); }
function toISODateLocal(d){
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
// Los equipos de categoría "TI / Activo" (laptops, celulares, PCs y demás equipo
// de operación diaria no médico) no entran al programa de mantenimiento preventivo.
function requiereIMP(e){ return e.categoria !== 'TI / Activo'; }

// Solo el equipo médico entra a las revisiones diarias de rutina — el equipo de TI
// no tiene sentido clínico revisarlo con este checklist.
function esEquipoMedico(e){ return e.categoria !== 'TI / Activo'; }

// La frecuencia de la revisión de rutina depende del nivel de riesgo clínico del
// equipo: el de riesgo alto o medio se revisa todos los días; el de riesgo bajo,
// una vez por semana.
function frecuenciaRevisionRutina(e){
  return (e.tipoRiesgo === 'Alto' || e.tipoRiesgo === 'Medio') ? 'Diaria' : 'Semanal';
}
function equiposRevisionDiaria(){ return equipos.filter(e => esEquipoMedico(e) && frecuenciaRevisionRutina(e) === 'Diaria'); }
function equiposRevisionSemanal(){ return equipos.filter(e => esEquipoMedico(e) && frecuenciaRevisionRutina(e) === 'Semanal'); }

function datosPreventivo(e){
  if(!requiereIMP(e)) return null;
  const total = geTotal(e.ge);
  if(geClasificacion(total) !== 'I') return null;
  const freq = geFrecuencia(total);
  const meses = mesesPorFrecuencia(freq);
  const preventivos = (e.historial || []).filter(h=>h.tipo==='Preventivo').sort((a,b)=> b.fecha.localeCompare(a.fecha));
  const ultima = preventivos.length ? preventivos[0].fecha : null;
  let proxima = null;
  if(ultima){
    proxima = new Date(ultima + 'T00:00:00');
    proxima.setMonth(proxima.getMonth() + meses);
  }
  return {freq, meses, ultima, proxima};
}
function equiposPreventivoMesActual(){
  const hoy = new Date();
  const finMes = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0, 23,59,59);
  const list = [];
  equipos.forEach(e=>{
    const d = datosPreventivo(e);
    if(!d) return;
    if(d.proxima === null || d.proxima <= finMes){
      const estado = d.proxima === null ? 'sin-historial' : (d.proxima < hoy ? 'vencido' : 'este-mes');
      list.push({equipo:e, ...d, estado});
    }
  });
  const rank = s => s==='sin-historial' ? 0 : (s==='vencido' ? 1 : 2);
  list.sort((a,b)=>{
    if(rank(a.estado) !== rank(b.estado)) return rank(a.estado)-rank(b.estado);
    const da = a.proxima ? a.proxima.getTime() : -Infinity;
    const db = b.proxima ? b.proxima.getTime() : -Infinity;
    return da-db;
  });
  return list;
}

// Igual que equiposPreventivoMesActual, pero para cualquier mes relativo al actual
// (offset 0 = mes en curso, incluye vencidos y sin historial; offset > 0 = un mes
// futuro específico, solo equipos cuya próxima fecha cae exactamente en ese mes).
const IM_MAX_MESES_ADELANTE = 11;
let imScheduleOffset = 0;
function equiposParaMesOffset(offset){
  if(offset === 0) return equiposPreventivoMesActual();
  const hoy = new Date();
  const target = new Date(hoy.getFullYear(), hoy.getMonth()+offset, 1);
  const ty = target.getFullYear(), tm = target.getMonth();
  const list = [];
  equipos.forEach(e=>{
    const d = datosPreventivo(e);
    if(!d || !d.proxima) return;
    if(d.proxima.getFullYear()===ty && d.proxima.getMonth()===tm){
      list.push({equipo:e, ...d, estado:'programado'});
    }
  });
  list.sort((a,b)=> a.proxima.getTime() - b.proxima.getTime());
  return list;
}
function cambiarMesProgramacion(delta){
  const next = imScheduleOffset + delta;
  if(next < 0 || next > IM_MAX_MESES_ADELANTE) return;
  imScheduleOffset = next;
  renderProgramacionMes();
}

function renderProgramacionMes(){
  const tbody = document.getElementById('imScheduleBody');
  if(!tbody) return;

  // Los 3 indicadores de arriba siempre reflejan el mes real actual,
  // sin importar qué mes se esté navegando en la tabla de abajo.
  const kpiList = equiposPreventivoMesActual();
  const vencidos = kpiList.filter(i=>i.estado==='vencido').length;
  const sinHistorial = kpiList.filter(i=>i.estado==='sin-historial').length;
  const esteMes = kpiList.filter(i=>i.estado==='este-mes').length;
  const kv = document.getElementById('kpiVencidos'); if(kv) kv.textContent = vencidos;
  const ks = document.getElementById('kpiSinHistorial'); if(ks) ks.textContent = sinHistorial;
  const ke = document.getElementById('kpiEsteMes'); if(ke) ke.textContent = esteMes;

  // Mes que se está mostrando en la tabla navegable
  const hoy = new Date();
  const target = new Date(hoy.getFullYear(), hoy.getMonth()+imScheduleOffset, 1);
  let mesLabel = target.toLocaleDateString('es-MX', {month:'long', year:'numeric'});
  mesLabel = mesLabel.charAt(0).toUpperCase() + mesLabel.slice(1);
  const labelEl = document.getElementById('imScheduleMonthLabel');
  if(labelEl) labelEl.textContent = mesLabel;

  const prevBtn = document.getElementById('imMesPrev');
  const nextBtn = document.getElementById('imMesNext');
  const hoyBtn = document.getElementById('imMesHoy');
  if(prevBtn) prevBtn.disabled = (imScheduleOffset <= 0);
  if(nextBtn) nextBtn.disabled = (imScheduleOffset >= IM_MAX_MESES_ADELANTE);
  if(hoyBtn) hoyBtn.style.display = (imScheduleOffset === 0) ? 'none' : '';

  const list = equiposParaMesOffset(imScheduleOffset);
  const countEl = document.getElementById('imScheduleCount');
  if(countEl) countEl.textContent = list.length;

  if(list.length === 0){
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      <div class="t">Sin mantenimientos preventivos ${imScheduleOffset===0 ? 'pendientes este mes' : 'programados para ' + mesLabel.toLowerCase()}</div>${imScheduleOffset===0 ? 'Todos los equipos incluidos en el programa están al día.' : 'Ningún equipo tiene su próxima fecha calculada dentro de ese mes.'}
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item=>{
    const e = item.equipo;
    const estadoPill = item.estado==='vencido' ? '<span class="pill pill-red">Vencido</span>'
                      : item.estado==='sin-historial' ? '<span class="pill pill-amber">Sin historial — programar</span>'
                      : item.estado==='este-mes' ? '<span class="pill pill-teal">Programado este mes</span>'
                      : '<span class="pill pill-teal">Programado</span>';
    const puedeGestionar = (currentRole === 'admin' || currentRole === 'coordinador');
    const yaEnServicio = e.estado === 'En mantenimiento';
    const ordenActiva = yaEnServicio ? ordenActivaDeEquipo(e.id) : null;
    return `
    <tr class="clickable" onclick="openDrawer('${e.id}')">
      <td><div class="cell-primary">${e.nombre}</div><div class="cell-sub">${assetTag(e.id)} · ${e.area}</div></td>
      <td><span class="pill pill-gray">${item.freq}</span></td>
      <td class="mono" style="font-size:12.5px;">${item.ultima ? fmtDate(item.ultima) : '—'}</td>
      <td class="mono" style="font-size:12.5px; font-weight:600;">${item.proxima ? fmtDate(toISODateLocal(item.proxima)) : 'Por definir'}</td>
      <td>${estadoPill}</td>
      <td>${statusPill(e.estado)}</td>
      <td style="text-align:right;">
        ${puedeGestionar ? `
        <div style="display:flex; gap:6px; justify-content:flex-end; flex-wrap:wrap; align-items:center;">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); registrarPreventivoRealizado('${e.id}')">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6L9 17l-5-5"/></svg>
            Registrar realizado
          </button>
          ${yaEnServicio
            ? (ordenActiva
                ? `<span class="pill pill-amber mono" style="cursor:pointer;" title="Ver orden ${ordenActiva.folio}" onclick="event.stopPropagation(); openHospOrderModal('${ordenActiva.folio}')">Ya en servicio · ${ordenActiva.folio}</span>`
                : `<span class="pill pill-amber" title="Ya está en mantenimiento">Ya en servicio</span>`)
            : `<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); enviarAServicio('${e.id}')">Enviar a servicio</button>`}
        </div>` : ''}
      </td>
    </tr>`;
  }).join('');
}
let currentDrawerId = null;
function openDrawer(id){
  currentDrawerId = id;
  const e = equipoById(id);
  document.getElementById('drawerTag').innerHTML = `<span class="dot"></span>${e.id}`;
  document.getElementById('drawerName').textContent = e.nombre;
  document.getElementById('drawerSub').textContent = `${e.marca} · ${e.area}`;

  document.getElementById('drawerGeneral').innerHTML = `
    <div class="kv-item"><div class="k">Nombre</div><div class="v">${e.nombre}</div></div>
    <div class="kv-item"><div class="k">Folio de inventario</div><div class="v mono">${e.id}</div></div>
    <div class="kv-item"><div class="k">Categoría / función clínica</div><div class="v">${e.categoria}${requiereIMP(e) ? ' — ' + funcionClinicaLabel(e) : ' (no clínico)'}</div></div>
    <div class="kv-item"><div class="k">Marca / modelo</div><div class="v">${e.marca}</div></div>
    <div class="kv-item"><div class="k">Número de serie</div><div class="v mono">${e.serie}</div></div>
    <div class="kv-item"><div class="k">Ubicación / servicio clínico</div><div class="v">${e.area}</div></div>
    <div class="kv-item"><div class="k">Estado operativo</div><div class="v">${statusPill(e.estado)}</div></div>
    <div class="kv-item"><div class="k">Nivel de riesgo clínico</div><div class="v">${requiereIMP(e) ? e.tipoRiesgo : 'No aplica'}</div></div>
    <div class="kv-item"><div class="k">Fecha de adquisición</div><div class="v">${fmtDate(e.adquisicion)}</div></div>
    <div class="kv-item"><div class="k">Instalación y puesta en marcha</div><div class="v">${e.instalacion ? fmtDate(e.instalacion) : '—'}</div></div>
    <div class="kv-item"><div class="k">Alta en el software</div><div class="v">${e.fechaAlta ? fmtDate(e.fechaAlta) : '—'}</div></div>
    <div class="kv-item"><div class="k">Vida útil estimada</div><div class="v">${vidaUtilLabel(e)}</div></div>
    <div class="kv-item"><div class="k">Frecuencia de mant. preventivo</div><div class="v">${requiereIMP(e) ? geFrecuencia(geTotal(e.ge)) : 'No aplica (no entra al IMP)'}</div></div>
    <div class="kv-item"><div class="k">Proveedor del equipo</div><div class="v">${e.proveedor}</div></div>
    <div class="kv-item" style="grid-column:1 / -1;"><div class="k">Proveedor de servicio técnico</div><div class="v">${e.proveedorServicio || '—'}</div></div>
  `;

  const docs = [...e.manuales.map(m=>({t:m, i:'doc'})), ...e.accesorios.map(a=>({t:a, i:'acc'}))];
  document.getElementById('drawerDocs').innerHTML = docs.length ? docs.map(d=>`
    <div class="doc-row">
      <div class="doc-icon">
        ${d.i==='doc'
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>'}
      </div>
      <div>
        <div class="doc-name">${d.t}</div>
        <div class="doc-meta">${d.i==='doc' ? 'Documento técnico' : 'Accesorio / consumible asociado'}</div>
      </div>
    </div>`).join('') : `<div class="scope-note">Sin documentos o accesorios registrados para este equipo.</div>`;
  document.getElementById('drawerGarantia').textContent = e.garantia;

  const total = geTotal(e.ge);
  const mantHistorial = (e.historial || []).filter(h => h.tipo === 'Preventivo' || h.tipo === 'Correctivo');
  const bloqueGE = requiereIMP(e) ? `
    <div class="card card-pad" style="background:var(--panel-2); margin-top:10px;">
      ${geBarHTML(e.ge)}
      <div class="ge-legend">
        <span><i style="background:var(--teal-700)"></i>Función: ${e.ge.funcion}</span>
        <span><i style="background:var(--teal-500)"></i>Aplicación: ${e.ge.aplicacion}</span>
        <span><i style="background:var(--clay-600)"></i>Mantenimiento: ${e.ge.mantenimiento}</span>
        <span><i style="background:#C9B36B"></i>Antecedentes: ${e.ge.antecedentes>0?'+':''}${e.ge.antecedentes}</span>
      </div>
      <div style="display:flex; gap:10px; margin-top:14px;">
        ${geClasificacion(total)==='I' ? '<span class="pill pill-green">Incluido en programa</span>' : '<span class="pill pill-gray">No incluido</span>'}
        ${geFrecPill(total)}
      </div>
    </div>` : `
    <div class="scope-note" style="margin-top:10px;">
      <strong>Equipo de TI / activo de operación diaria.</strong> No requiere clasificación de riesgo clínico ni entra al programa de mantenimiento preventivo (IMP) — solo se le da seguimiento por reparaciones o soporte cuando aplique.
    </div>`;
  document.getElementById('drawerGE').innerHTML = `
    ${bloqueGE}
    <div class="section-title" style="font-size:13px; margin:16px 0 8px;">Historial de mantenimiento y reparaciones</div>
    <div class="section-sub" style="margin-bottom:10px;">Solo eventos de mantenimiento preventivo y correctivo — para el historial completo del equipo, ve la pestaña "Historial".</div>
    <div class="timeline">
      ${mantHistorial.length ? mantHistorial.map(h=>`
        <div class="timeline-item">
          <div class="t-date">${fmtDate(h.fecha)} <span class="pill ${h.tipo==='Preventivo' ? 'pill-teal' : 'pill-clay'}" style="margin-left:4px;">${h.tipo}</span></div>
          <div class="t-desc" style="margin-top:3px;">${h.detalle}</div>
        </div>`).join('') : `<div class="scope-note">Aún no hay mantenimientos ni reparaciones registrados.</div>`}
    </div>`;

  const historialCompleto = [...(e.historial || [])];
  if(e.fechaAlta){
    historialCompleto.push({fecha: e.fechaAlta, tipo:'Alta', detalle:'Equipo dado de alta en el software SimplicAI.'});
  }
  const tipoPill = (tipo) => {
    if(tipo==='Preventivo') return '<span class="pill pill-teal">Preventivo</span>';
    if(tipo==='Correctivo') return '<span class="pill pill-clay">Correctivo</span>';
    if(tipo==='Alta') return '<span class="pill pill-gray">Alta</span>';
    return `<span class="pill pill-gray">${tipo}</span>`;
  };
  document.getElementById('drawerHistorial').innerHTML = historialCompleto.length ? historialCompleto.map(h=>`
    <div class="timeline-item">
      <div class="t-date">${fmtDate(h.fecha)} ${tipoPill(h.tipo)}</div>
      <div class="t-desc" style="margin-top:3px;">${h.detalle}</div>
    </div>`).join('') : `<div class="scope-note">Aún no hay eventos registrados en el historial de este equipo.</div>`;

  renderDrawerActions(e);
  switchEquipoTab('general');
  document.getElementById('drawerOverlay').classList.add('active');
  document.getElementById('equipoDrawer').classList.add('active');
}
function renderDrawerActions(e){
  const box = document.getElementById('drawerActions');
  if(currentRole === 'proveedor' || currentRole === 'tecnico_proveedor' || currentRole === 'tecnico'){ box.innerHTML = ''; return; } // solo lectura
  let html = `<button class="btn btn-ghost btn-sm" onclick="openEditEquipoModal()">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
      Editar</button>`;
  if(e.estado !== 'Fuera de servicio'){
    html += `<button class="btn btn-ghost btn-sm" onclick="deshabilitarEquipo('${e.id}')">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M5 19L19 5"/></svg>
      Deshabilitar</button>`;
  }
  if(e.estado !== 'En mantenimiento'){
    html += `<button class="btn btn-ghost btn-sm" onclick="enviarAServicio('${e.id}')">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 10-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z"/></svg>
      Enviar a servicio</button>`;
  }
  if(currentRole === 'admin'){
    html += `<button class="btn btn-ghost btn-sm" style="color:var(--red-700); border-color:#e6c2bc;" onclick="eliminarEquipo('${e.id}')">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>
      Eliminar</button>`;
  }
  box.innerHTML = html;
}
function closeDrawer(){
  document.getElementById('drawerOverlay').classList.remove('active');
  document.getElementById('equipoDrawer').classList.remove('active');
}
function switchEquipoTab(tab){
  document.querySelectorAll('[data-etab]').forEach(b=>b.classList.toggle('active', b.dataset.etab===tab));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('etab-'+tab).classList.add('active');
}

/* ===================== REVISIONES DIARIAS ===================== */
function switchRevTab(tab){
  document.querySelectorAll('[data-rtab]').forEach(b=>b.classList.toggle('active', b.dataset.rtab===tab));
  document.getElementById('revTab-checklist').style.display = tab==='checklist' ? '' : 'none';
  document.getElementById('revTab-solicitudes').style.display = tab==='solicitudes' ? '' : 'none';
  document.getElementById('revTab-aprobaciones').style.display = tab==='aprobaciones' ? '' : 'none';
  document.getElementById('revTab-misSolicitudes').style.display = tab==='misSolicitudes' ? '' : 'none';
}

function checklistCardHTML(e){
  const c = checklists[e.id];
  const allChecked = c.items.every(i=>i.checked);
  const tieneHallazgos = c.incidencias && c.incidencias.length > 0;
  const freq = frecuenciaRevisionRutina(e);
  const periodoTexto = freq === 'Diaria' ? 'hoy' : 'esta semana';
  return `
    <div class="check-card ${c.guardadoHoy ? 'done' : ''}">
      <div class="check-top">
        <div>
          <div class="cell-primary">${e.nombre}</div>
          <div class="cell-sub">${assetTag(e.id)} · ${e.area} · <span class="pill pill-gray" style="font-size:10.5px; padding:1px 6px;">${e.tipoRiesgo}</span></div>
        </div>
        ${c.guardadoHoy
          ? (tieneHallazgos
              ? `<span class="pill pill-amber">Con hallazgos · ${c.hora}</span>`
              : `<span class="pill pill-green">Completada ${periodoTexto} · ${c.hora}</span>`)
          : `<span class="pill pill-amber">Pendiente ${periodoTexto}</span>`}
      </div>
      <div class="check-items">
        ${c.items.map((it,idx)=>`
          <div class="check-item ${it.checked?'checked-off':''}">
            <input type="checkbox" id="ci-${e.id}-${idx}" ${it.checked?'checked':''} ${c.guardadoHoy?'disabled':''}
              onchange="toggleCheckItem('${e.id}', ${idx})">
            <label for="ci-${e.id}-${idx}">${it.label}</label>
          </div>`).join('')}
      </div>
      <div class="check-meta">
        <div class="field" style="flex:1;">
          <label style="font-size:11px; margin-bottom:3px;">Responsable</label>
          <div class="input" style="display:flex; align-items:center; gap:7px; background:var(--panel-2); color:var(--ink-soft); font-weight:600;">
            <span class="user-avatar" style="width:20px; height:20px; font-size:9.5px; flex:0 0 20px;">${(c.guardadoHoy ? (USER_ROLES[c.responsable]||{}).initials : (currentUser && USER_ROLES[currentUser].initials)) || '—'}</span>
            ${c.guardadoHoy ? (c.responsable || 'Sin registrar') : (currentUser || 'Sin sesión')}
          </div>
        </div>
        <div class="field" style="flex:1;">
          <label style="font-size:11px; margin-bottom:3px;">Notas (opcional)</label>
          <input class="input" placeholder="Notas (opcional)" value="${c.nota}" ${c.guardadoHoy?'disabled':''}
            oninput="checklists['${e.id}'].nota=this.value">
        </div>
      </div>
      ${tieneHallazgos ? `
        <div class="scope-note" style="border-style:solid; border-color:var(--amber-600); background:var(--amber-100); color:#6b4f04;">
          <strong>Hallazgos reportados:</strong>
          ${c.incidencias.map(h=>`<div style="margin-top:4px;">• ${h.label}: ${h.motivo}</div>`).join('')}
          <div style="margin-top:4px;">Se generó una orden de mantenimiento automáticamente.</div>
        </div>` : ''}
      ${c.guardadoHoy
        ? `<button class="btn btn-ghost btn-sm btn-block" onclick="resetChecklist('${e.id}')">Reabrir revisión</button>`
        : `<button class="btn btn-primary btn-sm btn-block" onclick="saveChecklist('${e.id}')">
             <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>
             Guardar revisión
           </button>`}
    </div>`;
}
function renderChecklist(){
  const diaria = equiposRevisionDiaria();
  const semanal = equiposRevisionSemanal();
  const gridD = document.getElementById('checklistGridDiaria');
  const gridS = document.getElementById('checklistGridSemanal');

  gridD.innerHTML = diaria.length ? diaria.map(checklistCardHTML).join('') :
    `<div class="card"><div class="empty-state">Sin equipo de revisión diaria registrado.</div></div>`;
  gridS.innerHTML = semanal.length ? semanal.map(checklistCardHTML).join('') :
    `<div class="card"><div class="empty-state">Sin equipo de revisión semanal registrado.</div></div>`;

  updateNavBadges();
}
function toggleCheckItem(id, idx){
  checklists[id].items[idx].checked = !checklists[id].items[idx].checked;
  renderChecklist();
}
function saveChecklist(id){
  const c = checklists[id];
  const pendientes = c.items.filter(i=>!i.checked);
  if(pendientes.length > 0){
    openChecklistIssueModal(id);
    return;
  }
  c.guardadoHoy = true;
  c.incidencias = [];
  c.responsable = currentUser;
  c.hora = new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'});
  renderChecklist();
  renderDashboard();
  showToast('Revisión diaria guardada');
}
function resetChecklist(id){
  checklists[id].guardadoHoy = false;
  checklists[id].incidencias = [];
  renderChecklist();
  renderDashboard();
}

/* ---- Revisión con puntos incompletos: motivo + envío automático a mantenimiento ---- */
let checklistIssueEquipoId = null;
function openChecklistIssueModal(equipoId){
  const e = equipoById(equipoId);
  const c = checklists[equipoId];
  const pendientes = c.items.filter(i=>!i.checked);
  checklistIssueEquipoId = equipoId;
  document.getElementById('issueModalTitle').textContent = 'Revisión con puntos pendientes — ' + e.nombre;
  document.getElementById('issueModalBody').innerHTML = pendientes.map((it,idx)=>`
    <div class="field">
      <label>${it.label} <span class="hint">— no se marcó como revisado</span></label>
      <textarea class="input" id="issueMotivo-${idx}" data-label="${it.label.replace(/"/g,'&quot;')}" placeholder="¿Por qué no se completó este punto? Ej. no se pudo verificar por falta de accesorio, se detectó falla, equipo fuera de servicio, etc."></textarea>
    </div>`).join('') + `
    <div class="field">
      <label>Urgencia de la orden de mantenimiento que se generará</label>
      <div class="urgency-picker" id="issueUrgencia">
        <div class="urgency-opt sel-emerg" data-val="Urgente por emergencia" onclick="selectIssueUrgencia(this)">Urgente por<br>emergencia</div>
        <div class="urgency-opt sel-urg" data-val="Urgente" onclick="selectIssueUrgencia(this)">Urgente</div>
        <div class="urgency-opt sel-reg selected" data-val="Regular" onclick="selectIssueUrgencia(this)">Regular</div>
      </div>
    </div>`;
  document.getElementById('issueModalOverlay').classList.add('active');
}
function selectIssueUrgencia(el){
  document.querySelectorAll('#issueUrgencia .urgency-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}
function closeChecklistIssueModal(){
  document.getElementById('issueModalOverlay').classList.remove('active');
  checklistIssueEquipoId = null;
}
function confirmChecklistIssue(){
  const id = checklistIssueEquipoId;
  if(!id) return;
  const c = checklists[id];
  const pendientes = c.items.filter(i=>!i.checked);
  const textareas = document.querySelectorAll('#issueModalBody textarea[id^="issueMotivo-"]');
  const incidencias = [];
  let faltaMotivo = false;
  textareas.forEach(ta=>{
    const motivo = ta.value.trim();
    if(!motivo) faltaMotivo = true;
    incidencias.push({label: ta.dataset.label, motivo});
  });
  if(faltaMotivo){ showToast('Indica el motivo de cada punto pendiente'); return; }

  const urgencia = document.querySelector('#issueUrgencia .selected').dataset.val;
  const hoy = new Date().toISOString().slice(0,10);

  // La revisión en sí siempre se guarda de inmediato (es solo documentar lo visto).
  c.guardadoHoy = true;
  c.incidencias = incidencias;
  c.responsable = currentUser;
  c.hora = new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'});

  const e = equipoById(id);
  const motivoTexto = incidencias.map(h=>h.label+': '+h.motivo).join(' · ');

  if(currentRole === 'tecnico'){
    // La orden NO se genera todavía: queda pendiente de aprobación del coordinador.
    const pid = 'AP-' + String(solicitudPendienteSeq++).padStart(4,'0');
    solicitudesPendientes.push({
      id: pid, tipo:'checklist', equipoId:id, motivo: motivoTexto, urgencia,
      solicitadoPor: currentUser, fecha: hoy,
      hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
      estado:'Pendiente', motivoRechazo:'', ordenFolio:''
    });
    closeChecklistIssueModal();
    renderChecklist();
    renderAprobaciones();
    renderMisSolicitudes();
    updateNavBadges();
    showToast('Revisión guardada — pendiente de aprobación del coordinador para generar la orden');
    return;
  }

  // admin / coordinador: la orden se genera de inmediato, como antes.
  const catMap = {"Urgente por emergencia":"Urgente emergencia","Urgente":"Urgente","Regular":"Regular"};
  const nuevoFolio = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio: nuevoFolio,
    equipoId:id,
    origen:'Revisión diaria — puntos pendientes',
    detalle: motivoTexto,
    categoria: catMap[urgencia] || 'Regular',
    estado:'Abierta', tecnico:'Sin asignar', fecha:hoy,
    notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'', bitacora:[]
  });
  agregarBitacora('HOSP-1', nuevoFolio, currentUser, 'Orden creada automáticamente desde revisión diaria con puntos pendientes.');
  e.historial.unshift({fecha:hoy, tipo:'Correctivo', detalle:'Revisión diaria con puntos pendientes, enviada automáticamente a Órdenes de Mantenimiento (orden '+nuevoFolio+').'});
  if(e.estado === 'Operativo'){
    e.estado = 'En mantenimiento';
    e.historial.unshift({fecha:hoy, tipo:'Estado', detalle:'Equipo puesto en mantenimiento por hallazgos en revisión diaria.'});
  }

  closeChecklistIssueModal();
  renderChecklist();
  renderCorrectivo();
  renderInventario();
  renderMantenimiento();
  renderDashboard();
  updateNavBadges();
  showToast('Revisión guardada — orden enviada a Órdenes de Mantenimiento');
}

/* ---- Solicitar revisión de equipo ---- */
function populateSolEquipoSelect(){
  const sel = document.getElementById('solEquipo');
  sel.innerHTML = '<option value="">Selecciona un equipo del inventario…</option>' +
    equipos.map(e=>`<option value="${e.id}">${e.nombre} — ${e.id}</option>`).join('');
}
function onSolicitudEquipoChange(){
  const id = document.getElementById('solEquipo').value;
  const e = equipoById(id);
  document.getElementById('solUbicacion').value = e ? e.area : '';
}
function selectUrgencia(el){
  document.querySelectorAll('#solUrgencia .urgency-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}
function openSolicitudModal(){
  populateSolEquipoSelect();
  document.getElementById('solEquipo').value = '';
  document.getElementById('solUbicacion').value = '';
  document.getElementById('solSolicitante').value = currentUser || '';
  document.getElementById('solTipo').value = 'Eléctrico';
  document.getElementById('solDescripcion').value = '';
  document.getElementById('solNotas').value = '';
  document.querySelectorAll('#solUrgencia .urgency-opt').forEach(o=>o.classList.remove('selected'));
  document.querySelector('#solUrgencia .sel-reg').classList.add('selected');
  document.getElementById('solicitudModalOverlay').classList.add('active');
}
function closeSolicitudModal(){
  document.getElementById('solicitudModalOverlay').classList.remove('active');
}
function submitSolicitud(){
  const equipoId = document.getElementById('solEquipo').value;
  const solicitante = currentUser;
  const descripcion = document.getElementById('solDescripcion').value.trim();
  if(!equipoId){ showToast('Selecciona un equipo'); return; }
  if(!descripcion){ showToast('Describe el desperfecto observado'); return; }

  const urgencia = document.querySelector('#solUrgencia .selected').dataset.val;
  const folio = 'SR-' + String(solicitudFolioSeq++).padStart(4,'0');
  const hoy = new Date().toISOString().slice(0,10);
  const nueva = {
    folio, equipoId,
    ubicacion: document.getElementById('solUbicacion').value,
    solicitante,
    tipo: document.getElementById('solTipo').value,
    descripcion,
    notas: document.getElementById('solNotas').value.trim(),
    urgencia,
    fecha: hoy,
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
    estado: 'Abierta'
  };
  solicitudes.unshift(nueva);

  // Se refleja también como orden en Órdenes de Mantenimiento, enlazada a esta
  // solicitud (solicitudFolio) para poder marcarla como resuelta cuando el
  // hospital valide y cierre esa orden.
  const catMap = {"Urgente por emergencia":"Urgente emergencia","Urgente":"Urgente","Regular":"Regular"};
  const folioCorrectivo = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio: folioCorrectivo,
    equipoId, origen:'Solicitud de revisión ('+folio+')', solicitudFolio: folio,
    categoria: catMap[urgencia] || 'Regular',
    estado:'Abierta', tecnico:'Sin asignar', fecha: hoy,
    notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'', bitacora:[]
  });
  agregarBitacora('HOSP-1', folioCorrectivo, solicitante, 'Orden creada desde solicitud de revisión '+folio+' ('+urgencia+').');

  // El equipo pasa a "En mantenimiento" mientras se atiende la solicitud
  // (solo si estaba operativo; no se pisa un "Fuera de servicio" ya existente).
  const e = equipoById(equipoId);
  if(e && e.estado === 'Operativo'){
    e.estado = 'En mantenimiento';
    e.historial.unshift({fecha:hoy, tipo:'Estado', detalle:'Equipo puesto en mantenimiento por solicitud de revisión '+folio+'.'});
  }

  closeSolicitudModal();
  renderSolicitudes();
  renderCorrectivo();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderDashboard();
  updateNavBadges();
  showToast('Solicitud '+folio+' enviada');
  switchRevTab('solicitudes');
  document.querySelectorAll('[data-rtab]').forEach(b=>b.classList.toggle('active', b.dataset.rtab==='solicitudes'));
}

function renderSolicitudes(){
  const grid = document.getElementById('solicitudesGrid');
  document.getElementById('solTabCount').textContent = solicitudes.length ? `(${solicitudes.length})` : '';
  if(solicitudes.length===0){
    grid.innerHTML = `<div class="card"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 9v6m-3-3h6"/></svg>
      <div class="t">Sin solicitudes registradas</div>Usa "Solicitar revisión de equipo" para reportar un desperfecto fuera del checklist de rutina.
    </div></div>`;
    return;
  }
  grid.innerHTML = solicitudes.map(s=>{
    const e = equipoById(s.equipoId);
    const resuelta = s.estado === 'Resuelta';
    const ordenRelacionada = correctivo.find(c => c.solicitudFolio === s.folio);
    return `
    <div class="req-card" style="${resuelta ? 'background:var(--green-100); border-color:#bcdcc7;' : ''}">
      <div class="req-top">
        <div>
          <div class="cell-primary">${e ? e.nombre : 'Equipo eliminado'}</div>
          <div class="cell-sub">${assetTag(s.equipoId)} · ${s.ubicacion}</div>
        </div>
        ${urgenciaPill(s.urgencia)}
      </div>
      <div><span class="pill pill-teal">${s.tipo}</span> <span class="pill ${resuelta ? 'pill-green' : 'pill-amber'}">${resuelta ? '✓ Resuelta' : s.estado}</span></div>
      <div class="req-desc"><strong>Desperfecto:</strong> ${s.descripcion}</div>
      ${s.notas ? `<div class="req-desc"><strong>Notas:</strong> ${s.notas}</div>` : ''}
      ${resuelta && ordenRelacionada ? `<div class="scope-note" style="border-color:var(--green-600); background:transparent; color:#215335;">Validada y cerrada por ${ordenRelacionada.validadoPor || '—'} el ${fmtDate(ordenRelacionada.fechaCierre)} · orden ${ordenRelacionada.folio}</div>` : ''}
      <div class="req-foot">
        <span>${s.folio}${ordenRelacionada ? ' → ' + ordenRelacionada.folio : ''}</span>
        <span>${s.solicitante} · ${fmtDate(s.fecha)} ${s.hora}</span>
      </div>
    </div>`;
  }).join('');
}

/* ---- Aprobaciones pendientes (solicitudes del técnico que requieren validación) ---- */
function renderAprobaciones(){
  const grid = document.getElementById('aprobacionesGrid');
  if(!grid) return;
  const pendientes = solicitudesPendientes.filter(p=>p.estado==='Pendiente');
  const resueltas = solicitudesPendientes.filter(p=>p.estado!=='Pendiente').slice(0,8);
  const countEl = document.getElementById('aprobTabCount');
  if(countEl) countEl.textContent = pendientes.length ? `(${pendientes.length})` : '';

  const lista = [...pendientes, ...resueltas];
  if(lista.length === 0){
    grid.innerHTML = `<div class="card"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
      <div class="t">Sin solicitudes por aprobar</div>Cuando el técnico marque puntos pendientes en su rutina o solicite un envío a servicio, aparecerá aquí.
    </div></div>`;
    return;
  }

  grid.innerHTML = lista.map(p=>{
    const e = equipoById(p.equipoId);
    const bg = p.estado==='Rechazada' ? 'background:var(--red-100); border-color:#e6c2bc;'
             : p.estado==='Aprobada' ? 'background:var(--green-100); border-color:#bcdcc7;' : '';
    return `
    <div class="req-card" style="${bg}">
      <div class="req-top">
        <div>
          <div class="cell-primary">${e ? e.nombre : 'Equipo eliminado'}</div>
          <div class="cell-sub">${assetTag(p.equipoId)} · ${p.tipo==='checklist' ? 'Hallazgo en revisión diaria' : 'Solicitud de envío a servicio'}</div>
        </div>
        ${urgenciaPill(p.urgencia)}
      </div>
      <div class="req-desc"><strong>Motivo:</strong> ${p.motivo}</div>
      ${p.estado==='Rechazada' ? `<div class="req-desc" style="color:var(--red-700);"><strong>Rechazada:</strong> ${p.motivoRechazo}</div>` : ''}
      ${p.estado==='Aprobada' ? `<div class="req-desc" style="color:#215335;"><strong>Aprobada</strong> — se generó la orden <span class="mono">${p.ordenFolio}</span></div>` : ''}
      <div class="req-foot">
        <span>${p.id}</span>
        <span>${p.solicitadoPor} · ${fmtDate(p.fecha)} ${p.hora}</span>
      </div>
      ${p.estado==='Pendiente' ? `
      <div style="display:flex; gap:8px; margin-top:2px;">
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="aprobarSolicitudPendiente('${p.id}')">Aprobar</button>
        <button class="btn btn-ghost btn-sm" style="flex:1;" onclick="rechazarSolicitudPendiente('${p.id}')">Rechazar</button>
      </div>` : ''}
    </div>`;
  }).join('');
}

// Vista del técnico: el estado de sus propias solicitudes (sin botones de acción,
// solo para que sepa si ya se aprobaron, con qué orden, o si se rechazaron y por qué).
function renderMisSolicitudes(){
  const grid = document.getElementById('misSolicitudesGrid');
  if(!grid) return;
  const mias = solicitudesPendientes.filter(p => p.solicitadoPor === currentUser)
    .slice().sort((a,b)=> (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  const pendientesCount = mias.filter(p=>p.estado==='Pendiente').length;
  const countEl = document.getElementById('misSolTabCount');
  if(countEl) countEl.textContent = pendientesCount ? `(${pendientesCount})` : '';

  if(mias.length === 0){
    grid.innerHTML = `<div class="card"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 9v6m-3-3h6"/></svg>
      <div class="t">Aún no has enviado ninguna solicitud</div>Cuando marques puntos pendientes en tu rutina, o uses "Solicitar envío a servicio", el estado aparecerá aquí.
    </div></div>`;
    return;
  }

  grid.innerHTML = mias.map(p=>{
    const e = equipoById(p.equipoId);
    const bg = p.estado==='Rechazada' ? 'background:var(--red-100); border-color:#e6c2bc;'
             : p.estado==='Aprobada' ? 'background:var(--green-100); border-color:#bcdcc7;' : '';
    const estadoPill = p.estado==='Aprobada' ? '<span class="pill pill-green">✓ Aprobada</span>'
                      : p.estado==='Rechazada' ? '<span class="pill pill-red">✕ Rechazada</span>'
                      : '<span class="pill pill-amber">Pendiente de aprobación</span>';
    return `
    <div class="req-card" style="${bg}">
      <div class="req-top">
        <div>
          <div class="cell-primary">${e ? e.nombre : 'Equipo eliminado'}</div>
          <div class="cell-sub">${assetTag(p.equipoId)} · ${p.tipo==='checklist' ? 'Hallazgo en revisión diaria' : 'Solicitud de envío a servicio'}</div>
        </div>
        ${urgenciaPill(p.urgencia)}
      </div>
      <div>${estadoPill}</div>
      <div class="req-desc"><strong>Motivo:</strong> ${p.motivo}</div>
      ${p.estado==='Rechazada' ? `<div class="req-desc" style="color:var(--red-700);"><strong>Motivo del rechazo:</strong> ${p.motivoRechazo}</div>` : ''}
      ${p.estado==='Aprobada' ? `<div class="req-desc" style="color:#215335;"><strong>Aprobada</strong> — se generó la orden <span class="mono">${p.ordenFolio}</span>, visible en Órdenes de Mantenimiento.</div>` : ''}
      <div class="req-foot">
        <span>${p.id}</span>
        <span>${fmtDate(p.fecha)} ${p.hora}</span>
      </div>
    </div>`;
  }).join('');
}

// Crea la orden real en Órdenes de Mantenimiento a partir de una solicitud aprobada.
function crearOrdenDesdeAprobacion(pend){
  const e = equipoById(pend.equipoId);
  const catMap = {"Urgente por emergencia":"Urgente emergencia","Urgente":"Urgente","Regular":"Regular"};
  const hoy = new Date().toISOString().slice(0,10);
  const nuevoFolio = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
  const origenTxt = pend.tipo === 'checklist'
    ? 'Revisión diaria — puntos pendientes (aprobado por ' + currentUser + ')'
    : 'Enviado a servicio — solicitado por ' + pend.solicitadoPor + ', aprobado por ' + currentUser;

  // La aprobación también se registra como una solicitud de revisión más, visible
  // para el Coordinador/Director en "Solicitudes de revisión" — igual que las que
  // ellos mismos generan con el botón "Solicitar revisión de equipo".
  const srFolio = 'SR-' + String(solicitudFolioSeq++).padStart(4,'0');
  solicitudes.unshift({
    folio: srFolio, equipoId: pend.equipoId,
    ubicacion: e ? e.area : '',
    solicitante: pend.solicitadoPor,
    tipo: pend.tipo === 'checklist' ? 'Hallazgo en revisión diaria' : 'Envío a servicio',
    descripcion: pend.motivo,
    notas: 'Solicitud del técnico, aprobada por ' + currentUserLabel() + '.',
    urgencia: pend.urgencia,
    fecha: hoy,
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
    estado: 'Abierta'
  });

  correctivo.unshift({
    folio: nuevoFolio, equipoId: pend.equipoId, origen: origenTxt, detalle: pend.motivo, solicitudFolio: srFolio,
    categoria: catMap[pend.urgencia] || 'Regular',
    estado:'Abierta', tecnico:'Sin asignar', fecha: hoy,
    notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'', bitacora:[]
  });
  agregarBitacora('HOSP-1', nuevoFolio, currentUser,
    'Orden creada tras aprobar la solicitud ' + pend.id + ' de ' + pend.solicitadoPor + ' (solicitud de revisión ' + srFolio + ').');

  if(e){
    e.historial.unshift({
      fecha: hoy, tipo:'Correctivo',
      detalle: (pend.tipo === 'checklist'
        ? 'Revisión diaria con puntos pendientes, aprobada por ' + currentUserLabel() + ' — orden ' + nuevoFolio + '.'
        : 'Solicitud de envío a servicio aprobada por ' + currentUserLabel() + ' — orden ' + nuevoFolio + '.')
    });
    if(e.estado === 'Operativo'){
      e.estado = 'En mantenimiento';
      e.historial.unshift({fecha: hoy, tipo:'Estado', detalle:'Equipo puesto en mantenimiento — solicitud ' + pend.id + ' aprobada por ' + currentUserLabel() + '.'});
    }
  }
  return nuevoFolio;
}
function aprobarSolicitudPendiente(id){
  const pend = solicitudesPendientes.find(p=>p.id===id);
  if(!pend) return;
  if(!confirm('¿Aprobar esta solicitud y generar la orden de mantenimiento?')) return;
  const folio = crearOrdenDesdeAprobacion(pend);
  pend.estado = 'Aprobada';
  pend.ordenFolio = folio;
  renderAprobaciones();
  renderMisSolicitudes();
  renderSolicitudes();
  renderCorrectivo();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderDashboard();
  updateNavBadges();
  showToast('Solicitud aprobada — orden ' + folio + ' generada', 'success');
}
function rechazarSolicitudPendiente(id){
  const pend = solicitudesPendientes.find(p=>p.id===id);
  if(!pend) return;
  const motivo = prompt('Motivo del rechazo (el técnico lo podrá ver):');
  if(motivo === null) return;
  pend.estado = 'Rechazada';
  pend.motivoRechazo = motivo.trim() || 'Sin motivo especificado.';
  renderAprobaciones();
  renderMisSolicitudes();
  updateNavBadges();
  showToast('Solicitud rechazada');
}

/* ---- Modal: técnico solicita envío a servicio desde la ficha del equipo ---- */
function openSolicitudServicioModal(){
  const sel = document.getElementById('solServicioEquipo');
  sel.innerHTML = '<option value="">Selecciona un equipo del inventario…</option>' +
    equipos.map(e=>`<option value="${e.id}">${e.nombre} — ${e.id}</option>`).join('');
  sel.value = '';
  document.getElementById('solServicioMotivo').value = '';
  document.querySelectorAll('#solServicioUrgencia .urgency-opt').forEach(o=>o.classList.remove('selected'));
  document.querySelector('#solServicioUrgencia .sel-reg').classList.add('selected');
  document.getElementById('solicitudServicioModalOverlay').classList.add('active');
}
function closeSolicitudServicioModal(){
  document.getElementById('solicitudServicioModalOverlay').classList.remove('active');
}
function selectSolServicioUrgencia(el){
  document.querySelectorAll('#solServicioUrgencia .urgency-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}
function submitSolicitudServicio(){
  const equipoId = document.getElementById('solServicioEquipo').value;
  if(!equipoId){ showToast('Selecciona un equipo'); return; }
  const motivo = document.getElementById('solServicioMotivo').value.trim();
  if(!motivo){ showToast('Describe el motivo de la solicitud'); return; }
  const urgencia = document.querySelector('#solServicioUrgencia .selected').dataset.val;
  const pid = 'AP-' + String(solicitudPendienteSeq++).padStart(4,'0');
  solicitudesPendientes.push({
    id: pid, tipo:'servicio', equipoId, motivo, urgencia,
    solicitadoPor: currentUser, fecha: new Date().toISOString().slice(0,10),
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
    estado:'Pendiente', motivoRechazo:'', ordenFolio:''
  });
  closeSolicitudServicioModal();
  renderAprobaciones();
  renderMisSolicitudes();
  updateNavBadges();
  showToast('Solicitud enviada — pendiente de aprobación del coordinador');
}

/* ===================== MANTENIMIENTO CORRECTIVO ===================== */
function categoriaPill(cat){
  return {
    "Urgente emergencia": '<span class="pill pill-red">Urgente emergencia</span>',
    "Urgente": '<span class="pill pill-amber">Urgente</span>',
    "Regular": '<span class="pill pill-green">Regular</span>',
    "Pospuesta": '<span class="pill pill-gray">Pospuesta</span>'
  }[cat] || `<span class="pill pill-gray">${cat}</span>`;
}
function estadoOrdenPill(estado){
  if(estado === 'Cerrada') return '<span class="pill pill-green">Cerrada</span>';
  if(estado === 'Resuelto por proveedor') return '<span class="pill pill-clay">Resuelto por proveedor</span>';
  if(estado === 'En proceso') return '<span class="pill pill-amber">En proceso</span>';
  return '<span class="pill pill-red">Abierta</span>';
}
// La orden más reciente y todavía no cerrada de un equipo (la que corresponde
// al servicio activo que lo tiene fuera de operación).
function ordenActivaDeEquipo(equipoId){
  return correctivo.find(c => c.equipoId === equipoId && c.estado !== 'Cerrada') || null;
}
function renderCorrectivo(){
  const body = document.getElementById('correctivoBody');
  body.innerHTML = correctivo.map(c=>{
    const e = equipoById(c.equipoId);
    return `
    <tr class="clickable" onclick="openHospOrderModal('${c.folio}')">
      <td class="mono">${c.folio}</td>
      <td><div class="cell-primary">${e ? e.nombre : '—'}</div><div class="cell-sub">${assetTag(c.equipoId)}</div></td>
      <td style="font-size:12.5px; color:var(--muted); max-width:220px;">
        ${c.origen}
        ${c.detalle ? `<div class="cell-sub" style="margin-top:3px; white-space:normal;">${c.detalle}</div>` : ''}
      </td>
      <td>${categoriaPill(c.categoria)}</td>
      <td>${estadoOrdenPill(c.estado)}</td>
      <td>${c.tecnico}</td>
      <td class="mono" style="font-size:12px;">${fmtDate(c.fecha)}</td>
    </tr>`;
  }).join('');

  document.getElementById('corrEmerg').textContent = correctivo.filter(c=>c.categoria==='Urgente emergencia' && c.estado!=='Cerrada').length;
  document.getElementById('corrUrg').textContent = correctivo.filter(c=>c.categoria==='Urgente' && c.estado!=='Cerrada').length;
  document.getElementById('corrReg').textContent = correctivo.filter(c=>c.categoria==='Regular' && c.estado!=='Cerrada').length;
  document.getElementById('corrPos').textContent = correctivo.filter(c=>c.categoria==='Pospuesta' && c.estado!=='Cerrada').length;

  const porValidar = correctivo.filter(c=>c.estado==='Resuelto por proveedor').length;
  const banner = document.getElementById('corrValidarBanner');
  if(banner){
    if(porValidar > 0 && (currentRole==='admin' || currentRole==='coordinador')){
      banner.style.display = 'flex';
      document.getElementById('corrValidarCount').textContent = porValidar;
    } else {
      banner.style.display = 'none';
    }
  }
}

/* ---- Detalle y validación de una orden, del lado del hospital ---- */
let currentHospOrderFolio = null;
function openHospOrderModal(folio){
  const c = correctivo.find(x=>x.folio===folio);
  if(!c) return;
  currentHospOrderFolio = folio;
  const e = equipoById(c.equipoId);

  document.getElementById('hospOrderTitle').textContent = 'Orden ' + c.folio + ' — ' + (e ? e.nombre : c.equipoId);
  document.getElementById('hospOrderSub').textContent = e ? (e.area + ' · ' + e.id) : '';

  document.getElementById('hospOrderInfo').innerHTML = `
    <div class="kv" style="margin-bottom:4px;">
      <div class="kv-item"><div class="k">Origen</div><div class="v" style="font-weight:500;">${c.origen}</div></div>
      <div class="kv-item"><div class="k">Categoría</div><div class="v">${categoriaPill(c.categoria)}</div></div>
      <div class="kv-item"><div class="k">Estado actual</div><div class="v">${estadoOrdenPill(c.estado)}</div></div>
      <div class="kv-item"><div class="k">Fecha de reporte</div><div class="v">${fmtDate(c.fecha)}</div></div>
      <div class="kv-item"><div class="k">Técnico del proveedor</div><div class="v">${c.tecnico && c.tecnico!=='Sin asignar' ? c.tecnico : 'Sin asignar'}</div></div>
    </div>
    ${c.detalle ? `<div class="scope-note" style="margin-bottom:4px;"><strong>Reportado por el hospital:</strong> ${c.detalle}</div>` : ''}
    ${e ? `<button class="btn btn-ghost btn-sm" onclick="closeHospOrderModal(); openDrawer('${e.id}');">Ver ficha del equipo</button>` : ''}
  `;

  const puedeValidar = (currentRole === 'admin' || currentRole === 'coordinador');
  let validacionHtml = '';
  let footHtml = `<button class="btn btn-ghost" onclick="closeHospOrderModal()">Cerrar</button>`;

  if(c.estado === 'Resuelto por proveedor'){
    validacionHtml = `
      <div class="scope-note" style="border-color:var(--clay-600); background:var(--clay-100); color:var(--clay-600); margin-top:10px;">
        <strong>Lo que reportó el proveedor</strong> — ${c.resueltoPor}, ${fmtDate(c.fechaResuelto)}:
        <div style="margin-top:5px;">${c.notasProveedor || 'Sin detalle registrado.'}</div>
      </div>
      ${puedeValidar ? `
      <div class="field" style="margin-top:12px;">
        <label>Comentario de validación <span class="hint">— opcional</span></label>
        <textarea class="input" id="hospValidacionComentario" placeholder="Ej. Verificado en sitio, equipo probado y funcionando correctamente."></textarea>
      </div>` : `<div class="scope-note" style="margin-top:10px;">Solo el Director o el Coordinador Biomédico pueden confirmar y cerrar esta orden.</div>`}
    `;
    if(puedeValidar){
      footHtml = `<button class="btn btn-ghost" onclick="closeHospOrderModal()">Cerrar</button>
        <button class="btn btn-primary" onclick="confirmarYCerrarOrdenHospital()">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>
          Confirmar que se realizó y cerrar
        </button>`;
    }
  } else if(c.estado === 'Cerrada'){
    validacionHtml = `
      <div class="scope-note" style="border-color:var(--green-600); background:var(--green-100); color:#215335; margin-top:10px;">
        <strong>Cerrada</strong> — validada por ${c.validadoPor || '—'} el ${fmtDate(c.fechaCierre)}.
        ${c.comentarioValidacion ? `<div style="margin-top:5px;">"${c.comentarioValidacion}"</div>` : ''}
        ${c.notasProveedor ? `<div style="margin-top:8px; padding-top:8px; border-top:1px solid #bcdcc7;"><strong>Reportado por el proveedor</strong> (${c.resueltoPor}, ${fmtDate(c.fechaResuelto)}): ${c.notasProveedor}</div>` : ''}
      </div>`;
  } else {
    validacionHtml = `<div class="scope-note" style="margin-top:10px;">Esta orden todavía no ha sido marcada como resuelta por el proveedor.</div>`;
  }

  document.getElementById('hospOrderValidacion').innerHTML = validacionHtml + bitacoraHTML(c.bitacora);
  document.getElementById('hospOrderFoot').innerHTML = footHtml;
  document.getElementById('hospOrderModalOverlay').classList.add('active');
}
function closeHospOrderModal(){
  document.getElementById('hospOrderModalOverlay').classList.remove('active');
  currentHospOrderFolio = null;
}
function confirmarYCerrarOrdenHospital(){
  if(!currentHospOrderFolio) return;
  const comentarioEl = document.getElementById('hospValidacionComentario');
  const comentario = comentarioEl ? comentarioEl.value.trim() : '';
  const hoy = new Date().toISOString().slice(0,10);
  actualizarOrdenGlobal('HOSP-1', currentHospOrderFolio, {
    estado:'Cerrada', validadoPor: currentUser, fechaCierre: hoy, comentarioValidacion: comentario
  });
  agregarBitacora('HOSP-1', currentHospOrderFolio, currentUser, 'Validada y cerrada por el hospital.' + (comentario ? ' — "'+comentario+'"' : ''));

  const c = correctivo.find(x=>x.folio===currentHospOrderFolio);
  if(c){
    const e = equipoById(c.equipoId);
    if(e){
      // Si la orden viene de "Enviar a servicio" (Programa de Mantenimiento) o de un
      // IMP programado, cerrarla equivale a completar el mantenimiento preventivo:
      // se registra como tal para que Programa de Mantenimiento recalcule la próxima
      // fecha automáticamente, sin necesitar un clic aparte en "Registrar realizado".
      const esPreventivo = c.origen === 'IMP programado' || c.origen.indexOf('Enviado a servicio') === 0;
      e.historial.unshift({
        fecha: hoy,
        tipo: esPreventivo ? 'Preventivo' : 'Correctivo',
        detalle: esPreventivo
          ? 'Mantenimiento preventivo completado — orden '+c.folio+' validada por '+currentUserLabel()+'.'
          : 'Orden '+c.folio+' validada y cerrada por '+currentUserLabel()+'.'
      });

      // Si no quedan otras órdenes abiertas para este equipo, regresa a Operativo.
      const otrasAbiertas = correctivo.some(o => o.equipoId===e.id && o.folio!==c.folio && o.estado!=='Cerrada');
      if(e.estado === 'En mantenimiento' && !otrasAbiertas){
        e.estado = 'Operativo';
        e.historial.unshift({fecha:hoy, tipo:'Estado', detalle:'Equipo vuelve a estar Operativo — orden '+c.folio+' cerrada, sin otras órdenes abiertas.'});
      }
    }

    // Si esta orden vino de una solicitud de revisión, esa solicitud también
    // se marca como resuelta para reflejarlo en Revisiones Diarias.
    if(c.solicitudFolio){
      const sol = solicitudes.find(s => s.folio === c.solicitudFolio);
      if(sol) sol.estado = 'Resuelta';
      renderSolicitudes();
    }
  }

  closeHospOrderModal();
  renderCorrectivo();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderDashboard();
  updateNavBadges();
  showToast('Orden confirmada y cerrada', 'success');
}

/* ===================== GE CALCULATOR MODAL ===================== */
function populateGESelect(){
  const sel = document.getElementById('geEquipoSelect');
  sel.innerHTML = '<option value="">Selecciona un equipo…</option>' + equipos.map(e=>`<option value="${e.id}">${e.nombre} — ${e.id}</option>`).join('');
}
function openGECalc(prefillId){
  populateGESelect();
  if(prefillId){
    document.getElementById('geEquipoSelect').value = prefillId;
    loadGEEquipo();
  } else {
    document.getElementById('geFuncion').value = '6';
    document.getElementById('geAplicacion').value = '3';
    document.getElementById('geMantenimiento').value = '3';
    document.getElementById('geAntecedentes').value = '0';
    recalcGE();
  }
  document.getElementById('geModalOverlay').classList.add('active');
}
function closeGECalc(){ document.getElementById('geModalOverlay').classList.remove('active'); }
function loadGEEquipo(){
  const id = document.getElementById('geEquipoSelect').value;
  const e = equipoById(id);
  if(!e) return;
  document.getElementById('geFuncion').value = e.ge.funcion;
  document.getElementById('geAplicacion').value = e.ge.aplicacion;
  document.getElementById('geMantenimiento').value = e.ge.mantenimiento;
  document.getElementById('geAntecedentes').value = e.ge.antecedentes;
  recalcGE();
}
function recalcGE(){
  const ge = {
    funcion: +document.getElementById('geFuncion').value,
    aplicacion: +document.getElementById('geAplicacion').value,
    mantenimiento: +document.getElementById('geMantenimiento').value,
    antecedentes: +document.getElementById('geAntecedentes').value
  };
  const total = geTotal(ge);
  document.getElementById('geResultBar').innerHTML = `
    <div class="ge-seg funcion" style="width:${Math.max(0,ge.funcion/22*100)}%"></div>
    <div class="ge-seg aplicacion" style="width:${Math.max(0,ge.aplicacion/22*100)}%"></div>
    <div class="ge-seg mantenimiento" style="width:${Math.max(0,ge.mantenimiento/22*100)}%"></div>
    <div class="ge-seg antecedentes" style="width:${Math.max(0,ge.antecedentes)/22*100}%"></div>
  `;
  document.getElementById('geResultNum').textContent = total;
  const clasif = geClasificacion(total);
  document.getElementById('geResultClasif').className = 'pill ' + (clasif==='I' ? 'pill-green' : 'pill-gray');
  document.getElementById('geResultClasif').textContent = clasif==='I' ? 'Incluido en programa (I)' : 'No incluido (N)';
  document.getElementById('geResultFreq').textContent = 'Frecuencia: ' + geFrecuencia(total);
  window.__geDraft = ge;
}
function saveGEResult(){
  const id = document.getElementById('geEquipoSelect').value;
  if(!id){ showToast('Selecciona un equipo para guardar'); return; }
  const e = equipoById(id);
  e.ge = {...window.__geDraft};
  closeGECalc();
  renderMantenimiento();
  renderInventario();
  renderDashboard();
  showToast('Clasificación GE actualizada para ' + e.nombre);
}

/* ===================== AGREGAR EQUIPO ===================== */
function openAddEquipoModal(){
  ['newNombre','newMarca','newSerie','newUbicacion','newProveedor'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('addEquipoOverlay').classList.add('active');
}
function closeAddEquipoModal(){ document.getElementById('addEquipoOverlay').classList.remove('active'); }
function saveNewEquipo(){
  const nombre = document.getElementById('newNombre').value.trim();
  if(!nombre){ showToast('Indica el nombre del equipo'); return; }
  const seq = equipos.length + 1;
  const id = 'EQ-' + String(700 + seq).padStart(4,'0');
  const hoy = new Date().toISOString().slice(0,10);
  const nuevo = {
    id, nombre,
    marca: document.getElementById('newMarca').value.trim() || '—',
    serie: document.getElementById('newSerie').value.trim() || '—',
    area: document.getElementById('newUbicacion').value.trim() || 'Sin asignar',
    categoria: document.getElementById('newCategoria').value,
    estado: 'Operativo',
    adquisicion: hoy, instalacion: hoy, fechaAlta: hoy, vidaUtilAnios: 8,
    proveedor: document.getElementById('newProveedor').value.trim() || '—',
    proveedorServicio: 'SimplicAI — Gestión integral (contrato vigente)',
    tipoRiesgo: 'Por definir',
    ge:{funcion:2, aplicacion:1, mantenimiento:1, antecedentes:0},
    accesorios:[], manuales:[], garantia:'Sin registrar.', historial:[]
  };
  equipos.push(nuevo);
  if(esEquipoMedico(nuevo)){
    checklists[id] = { items: CHECK_ITEMS.map(label=>({label, checked:false})), responsable:'', nota:'', guardadoHoy:false, hora:'', incidencias:[] };
  }
  closeAddEquipoModal();
  populateAreaFilter();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderDashboard();
  updateNavBadges();
  showToast('Equipo agregado — clasifícalo en Programa de Mantenimiento');
}

/* ===================== EDITAR / DESHABILITAR / SERVICIO / ELIMINAR EQUIPO ===================== */
function openEditEquipoModal(){
  const e = equipoById(currentDrawerId);
  if(!e) return;
  document.getElementById('editNombre').value = e.nombre;
  document.getElementById('editMarca').value = e.marca;
  document.getElementById('editSerie').value = e.serie;
  document.getElementById('editUbicacion').value = e.area;
  document.getElementById('editCategoria').value = e.categoria;
  document.getElementById('editProveedor').value = e.proveedor;
  document.getElementById('editEstado').value = e.estado;
  document.getElementById('editEquipoOverlay').classList.add('active');
}
function closeEditEquipoModal(){ document.getElementById('editEquipoOverlay').classList.remove('active'); }
function saveEditEquipo(){
  const e = equipoById(currentDrawerId);
  if(!e) return;
  const nombre = document.getElementById('editNombre').value.trim();
  if(!nombre){ showToast('Indica el nombre del equipo'); return; }
  e.nombre = nombre;
  e.marca = document.getElementById('editMarca').value.trim() || '—';
  e.serie = document.getElementById('editSerie').value.trim() || '—';
  e.area = document.getElementById('editUbicacion').value.trim() || 'Sin asignar';
  e.categoria = document.getElementById('editCategoria').value;
  e.proveedor = document.getElementById('editProveedor').value.trim() || '—';
  e.estado = document.getElementById('editEstado').value;

  // Si cambió de/hacia TI/Activo, sincroniza si tiene o no checklist de rutina.
  if(esEquipoMedico(e) && !checklists[e.id]){
    checklists[e.id] = { items: CHECK_ITEMS.map(label=>({label, checked:false})), responsable:'', nota:'', guardadoHoy:false, hora:'', incidencias:[] };
  } else if(!esEquipoMedico(e) && checklists[e.id]){
    delete checklists[e.id];
  }

  closeEditEquipoModal();
  populateAreaFilter();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderCorrectivo();
  renderDashboard();
  updateNavBadges();
  openDrawer(e.id);
  showToast('Equipo actualizado');
}

function deshabilitarEquipo(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Marcar "'+e.nombre+'" como Fuera de servicio?')) return;
  e.estado = 'Fuera de servicio';
  e.historial.unshift({fecha:new Date().toISOString().slice(0,10), tipo:'Estado', detalle:'Equipo deshabilitado por '+currentUserLabel()+'.'});
  renderInventario(); renderMantenimiento(); renderChecklist(); renderDashboard();
  openDrawer(id);
  showToast('Equipo marcado como fuera de servicio');
}

function enviarAServicio(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Enviar "'+e.nombre+'" a servicio y crear una orden de mantenimiento?')) return;
  e.estado = 'En mantenimiento';
  e.historial.unshift({fecha:new Date().toISOString().slice(0,10), tipo:'Correctivo', detalle:'Enviado a servicio por '+currentUserLabel()+'.'});
  const folioServicio = 'MC-'+String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio:folioServicio,
    equipoId:id, origen:'Enviado a servicio ('+currentUserLabel()+')',
    categoria:'Regular', estado:'Abierta', tecnico:'Sin asignar', fecha:new Date().toISOString().slice(0,10),
    notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'', bitacora:[]
  });
  agregarBitacora('HOSP-1', folioServicio, currentUser, 'Orden creada al enviar el equipo a servicio.');
  renderInventario(); renderMantenimiento(); renderChecklist(); renderCorrectivo(); renderDashboard(); updateNavBadges();
  openDrawer(id);
  showToast('Equipo enviado a servicio');
}

function registrarPreventivoRealizado(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Registrar que el mantenimiento preventivo de "'+e.nombre+'" ya se realizó? Esto recalcula su próxima fecha programada.')) return;
  const hoy = new Date().toISOString().slice(0,10);
  e.historial.unshift({fecha:hoy, tipo:'Preventivo', detalle:'Mantenimiento preventivo realizado, registrado por '+currentUserLabel()+'.'});
  if(e.estado === 'En mantenimiento') e.estado = 'Operativo';
  renderInventario(); renderMantenimiento(); renderChecklist(); renderDashboard(); updateNavBadges();
  showToast('Mantenimiento preventivo registrado — próxima fecha recalculada', 'success');
}

function eliminarEquipo(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('Esta acción elimina permanentemente "'+e.nombre+'" del inventario. ¿Continuar?')) return;
  equipos = equipos.filter(x=>x.id!==id);
  delete checklists[id];
  solicitudes = solicitudes.filter(s=>s.equipoId!==id);
  correctivo = correctivo.filter(c=>c.equipoId!==id);
  solicitudesPendientes = solicitudesPendientes.filter(p=>p.equipoId!==id);
  closeDrawer();
  populateAreaFilter();
  renderInventario(); renderMantenimiento(); renderChecklist(); renderSolicitudes(); renderAprobaciones(); renderMisSolicitudes(); renderCorrectivo(); renderDashboard(); updateNavBadges();
  showToast('Equipo eliminado del inventario');
}

/* ===================== DASHBOARD ===================== */
function renderDashboard(){
  const pendientes = Object.keys(checklists).length - Object.values(checklists).filter(c=>c.guardadoHoy).length;
  document.getElementById('dashPendientes').textContent = pendientes;
  document.getElementById('dashSolicitudes').textContent = solicitudes.filter(s=>s.estado==='Abierta').length;

  const criticos = equipos.filter(requiereIMP).sort((a,b)=>geTotal(b.ge)-geTotal(a.ge)).slice(0,4);
  document.getElementById('dashCriticos').innerHTML = criticos.map(e=>`
    <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--line-soft);">
      <div style="flex:1;">
        <div class="cell-primary" style="font-size:13px;">${e.nombre}</div>
        <div class="cell-sub">${assetTag(e.id)} · ${e.area}</div>
      </div>
      <div style="width:130px;">${geBarHTML(e.ge,'sm')}</div>
      ${geFrecPill(geTotal(e.ge))}
    </div>`).join('');

  const equiposClinicos = equipos.filter(requiereIMP);
  const totalClinicos = equiposClinicos.length;
  const iCount = equiposClinicos.filter(e=>geClasificacion(geTotal(e.ge))==='I').length;
  const nCount = totalClinicos - iCount;
  const trimestral = equiposClinicos.filter(e=>geTotal(e.ge)>=19).length;
  const semestral = equiposClinicos.filter(e=>{const t=geTotal(e.ge); return t>=15 && t<19;}).length;
  const anual = equiposClinicos.filter(e=>{const t=geTotal(e.ge); return t>=12 && t<15;}).length;
  document.getElementById('dashDistribucion').innerHTML = `
    <div class="bar-row"><div class="bar-label">Trimestral (GE≥19)</div><div class="bar-track"><div class="bar-fill" style="width:${trimestral/totalClinicos*100}%; background:var(--red-700)"></div></div><div class="bar-value">${trimestral}</div></div>
    <div class="bar-row"><div class="bar-label">Semestral (15–18)</div><div class="bar-track"><div class="bar-fill" style="width:${semestral/totalClinicos*100}%; background:var(--amber-600)"></div></div><div class="bar-value">${semestral}</div></div>
    <div class="bar-row"><div class="bar-label">Anual (12–14)</div><div class="bar-track"><div class="bar-fill" style="width:${anual/totalClinicos*100}%; background:var(--green-600)"></div></div><div class="bar-value">${anual}</div></div>
    <div class="bar-row"><div class="bar-label">No incluidos (N)</div><div class="bar-track"><div class="bar-fill" style="width:${nCount/totalClinicos*100}%; background:var(--muted)"></div></div><div class="bar-value">${nCount}</div></div>
  `;

  // Actividad: combinar checklists guardados hoy + solicitudes recientes
  const actividad = [];
  Object.entries(checklists).forEach(([id,c])=>{
    if(c.guardadoHoy){
      const e = equipoById(id);
      actividad.push({hora:c.hora, titulo:`Revisión diaria completada — ${e.nombre}`, desc:`${c.responsable || 'Sin responsable indicado'} · ${e.area}`});
    }
  });
  solicitudes.slice(0,4).forEach(s=>{
    const e = equipoById(s.equipoId);
    actividad.push({hora:s.hora, titulo:`Solicitud ${s.folio} — ${e ? e.nombre : ''}`, desc:`${s.urgencia} · ${s.tipo}`});
  });
  document.getElementById('dashActividad').innerHTML = actividad.length ? actividad.map(a=>`
    <div class="timeline-item">
      <div class="t-date">${a.hora || 'Hoy'}</div>
      <div class="t-title">${a.titulo}</div>
      <div class="t-desc">${a.desc}</div>
    </div>`).join('') : `<div class="scope-note">Aún no hay actividad registrada hoy. Completa un checklist o envía una solicitud de revisión.</div>`;

  const completadosHoy = Object.values(checklists).filter(c=>c.guardadoHoy).length;
  const pct = Math.round((completadosHoy/Object.keys(checklists).length)*100);
  document.getElementById('kpiCumplimiento').textContent = pct + '%';

  renderIndicadoresExtra();
}

/* ---- Indicadores: preventivo vs correctivo, inactividad, costos ---- */
function calcularRatioPreventivoCorrectivo(){
  let prev = 0, corr = 0;
  equipos.forEach(e=>{
    (e.historial || []).forEach(h=>{
      if(h.tipo === 'Preventivo') prev++;
      else if(h.tipo === 'Correctivo') corr++;
    });
  });
  const total = prev + corr;
  return {prev, corr, total, pctPrev: total ? Math.round(prev/total*100) : 0, pctCorr: total ? Math.round(corr/total*100) : 0};
}
function calcularInactividadPorEquipo(){
  const map = {};
  correctivo.forEach(c=>{
    if(c.fechaCierre){
      const d1 = new Date(c.fecha+'T00:00:00'), d2 = new Date(c.fechaCierre+'T00:00:00');
      const dias = Math.max(0, Math.round((d2-d1)/86400000));
      if(!map[c.equipoId]) map[c.equipoId] = {dias:0, ordenes:0};
      map[c.equipoId].dias += dias;
      map[c.equipoId].ordenes += 1;
    }
  });
  return Object.entries(map)
    .map(([equipoId, v])=>({equipoId, ...v, equipo: equipoById(equipoId)}))
    .filter(x=>x.equipo)
    .sort((a,b)=> b.dias - a.dias);
}
function calcularCostosMantenimiento(){
  const conCosto = correctivo.filter(c=> typeof c.costoEstimado === 'number' && c.costoEstimado > 0);
  const total = conCosto.reduce((s,c)=> s + c.costoEstimado, 0);
  const porCategoria = {};
  conCosto.forEach(c=>{ porCategoria[c.categoria] = (porCategoria[c.categoria] || 0) + c.costoEstimado; });
  return {total, count: conCosto.length, promedio: conCosto.length ? total/conCosto.length : 0, porCategoria};
}
function fmtMXN(n){ return '$' + Math.round(n).toLocaleString('es-MX') + ' MXN'; }

function renderIndicadoresExtra(){
  const ratioEl = document.getElementById('indRatioBar');
  if(!ratioEl) return; // la vista de Indicadores aún no se ha pintado

  const r = calcularRatioPreventivoCorrectivo();
  document.getElementById('kpiRatioPrevCorr').textContent = r.total ? `${r.pctPrev}% / ${r.pctCorr}%` : '—';
  ratioEl.innerHTML = r.total ? `
    <div class="ge-track" style="height:14px;">
      <div class="ge-seg" style="width:${r.pctPrev}%; background:var(--teal-600);"></div>
      <div class="ge-seg" style="width:${r.pctCorr}%; background:var(--clay-600);"></div>
    </div>
    <div class="ge-legend">
      <span><i style="background:var(--teal-600)"></i>Preventivo: ${r.prev} evento(s) — ${r.pctPrev}%</span>
      <span><i style="background:var(--clay-600)"></i>Correctivo: ${r.corr} evento(s) — ${r.pctCorr}%</span>
    </div>` : `<div class="scope-note">Aún no hay eventos de mantenimiento registrados.</div>`;

  const inact = calcularInactividadPorEquipo();
  const totalDias = inact.reduce((s,x)=>s+x.dias, 0);
  const totalOrdenes = inact.reduce((s,x)=>s+x.ordenes, 0);
  document.getElementById('kpiPromInactividad').textContent = totalOrdenes ? (totalDias/totalOrdenes).toFixed(1) + ' días' : '—';
  const inactList = document.getElementById('indInactividadList');
  const maxDias = Math.max(1, ...inact.map(x=>x.dias));
  inactList.innerHTML = inact.length ? inact.slice(0,6).map(x=>`
    <div class="bar-row">
      <div class="bar-label">${x.equipo.nombre}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${(x.dias/maxDias*100)}%; background:var(--clay-600);"></div></div>
      <div class="bar-value">${x.dias} d</div>
    </div>`).join('') : `<div class="scope-note">Aún no hay órdenes cerradas para calcular tiempos de inactividad.</div>`;

  const costos = calcularCostosMantenimiento();
  document.getElementById('kpiCostoTotal').textContent = costos.count ? fmtMXN(costos.total) : '—';
  const costoDetalle = document.getElementById('indCostoDetalle');
  if(costos.count){
    const cats = Object.entries(costos.porCategoria).sort((a,b)=>b[1]-a[1]);
    const maxCat = Math.max(1, ...cats.map(c=>c[1]));
    costoDetalle.innerHTML = cats.map(([cat, monto])=>`
      <div class="bar-row">
        <div class="bar-label">${cat}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${(monto/maxCat*100)}%; background:var(--teal-600);"></div></div>
        <div class="bar-value" style="width:auto; font-size:11px;">${fmtMXN(monto)}</div>
      </div>`).join('') + `<div class="scope-note">Promedio por orden: ${fmtMXN(costos.promedio)} · ${costos.count} orden(es) con costo registrado.</div>`;
  } else {
    costoDetalle.innerHTML = `<div class="scope-note">Aún no hay costos registrados. El proveedor los captura al resolver una orden en Órdenes de Servicio.</div>`;
  }
}

function updateNavBadges(){
  document.getElementById('navBadgeInv').textContent = equipos.length;
  const pendientesRev = Object.keys(checklists).length - Object.values(checklists).filter(c=>c.guardadoHoy).length;
  document.getElementById('navBadgeRev').textContent = pendientesRev;
  const corrAbiertas = correctivo.filter(c=>c.estado!=='Cerrada').length;
  const badgeCorr = document.getElementById('navBadgeCorr');
  badgeCorr.textContent = corrAbiertas;
  badgeCorr.style.display = corrAbiertas>0 ? '' : 'none';
}

/* ===================== PORTAL DE PROVEEDOR (CLÉRA) ===================== */
function hospitalById(id){ return hospitales.find(h=>h.id===id); }

// Calcula el estado de vigencia del contrato de un hospital según su fecha de renovación.
function estadoContrato(h){
  if(!h.contratoRenovacion) return {estado:'sin-dato', dias:null};
  const hoy = new Date();
  const renov = new Date(h.contratoRenovacion + 'T00:00:00');
  const dias = Math.round((renov - hoy) / 86400000);
  if(dias < 0) return {estado:'vencido', dias};
  if(dias <= 60) return {estado:'por-vencer', dias};
  return {estado:'vigente', dias};
}
function contratoPill(h){
  const c = estadoContrato(h);
  if(c.estado === 'vencido') return `<span class="pill pill-red">Contrato vencido</span>`;
  if(c.estado === 'por-vencer') return `<span class="pill pill-amber">Renueva en ${c.dias} días</span>`;
  if(c.estado === 'vigente') return `<span class="pill pill-green">Contrato vigente</span>`;
  return `<span class="pill pill-gray">Sin dato</span>`;
}
function modeloServicioPill(h){
  const m = h.modeloServicio || 'Sin definir';
  if(m === 'Autogestionado') return `<span class="pill pill-teal">Autogestionado</span>`;
  if(m === 'Gestionado por SimplicAI') return `<span class="pill pill-clay">Gestionado por SimplicAI</span>`;
  return `<span class="pill pill-gray">${m}</span>`;
}

// Normaliza los equipos de un hospital, sin importar si vienen del inventario
// real (Hospital General del Valle) o del resumen de un hospital de ejemplo.
function obtenerEquiposDeHospital(hospId){
  if(hospId === 'HOSP-1'){
    return equipos.map(e=>({id:e.id, nombre:e.nombre, marca:e.marca, serie:e.serie, area:e.area, estado:e.estado}));
  }
  const h = hospitalById(hospId);
  return h ? (h.equiposResumen || []) : [];
}

// Normaliza las órdenes de servicio de un hospital: para HOSP-1 se leen
// directamente del arreglo `correctivo` (el mismo que ve el hospital), para
// los demás se leen de su `ordenesResumen` propio.
function obtenerOrdenesDeHospital(hospId){
  if(hospId === 'HOSP-1'){
    return correctivo.map(c=>({
      hospId:'HOSP-1', folio:c.folio, equipoId:c.equipoId,
      equipoNombre: (equipoById(c.equipoId)||{}).nombre || '—',
      origen:c.origen, detalle:c.detalle || '', categoria:c.categoria, estado:c.estado,
      tecnico:c.tecnico, fecha:c.fecha,
      notasProveedor:c.notasProveedor || '', resueltoPor:c.resueltoPor || '', fechaResuelto:c.fechaResuelto || '',
      validadoPor:c.validadoPor || '', fechaCierre:c.fechaCierre || '', comentarioValidacion:c.comentarioValidacion || '',
      bitacora:c.bitacora || []
    }));
  }
  const h = hospitalById(hospId);
  return h ? (h.ordenesResumen || []).map(o=>({hospId, ...o})) : [];
}
function todasLasOrdenesProveedor(){
  return hospitales.flatMap(h=> obtenerOrdenesDeHospital(h.id));
}
// Aplica cambios a una orden, sin importar si vive en `correctivo` (HOSP-1)
// o en el `ordenesResumen` embebido de un hospital de ejemplo.
function actualizarOrdenGlobal(hospId, folio, cambios){
  if(hospId === 'HOSP-1'){
    const c = correctivo.find(x=>x.folio===folio);
    if(c) Object.assign(c, cambios);
    return;
  }
  const h = hospitalById(hospId);
  if(!h) return;
  const o = (h.ordenesResumen||[]).find(x=>x.folio===folio);
  if(o) Object.assign(o, cambios);
}
// Agrega un evento a la bitácora de una orden (registro de quién hizo qué y cuándo).
function agregarBitacora(hospId, folio, usuario, evento){
  const entry = {
    fecha: new Date().toISOString().slice(0,10),
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
    usuario, evento
  };
  let destino = null;
  if(hospId === 'HOSP-1'){
    destino = correctivo.find(x=>x.folio===folio);
  } else {
    const h = hospitalById(hospId);
    destino = h ? (h.ordenesResumen||[]).find(x=>x.folio===folio) : null;
  }
  if(!destino) return;
  if(!destino.bitacora) destino.bitacora = [];
  destino.bitacora.push(entry);
}
function bitacoraHTML(bitacora){
  if(!bitacora || bitacora.length === 0) return `<div class="scope-note" style="margin-top:10px;">Sin eventos registrados en la bitácora.</div>`;
  return `
    <div class="section-title" style="font-size:12.5px; margin:14px 0 8px;">Bitácora de la orden</div>
    <div class="timeline">
      ${bitacora.map(b=>`
        <div class="timeline-item">
          <div class="t-date">${fmtDate(b.fecha)} · ${b.hora}</div>
          <div class="t-title">${b.usuario}</div>
          <div class="t-desc">${b.evento}</div>
        </div>`).join('')}
    </div>`;
}

function applyProviderRolePermissions(){
  const esTecnico = currentRole === 'tecnico_proveedor';
  document.querySelectorAll('#providerApp .nav-item[data-pview]').forEach(b=>{
    const oculto = esTecnico && (b.dataset.pview === 'panel' || b.dataset.pview === 'hospitales');
    b.style.display = oculto ? 'none' : '';
  });
  const heading = document.querySelector('#pview-ordenes .view-head h2');
  const desc = document.querySelector('#pview-ordenes .view-desc');
  if(heading) heading.textContent = esTecnico ? 'Mis Órdenes de Servicio' : 'Órdenes de Servicio';
  if(desc) desc.textContent = esTecnico
    ? 'Las órdenes que tienes asignadas, en todos los hospitales cliente.'
    : 'Todas las órdenes de todos tus hospitales cliente, en un solo lugar.';
}

function switchProviderView(view){
  const navKey = view === 'hospital-detalle' ? 'hospitales' : view;
  document.querySelectorAll('#providerApp .nav-item[data-pview]').forEach(b=>b.classList.toggle('active', b.dataset.pview===navKey));
  document.querySelectorAll('#providerApp .view').forEach(v=>v.classList.remove('active'));
  document.getElementById('pview-'+view).classList.add('active');
  const ordenesTitle = currentRole === 'tecnico_proveedor' ? 'Mis Órdenes de Servicio' : 'Órdenes de Servicio';
  const titles = {panel:'Panel General', hospitales:'Mis Hospitales', 'hospital-detalle': currentProvHospitalId ? hospitalById(currentProvHospitalId).nombre : 'Hospital', ordenes:ordenesTitle};
  document.getElementById('provTopbarTitle').textContent = titles[view] || 'Panel General';
  if(view === 'panel') renderProviderPanel();
  if(view === 'hospitales') renderProviderHospitales();
  if(view === 'ordenes') renderProviderOrdenesGlobal();
  window.scrollTo({top:0, behavior:'instant'});
}

function initProviderPortal(){
  applyProviderRolePermissions();
  renderProviderPanel();
  renderProviderHospitales();
  renderProviderOrdenesGlobal();
  const vistaInicial = currentRole === 'tecnico_proveedor' ? 'ordenes' : 'panel';
  switchProviderView(vistaInicial);
}

function renderProviderPanel(){
  const grid = document.getElementById('panelHospitales');
  if(!grid) return;

  const todasOrdenes = todasLasOrdenesProveedor();
  const totalEquipos = hospitales.reduce((sum,h)=> sum + obtenerEquiposDeHospital(h.id).length, 0);
  const abiertas = todasOrdenes.filter(o=> o.estado!=='Cerrada').length;
  const porValidar = todasOrdenes.filter(o=> o.estado==='Resuelto por proveedor').length;
  const cerradas = todasOrdenes.filter(o=> o.estado==='Cerrada').length;

  document.getElementById('panelHospitales').textContent = hospitales.length;
  document.getElementById('panelEquipos').textContent = totalEquipos;
  document.getElementById('panelAbiertas').textContent = abiertas;
  document.getElementById('panelPorValidar').textContent = porValidar;
  document.getElementById('panelCerradas').textContent = cerradas;

  // Tiempo promedio de resolución: días entre fecha de reporte y fecha en que
  // el proveedor la marcó como resuelta (para órdenes que ya tienen ambas fechas).
  const resueltas = todasOrdenes.filter(o=> o.fecha && o.fechaResuelto);
  if(resueltas.length > 0){
    const totalDias = resueltas.reduce((sum,o)=>{
      const d1 = new Date(o.fecha+'T00:00:00'), d2 = new Date(o.fechaResuelto+'T00:00:00');
      return sum + Math.max(0, Math.round((d2-d1)/86400000));
    }, 0);
    const prom = (totalDias / resueltas.length).toFixed(1);
    document.getElementById('panelTiempoResolucion').textContent = prom + ' días';
  } else {
    document.getElementById('panelTiempoResolucion').textContent = '—';
  }

  const contratosPorVencer = hospitales.filter(h=>{
    const c = estadoContrato(h);
    return c.estado === 'por-vencer' || c.estado === 'vencido';
  }).length;
  document.getElementById('panelContratos').textContent = contratosPorVencer;

  const porHospital = document.getElementById('panelPorHospital');
  const maxAbiertas = Math.max(1, ...hospitales.map(h=> obtenerOrdenesDeHospital(h.id).filter(o=>o.estado!=='Cerrada').length));
  porHospital.innerHTML = hospitales.map(h=>{
    const ords = obtenerOrdenesDeHospital(h.id);
    const n = ords.filter(o=>o.estado!=='Cerrada').length;
    return `
    <div class="bar-row">
      <div class="bar-label">${h.nombre}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${(n/maxAbiertas*100)}%; background:${n>0?'var(--clay-600)':'var(--teal-600)'}"></div></div>
      <div class="bar-value">${n}</div>
    </div>`;
  }).join('');
}

/* ---- Dar de alta un nuevo hospital ---- */
function openAddHospitalModal(){
  ['newHospNombre','newHospCiudad','newHospDireccion','newHospContacto','newHospTelefono','newHospContrato','newHospValor'].forEach(id=>{
    document.getElementById(id).value = '';
  });
  document.getElementById('newHospTipo').value = 'Privado';
  document.getElementById('newHospModelo').value = 'Autogestionado';
  document.getElementById('newHospInicio').value = new Date().toISOString().slice(0,10);
  document.getElementById('newHospRenovacion').value = '';
  document.getElementById('addHospitalOverlay').classList.add('active');
}
function closeAddHospitalModal(){
  document.getElementById('addHospitalOverlay').classList.remove('active');
}
function saveNewHospital(){
  const nombre = document.getElementById('newHospNombre').value.trim();
  if(!nombre){ showToast('Indica el nombre del hospital'); return; }
  const seq = hospitales.length + 1;
  const id = 'HOSP-' + seq;
  const nuevo = {
    id, nombre, esReal:false,
    tipo: document.getElementById('newHospTipo').value,
    ciudad: document.getElementById('newHospCiudad').value.trim() || 'Sin especificar',
    direccion: document.getElementById('newHospDireccion').value.trim() || '—',
    contacto: document.getElementById('newHospContacto').value.trim() || '—',
    telefono: document.getElementById('newHospTelefono').value.trim() || '—',
    modeloServicio: document.getElementById('newHospModelo').value,
    contrato: document.getElementById('newHospContrato').value.trim() || 'Por definir',
    contratoValor: document.getElementById('newHospValor').value.trim() || 'Por definir',
    inicioServicio: document.getElementById('newHospInicio').value || new Date().toISOString().slice(0,10),
    contratoRenovacion: document.getElementById('newHospRenovacion').value || '',
    equiposResumen: [],
    ordenesResumen: []
  };
  hospitales.push(nuevo);
  closeAddHospitalModal();
  renderProviderHospitales();
  renderProviderPanel();
  showToast('Hospital "' + nombre + '" dado de alta', 'success');
  openHospitalDetalle(id);
}

function renderProviderHospitales(){
  const grid = document.getElementById('provHospitalesGrid');
  if(!grid) return;
  grid.innerHTML = hospitales.map(h=>{
    const eqs = obtenerEquiposDeHospital(h.id);
    const ords = obtenerOrdenesDeHospital(h.id);
    const abiertas = ords.filter(o=>o.estado!=='Cerrada').length;
    return `
    <div class="prov-hosp-card" onclick="openHospitalDetalle('${h.id}')">
      <div class="prov-hosp-top">
        <div>
          <div class="cell-primary" style="font-size:15px;">${h.nombre}</div>
          <div class="cell-sub">${h.ciudad}</div>
        </div>
        <span class="pill ${h.tipo==='Público' ? 'pill-teal' : 'pill-clay'}">${h.tipo}</span>
      </div>
      <div class="cell-sub">${h.contrato}</div>
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">${contratoPill(h)}${modeloServicioPill(h)}</div>
      <div class="prov-hosp-stats">
        <div class="prov-hosp-stat"><div class="n">${eqs.length}</div><div class="l">Equipos</div></div>
        <div class="prov-hosp-stat"><div class="n" style="color:${abiertas>0?'var(--red-700)':'inherit'}">${abiertas}</div><div class="l">Órdenes abiertas</div></div>
      </div>
    </div>`;
  }).join('');
}

let currentProvHospitalId = null;
function openHospitalDetalle(hospId){
  currentProvHospitalId = hospId;
  const h = hospitalById(hospId);
  document.getElementById('provHospNombre').textContent = h.nombre;
  document.getElementById('provHospSub').textContent = `${h.ciudad} · ${h.contrato}`;
  renderHospitalInfoTab(h);
  renderHospitalEquiposTab(h);
  renderHospitalOrdenesTab(h);
  switchProviderHospitalTab('info');
  switchProviderView('hospital-detalle');
}

function switchProviderHospitalTab(tab){
  document.querySelectorAll('#pview-hospital-detalle [data-phtab]').forEach(b=>b.classList.toggle('active', b.dataset.phtab===tab));
  document.querySelectorAll('#pview-hospital-detalle .tab-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('phtab-'+tab).classList.add('active');
}

function renderHospitalInfoTab(h){
  document.getElementById('provHospInfoKv').innerHTML = `
    <div class="kv-item"><div class="k">Nombre</div><div class="v">${h.nombre}</div></div>
    <div class="kv-item"><div class="k">Tipo</div><div class="v">${h.tipo}</div></div>
    <div class="kv-item"><div class="k">Ciudad</div><div class="v">${h.ciudad}</div></div>
    <div class="kv-item"><div class="k">Dirección</div><div class="v">${h.direccion}</div></div>
    <div class="kv-item"><div class="k">Contacto</div><div class="v">${h.contacto}</div></div>
    <div class="kv-item"><div class="k">Teléfono</div><div class="v mono">${h.telefono}</div></div>
    <div class="kv-item"><div class="k">Modelo de servicio</div><div class="v">${modeloServicioPill(h)}</div></div>
    <div class="kv-item"><div class="k">Tipo de contrato</div><div class="v">${h.contrato}</div></div>
    <div class="kv-item"><div class="k">Inicio del servicio</div><div class="v">${fmtDate(h.inicioServicio)}</div></div>
    <div class="kv-item"><div class="k">Valor del contrato</div><div class="v">${h.contratoValor || '—'}</div></div>
    <div class="kv-item"><div class="k">Próxima renovación</div><div class="v">${h.contratoRenovacion ? fmtDate(h.contratoRenovacion) : '—'} · ${contratoPill(h)}</div></div>
  `;
}

function renderHospitalEquiposTab(h){
  const eqs = obtenerEquiposDeHospital(h.id);
  document.getElementById('provHospEquiposCount').textContent = '(' + eqs.length + ')';
  const body = document.getElementById('provHospEquiposBody');
  if(eqs.length === 0){
    body.innerHTML = `<tr><td colspan="5"><div class="empty-state">Sin equipos registrados para este hospital.</div></td></tr>`;
    return;
  }
  body.innerHTML = eqs.map(e=>`
    <tr class="${h.esReal ? 'clickable' : ''}" ${h.esReal ? `onclick="openDrawer('${e.id}')"` : ''}>
      <td class="cell-primary">${e.nombre}</td>
      <td>${assetTag(e.id)}</td>
      <td>${e.marca}</td>
      <td>${e.area}</td>
      <td>${statusPill(e.estado)}</td>
    </tr>`).join('');
}

function renderHospitalOrdenesTab(h){
  const ords = obtenerOrdenesDeHospital(h.id);
  document.getElementById('provHospOrdenesCount').textContent = '(' + ords.length + ')';
  const body = document.getElementById('provHospOrdenesBody');
  if(ords.length === 0){
    body.innerHTML = `<tr><td colspan="7"><div class="empty-state">Sin órdenes de servicio registradas.</div></td></tr>`;
    return;
  }
  body.innerHTML = ords.map(o=>`
    <tr class="clickable" onclick="openProviderOrderModal('${o.hospId}','${o.folio}')">
      <td class="mono">${o.folio}</td>
      <td>${o.equipoNombre}</td>
      <td>${categoriaPill(o.categoria)}</td>
      <td>${estadoOrdenPill(o.estado)}</td>
      <td style="font-size:12.5px;">${o.tecnico && o.tecnico!=='Sin asignar' ? o.tecnico : '<span style="color:var(--muted);">Sin asignar</span>'}</td>
      <td class="mono" style="font-size:12px;">${fmtDate(o.fecha)}</td>
      <td style="text-align:right;"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></td>
    </tr>`).join('');
}

function renderProviderOrdenesGlobal(){
  const body = document.getElementById('provOrdenesGlobalBody');
  if(!body) return;
  let ords = todasLasOrdenesProveedor();
  if(currentRole === 'tecnico_proveedor'){
    const miNombre = USER_ROLES[currentUser].nombreCompleto;
    ords = ords.filter(o => o.tecnico === miNombre);
  }
  ords = ords.slice().sort((a,b)=> b.fecha.localeCompare(a.fecha));
  const abiertas = ords.filter(o=>o.estado!=='Cerrada').length;
  const badge = document.getElementById('provNavBadgeOrdenes');
  if(badge){ badge.textContent = abiertas; badge.style.display = abiertas>0 ? '' : 'none'; }

  document.getElementById('provOrdEmerg').textContent = ords.filter(o=>o.categoria==='Urgente emergencia' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdUrg').textContent = ords.filter(o=>o.categoria==='Urgente' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdReg').textContent = ords.filter(o=>o.categoria==='Regular' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdCerradas').textContent = ords.filter(o=>o.estado==='Cerrada').length;

  if(ords.length === 0){
    body.innerHTML = `<tr><td colspan="8"><div class="empty-state">${currentRole==='tecnico_proveedor' ? 'No tienes órdenes asignadas por el momento.' : 'Sin órdenes de servicio registradas todavía.'}</div></td></tr>`;
    return;
  }
  body.innerHTML = ords.map(o=>{
    const h = hospitalById(o.hospId);
    return `
    <tr class="clickable" onclick="openProviderOrderModal('${o.hospId}','${o.folio}')">
      <td class="mono">${o.folio}</td>
      <td>${h ? h.nombre : '—'}</td>
      <td><div class="cell-primary">${o.equipoNombre}</div></td>
      <td>${categoriaPill(o.categoria)}</td>
      <td>${estadoOrdenPill(o.estado)}</td>
      <td style="font-size:12.5px;">${o.tecnico && o.tecnico!=='Sin asignar' ? o.tecnico : '<span style="color:var(--muted);">Sin asignar</span>'}</td>
      <td class="mono" style="font-size:12px;">${fmtDate(o.fecha)}</td>
      <td style="text-align:right;"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></td>
    </tr>`;
  }).join('');
}

/* ---- Modal de detalle / cierre de orden ---- */
let currentProvOrder = null; // {hospId, folio}
function openProviderOrderModal(hospId, folio){
  const ords = obtenerOrdenesDeHospital(hospId);
  const o = ords.find(x=>x.folio===folio);
  if(!o) return;
  currentProvOrder = {hospId, folio};
  const h = hospitalById(hospId);

  document.getElementById('provOrderTitle').textContent = 'Orden ' + o.folio + ' — ' + o.equipoNombre;
  document.getElementById('provOrderSub').textContent = h.nombre;

  let estadoNota = '';
  if(o.estado === 'Resuelto por proveedor'){
    estadoNota = `<div class="scope-note" style="border-color:var(--clay-600); background:var(--clay-100); color:var(--clay-600);">
      <strong>Marcado como resuelto</strong> por ${o.resueltoPor} el ${fmtDate(o.fechaResuelto)} — pendiente de que el hospital lo valide y cierre.
    </div>`;
  } else if(o.estado === 'Cerrada'){
    estadoNota = `<div class="scope-note" style="border-color:var(--green-600); background:var(--green-100); color:#215335;">
      <strong>Cerrada</strong> — validada por ${o.validadoPor || 'el hospital'} el ${fmtDate(o.fechaCierre)}.
      ${o.comentarioValidacion ? `<div style="margin-top:4px;">"${o.comentarioValidacion}"</div>` : ''}
    </div>`;
  }

  const tecnicoActual = o.tecnico && o.tecnico !== 'Sin asignar' ? o.tecnico : 'Sin asignar';
  let tecnicoHTML;
  if(currentRole === 'proveedor'){
    const opciones = ['Sin asignar', ...TECNICOS_PROVEEDOR].map(t=>
      `<option value="${t}" ${t===tecnicoActual ? 'selected' : ''}>${t}</option>`).join('');
    tecnicoHTML = `<select class="select" style="width:100%; padding:5px 8px; font-size:13px;" onchange="cambiarTecnicoOrden(this.value)">${opciones}</select>`;
  } else {
    tecnicoHTML = `<span style="font-weight:600;">${tecnicoActual}</span>`;
  }

  document.getElementById('provOrderInfo').innerHTML = `
    <div class="kv" style="margin-bottom:4px;">
      <div class="kv-item"><div class="k">Origen</div><div class="v" style="font-weight:500;">${o.origen}</div></div>
      <div class="kv-item"><div class="k">Categoría</div><div class="v">${categoriaPill(o.categoria)}</div></div>
      <div class="kv-item"><div class="k">Estado actual</div><div class="v">${estadoOrdenPill(o.estado)}</div></div>
      <div class="kv-item"><div class="k">Fecha de reporte</div><div class="v">${fmtDate(o.fecha)}</div></div>
      <div class="kv-item" style="grid-column:1 / -1;"><div class="k">Técnico asignado</div><div class="v">${tecnicoHTML}</div></div>
    </div>
    ${o.detalle ? `<div class="scope-note" style="margin-bottom:4px;"><strong>Reportado por el hospital:</strong> ${o.detalle}</div>` : ''}
    ${estadoNota}
    ${bitacoraHTML(o.bitacora)}
  `;
  document.getElementById('provOrderNotas').value = o.notasProveedor || '';
  document.getElementById('provOrderCosto').value = (typeof o.costoEstimado === 'number') ? o.costoEstimado : '';

  const cerrada = o.estado === 'Cerrada';
  document.getElementById('provOrderNotas').disabled = cerrada;
  document.getElementById('provOrderCosto').disabled = cerrada;
  document.getElementById('provOrderFoot').style.display = cerrada ? 'none' : 'flex';
  document.getElementById('provOrderModalOverlay').classList.add('active');
}
function closeProviderOrderModal(){
  document.getElementById('provOrderModalOverlay').classList.remove('active');
  currentProvOrder = null;
}
function refrescarVistasOrdenProveedor(){
  renderProviderOrdenesGlobal();
  renderProviderHospitales();
  if(currentProvHospitalId){
    const h = hospitalById(currentProvHospitalId);
    renderHospitalOrdenesTab(h);
  }
  if(currentProvOrder && currentProvOrder.hospId === 'HOSP-1'){ renderCorrectivo(); renderDashboard(); updateNavBadges(); }
}
function cambiarTecnicoOrden(nuevoTecnico){
  if(!currentProvOrder || currentRole !== 'proveedor') return;
  actualizarOrdenGlobal(currentProvOrder.hospId, currentProvOrder.folio, {tecnico: nuevoTecnico});
  agregarBitacora(currentProvOrder.hospId, currentProvOrder.folio, currentUser,
    nuevoTecnico === 'Sin asignar' ? 'Técnico desasignado de la orden.' : 'Técnico asignado: ' + nuevoTecnico + '.');
  refrescarVistasOrdenProveedor();
  openProviderOrderModal(currentProvOrder.hospId, currentProvOrder.folio);
  showToast('Técnico ' + (nuevoTecnico === 'Sin asignar' ? 'desasignado' : 'asignado: ' + nuevoTecnico));
}
function leerCostoInput(){
  const raw = document.getElementById('provOrderCosto').value;
  if(raw === '' || raw === null) return null;
  const n = Number(raw);
  return isNaN(n) || n < 0 ? null : n;
}
function guardarNotasOrden(){
  if(!currentProvOrder) return;
  const notas = document.getElementById('provOrderNotas').value.trim();
  const costo = leerCostoInput();
  const cambios = {notasProveedor: notas};
  if(costo !== null) cambios.costoEstimado = costo;
  const ords = obtenerOrdenesDeHospital(currentProvOrder.hospId);
  const actual = ords.find(o=>o.folio===currentProvOrder.folio);
  const eraAbierta = actual && actual.estado === 'Abierta';
  if(eraAbierta) cambios.estado = 'En proceso';
  actualizarOrdenGlobal(currentProvOrder.hospId, currentProvOrder.folio, cambios);
  agregarBitacora(currentProvOrder.hospId, currentProvOrder.folio, currentUser, eraAbierta ? 'Orden puesta en proceso, notas actualizadas.' : 'Notas actualizadas por el proveedor.');
  refrescarVistasOrdenProveedor();
  openProviderOrderModal(currentProvOrder.hospId, currentProvOrder.folio);
  showToast('Notas guardadas en la orden');
}
function resolverYCerrarOrden(){
  if(!currentProvOrder) return;
  const notas = document.getElementById('provOrderNotas').value.trim();
  if(!notas){ showToast('Describe el diagnóstico o la solución antes de marcarla como resuelta'); return; }
  const costo = leerCostoInput();
  const cambios = {estado:'Resuelto por proveedor', notasProveedor: notas, resueltoPor: currentUser, fechaResuelto: new Date().toISOString().slice(0,10)};
  if(costo !== null) cambios.costoEstimado = costo;
  actualizarOrdenGlobal(currentProvOrder.hospId, currentProvOrder.folio, cambios);
  agregarBitacora(currentProvOrder.hospId, currentProvOrder.folio, currentUser, 'Marcada como resuelta por el proveedor.' + (costo!==null ? ' Costo estimado: '+fmtMXN(costo)+'.' : ''));
  refrescarVistasOrdenProveedor();
  closeProviderOrderModal();
  showToast('Orden marcada como resuelta — el hospital debe validarla para cerrarla', 'success');
}

/* ===================== LOGIN GATE + ROLES ===================== */
// Cada usuario tiene un rol fijo con permisos distintos:
//   admin             -> fernandoreyes  (Director Biomédico, acceso completo, incluye eliminar)
//   coordinador       -> esaupreciado   (Coordinador Biomédico: alta, edición, deshabilitar,
//                                         enviar a servicio, solicitudes, reportes — no eliminar)
//   tecnico           -> octaviorojas   (Técnico Biomédico del hospital: solo ver inventario y
//                                         hacer rutinas)
//   proveedor         -> simplicai_admin    (Equipo de SimplicAI: portal distinto, ve varios hospitales
//                                         cliente, contratos, y todas las órdenes de servicio)
//   tecnico_proveedor -> antonioperez   (Técnico Biomédico de SimplicAI: portal de proveedor, pero
//                                         solo ve las órdenes que tiene asignadas — sin acceso
//                                         al Panel General, Mis Hospitales ni contratos)
const USER_ROLES = {
  "fernandoreyes": {role:"admin",       label:"Director Biomédico",   initials:"FR", nombreCompleto:"Fernando Reyes"},
  "esaupreciado":  {role:"coordinador", label:"Coordinador Biomédico",initials:"EP", nombreCompleto:"Esaú Preciado"},
  "octaviorojas":  {role:"tecnico",     label:"Técnico Biomédico",    initials:"OR", nombreCompleto:"Octavio Rojas"},
  "simplicai_admin":   {role:"proveedor",   label:"Proveedor de Servicio — SimplicAI", initials:"CA", nombreCompleto:"Equipo SimplicAI"},
  "antonioperez":  {role:"tecnico_proveedor", label:"Técnico Biomédico — SimplicAI", initials:"AP", nombreCompleto:"Antonio Pérez"}
};
const ALLOWED_USERS = Object.keys(USER_ROLES);
const TEAM_PASSWORD = "SimplicAI2026";
const DEFAULT_VIEW_BY_ROLE = {admin:"dashboard", coordinador:"dashboard", tecnico:"dashboard"};

let loginSelectedUser = null;
let currentRole = null;
let currentUser = null;
function currentUserLabel(){ return currentUser ? (USER_ROLES[currentUser].label + ' (' + currentUser + ')') : 'usuario'; }

function selectLoginUser(el){
  document.querySelectorAll('.user-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  loginSelectedUser = el.dataset.user;
  document.getElementById('loginError').classList.remove('show');
}

function tryLogin(){
  const pass = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  if(!loginSelectedUser || !ALLOWED_USERS.includes(loginSelectedUser) || pass !== TEAM_PASSWORD){
    errEl.classList.add('show');
    return;
  }
  errEl.classList.remove('show');
  try{ localStorage.setItem('simplicaiSession', loginSelectedUser); }catch(e){}
  grantAccess(loginSelectedUser);
}

function grantAccess(user){
  if(!USER_ROLES[user]) return;
  currentUser = user;
  currentRole = USER_ROLES[user].role;
  document.getElementById('loginGate').style.display = 'none';

  if(currentRole === 'proveedor' || currentRole === 'tecnico_proveedor'){
    document.querySelector('.app').style.display = 'none';
    document.getElementById('providerApp').style.display = 'flex';
    document.getElementById('provSidebarUserName').textContent = user;
    document.getElementById('provSidebarUserRole').textContent = USER_ROLES[user].label;
    document.getElementById('provSidebarAvatar').textContent = USER_ROLES[user].initials;
    initProviderPortal();
    return;
  }

  document.querySelector('.app').style.display = '';
  document.getElementById('providerApp').style.display = 'none';
  document.getElementById('sidebarUserName').textContent = user;
  document.getElementById('sidebarUserRole').textContent = USER_ROLES[user].label;
  document.getElementById('sidebarAvatar').textContent = USER_ROLES[user].initials;

  const nombre = USER_ROLES[user].nombreCompleto || user;
  const primerNombre = nombre.split(' ')[0];
  document.getElementById('dashGreeting').textContent = saludoSegunHora() + ', ' + primerNombre;

  applyRolePermissions();
  showLoginNotifications(user);
}
function saludoSegunHora(){
  const h = new Date().getHours();
  if(h < 12) return 'Buenos días';
  if(h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function applyRolePermissions(){
  // Mostrar/ocultar módulos del sidebar según el rol
  let firstAllowedBtn = null;
  document.querySelectorAll('.nav-item[data-view]').forEach(btn=>{
    const roles = (btn.dataset.roles || '').split(',');
    const allowed = roles.includes(currentRole);
    btn.style.display = allowed ? '' : 'none';
    if(allowed && !firstAllowedBtn) firstAllowedBtn = btn;
  });

  // Botones de acción que dependen del rol
  const addBtn = document.getElementById('btnAddEquipo');
  if(addBtn) addBtn.style.display = (currentRole === 'admin' || currentRole === 'coordinador') ? '' : 'none';

  const solBtn = document.getElementById('btnSolicitarRevision');
  if(solBtn) solBtn.style.display = (currentRole === 'admin' || currentRole === 'coordinador') ? '' : 'none';

  const solBtnTecnico = document.getElementById('btnSolicitarServicioTecnico');
  if(solBtnTecnico) solBtnTecnico.style.display = (currentRole === 'tecnico') ? '' : 'none';

  const solTab = document.getElementById('tabSolicitudesBtn');
  if(solTab) solTab.style.display = (currentRole === 'admin' || currentRole === 'coordinador') ? '' : 'none';
  const aprobTab = document.getElementById('tabAprobacionesBtn');
  if(aprobTab) aprobTab.style.display = (currentRole === 'admin' || currentRole === 'coordinador') ? '' : 'none';
  const misSolTab = document.getElementById('tabMisSolicitudesBtn');
  if(misSolTab) misSolTab.style.display = (currentRole === 'tecnico') ? '' : 'none';
  if(currentRole === 'tecnico') switchRevTab('checklist');

  // En el panel principal, el técnico ve las tarjetas de seguimiento (revisiones
  // pendientes y solicitudes abiertas) y la actividad reciente, pero no el detalle
  // de clasificación de riesgo ni distribución, que corresponde a coordinación.
  const dashDetail = document.getElementById('dashDetailGrid');
  if(dashDetail) dashDetail.style.display = (currentRole === 'tecnico') ? 'none' : '';

  // Para el técnico, el panel solo muestra "Revisiones pendientes hoy" y
  // "Solicitudes abiertas": es puramente informativo para su seguimiento diario.
  const kpiEquipos = document.getElementById('kpiEquiposRegistrados');
  const kpiImp = document.getElementById('kpiIncluidosIMP');
  const kpiGrid = document.getElementById('dashKpiGrid');
  const esTecnico = currentRole === 'tecnico';
  if(kpiEquipos) kpiEquipos.style.display = esTecnico ? 'none' : '';
  if(kpiImp) kpiImp.style.display = esTecnico ? 'none' : '';
  if(kpiGrid) kpiGrid.className = esTecnico ? 'grid grid-2' : 'grid grid-4';

  // Forzar una vista permitida para el rol actual
  const defaultView = DEFAULT_VIEW_BY_ROLE[currentRole] || 'inventario';
  const activeBtn = document.querySelector('.nav-item[data-view].active');
  const activeAllowed = activeBtn && activeBtn.style.display !== 'none';
  if(!activeAllowed){
    const target = document.querySelector('.nav-item[data-view="'+defaultView+'"]') || firstAllowedBtn;
    if(target) target.click();
  }
}

function irALogin(){
  document.getElementById('landingPage').style.display = 'none';
}
function logout(){
  try{ localStorage.removeItem('simplicaiSession'); }catch(e){}
  currentUser = null; currentRole = null; loginSelectedUser = null;
  document.querySelectorAll('.user-opt').forEach(o=>o.classList.remove('selected'));
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginGate').style.display = 'flex';
}

function checkExistingSession(){
  let saved = null;
  try{ saved = localStorage.getItem('simplicaiSession'); }catch(e){}
  if(saved && ALLOWED_USERS.includes(saved)){
    grantAccess(saved);
  }
}
checkExistingSession();

/* ===================== INIT ===================== */
populateAreaFilter();
renderInventario();
renderMantenimiento();
renderChecklist();
renderSolicitudes();
renderAprobaciones();
renderMisSolicitudes();
renderCorrectivo();
renderDashboard();
updateNavBadges();

// cerrar modales con click en overlay
[['solicitudModalOverlay',closeSolicitudModal],['geModalOverlay',closeGECalc],['addEquipoOverlay',closeAddEquipoModal],['editEquipoOverlay',closeEditEquipoModal],['issueModalOverlay',closeChecklistIssueModal],['provOrderModalOverlay',closeProviderOrderModal],['hospOrderModalOverlay',closeHospOrderModal],['solicitudServicioModalOverlay',closeSolicitudServicioModal],['addHospitalOverlay',closeAddHospitalModal]].forEach(([id,fn])=>{
  document.getElementById(id).addEventListener('click', (ev)=>{ if(ev.target.id===id) fn(); });
});
document.addEventListener('keydown', (ev)=>{
  if(ev.key==='Escape'){ closeDrawer(); closeSolicitudModal(); closeGECalc(); closeAddEquipoModal(); closeEditEquipoModal(); closeChecklistIssueModal(); closeProviderOrderModal(); closeHospOrderModal(); closeSolicitudServicioModal(); closeAddHospitalModal(); }
});
