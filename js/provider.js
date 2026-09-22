/* ===================== PORTAL DE PROVEEDOR (SIMPLICAI) ===================== */
function hospitalById(id){ return hospitales.find(h=>h.id===id); }

// Calcula el estado de vigencia del contrato de un hospital según su fecha de renovación.
function estadoContrato(h){
  if(!h.contratoRenovacion) return {estado:'sin-dato', dias:null};
  const hoy = new Date();
  const renov = new Date(h.contratoRenovacion + 'T00:00:00');
  const dias = Math.round((renov - hoy) / 86400000);
  if(dias < 0) return {estado:'vencido', dias};
  if(dias <= 60) return {estado:'por-vencer', dias}; // 60 días es un valor de ejemplo, ajustable a la política real de renovación
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
// Igual que en obtenerOrdenesDeHospital/actualizarOrdenGlobal: HOSP-1 es el hospital
// "real" y sus órdenes viven en el array `correctivo`; los demás hospitales de ejemplo
// guardan las suyas embebidas en su propio `ordenesResumen`. Es un atajo de este mockup —
// un backend real necesita un único modelo de datos para todos los hospitales.
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
  renderNotificaciones();
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
    diasAnticipacionIMP: parseInt(document.getElementById('newHospDiasIMP').value, 10) || DIAS_ANTICIPACION_IMP_DEFAULT,
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
    <div class="kv-item">
      <div class="k">Anticipación de órdenes IMP</div>
      <div class="v" style="display:flex; align-items:center; gap:8px;">
        <input class="input" type="number" min="0" max="180" style="width:80px; padding:4px 8px;"
               id="hospDiasIMP" value="${typeof h.diasAnticipacionIMP === 'number' ? h.diasAnticipacionIMP : DIAS_ANTICIPACION_IMP_DEFAULT}"
               onchange="guardarDiasAnticipacionIMP('${h.id}', this.value)">
        <span style="font-size:12.5px; color:var(--muted); font-weight:400;">días antes del preventivo</span>
      </div>
    </div>
  `;
}

// Ajusta la ventana con la que se abren solas las órdenes "IMP programado" de este hospital.
function guardarDiasAnticipacionIMP(hospId, valor){
  const h = hospitalById(hospId);
  if(!h) return;
  const dias = parseInt(valor, 10);
  if(isNaN(dias) || dias < 0){ showToast('Indica un número de días válido', 'warning'); return; }
  h.diasAnticipacionIMP = dias;
  showToast('Anticipación de órdenes IMP: ' + dias + ' días', 'success');
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

  // Los contadores reflejan el total que le corresponde al rol, sin aplicar la búsqueda.
  document.getElementById('provOrdEmerg').textContent = ords.filter(o=>o.categoria==='Urgente emergencia' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdUrg').textContent = ords.filter(o=>o.categoria==='Urgente' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdReg').textContent = ords.filter(o=>o.categoria==='Regular' && o.estado!=='Cerrada').length;
  document.getElementById('provOrdCerradas').textContent = ords.filter(o=>o.estado==='Cerrada').length;

  if(ords.length === 0){
    body.innerHTML = `<tr><td colspan="8"><div class="empty-state">${currentRole==='tecnico_proveedor' ? 'No tienes órdenes asignadas por el momento.' : 'Sin órdenes de servicio registradas todavía.'}</div></td></tr>`;
    return;
  }

  // Búsqueda por texto, aplicada sobre lo que el rol ya podía ver.
  const buscarEl = document.getElementById('provOrdBuscar');
  const q = buscarEl ? buscarEl.value.trim().toLowerCase() : '';
  if(q){
    ords = ords.filter(o=>{
      const h = hospitalById(o.hospId);
      return o.folio.toLowerCase().includes(q)
        || (h && h.nombre.toLowerCase().includes(q))
        || (o.equipoNombre || '').toLowerCase().includes(q)
        || (o.tecnico || '').toLowerCase().includes(q);
    });
  }
  if(ords.length === 0){
    body.innerHTML = `<tr><td colspan="8"><div class="empty-state">
      <div class="t">Sin coincidencias</div>
      <div>Ninguna orden de servicio coincide con la búsqueda.</div>
    </div></td></tr>`;
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
  renderNotificaciones();
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

