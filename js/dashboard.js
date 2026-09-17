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

