# Backlog y decisiones de producto

Este documento recoge las **8 definiciones pendientes** detectadas en el mockup, con la
decisión tomada para cada una. Existe para que quien programe el producto real no tenga que
adivinar qué era intencional y qué era un hueco del mockup.

Está dividido en dos secciones:

- **[Sección A — Historias listas para implementar](#sección-a--historias-listas-para-implementar)**: lo que
  sí se puede construir y demostrar en el mockup actual.
- **[Sección B — Decisiones de producto](#sección-b--decisiones-de-producto)**: definiciones que afectan al
  producto real y se documentan aquí, sin implementarse en el mockup.

> **Estado:** las 6 historias de la Sección A están implementadas. HU-01 pasó por dos
> iteraciones: el buscador original (una lista desplegable bajo la barra) se descartó por no
> aportar suficiente, y se reemplazó por una **paleta de comandos (Ctrl/⌘ K)** que además de
> buscar registros dice a dónde ir — ver la definición actualizada en HU-01. Las decisiones
> de la Sección B siguen siendo definiciones para el producto real, sin código.
>
> Dos definiciones que quedaron abiertas se resolvieron así al implementar, y pueden
> cambiarse: (1) al posponer una orden se conserva la urgencia con la que se reportó en
> `urgenciaOriginal`, de modo que aplazar no la reevalúa (coherente con D-01); (2) los
> manuales se capturan como referencia de texto, porque adjuntar archivos requiere
> almacenamiento del backend, que el mockup no tiene.

---

## Resumen de las 8 definiciones

| # | Tema | Decisión | Dónde |
|---|---|---|---|
| 1 | Buscador global | Paleta de comandos (Ctrl K): navegación, acciones y registros | [HU-01](#hu-01--buscador-global-de-la-barra-superior) |
| 1 | Notificaciones | Órdenes urgentes abiertas + pendientes del rol | [HU-02](#hu-02--centro-de-notificaciones) |
| 2 | Posponer orden | Coordinador/Director, con motivo y nueva fecha | [HU-03](#hu-03--posponer-una-orden-de-mantenimiento) |
| 2 | IMP automático | Automático, con anticipación configurable por hospital | [HU-04](#hu-04--generación-automática-de-órdenes-imp-programado) |
| 3 | Indicadores ilustrativos | Los 4 pasan a cálculo real (uno con dependencia) | [D-02](#d-02--indicadores-que-deben-pasar-a-cálculo-real) |
| 4 | Ficha detallada | Editable en alta y en edición | [HU-05](#hu-05--captura-de-la-ficha-detallada-del-equipo) |
| 5 | Autenticación | Sin definir — decisión abierta | [D-03](#d-03--modelo-de-autenticación-decisión-abierta) |
| 6 | Multi-tenant | Depende del `modeloServicio` contratado | [D-04](#d-04--capacidades-del-proveedor-según-el-modelo-de-servicio) |
| 7 | Filtros de órdenes | Buscador global + búsqueda propia por tabla | [HU-06](#hu-06--búsqueda-en-las-tablas-de-órdenes) |
| 8 | Recategorizar urgencia | Regla intencional: se fija al reportar | [D-01](#d-01--la-urgencia-de-una-orden-se-fija-al-reportar) |

---

# Sección A — Historias listas para implementar

## HU-01 · Buscador global de la barra superior

> Como **cualquier usuario de la plataforma**, quiero un único punto de entrada para llegar a
> cualquier parte —un módulo, una acción o un registro— sin tener que recordar en qué menú
> está, para dejar de navegar a ciegas.

**Historia de esta historia:** la primera versión fue una lista desplegable bajo la barra
superior que solo buscaba registros. Se descartó por no aportar lo suficiente. La versión
actual es una **paleta de comandos** al estilo de Supabase: además de encontrar registros,
responde "¿a dónde voy?" ofreciendo los módulos y las acciones disponibles.

**Alcance implementado:**

| Grupo | Contenido | Destino al seleccionar |
|---|---|---|
| Ir a | Los módulos que el rol tiene habilitados | Navega a ese módulo |
| Acciones | Agregar equipo, solicitar revisión, enviar a servicio, calcular Número GE, dar de alta hospital, cerrar sesión | Ejecuta la acción, navegando primero si hace falta |
| Equipos | Nombre, marca, serie, ID, área, categoría | Abre el drawer de detalle |
| Órdenes | Folio, equipo, técnico, origen | Abre el detalle de la orden |
| Solicitudes | Folio `SR-####` / `AP-####`, equipo, solicitante | Lleva a la pestaña correspondiente |
| Hospitales *(portal proveedor)* | Nombre, ciudad, id | Abre el detalle del hospital |

**Criterios de aceptación:**

- Se abre con `Ctrl/⌘ + K` desde cualquier parte, y con el botón de la barra superior.
- Sin escribir nada muestra los destinos y las acciones disponibles, como punto de partida.
- Se maneja con teclado: `↑` `↓` para moverse (la selección da la vuelta), `↵` para abrir,
  `esc` para cerrar.
- La búsqueda ignora acentos: escribir "endoscopia" encuentra "Endoscopía".
- Solo ofrece lo que el rol puede abrir: un técnico no ve órdenes de mantenimiento ni el
  módulo correspondiente.
- Funciona en las dos aplicaciones — la hospitalaria y el portal de proveedor —, ofreciendo
  en cada una sus propios módulos, acciones y registros.
- Sin coincidencias muestra un estado vacío explícito.

**Nota técnica:** los comandos de navegación y de acción se derivan del DOM (los botones del
menú y los de acción de cada vista), leyendo su `display` en línea — que es lo que escriben
`applyRolePermissions()` y `applyProviderRolePermissions()`. Así la paleta hereda los
permisos ya definidos en vez de mantener una segunda lista de reglas por rol que se pueda
desincronizar. Implementada en `js/paleta.js`.

**Notas técnicas:** el filtrado por texto ya está resuelto en `renderInventario()`
(`js/inventario.js`) — conviene extraer ese patrón a un helper reutilizable en vez de
duplicarlo. La navegación entre vistas se hace con el mismo mecanismo que usan los botones
`.nav-item[data-view]` en `js/shell.js`.

---

## HU-02 · Centro de notificaciones

> Como **usuario con pendientes**, quiero abrir la campana y ver qué requiere mi atención,
> en vez de depender de los avisos que aparecen solo al iniciar sesión y se desvanecen.

**Situación actual:** el botón de campana en la topbar no tiene `onclick`. Hoy los avisos
solo existen como *toasts* transitorios al iniciar sesión (`showLoginNotifications()`).

**Alcance decidido — qué debe listar:**

1. **Órdenes urgentes abiertas** — categoría "Urgente emergencia" o "Urgente" que sigan sin
   cerrarse.
2. **Pendientes del rol del usuario:**
   - Coordinador / Director: aprobaciones esperando su decisión, y órdenes marcadas
     "Resuelto por proveedor" esperando su validación.
   - Técnico: sus propias solicitudes que ya fueron aprobadas, rechazadas o resueltas.
   - Proveedor: órdenes asignadas abiertas o en proceso.

**Quedan explícitamente fuera de este release:** checklists sin completar y vencimientos del
programa preventivo. (El vencimiento preventivo se atiende por otra vía: [HU-04](#hu-04--generación-automática-de-órdenes-imp-programado).)

**Criterios de aceptación:**

- La campana muestra un contador con el número de notificaciones activas.
- Al hacer clic se abre un panel con la lista; cada entrada dice qué pasó y a qué elemento
  se refiere (folio o equipo).
- Clic en una notificación navega al elemento correspondiente.
- El contenido depende del rol: un técnico nunca ve pendientes de aprobación de otros.
- Si no hay nada pendiente, el panel muestra un estado vacío y el contador no aparece.

**Notas técnicas:** `showLoginNotifications()` (`js/helpers.js:107`) **ya construye una cola
de notificaciones diferenciada por rol** (`{msg, tone}`), apoyándose en
`ordenesEmergenciaActivas()` (`js/helpers.js:88`), `equiposNoOperativos()` y
`pctCumplimientoHoy()`. La historia es extraer esa construcción a una función que devuelva
la lista y renderizarla en el panel, reutilizándola también para los toasts de inicio de
sesión — no reimplementar la lógica en paralelo.

---

## HU-03 · Posponer una orden de mantenimiento

> Como **Coordinador o Director Biomédico**, quiero posponer una orden dejando constancia
> del motivo y de la nueva fecha, para que el aplazamiento sea una decisión registrada y no
> una orden que simplemente se queda abierta sin explicación.

**Situación actual:** la categoría "Pospuesta" existe en el modelo, tiene su pill, su
contador (`corrPos`) y aparece en los datos de ejemplo — pero **ninguna acción del mockup
puede generarla**.

**Alcance decidido:**

- Solo los roles **admin (Director)** y **coordinador** pueden posponer.
- Motivo y nueva fecha son **obligatorios**.
- El proveedor **no** puede posponer.

**Criterios de aceptación:**

- En el detalle de una orden no cerrada aparece la acción "Posponer" para esos dos roles.
- La acción abre un modal que pide motivo (texto) y nueva fecha; sin ambos no se puede
  confirmar.
- Al confirmar, la orden pasa a categoría "Pospuesta" y se registra en la bitácora quién la
  pospuso, cuándo, el motivo y la nueva fecha.
- El contador "Pospuesta" de la vista de órdenes refleja el cambio de inmediato.
- Una orden pospuesta sigue siendo válida para resolverse y cerrarse por el flujo normal.

**Nota abierta:** no se definió si una orden pospuesta puede volver a su urgencia original.
Dado que [D-01](#d-01--la-urgencia-de-una-orden-se-fija-al-reportar) establece que la
urgencia no se recategoriza, conviene decidirlo antes de implementar.

**Notas técnicas:** la escritura a bitácora ya existe: `agregarBitacora(hospId, folio,
usuario, evento)` en `js/provider.js`. El patrón de modal con validación de campos
obligatorios está en `confirmChecklistIssue()` (`js/revisiones.js`).

---

## HU-04 · Generación automática de órdenes "IMP programado"

> Como **Coordinador Biomédico**, quiero que el sistema abra solo las órdenes del
> mantenimiento preventivo cuando se acerca su fecha, para que el programa se ejecute sin
> depender de que alguien revise el calendario a tiempo.

**Situación actual:** el origen "IMP programado" solo existe en datos de ejemplo. Hoy la
única forma de abrir una orden de preventivo es que alguien envíe el equipo a servicio
manualmente.

**Alcance decidido:**

- Generación **automática**, con **anticipación configurable por hospital** (un parámetro con
  valor por defecto, no un número fijo en el código).
- La orden se crea con origen "IMP programado".

**Criterios de aceptación:**

- Cuando un equipo del programa preventivo está a N días o menos de su fecha objetivo, existe
  una orden abierta con origen "IMP programado" para ese equipo.
- N es un parámetro por hospital con valor por defecto, editable sin tocar el código.
- No se duplican órdenes: si ya hay una orden de preventivo abierta para ese equipo y ciclo,
  no se crea otra.
- La orden queda registrada en bitácora como creada por el sistema, no por una persona.
- Los equipos fuera del programa preventivo (clasificación GE "N", y los de categoría
  "TI / Activo") nunca generan estas órdenes.

**Notas técnicas:** `equiposConIMPVencido()` (`js/helpers.js:91`) **ya calcula el
vencimiento**, cruzando la fecha del último `historial` de tipo "Preventivo" contra la
frecuencia que corresponde a su Número GE (4 / 6 / 12 meses). Lo que falta es la ventana de
anticipación y la creación de la orden. Ojo: ese cálculo de meses está duplicado — existe
también como `mesesPorFrecuencia()` en `js/mantenimiento.js:76`; conviene unificarlo al
tocar esto.

> **Limitación del mockup:** no hay servidor ni tareas programadas, así que la evaluación
> ocurriría al cargar la aplicación. En el producto real esto corresponde a un *job*
> periódico del backend, independiente de que alguien abra la app.

---

## HU-05 · Captura de la ficha detallada del equipo

> Como **Coordinador o Director Biomédico**, quiero capturar accesorios, manuales, garantía y
> vida útil del equipo, para que la pestaña "Detallada" refleje información real y no valores
> por defecto.

**Situación actual:** esos campos se muestran en el drawer pero **no hay ninguna pantalla
donde capturarlos**. `saveNewEquipo` (`js/equipos.js`) los fija por código: `vidaUtilAnios:
8`, `accesorios: []`, `manuales: []`, `garantia: 'Sin registrar.'`. El modal de edición solo
tiene 7 campos básicos (nombre, marca, serie, ubicación, categoría, proveedor, estado).

**Alcance decidido:** los campos se capturan **tanto en el alta como en la edición**.

**Criterios de aceptación:**

- Los formularios de alta y de edición incluyen: accesorios, manuales, garantía y vida útil
  estimada (años).
- Accesorios y manuales admiten varias entradas (agregar y quitar elementos de la lista).
- Al guardar, la pestaña "Detallada" del drawer muestra exactamente lo capturado.
- Ya no queda ningún valor hardcodeado en `saveNewEquipo`: un equipo nuevo sin estos datos
  los deja vacíos, no con un `8` inventado.
- El cálculo de "vida útil" del drawer sigue funcionando con el valor capturado.

**Nota abierta:** no se definió si los manuales son solo un nombre/referencia o un archivo
adjunto real. Subir archivos implica almacenamiento en el backend y queda fuera del mockup;
hay que decidirlo para el producto real.

---

## HU-06 · Búsqueda en las tablas de órdenes

> Como **usuario que trabaja con órdenes**, quiero buscar dentro de la tabla de órdenes, para
> encontrar una específica sin recorrer la lista completa.

**Situación actual:** `view-correctivo` (hospital) y `pview-ordenes` (proveedor) tienen
**cero** campos de entrada, frente a los 5 que tiene Inventario. Solo hay contadores no
interactivos.

**Alcance decidido:** campo de **búsqueda por texto** en ambas tablas, complementario a la
paleta de comandos de [HU-01](#hu-01--buscador-global-de-la-barra-superior): la paleta sirve
para saltar a una orden concreta, este filtro para acotar la lista que se está revisando.

**Fuera de alcance en este release:** selectores de estado y urgencia, y hacer clickeables
los contadores que ya existen. Se descartaron conscientemente; pueden retomarse después.

**Criterios de aceptación:**

- Ambas tablas tienen un campo de texto que filtra por folio, nombre de equipo y técnico.
- El filtrado es inmediato al escribir, sin botón de buscar.
- Los contadores de arriba siguen mostrando el total real, no el filtrado (o se indica
  explícitamente que están filtrados — decidir al implementar).
- Sin coincidencias, la tabla muestra su estado vacío.
- En el portal de proveedor, el filtro respeta lo que el rol ya podía ver: un técnico de
  proveedor sigue viendo solo sus órdenes asignadas.

---

# Sección B — Decisiones de producto

Estas definiciones **no se implementan en el mockup**. Se documentan para quien construya el
producto real.

## D-01 · La urgencia de una orden se fija al reportar

**Decisión:** es una **regla de negocio intencional**, no un hueco. Una vez creada la orden,
su categoría de urgencia (Regular / Urgente / Urgente emergencia) **no se cambia**.

**Razonamiento:** la urgencia refleja la evaluación al momento del reporte. Permitir
recategorizarla después distorsionaría cualquier indicador de tiempo de respuesta por
urgencia, porque no se sabría contra qué criterio se midió.

**Si la situación cambia:** se documenta en la bitácora de la orden, o se abre una orden
nueva con la urgencia correcta.

**Implicación técnica:** hoy el código ya cumple esta regla sin proponérselo — `categoria`
solo se asigna al crear la orden y no se reasigna en ningún punto. Al construir el producto
real, esto debe ser explícito (campo inmutable tras la creación), no accidental.

> Nota: la categoría "Pospuesta" de [HU-03](#hu-03--posponer-una-orden-de-mantenimiento) sí
> modifica ese mismo campo. Conviene modelarlo como un estado de aplazamiento separado de la
> urgencia, para no romper esta regla.

## D-02 · Indicadores que deben pasar a cálculo real

**Decisión:** los **4** indicadores hoy ilustrativos deben calcularse a partir de datos
reales. Hoy son valores fijos escritos en el HTML.

| Indicador | Valor fijo actual | Viabilidad |
|---|---|---|
| Órdenes por categoría (30 días) | 18/34/40/8 % | **Inmediata** — es contar `correctivo` por categoría filtrando por fecha |
| Productividad de IMP por área | 92/88/76/81/69 % | **Viable** — cruzar equipos del programa por área contra inspecciones completadas |
| Tiempo promedio de respuesta | 3.2 h | **Viable, requiere definición** — ver abajo |
| Tasa de localización de equipos | 96 % | ⚠️ **Bloqueada** — ver abajo |

**⚠️ Dependencia crítica — tasa de localización:** este indicador **no es calculable con el
modelo de datos actual**. Requiere crear el concepto de **censo de inventario físico**:
registrar recorridos donde se marca cada equipo como encontrado o no encontrado, con fecha y
responsable. Nada de eso existe hoy. Comprometer este indicador implica diseñar primero ese
flujo completo.

**Definición pendiente — tiempo de respuesta:** los datos existen (fecha de creación de la
orden y bitácora con hora de cada evento), pero falta decidir **qué marca el fin del
tiempo**: la primera atención del técnico o el cierre de la orden. Son métricas distintas y
la elección cambia el número.

**Contraste para tener presente:** en el mismo panel ya hay indicadores que **sí** se
calculan en vivo (cumplimiento de IMP, preventivo vs. correctivo, costos e inactividad). El
objetivo es que ningún indicador quede como valor fijo, para que el panel sea confiable.

## D-03 · Modelo de autenticación (decisión abierta)

**Estado: sin definir.** Se documenta para retomarla antes de construir esta parte.

**Situación actual:** el mockup usa **una sola contraseña compartida** (`TEAM_PASSWORD` en
`js/shell.js`) para los 5 usuarios de prueba, comparada en texto plano del lado del cliente.
Es aceptable como demostración interna y **nunca debe llegar a producción**.

**Opciones consideradas:**

| Opción | A favor | En contra |
|---|---|---|
| Credenciales por persona + recuperación | Modelo estándar, control total, trazabilidad real por usuario | Hay que construir y mantener recuperación de contraseña, política de contraseñas, bloqueos |
| Lo anterior + segundo factor (2FA) | Relevante si hay información clínica sensible o requisitos regulatorios del hospital | Fricción para personal operativo que entra varias veces al día desde piso |
| SSO del directorio del hospital | Sin contraseñas nuevas para el personal; altas y bajas las controla el hospital | Depende de la infraestructura de cada cliente; complica el modelo "Gestionado por SimplicAI", donde el operador es externo al hospital |

**A resolver junto con la decisión:** la trazabilidad de la bitácora depende de esto. Hoy se
registra `usuario` como texto; con autenticación real debe apuntar a una identidad
verificada, que es lo que da valor legal/auditable al historial de cada equipo.

## D-04 · Capacidades del proveedor según el modelo de servicio

**Decisión:** las capacidades del proveedor sobre un hospital cliente **dependen del modelo
contratado**, usando el campo `modeloServicio` que ya existe en cada hospital.

| Capacidad | `Gestionado por SimplicAI` | `Autogestionado` |
|---|---|---|
| Ver equipos y órdenes del hospital | Sí | Sí |
| Resolver órdenes asignadas | Sí | Sí |
| Dar de alta y editar equipos | Sí | No — lo hace el personal del hospital |
| Crear órdenes | Sí | No |
| Asignar técnicos | Sí | Sí |

**Razonamiento:** en el modelo "Gestionado por SimplicAI" el proveedor **es** quien opera el
software en nombre del hospital, así que necesita las mismas capacidades que el personal
interno. En "Autogestionado" el hospital mantiene su propio inventario y el proveedor es un
prestador de servicio que atiende órdenes.

**Situación actual del mockup:** `modeloServicio` ya existe en los datos de cada hospital
(`js/data.js`) con exactamente esos dos valores, **pero hoy no gobierna ningún permiso** —
es solo una etiqueta que se muestra. Además, los hospitales de ejemplo `HOSP-2` y `HOSP-3`
son de solo lectura por una limitación del mockup: sus equipos y órdenes viven embebidos en
`equiposResumen` / `ordenesResumen` dentro del propio hospital, en vez de compartir el modelo
de datos de `HOSP-1`. Un backend real debe tener **un solo modelo de datos para todos los
hospitales**, con el permiso derivado de `modeloServicio`.
