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
// mesesPorFrecuencia() vive en helpers.js: la usan también el cálculo de vencimientos
// y la generación automática de órdenes "IMP programado".

/* ---- Generación automática de órdenes "IMP programado" ----
   Abre solas las órdenes del programa preventivo cuando la fecha objetivo del equipo
   entra en la ventana de anticipación configurada para el hospital.

   LIMITACIÓN DEL MOCKUP: aquí se evalúa al cargar la aplicación, porque no hay servidor
   ni tareas programadas. En el producto real esto corresponde a un job periódico del
   backend, que debe correr aunque nadie abra la aplicación. */
const DIAS_ANTICIPACION_IMP_DEFAULT = 30;
function diasAnticipacionIMP(){
  const h = hospitalById('HOSP-1');
  return (h && typeof h.diasAnticipacionIMP === 'number') ? h.diasAnticipacionIMP : DIAS_ANTICIPACION_IMP_DEFAULT;
}
function generarOrdenesIMPProgramado(){
  const dias = diasAnticipacionIMP();
  const hoy = new Date().toISOString().slice(0,10);
  const hora = new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'});
  const generadas = [];

  equiposIMPPorVencer(dias).forEach(e=>{
    // Sin duplicados: si el equipo ya tiene una orden de preventivo sin cerrar, se respeta.
    const yaTiene = correctivo.some(c => c.equipoId === e.id && c.origen === 'IMP programado' && c.estado !== 'Cerrada');
    if(yaTiene) return;

    const folio = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
    correctivo.unshift({
      folio, equipoId: e.id, origen:'IMP programado',
      detalle:'Inspección preventiva ' + geFrecuencia(geTotal(e.ge)).toLowerCase() + ' según su clasificación GE.',
      categoria:'Regular', estado:'Abierta', tecnico:'Sin asignar', fecha: hoy,
      notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'',
      bitacora:[{fecha:hoy, hora, usuario:'Sistema',
        evento:'Orden creada automáticamente — preventivo programado dentro de la ventana de ' + dias + ' días de anticipación.'}]
    });
    generadas.push(folio);
  });
  return generadas;
}

function toISODateLocal(d){
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
// Los equipos de categoría "TI / Activo" (laptops, celulares, PCs y demás equipo
// de operación diaria no médico) no entran al programa de mantenimiento preventivo.
// NOTA: hoy tiene el mismo cuerpo que esEquipoMedico() a propósito (misma condición,
// dos reglas de negocio distintas que hoy coinciden) — no fusionar asumiendo que son
// redundantes; si alguna de las dos reglas cambia en el futuro, pueden divergir.
function requiereIMP(e){ return e.categoria !== 'TI / Activo'; }

// Solo el equipo médico entra a las revisiones diarias de rutina — el equipo de TI
// no tiene sentido clínico revisarlo con este checklist. (Ver nota en requiereIMP().)
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

  // OJO: esta entrada "Alta" es generada al vuelo solo para mostrarla en el timeline —
  // NO existe dentro de e.historial ni está guardada en ningún lado. Si se construye un
  // historial real (backend), este evento de alta debe crearse como registro de verdad al
  // dar de alta el equipo, no reconstruirse aquí cada vez que se abre el drawer.
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

