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

