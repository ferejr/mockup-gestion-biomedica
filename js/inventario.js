/* ===================== RENDER: INVENTARIO ===================== */
function populateAreaFilter(){
  const sel = document.getElementById('filtroArea');
  const areas = [...new Set(equipos.map(e=>e.area))].sort();
  sel.innerHTML = '<option value="">Todas las áreas</option>' + areas.map(a=>`<option>${a}</option>`).join('');
}

function renderInventario(){
  const texto = document.getElementById('filtroTexto').value.toLowerCase();
  const area = document.getElementById('filtroArea').value;
  const cat = document.getElementById('filtroCategoria').value;
  const estado = document.getElementById('filtroEstado').value;
  const clasif = document.getElementById('filtroClasif').value;

  const filtrados = equipos.filter(e=>{
    const matchTexto = !texto || (e.nombre+e.id+e.serie).toLowerCase().includes(texto);
    const matchArea = !area || e.area===area;
    const matchCat = !cat || e.categoria===cat;
    const matchEstado = !estado || e.estado===estado;
    const matchClasif = !clasif || geClasificacion(geTotal(e.ge))===clasif;
    return matchTexto && matchArea && matchCat && matchEstado && matchClasif;
  });

  const body = document.getElementById('inventarioBody');
  if(filtrados.length===0){
    body.innerHTML = `<tr><td colspan="8"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      <div class="t">Sin resultados</div>Ajusta los filtros o el término de búsqueda.</div></td></tr>`;
    return;
  }

  body.innerHTML = filtrados.map(e=>{
    const total = geTotal(e.ge);
    const clasif = geClasificacion(total);
    const geCell = requiereIMP(e) ? geBarHTML(e.ge,'sm') : `<span class="pill pill-gray">No aplica</span>`;
    const clasifCell = requiereIMP(e)
      ? (clasif==='I' ? '<span class="pill pill-green">Incluido</span>' : '<span class="pill pill-gray">No incluido</span>')
      : '<span class="pill pill-gray">No requiere IMP</span>';
    return `
    <tr class="clickable" onclick="openDrawer('${e.id}')">
      <td>
        <div class="cell-primary">${e.nombre}</div>
        <div class="cell-sub">${e.marca}</div>
      </td>
      <td>${assetTag(e.id)}<div class="cell-sub mono">${e.serie}</div></td>
      <td>${e.area}</td>
      <td><span class="pill pill-teal">${e.categoria}</span></td>
      <td>${statusPill(e.estado)}</td>
      <td style="min-width:150px;">${geCell}</td>
      <td>${clasifCell}</td>
      <td style="text-align:right;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </td>
    </tr>`;
  }).join('');
}

