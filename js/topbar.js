/* ===================== TOPBAR: CENTRO DE NOTIFICACIONES =====================
   Solo existe en la app hospitalaria: el portal de proveedor tiene su propia barra
   superior, sin campana. */

/* ---- Navegación ----
   Cambiar de vista desde código equivale a hacer clic en el botón del menú: así se
   reutiliza el wiring de navegación de shell.js en vez de duplicar el manejo de
   clases .active y del título de la barra superior. */
function irAVista(view){
  const btn = document.querySelector('.nav-item[data-view="' + view + '"]');
  if(btn && btn.style.display !== 'none') btn.click();
}
function rolPuedeVerVista(view){
  const btn = document.querySelector('.nav-item[data-view="' + view + '"]');
  if(!btn) return false;
  return (btn.dataset.roles || '').split(',').includes(currentRole);
}

function cerrarPanelesTopbar(){
  const notif = document.getElementById('notifPanel');
  if(notif) notif.classList.remove('active');
  const btn = document.getElementById('notifBtn');
  if(btn) btn.classList.remove('active');
}

function abrirNotificacionOrden(folio){
  cerrarPanelesTopbar();
  irAVista('correctivo');
  openHospOrderModal(folio);
}
function abrirNotificacionSolicitud(tab){
  cerrarPanelesTopbar();
  irAVista('revisiones');
  switchRevTab(tab);
}

/* ---- Contenido del centro de notificaciones ----
   Decidido en docs/BACKLOG.md (HU-02): órdenes urgentes abiertas y lo que está esperando
   al rol de quien inició sesión. Se apoya en los mismos criterios que los avisos de inicio
   de sesión para no duplicar reglas. */
function construirNotificaciones(){
  const items = [];

  // 1. Órdenes urgentes abiertas — solo para quien tiene acceso a Órdenes de Mantenimiento.
  if(rolPuedeVerVista('correctivo')){
    correctivo
      .filter(c => (c.categoria === 'Urgente emergencia' || c.categoria === 'Urgente') && c.estado !== 'Cerrada')
      .forEach(c => {
        const e = equipoById(c.equipoId);
        items.push({
          tono: c.categoria === 'Urgente emergencia' ? 'danger' : 'warning',
          titulo: c.categoria === 'Urgente emergencia' ? 'Emergencia abierta' : 'Orden urgente abierta',
          texto: (e ? e.nombre : c.equipoId) + ' · ' + c.folio,
          accion: "abrirNotificacionOrden('" + c.folio + "')"
        });
      });
  }

  // 2. Pendientes según el rol.
  if(currentRole === 'admin' || currentRole === 'coordinador'){
    solicitudesPendientes.filter(p => p.estado === 'Pendiente').forEach(p => {
      const e = equipoById(p.equipoId);
      items.push({
        tono: 'info',
        titulo: 'Esperando tu aprobación',
        texto: (e ? e.nombre : p.equipoId) + ' · solicitada por ' + p.solicitadoPor,
        accion: "abrirNotificacionSolicitud('aprobaciones')"
      });
    });

    correctivo.filter(c => c.estado === 'Resuelto por proveedor').forEach(c => {
      const e = equipoById(c.equipoId);
      items.push({
        tono: 'info',
        titulo: 'Esperando tu validación',
        texto: (e ? e.nombre : c.equipoId) + ' · resuelta por el proveedor',
        accion: "abrirNotificacionOrden('" + c.folio + "')"
      });
    });
  }

  if(currentRole === 'tecnico'){
    solicitudesPendientes
      .filter(p => p.solicitadoPor === currentUser && p.estado !== 'Pendiente')
      .forEach(p => {
        const e = equipoById(p.equipoId);
        items.push({
          tono: p.estado === 'Aprobada' ? 'success' : 'warning',
          titulo: 'Tu solicitud fue ' + p.estado.toLowerCase(),
          texto: (e ? e.nombre : p.equipoId) + ' · ' + p.id,
          accion: "abrirNotificacionSolicitud('misSolicitudes')"
        });
      });
  }

  return items;
}

const NOTIF_ICONOS = {
  danger:  '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/>',
  warning: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  success: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
  info:    '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>'
};

function renderNotificaciones(){
  const badge = document.getElementById('notifBadge');
  const panel = document.getElementById('notifPanel');
  if(!badge || !panel) return;

  const items = construirNotificaciones();
  badge.textContent = items.length > 9 ? '9+' : items.length;
  badge.style.display = items.length > 0 ? '' : 'none';

  const cuerpo = items.length === 0
    ? `<div class="notif-empty">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 6L9 17l-5-5"/></svg>
         <div class="notif-empty-title">Todo al día</div>
         <div>No tienes pendientes por ahora.</div>
       </div>`
    : items.map(n => `
        <button class="notif-item" onclick="${n.accion}">
          <span class="notif-icon tone-${n.tono}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${NOTIF_ICONOS[n.tono]}</svg>
          </span>
          <span class="notif-body">
            <span class="notif-title">${n.titulo}</span>
            <span class="notif-text">${n.texto}</span>
          </span>
          <svg class="notif-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>`).join('');

  panel.innerHTML = `
    <div class="notif-head">
      <span>Notificaciones</span>
      ${items.length ? `<span class="notif-count">${items.length}</span>` : ''}
    </div>
    <div class="notif-list">${cuerpo}</div>`;
}

function toggleNotificaciones(){
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('notifBtn');
  if(!panel) return;
  const abierto = panel.classList.contains('active');
  cerrarPanelesTopbar();
  if(!abierto){
    renderNotificaciones();
    panel.classList.add('active');
    if(btn) btn.classList.add('active');
  }
}

// Clic fuera de la barra superior: cierra el popup.
document.addEventListener('click', (ev)=>{
  if(!ev.target.closest('.topbar')) cerrarPanelesTopbar();
});
