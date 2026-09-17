/* ===================== HELPERS ===================== */
// Metodología "Número GE": suma de 4 factores (función clínica, aplicación clínica,
// requisitos de mantenimiento, antecedentes de averías — ver el objeto `ge` de cada
// equipo). Es la clasificación de riesgo que decide qué equipo entra al programa de
// mantenimiento preventivo y con qué frecuencia. Los cortes (12/15/19) vienen del
// material del curso referenciado al inicio de este archivo, no son arbitrarios: si se
// ajustan, debe ser una decisión documentada, no un valor tocado sin más.
function geTotal(ge){ return ge.funcion + ge.aplicacion + ge.mantenimiento + ge.antecedentes; }
// total >= 12 => "I" (Incluido en el programa preventivo). Por debajo de 12, "N" (No incluido).
function geClasificacion(total){ return total >= 12 ? "I" : "N"; }
// Frecuencia de inspección según el total GE, solo aplica si ya está incluido (total >= 12):
// 19+ = Trimestral (mayor riesgo, revisión más seguida), 15-18 = Semestral, 12-14 = Anual.
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
// Traduce el puntaje numérico de "función clínica" (componente `ge.funcion`, 2-10) a su
// etiqueta descriptiva, según la misma tabla del material del curso. Un puntaje fuera de
// este rango (no debería ocurrir con datos válidos) cae silenciosamente en 'Sin clasificar'.
const FUNCION_CLINICA_LABELS = {
  10:"Apoyo vital", 9:"Cirugía y cuidados intensivos", 8:"Fisioterapia y tratamiento",
  7:"Control de cirugía y cuidados intensivos", 6:"Control fisiológico adicional y diagnóstico",
  5:"Análisis de laboratorio", 4:"Accesorios de laboratorio", 3:"Computadoras y afines",
  2:"Relacionados con el paciente y otros"
};
function funcionClinicaLabel(e){ return FUNCION_CLINICA_LABELS[e.ge.funcion] || 'Sin clasificar'; }

// Traduce el valor de urgencia elegido en la UI ("Urgente por emergencia") a la categoría
// interna de la orden ("Urgente emergencia"). Antes vivía copiado 3 veces (checklist,
// solicitud de revisión, aprobación de solicitud pendiente); ahora es una sola fuente.
const URGENCIA_A_CATEGORIA = {"Urgente por emergencia":"Urgente emergencia","Urgente":"Urgente","Regular":"Regular"};

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

