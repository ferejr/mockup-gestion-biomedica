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
// Contraseña compartida de demostración, comparada en texto plano en el cliente.
// Aceptable solo para este mockup interno — NUNCA debe pasar así a producción: un
// backend real necesita autenticación de verdad (hash+salt en servidor, sesión/token, etc.).
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
initChecklists();
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
