/* ===================== PALETA DE COMANDOS (⌘K / Ctrl+K) =====================
   Buscador global de toda la plataforma: además de encontrar registros (equipos, órdenes,
   solicitudes, hospitales), ofrece los comandos de navegación y las acciones disponibles,
   para que la respuesta a "¿dónde está esto?" sea llegar ahí de un Enter.

   Los comandos de navegación y de acción se derivan del DOM (botones del menú y botones de
   acción de cada vista), no de una lista propia de roles: así la paleta respeta
   automáticamente lo que applyRolePermissions() ya decidió mostrar u ocultar, y no hay dos
   fuentes de verdad que se puedan desincronizar. */

let paletaAbierta = false;
let paletaIndice = 0;
let paletaItems = [];

// Comparación sin acentos ni mayúsculas: "endoscopia" encuentra "Endoscopía".
function normalizarTexto(s){
  return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const PALETA_ICONOS = {
  vista:      '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  accion:     '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  equipo:     '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/>',
  orden:      '<path d="M10.5 3.5l10 10-3.5 3.5-10-10a2.5 2.5 0 013.5-3.5z"/><path d="M3 21l4.5-1.5L3 15.5V21z"/>',
  solicitud:  '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8.5 12.5l2 2 4.5-4.5"/>',
  hospital:   '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M12 9v6M9 12h6"/>',
  sesion:     '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'
};

/* ---- Construcción del catálogo ---- */

// Un botón entra al catálogo si el rol actual lo tiene habilitado. Se mira el `display`
// en línea —que es lo que escriben applyRolePermissions() y applyProviderRolePermissions()—
// y NO la visibilidad real en pantalla: los botones de acción viven dentro de su vista, así
// que estarían ocultos por layout siempre que esa vista no fuera la activa.
function botonDisponible(el){
  return !!el && el.style.display !== 'none';
}
function esRolProveedor(){
  return currentRole === 'proveedor' || currentRole === 'tecnico_proveedor';
}

function comandosNavegacion(){
  const esProveedor = esRolProveedor();
  const selector = esProveedor ? '#providerApp .nav-item[data-pview]' : '.app .nav-item[data-view]';
  return Array.from(document.querySelectorAll(selector))
    .filter(botonDisponible)
    .map(btn => {
      // Solo los nodos de texto: así se deja fuera el icono y el badge con el contador,
      // que si no acabarían dentro de la etiqueta ("Inventario 11").
      const etiqueta = Array.from(btn.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
      const clave = esProveedor ? btn.dataset.pview : btn.dataset.view;
      return {
        grupo: 'Ir a',
        icono: 'vista',
        titulo: etiqueta,
        subtitulo: 'Módulo de la plataforma',
        claves: 'ir a navegar modulo seccion vista ' + clave,
        ejecutar: () => btn.click()
      };
    });
}

function comandosAccion(){
  const lista = [];
  const agregar = (el, titulo, subtitulo, claves, ejecutar) => {
    if(botonDisponible(el)) lista.push({grupo:'Acciones', icono:'accion', titulo, subtitulo, claves, ejecutar});
  };

  if(esRolProveedor()){
    if(currentRole === 'proveedor'){
      lista.push({grupo:'Acciones', icono:'hospital', titulo:'Dar de alta un hospital',
        subtitulo:'Registra un nuevo cliente', claves:'alta nuevo hospital cliente registrar',
        ejecutar: () => { switchProviderView('hospitales'); openAddHospitalModal(); }});
    }
  } else {
    agregar(document.getElementById('btnAddEquipo'), 'Agregar equipo al inventario',
      'Da de alta un equipo nuevo', 'alta nuevo equipo registrar inventario',
      () => { irAVista('inventario'); openAddEquipoModal(); });

    agregar(document.getElementById('btnSolicitarRevision'), 'Solicitar revisión de equipo',
      'Reporta un desperfecto', 'solicitar revision reportar falla desperfecto',
      () => { irAVista('revisiones'); openSolicitudModal(); });

    agregar(document.getElementById('btnSolicitarServicioTecnico'), 'Solicitar envío a servicio',
      'Pide autorización para enviar un equipo', 'enviar servicio solicitar tecnico',
      () => { irAVista('revisiones'); openSolicitudServicioModal(); });

    // La calculadora GE vive dentro de Programa de Mantenimiento: se ofrece a quien
    // tenga ese módulo habilitado.
    const navMantenimiento = document.querySelector('.app .nav-item[data-view="mantenimiento"]');
    if(botonDisponible(navMantenimiento)){
      lista.push({grupo:'Acciones', icono:'accion', titulo:'Calcular Número GE',
        subtitulo:'Clasificación de riesgo de un equipo', claves:'ge calcular clasificacion riesgo numero',
        ejecutar: () => { irAVista('mantenimiento'); openGECalc(); }});
    }
  }

  lista.push({grupo:'Acciones', icono:'sesion', titulo:'Cerrar sesión',
    subtitulo:'Salir de la plataforma', claves:'cerrar sesion salir logout',
    ejecutar: () => logout()});

  return lista;
}

function comandosDatos(){
  const lista = [];

  if(esRolProveedor()){
    hospitales.forEach(h => lista.push({
      grupo:'Hospitales', icono:'hospital', titulo:h.nombre,
      subtitulo:h.ciudad + ' · ' + (h.modeloServicio || 'Sin modelo'),
      claves:h.id + ' ' + h.ciudad + ' hospital cliente',
      ejecutar: () => { switchProviderView('hospitales'); openHospitalDetalle(h.id); }
    }));

    let ords = todasLasOrdenesProveedor();
    if(currentRole === 'tecnico_proveedor'){
      const miNombre = USER_ROLES[currentUser].nombreCompleto;
      ords = ords.filter(o => o.tecnico === miNombre);
    }
    ords.forEach(o => {
      const h = hospitalById(o.hospId);
      lista.push({
        grupo:'Órdenes de servicio', icono:'orden', titulo:o.folio + ' · ' + o.equipoNombre,
        subtitulo:(h ? h.nombre + ' · ' : '') + o.estado + ' · ' + o.categoria,
        claves:o.folio + ' ' + o.equipoNombre + ' ' + o.tecnico + ' ' + (h ? h.nombre : ''),
        ejecutar: () => { switchProviderView('ordenes'); openProviderOrderModal(o.hospId, o.folio); }
      });
    });
    return lista;
  }

  // App hospitalaria: solo se ofrece lo que el rol puede abrir.
  if(rolPuedeVerVista('inventario')){
    equipos.forEach(e => lista.push({
      grupo:'Equipos', icono:'equipo', titulo:e.nombre,
      subtitulo:e.id + ' · ' + e.area + (e.serie && e.serie !== '—' ? ' · Serie ' + e.serie : ''),
      claves:e.id + ' ' + e.marca + ' ' + e.serie + ' ' + e.area + ' ' + e.categoria,
      ejecutar: () => { irAVista('inventario'); openDrawer(e.id); }
    }));
  }

  if(rolPuedeVerVista('correctivo')){
    correctivo.forEach(c => {
      const e = equipoById(c.equipoId);
      lista.push({
        grupo:'Órdenes de mantenimiento', icono:'orden',
        titulo:c.folio + ' · ' + (e ? e.nombre : c.equipoId),
        subtitulo:c.estado + ' · ' + c.categoria + ' · ' + c.origen,
        claves:c.folio + ' ' + (e ? e.nombre : '') + ' ' + c.tecnico + ' ' + c.origen,
        ejecutar: () => { irAVista('correctivo'); openHospOrderModal(c.folio); }
      });
    });
  }

  if(rolPuedeVerVista('revisiones')){
    solicitudes.forEach(s => {
      const e = equipoById(s.equipoId);
      lista.push({
        grupo:'Solicitudes', icono:'solicitud', titulo:s.folio + ' · ' + (e ? e.nombre : s.equipoId),
        subtitulo:'Solicitud de revisión · ' + s.estado,
        claves:s.folio + ' ' + (e ? e.nombre : '') + ' ' + s.solicitante + ' solicitud revision',
        ejecutar: () => { irAVista('revisiones'); switchRevTab('solicitudes'); }
      });
    });

    solicitudesPendientes
      .filter(p => currentRole !== 'tecnico' || p.solicitadoPor === currentUser)
      .forEach(p => {
        const e = equipoById(p.equipoId);
        lista.push({
          grupo:'Solicitudes', icono:'solicitud', titulo:p.id + ' · ' + (e ? e.nombre : p.equipoId),
          subtitulo:'Pendiente de aprobación · ' + p.estado,
          claves:p.id + ' ' + (e ? e.nombre : '') + ' ' + p.solicitadoPor + ' aprobacion pendiente',
          ejecutar: () => { irAVista('revisiones'); switchRevTab(currentRole === 'tecnico' ? 'misSolicitudes' : 'aprobaciones'); }
        });
      });
  }

  return lista;
}

/* ---- Filtrado y render ---- */

function paletaResultados(termino){
  const navegacion = comandosNavegacion();
  const acciones = comandosAccion();
  const q = normalizarTexto(termino).trim();

  // Sin término escrito: se muestra a dónde puede ir y qué puede hacer, como punto de partida.
  if(!q) return navegacion.concat(acciones);

  const coincide = c => normalizarTexto(c.titulo + ' ' + c.subtitulo + ' ' + (c.claves || '')).includes(q);
  return navegacion.concat(acciones).concat(comandosDatos()).filter(coincide).slice(0, 40);
}

function renderPaleta(){
  const cont = document.getElementById('paletaResultados');
  const input = document.getElementById('paletaInput');
  if(!cont || !input) return;

  paletaItems = paletaResultados(input.value);
  if(paletaIndice >= paletaItems.length) paletaIndice = 0;

  if(paletaItems.length === 0){
    cont.innerHTML = `<div class="paleta-vacio">
        <div class="paleta-vacio-title">Sin resultados</div>
        <div>No encontramos nada para “${input.value.trim()}”.</div>
      </div>`;
    return;
  }

  let html = '';
  let grupoActual = null;
  paletaItems.forEach((item, i) => {
    if(item.grupo !== grupoActual){
      grupoActual = item.grupo;
      html += `<div class="paleta-grupo">${grupoActual}</div>`;
    }
    html += `
      <button class="paleta-item${i === paletaIndice ? ' selected' : ''}" data-idx="${i}"
              onclick="ejecutarComandoPaleta(${i})" onmousemove="seleccionarComandoPaleta(${i})">
        <span class="paleta-icono">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${PALETA_ICONOS[item.icono] || PALETA_ICONOS.accion}</svg>
        </span>
        <span class="paleta-body">
          <span class="paleta-titulo">${item.titulo}</span>
          <span class="paleta-sub">${item.subtitulo}</span>
        </span>
        <span class="paleta-enter">↵</span>
      </button>`;
  });
  cont.innerHTML = html;
}

function seleccionarComandoPaleta(i){
  if(i === paletaIndice) return;
  paletaIndice = i;
  document.querySelectorAll('#paletaResultados .paleta-item').forEach(el=>{
    el.classList.toggle('selected', Number(el.dataset.idx) === paletaIndice);
  });
}

function ejecutarComandoPaleta(i){
  const item = paletaItems[i];
  if(!item) return;
  cerrarPaleta();
  item.ejecutar();
}

function moverSeleccionPaleta(delta){
  if(paletaItems.length === 0) return;
  paletaIndice = (paletaIndice + delta + paletaItems.length) % paletaItems.length;
  renderPaleta();
  const sel = document.querySelector('#paletaResultados .paleta-item.selected');
  if(sel) sel.scrollIntoView({block:'nearest'});
}

/* ---- Apertura y cierre ---- */

function abrirPaleta(){
  if(!currentRole) return; // sin sesión iniciada no hay nada que ofrecer
  const overlay = document.getElementById('paletaOverlay');
  const input = document.getElementById('paletaInput');
  if(!overlay || !input) return;
  paletaAbierta = true;
  paletaIndice = 0;
  input.value = '';
  overlay.classList.add('active');
  renderPaleta();
  input.focus();
}
function cerrarPaleta(){
  const overlay = document.getElementById('paletaOverlay');
  if(!overlay) return;
  paletaAbierta = false;
  overlay.classList.remove('active');
}
function togglePaleta(){ paletaAbierta ? cerrarPaleta() : abrirPaleta(); }

document.addEventListener('keydown', (ev)=>{
  // ⌘K / Ctrl+K abre y cierra desde cualquier parte de la plataforma.
  if((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k'){
    ev.preventDefault();
    togglePaleta();
    return;
  }
  if(!paletaAbierta) return;
  if(ev.key === 'ArrowDown'){ ev.preventDefault(); moverSeleccionPaleta(1); }
  else if(ev.key === 'ArrowUp'){ ev.preventDefault(); moverSeleccionPaleta(-1); }
  else if(ev.key === 'Enter'){ ev.preventDefault(); ejecutarComandoPaleta(paletaIndice); }
  else if(ev.key === 'Escape'){ ev.preventDefault(); cerrarPaleta(); }
});
