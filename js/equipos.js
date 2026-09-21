/* ===================== GE CALCULATOR MODAL ===================== */
function populateGESelect(){
  const sel = document.getElementById('geEquipoSelect');
  sel.innerHTML = '<option value="">Selecciona un equipo…</option>' + equipos.map(e=>`<option value="${e.id}">${e.nombre} — ${e.id}</option>`).join('');
}
function openGECalc(prefillId){
  populateGESelect();
  if(prefillId){
    document.getElementById('geEquipoSelect').value = prefillId;
    loadGEEquipo();
  } else {
    document.getElementById('geFuncion').value = '6';
    document.getElementById('geAplicacion').value = '3';
    document.getElementById('geMantenimiento').value = '3';
    document.getElementById('geAntecedentes').value = '0';
    recalcGE();
  }
  document.getElementById('geModalOverlay').classList.add('active');
}
function closeGECalc(){ document.getElementById('geModalOverlay').classList.remove('active'); }
function loadGEEquipo(){
  const id = document.getElementById('geEquipoSelect').value;
  const e = equipoById(id);
  if(!e) return;
  document.getElementById('geFuncion').value = e.ge.funcion;
  document.getElementById('geAplicacion').value = e.ge.aplicacion;
  document.getElementById('geMantenimiento').value = e.ge.mantenimiento;
  document.getElementById('geAntecedentes').value = e.ge.antecedentes;
  recalcGE();
}
function recalcGE(){
  const ge = {
    funcion: +document.getElementById('geFuncion').value,
    aplicacion: +document.getElementById('geAplicacion').value,
    mantenimiento: +document.getElementById('geMantenimiento').value,
    antecedentes: +document.getElementById('geAntecedentes').value
  };
  const total = geTotal(ge);
  document.getElementById('geResultBar').innerHTML = `
    <div class="ge-seg funcion" style="width:${Math.max(0,ge.funcion/22*100)}%"></div>
    <div class="ge-seg aplicacion" style="width:${Math.max(0,ge.aplicacion/22*100)}%"></div>
    <div class="ge-seg mantenimiento" style="width:${Math.max(0,ge.mantenimiento/22*100)}%"></div>
    <div class="ge-seg antecedentes" style="width:${Math.max(0,ge.antecedentes)/22*100}%"></div>
  `;
  document.getElementById('geResultNum').textContent = total;
  const clasif = geClasificacion(total);
  document.getElementById('geResultClasif').className = 'pill ' + (clasif==='I' ? 'pill-green' : 'pill-gray');
  document.getElementById('geResultClasif').textContent = clasif==='I' ? 'Incluido en programa (I)' : 'No incluido (N)';
  document.getElementById('geResultFreq').textContent = 'Frecuencia: ' + geFrecuencia(total);
  // Plumbing de mockup: guarda el borrador del cálculo GE en `window` para que
  // saveGEResult() lo recoja al confirmar. En una app real este estado viviría en el
  // formulario/componente, no colgado del objeto global window.
  window.__geDraft = ge;
}
function saveGEResult(){
  const id = document.getElementById('geEquipoSelect').value;
  if(!id){ showToast('Selecciona un equipo para guardar'); return; }
  const e = equipoById(id);
  e.ge = {...window.__geDraft};
  closeGECalc();
  renderMantenimiento();
  renderInventario();
  renderDashboard();
  showToast('Clasificación GE actualizada para ' + e.nombre);
}

/* ===================== LISTAS EDITABLES (accesorios y manuales) =====================
   Pequeño componente compartido por los formularios de alta y de edición: mantiene una
   lista de textos que se agregan y quitan de a uno, en vez de un campo libre separado
   por comas. `listasEquipoForm` guarda el estado mientras el modal está abierto. */
const listasEquipoForm = {newAccesorios:[], newManuales:[], editAccesorios:[], editManuales:[]};

function renderListaEditable(key){
  const cont = document.getElementById(key + 'List');
  if(!cont) return;
  const items = listasEquipoForm[key];
  cont.innerHTML = items.length
    ? items.map((txt, i)=>`
        <span class="chip">${txt}
          <button type="button" class="chip-x" title="Quitar" onclick="quitarItemLista('${key}', ${i})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </span>`).join('')
    : '<span class="chip-empty">Sin elementos registrados</span>';
}
function agregarItemLista(key){
  const input = document.getElementById(key + 'Input');
  if(!input) return;
  const txt = input.value.trim();
  if(!txt) return;
  listasEquipoForm[key].push(txt);
  input.value = '';
  renderListaEditable(key);
}
function quitarItemLista(key, idx){
  listasEquipoForm[key].splice(idx, 1);
  renderListaEditable(key);
}

/* ===================== AGREGAR EQUIPO ===================== */
function openAddEquipoModal(){
  ['newNombre','newMarca','newSerie','newUbicacion','newProveedor','newGarantia','newVidaUtil'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  listasEquipoForm.newAccesorios = [];
  listasEquipoForm.newManuales = [];
  renderListaEditable('newAccesorios');
  renderListaEditable('newManuales');
  document.getElementById('addEquipoOverlay').classList.add('active');
}
function closeAddEquipoModal(){ document.getElementById('addEquipoOverlay').classList.remove('active'); }
function saveNewEquipo(){
  const nombre = document.getElementById('newNombre').value.trim();
  if(!nombre){ showToast('Indica el nombre del equipo'); return; }
  const seq = equipos.length + 1;
  const id = 'EQ-' + String(700 + seq).padStart(4,'0');
  const hoy = new Date().toISOString().slice(0,10);
  const nuevo = {
    id, nombre,
    marca: document.getElementById('newMarca').value.trim() || '—',
    serie: document.getElementById('newSerie').value.trim() || '—',
    area: document.getElementById('newUbicacion').value.trim() || 'Sin asignar',
    categoria: document.getElementById('newCategoria').value,
    estado: 'Operativo',
    adquisicion: hoy, instalacion: hoy, fechaAlta: hoy,
    // Sin dato capturado se queda vacío: vidaUtilLabel() ya muestra "Sin registrar".
    vidaUtilAnios: parseInt(document.getElementById('newVidaUtil').value, 10) || null,
    proveedor: document.getElementById('newProveedor').value.trim() || '—',
    proveedorServicio: 'SimplicAI — Gestión integral (contrato vigente)',
    tipoRiesgo: 'Por definir',
    ge:{funcion:2, aplicacion:1, mantenimiento:1, antecedentes:0},
    accesorios: listasEquipoForm.newAccesorios.slice(),
    manuales: listasEquipoForm.newManuales.slice(),
    garantia: document.getElementById('newGarantia').value.trim() || 'Sin registrar.',
    historial:[]
  };
  equipos.push(nuevo);
  if(esEquipoMedico(nuevo)){
    checklists[id] = { items: CHECK_ITEMS.map(label=>({label, checked:false})), responsable:'', nota:'', guardadoHoy:false, hora:'', incidencias:[] };
  }
  closeAddEquipoModal();
  populateAreaFilter();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderDashboard();
  updateNavBadges();
  showToast('Equipo agregado — clasifícalo en Programa de Mantenimiento');
}

/* ===================== EDITAR / DESHABILITAR / SERVICIO / ELIMINAR EQUIPO ===================== */
function openEditEquipoModal(){
  const e = equipoById(currentDrawerId);
  if(!e) return;
  document.getElementById('editNombre').value = e.nombre;
  document.getElementById('editMarca').value = e.marca;
  document.getElementById('editSerie').value = e.serie;
  document.getElementById('editUbicacion').value = e.area;
  document.getElementById('editCategoria').value = e.categoria;
  document.getElementById('editProveedor').value = e.proveedor;
  document.getElementById('editEstado').value = e.estado;
  document.getElementById('editGarantia').value = (e.garantia && e.garantia !== 'Sin registrar.') ? e.garantia : '';
  document.getElementById('editVidaUtil').value = e.vidaUtilAnios || '';
  listasEquipoForm.editAccesorios = (e.accesorios || []).slice();
  listasEquipoForm.editManuales = (e.manuales || []).slice();
  renderListaEditable('editAccesorios');
  renderListaEditable('editManuales');
  document.getElementById('editEquipoOverlay').classList.add('active');
}
function closeEditEquipoModal(){ document.getElementById('editEquipoOverlay').classList.remove('active'); }
function saveEditEquipo(){
  const e = equipoById(currentDrawerId);
  if(!e) return;
  const nombre = document.getElementById('editNombre').value.trim();
  if(!nombre){ showToast('Indica el nombre del equipo'); return; }
  e.nombre = nombre;
  e.marca = document.getElementById('editMarca').value.trim() || '—';
  e.serie = document.getElementById('editSerie').value.trim() || '—';
  e.area = document.getElementById('editUbicacion').value.trim() || 'Sin asignar';
  e.categoria = document.getElementById('editCategoria').value;
  e.proveedor = document.getElementById('editProveedor').value.trim() || '—';
  e.estado = document.getElementById('editEstado').value;
  e.garantia = document.getElementById('editGarantia').value.trim() || 'Sin registrar.';
  e.vidaUtilAnios = parseInt(document.getElementById('editVidaUtil').value, 10) || null;
  e.accesorios = listasEquipoForm.editAccesorios.slice();
  e.manuales = listasEquipoForm.editManuales.slice();

  // Si cambió de/hacia TI/Activo, sincroniza si tiene o no checklist de rutina.
  if(esEquipoMedico(e) && !checklists[e.id]){
    checklists[e.id] = { items: CHECK_ITEMS.map(label=>({label, checked:false})), responsable:'', nota:'', guardadoHoy:false, hora:'', incidencias:[] };
  } else if(!esEquipoMedico(e) && checklists[e.id]){
    delete checklists[e.id];
  }

  closeEditEquipoModal();
  populateAreaFilter();
  renderInventario();
  renderMantenimiento();
  renderChecklist();
  renderCorrectivo();
  renderDashboard();
  updateNavBadges();
  openDrawer(e.id);
  showToast('Equipo actualizado');
}

function deshabilitarEquipo(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Marcar "'+e.nombre+'" como Fuera de servicio?')) return;
  e.estado = 'Fuera de servicio';
  e.historial.unshift({fecha:new Date().toISOString().slice(0,10), tipo:'Estado', detalle:'Equipo deshabilitado por '+currentUserLabel()+'.'});
  renderInventario(); renderMantenimiento(); renderChecklist(); renderDashboard();
  openDrawer(id);
  showToast('Equipo marcado como fuera de servicio');
}

function enviarAServicio(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Enviar "'+e.nombre+'" a servicio y crear una orden de mantenimiento?')) return;
  e.estado = 'En mantenimiento';
  e.historial.unshift({fecha:new Date().toISOString().slice(0,10), tipo:'Correctivo', detalle:'Enviado a servicio por '+currentUserLabel()+'.'});
  const folioServicio = 'MC-'+String(correctivoFolioSeq++).padStart(4,'0');
  correctivo.unshift({
    folio:folioServicio,
    equipoId:id, origen:'Enviado a servicio ('+currentUserLabel()+')',
    categoria:'Regular', estado:'Abierta', tecnico:'Sin asignar', fecha:new Date().toISOString().slice(0,10),
    notasProveedor:'', resueltoPor:'', fechaResuelto:'', validadoPor:'', fechaCierre:'', comentarioValidacion:'', bitacora:[]
  });
  agregarBitacora('HOSP-1', folioServicio, currentUser, 'Orden creada al enviar el equipo a servicio.');
  renderInventario(); renderMantenimiento(); renderChecklist(); renderCorrectivo(); renderDashboard(); updateNavBadges();
  openDrawer(id);
  showToast('Equipo enviado a servicio');
}

function registrarPreventivoRealizado(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('¿Registrar que el mantenimiento preventivo de "'+e.nombre+'" ya se realizó? Esto recalcula su próxima fecha programada.')) return;
  const hoy = new Date().toISOString().slice(0,10);
  e.historial.unshift({fecha:hoy, tipo:'Preventivo', detalle:'Mantenimiento preventivo realizado, registrado por '+currentUserLabel()+'.'});
  if(e.estado === 'En mantenimiento') e.estado = 'Operativo';
  renderInventario(); renderMantenimiento(); renderChecklist(); renderDashboard(); updateNavBadges();
  showToast('Mantenimiento preventivo registrado — próxima fecha recalculada', 'success');
}

function eliminarEquipo(id){
  const e = equipoById(id);
  if(!e) return;
  if(!confirm('Esta acción elimina permanentemente "'+e.nombre+'" del inventario. ¿Continuar?')) return;
  equipos = equipos.filter(x=>x.id!==id);
  delete checklists[id];
  solicitudes = solicitudes.filter(s=>s.equipoId!==id);
  correctivo = correctivo.filter(c=>c.equipoId!==id);
  solicitudesPendientes = solicitudesPendientes.filter(p=>p.equipoId!==id);
  closeDrawer();
  populateAreaFilter();
  renderInventario(); renderMantenimiento(); renderChecklist(); renderSolicitudes(); renderAprobaciones(); renderMisSolicitudes(); renderCorrectivo(); renderDashboard(); updateNavBadges();
  showToast('Equipo eliminado del inventario');
}

