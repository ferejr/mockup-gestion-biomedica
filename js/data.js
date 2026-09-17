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
// Contadores de folio: simulan un auto-incremento de base de datos. El valor inicial de
// cada uno se eligió a mano para que los folios de los datos de ejemplo de arriba
// parezcan una secuencia ya en curso. No es la estrategia real de generación de IDs —
// eso lo define el backend real (ej. autoincrement de DB, UUID, etc.).
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
   DATOS DEL PORTAL DE PROVEEDOR (SIMPLICAI)
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
// La llamada real a initChecklists() se hace en shell.js (INIT), no aquí: depende de
// esEquipoMedico() (definida en mantenimiento.js), que carga después de este archivo.
// Sin módulos reales, las declaraciones `function` de otro <script> no existen todavía
// mientras este archivo se está ejecutando — solo tras cargar todos los scripts.

