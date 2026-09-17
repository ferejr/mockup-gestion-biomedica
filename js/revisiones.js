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
// Confirma el modal de "puntos pendientes" del checklist diario. Regla de negocio:
// - Técnico: NO puede abrir una orden directamente. Se crea una `solicitudPendiente`
//   (folio AP-####) que espera aprobación de coordinador/admin antes de convertirse en
//   una orden real (ver `crearOrdenDesdeAprobacion`).
// - Coordinador / Director: puede abrir la orden de mantenimiento correctivo de inmediato
//   (folio MC-####), sin paso de aprobación intermedio.
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
  const nuevoFolio = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio: nuevoFolio,
    equipoId:id,
    origen:'Revisión diaria — puntos pendientes',
    detalle: motivoTexto,
    categoria: URGENCIA_A_CATEGORIA[urgencia] || 'Regular',
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
  const folioCorrectivo = 'MC-' + String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio: folioCorrectivo,
    equipoId, origen:'Solicitud de revisión ('+folio+')', solicitudFolio: folio,
    categoria: URGENCIA_A_CATEGORIA[urgencia] || 'Regular',
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
// Efecto secundario intencional: además de la orden en `correctivo`, genera un registro
// en `solicitudes` (ver comentario más abajo) — son DOS registros nuevos, no uno solo.
function crearOrdenDesdeAprobacion(pend){
  const e = equipoById(pend.equipoId);
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
    categoria: URGENCIA_A_CATEGORIA[pend.urgencia] || 'Regular',
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

