/* ===================== TOPBAR: BUSCADOR GLOBAL + NOTIFICACIONES =====================
   Ambas funciones viven solo en la app hospitalaria: el portal de proveedor tiene su
   propia barra superior, sin buscador ni campana. */

/* ---- Navegación compartida ----
   Cambiar de vista desde código equivale a hacer clic en el botón del menú: así se
   reutiliza el wiring de navegación de shell.js en vez de duplicar el manejo de
   clases .active y del título de la barra superior. */
function irAVista(view){
  const btn = document.querySelector('.nav-item[data-view="' + view + '"]');
  if(btn && btn.style.display !== 'none') btn.click();
  return !!(btn && btn.style.display !== 'none');
}
function rolPuedeVerVista(view){
  const btn = document.querySelector('.nav-item[data-view="' + view + '"]');
  if(!btn) return false;
  return (btn.dataset.roles || '').split(',').includes(currentRole);
}

/* ---- Buscador global ---- */
function cerrarPanelesTopbar(){
  const res = document.getElementById('searchResults');
  if(res) res.classList.remove('active');
  const notif = document.getElementById('notifPanel');
  if(notif) notif.classList.remove('active');
}

// Resultados agrupados por tipo. Solo se busca en lo que el rol puede abrir: un técnico
// no tiene acceso a Órdenes de Mantenimiento, así que tampoco le aparecen sus folios.
function buscarGlobal(termino){
  const q = termino.trim().toLowerCase();
  if(!q) return [];
  const grupos = [];

  if(rolPuedeVerVista('inventario')){
    const eqs = equipos.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      (e.marca || '').toLowerCase().includes(q) ||
      (e.serie || '').toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    ).slice(0, 6);
    if(eqs.length) grupos.push({
      titulo: 'Equipos',
      items: eqs.map(e => ({
        principal: e.nombre,
        secundario: e.id + ' · ' + e.area + (e.serie && e.serie !== '—' ? ' · Serie ' + e.serie : ''),
        accion: "abrirResultadoEquipo('" + e.id + "')"
      }))
    });
  }

  if(rolPuedeVerVista('correctivo')){
    const ords = correctivo.filter(c => {
      const e = equipoById(c.equipoId);
      return c.folio.toLowerCase().includes(q) || (e && e.nombre.toLowerCase().includes(q));
    }).slice(0, 6);
    if(ords.length) grupos.push({
      titulo: 'Órdenes de mantenimiento',
      items: ords.map(c => {
        const e = equipoById(c.equipoId);
        return {
          principal: c.folio + ' — ' + (e ? e.nombre : c.equipoId),
          secundario: c.estado + ' · ' + c.categoria,
          accion: "abrirResultadoOrden('" + c.folio + "')"
        };
      })
    });
  }

  if(rolPuedeVerVista('revisiones')){
    const sols = solicitudes.filter(s => {
      const e = equipoById(s.equipoId);
      return s.folio.toLowerCase().includes(q) || (e && e.nombre.toLowerCase().includes(q));
    }).slice(0, 4);
    // El técnico solo busca entre sus propias solicitudes pendientes de aprobación.
    const pend = solicitudesPendientes.filter(p => {
      if(currentRole === 'tecnico' && p.solicitadoPor !== currentUser) return false;
      const e = equipoById(p.equipoId);
      return p.id.toLowerCase().includes(q) || (e && e.nombre.toLowerCase().includes(q));
    }).slice(0, 4);

    const items = sols.map(s => {
      const e = equipoById(s.equipoId);
      return {
        principal: s.folio + ' — ' + (e ? e.nombre : s.equipoId),
        secundario: 'Solicitud de revisión · ' + s.estado,
        accion: "abrirResultadoSolicitud('solicitudes')"
      };
    }).concat(pend.map(p => {
      const e = equipoById(p.equipoId);
      return {
        principal: p.id + ' — ' + (e ? e.nombre : p.equipoId),
        secundario: 'Pendiente de aprobación · ' + p.estado,
        accion: "abrirResultadoSolicitud('" + (currentRole === 'tecnico' ? 'misSolicitudes' : 'aprobaciones') + "')"
      };
    }));

    if(items.length) grupos.push({titulo: 'Solicitudes', items});
  }

  return grupos;
}

function renderBusquedaGlobal(){
  const input = document.getElementById('globalSearch');
  const cont = document.getElementById('searchResults');
  if(!input || !cont) return;

  const grupos = buscarGlobal(input.value);
  if(!input.value.trim()){ cont.classList.remove('active'); return; }

  if(grupos.length === 0){
    cont.innerHTML = '<div class="search-empty">Sin resultados para “' + input.value.trim() + '”</div>';
  } else {
    cont.innerHTML = grupos.map(g => `
      <div class="search-group">
        <div class="search-group-label">${g.titulo}</div>
        ${g.items.map(it => `
          <button class="search-result" onclick="${it.accion}">
            <div class="search-result-main">${it.principal}</div>
            <div class="search-result-sub">${it.secundario}</div>
          </button>`).join('')}
      </div>`).join('');
  }
  cont.classList.add('active');
}

function limpiarBusquedaGlobal(){
  const input = document.getElementById('globalSearch');
  if(input) input.value = '';
  cerrarPanelesTopbar();
}
function abrirResultadoEquipo(id){
  limpiarBusquedaGlobal();
  irAVista('inventario');
  openDrawer(id);
}
function abrirResultadoOrden(folio){
  limpiarBusquedaGlobal();
  irAVista('correctivo');
  openHospOrderModal(folio);
}
function abrirResultadoSolicitud(tab){
  limpiarBusquedaGlobal();
  irAVista('revisiones');
  switchRevTab(tab);
}

/* ---- Centro de notificaciones ----
   Contenido decidido en docs/BACKLOG.md (HU-02): órdenes urgentes abiertas y lo que está
   esperando al rol de quien inició sesión. Se apoya en los mismos helpers que usan los
   avisos de inicio de sesión (ordenesEmergenciaActivas, etc.) para no duplicar criterios. */
function construirNotificaciones(){
  const items = [];

  // 1. Órdenes urgentes abiertas — solo para quien tiene acceso a Órdenes de Mantenimiento.
  if(rolPuedeVerVista('correctivo')){
    const urgentes = correctivo.filter(c =>
      (c.categoria === 'Urgente emergencia' || c.categoria === 'Urgente') && c.estado !== 'Cerrada'
    );
    urgentes.forEach(c => {
      const e = equipoById(c.equipoId);
      items.push({
        tono: c.categoria === 'Urgente emergencia' ? 'danger' : 'warning',
        titulo: c.categoria,
        texto: c.folio + ' — ' + (e ? e.nombre : c.equipoId),
        accion: "abrirResultadoOrden('" + c.folio + "')"
      });
    });
  }

  // 2. Pendientes según el rol.
  if(currentRole === 'admin' || currentRole === 'coordinador'){
    const porAprobar = solicitudesPendientes.filter(p => p.estado === 'Pendiente');
    porAprobar.forEach(p => {
      const e = equipoById(p.equipoId);
      items.push({
        tono: 'info',
        titulo: 'Esperando tu aprobación',
        texto: p.id + ' — ' + (e ? e.nombre : p.equipoId) + ', solicitada por ' + p.solicitadoPor,
        accion: "abrirResultadoSolicitud('aprobaciones')"
      });
    });

    const porValidar = correctivo.filter(c => c.estado === 'Resuelto por proveedor');
    porValidar.forEach(c => {
      const e = equipoById(c.equipoId);
      items.push({
        tono: 'info',
        titulo: 'Esperando tu validación',
        texto: c.folio + ' — ' + (e ? e.nombre : c.equipoId) + ', resuelta por el proveedor',
        accion: "abrirResultadoOrden('" + c.folio + "')"
      });
    });
  }

  if(currentRole === 'tecnico'){
    const resueltas = solicitudesPendientes.filter(p => p.solicitadoPor === currentUser && p.estado !== 'Pendiente');
    resueltas.forEach(p => {
      const e = equipoById(p.equipoId);
      items.push({
        tono: p.estado === 'Aprobada' ? 'success' : 'warning',
        titulo: 'Tu solicitud fue ' + p.estado.toLowerCase(),
        texto: p.id + ' — ' + (e ? e.nombre : p.equipoId),
        accion: "abrirResultadoSolicitud('misSolicitudes')"
      });
    });
  }

  return items;
}

function renderNotificaciones(){
  const badge = document.getElementById('notifBadge');
  const panel = document.getElementById('notifPanel');
  if(!badge || !panel) return;

  const items = construirNotificaciones();
  badge.textContent = items.length;
  badge.style.display = items.length > 0 ? '' : 'none';

  if(items.length === 0){
    panel.innerHTML = `
      <div class="notif-head">Notificaciones</div>
      <div class="search-empty">No tienes nada pendiente por ahora.</div>`;
    return;
  }

  panel.innerHTML = `
    <div class="notif-head">Notificaciones <span class="mono" style="color:var(--muted); font-weight:500;">${items.length}</span></div>
    ${items.map(n => `
      <button class="notif-item" onclick="${n.accion}">
        <span class="notif-dot tone-${n.tono}"></span>
        <span>
          <span class="notif-title">${n.titulo}</span>
          <span class="notif-text">${n.texto}</span>
        </span>
      </button>`).join('')}`;
}

function toggleNotificaciones(){
  const panel = document.getElementById('notifPanel');
  if(!panel) return;
  const abierto = panel.classList.contains('active');
  cerrarPanelesTopbar();
  if(!abierto){
    renderNotificaciones();
    panel.classList.add('active');
  }
}

// Clic fuera de la barra superior: cierra el buscador y las notificaciones.
document.addEventListener('click', (ev)=>{
  if(!ev.target.closest('.topbar')) cerrarPanelesTopbar();
});
