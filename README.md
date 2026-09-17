# SimplicAI · Gestión Integral de Equipos Médicos

Mockup de front-end (HTML/CSS/JS estático, sin backend) para una plataforma de gestión de
ingeniería clínica: inventario, clasificación de riesgo, mantenimiento preventivo/correctivo
y revisiones diarias de equipo médico hospitalario, con un portal adicional para el proveedor
de servicio que administra varios hospitales cliente.

> **Nota sobre el nombre:** "SimplicAI" es un nombre **provisional**. El nombre definitivo del
> producto aún no se ha votado en equipo — no lo tomes como final al integrarlo en tu propio
> código o documentación.

## Cómo abrirlo

No requiere build ni servidor. Basta con abrir `index.html` directamente en un navegador
(doble clic o `file://`). Todos los datos son de ejemplo y viven en memoria (`js/*.js`);
se reinician al recargar la página, excepto la sesión de usuario, que se guarda en
`localStorage` para no tener que volver a iniciar sesión en cada recarga.

## Estructura de carpetas

```
/
├── index.html          Shell HTML: <head>, todo el markup de vistas/modales, y los
│                        <script> que cargan cada módulo de js/ en orden.
├── css/
│   └── styles.css        Todos los estilos (variables de diseño, componentes, layout).
├── js/
│   ├── data.js            Datos de ejemplo (equipos, checklists, solicitudes, correctivo,
│   │                      hospitales, etc.) — se carga primero.
│   ├── helpers.js          Cálculo de Número GE, formateo de fecha/hora, toasts, pills.
│   ├── inventario.js       Render de la vista Inventario.
│   ├── mantenimiento.js    Programa de Mantenimiento, calendario de IMP, drawer de detalle
│   │                      de equipo (también usado desde Inventario).
│   ├── revisiones.js       Checklists diarios/semanales, solicitudes, aprobaciones.
│   ├── correctivo.js       Órdenes de mantenimiento correctivo (lado hospital).
│   ├── equipos.js          Calculadora GE, alta/edición/baja/envío a servicio de equipo.
│   ├── dashboard.js        Panel General e Indicadores.
│   ├── provider.js         Portal de Proveedor completo (hospitales, órdenes, técnicos).
│   └── shell.js            Navegación, login/roles, e inicialización — se carga al final.
├── legacy/
│   └── mockup-gestion-equipos-medicos.html
│                          Snapshot histórico de una versión anterior y más simple del
│                          mockup (sin login, sin roles, sin portal de proveedor). Se
│                          conserva solo como referencia — no tiene funcionalidad que no
│                          esté ya cubierta por index.html. No se sigue desarrollando.
└── README.md            Este archivo.
```

Esta versión fue reestructurada a partir de un único archivo HTML de ~4,460 líneas: primero
se separó en `index.html` + `css/styles.css` + un solo `js/app.js`, y después ese `js/app.js`
se dividió en los 10 módulos de arriba, siguiendo las mismas secciones que el propio código
ya delimitaba con comentarios. Ambas separaciones son puramente físicas — no se reorganizó
lógica ni se cambió comportamiento, salvo dos correcciones puntuales documentadas en
[Arquitectura y convenciones](#arquitectura-y-convenciones-para-quien-programe-el-módulo-real).

## Mapa de vistas / módulos

La app tiene dos "aplicaciones" independientes que se muestran una u otra según el usuario
que inicia sesión (ver [Roles y usuarios de prueba](#roles-y-usuarios-de-prueba)):

### App hospitalaria (`.app`, secciones `id="view-*"`)

| Vista | id | Descripción |
|---|---|---|
| Panel General | `view-dashboard` | Pantalla de inicio, fuera de cualquier grupo del menú. Tiene 2 pestañas: **Resumen** (KPIs de equipos registrados, incluidos en el programa de mantenimiento preventivo, revisiones pendientes, solicitudes abiertas, equipos críticos, distribución por clasificación de riesgo GE, actividad reciente) e **Indicadores** (cumplimiento de programa preventivo, tiempos de respuesta, costos, preventivo vs. correctivo — visible solo para admin/coordinador, igual que antes cuando era una vista aparte). Varios paneles de la pestaña Indicadores están marcados explícitamente en el código como **datos ilustrativos**, no calculados en tiempo real (ver [Qué es simulado](#qué-es-simulado-vs-lógica-real)). |
| Inventario | `view-inventario` | Tabla filtrable/buscable de equipos; alta de equipo; acceso al detalle (drawer). Agrupada bajo "Operación" en el menú. |
| Programa de Mantenimiento | `view-mantenimiento` | Tabla de clasificación de riesgo (Número GE), calendario de mantenimiento preventivo navegable mes a mes. Agrupada bajo "Operación". |
| Revisiones Diarias | `view-revisiones` | Checklists diarios/semanales por equipo, solicitudes de revisión, cola de aprobaciones (coordinador/admin), seguimiento de solicitudes propias (técnico). Agrupada bajo "Operación". |
| Órdenes de Mantenimiento | `view-correctivo` | Órdenes correctivas con niveles de urgencia, flujo de doble validación (proveedor resuelve → hospital confirma y cierra). Agrupada bajo "Operación". |

### Portal de proveedor (`#providerApp`, secciones `id="pview-*"`)

| Vista | id | Descripción |
|---|---|---|
| Panel General | `pview-panel` | KPIs consolidados de todos los hospitales cliente. |
| Mis Hospitales | `pview-hospitales` | Tarjetas de hospitales cliente, alta de nuevo hospital. |
| Detalle de Hospital | `pview-hospital-detalle` | Info general / equipos / órdenes de servicio de un hospital específico. |
| Órdenes de Servicio | `pview-ordenes` | Todas las órdenes de todos los hospitales (un técnico de proveedor solo ve las suyas). |

### Elementos compartidos

- **Drawer de detalle de equipo** (`#equipoDrawer`): tabs General / Detallada / Mantenimiento / Historial.
- **Modales**: alta/edición de equipo, calculadora de Número GE, solicitar revisión, solicitar envío a servicio, checklist con puntos pendientes, validación de orden (lado hospital), resolución de orden (lado proveedor), alta de hospital.
- **Landing page** (`#landingPage`) y **login** (`#loginGate`, autenticación simulada) previos a entrar a cualquiera de las dos apps.

## Modelo de datos (en `js/data.js`)

Todo vive en arrays/objetos JS en memoria, sin API ni base de datos real:

- **`equipos[]`** — inventario de equipos: identificación, ubicación, estado, clasificación
  de riesgo (`ge: {funcion, aplicacion, mantenimiento, antecedentes}`), accesorios, manuales,
  garantía e historial de eventos.
- **`checklists{}`** — checklist diario/semanal por equipo (clave = id de equipo).
- **`solicitudes[]`** — reportes de falla/incidencia sobre un equipo (folio `SR-####`).
- **`solicitudesPendientes[]`** — solicitudes de técnico que requieren aprobación de
  coordinador/admin antes de convertirse en orden real (folio `AP-####`).
- **`correctivo[]`** — órdenes de mantenimiento correctivo (folio `MC-####`), con bitácora de
  auditoría y flujo de doble validación proveedor → hospital.
- **`hospitales[]`** — hospitales cliente del portal de proveedor. `HOSP-1` es el mismo
  hospital modelado por `equipos`/`correctivo` (datos compartidos); `HOSP-2`/`HOSP-3` son
  ejemplos independientes con datos resumidos propios, no conectados al motor principal.
- **`USER_ROLES`** — usuarios de prueba y su rol (ver abajo).

## Roles y usuarios de prueba

Login simulado: se elige un usuario de la lista y se usa la contraseña compartida
`SimplicAI2026` (constante `TEAM_PASSWORD` en `js/app.js`). No hay autenticación real.

| Usuario | Rol | Alcance |
|---|---|---|
| `fernandoreyes` | admin (Director Biomédico) | Acceso completo a la app hospitalaria, incluida eliminación de equipos. |
| `esaupreciado` | coordinador (Coordinador Biomédico) | Alta/edición de equipos, envío a servicio, aprobaciones — sin eliminar equipos. |
| `octaviorojas` | técnico (Técnico Biomédico) | Solo Panel (reducido), Inventario y checklist de rutina. |
| `simplicai_admin` | proveedor (Proveedor de Servicio) | Portal de proveedor completo: Panel, Hospitales, Órdenes globales, reasignación de técnicos. |
| `antonioperez` | técnico de proveedor | Portal de proveedor, restringido a "Mis Órdenes de Servicio". |

## Arquitectura y convenciones (para quien programe el módulo real)

Esta sección resume decisiones y reglas de negocio no obvias, pensada para quien vaya a
construir el producto real a partir de este mockup.

**Todo es scope global — decisión pendiente para el build real.** No hay ES modules ni
namespacing: los ~165 identificadores (datos, helpers, funciones de render) del mockup
viven directamente en el scope global compartido entre los 10 archivos de `js/`. Además,
el markup generado usa `onclick="nombreFuncion(...)"` como string (no `addEventListener`),
lo que obliga a que esas funciones sigan siendo globales. Ninguna de las dos cosas se debe
replicar tal cual en la app real — ahí sí corresponde usar módulos reales y wiring de
eventos con `addEventListener`. Aquí se dejaron así a propósito para no tocar comportamiento
en este pase de limpieza.

**El orden de los `<script>` en `index.html` importa.** Sin módulos, cada archivo depende de
que los anteriores ya hayan declarado sus variables/funciones globales al momento en que se
ejecuta código de nivel superior (no dentro de una función). Por eso `data.js` y
`helpers.js` van primero, y `shell.js` al final — es el único archivo cuyo bloque `INIT`
dispara el primer render y necesita que todo lo demás ya esté cargado (incluida la llamada a
`initChecklists()`, que se movió de `data.js` a `shell.js` por esta misma razón: depende de
`esEquipoMedico()`, definida en `mantenimiento.js`).

**Metodología Número GE.** Cada equipo tiene un objeto `ge: {funcion, aplicacion,
mantenimiento, antecedentes}`; la suma de los 4 valores (ver `geTotal` en `helpers.js`)
decide si el equipo entra al programa de mantenimiento preventivo (`>= 12`) y con qué
frecuencia (`>= 19` trimestral, `>= 15` semestral, el resto anual — ver `geFrecuencia`).
Estos cortes vienen del material de curso referenciado al inicio de `data.js`, no son
arbitrarios.

**Flujo de doble validación de órdenes.** El proveedor marca una orden como "Resuelto por
proveedor" (con notas/costo); el hospital la confirma y cierra
(`confirmarYCerrarOrdenHospital` en `correctivo.js`). Cada paso queda en la bitácora de
auditoría de la orden (`agregarBitacora`).

**Flujo de aprobación de solicitudes de técnico.** Un técnico no puede abrir una orden de
mantenimiento directamente: genera una `solicitudPendiente` (folio `AP-####`) que un
coordinador/admin debe aprobar o rechazar (`revisiones.js`). Al aprobarla
(`crearOrdenDesdeAprobacion`), se crean **dos** registros: la orden real en `correctivo` y,
además, una entrada en `solicitudes` para que sea visible en "Solicitudes de revisión" igual
que las que genera directamente un coordinador/admin.

**HOSP-1 es un caso especial en los datos.** `HOSP-1` ("Hospital General del Valle") es el
hospital "real" del mockup: sus equipos y órdenes son los mismos arrays `equipos`/`correctivo`
usados por la app hospitalaria. Los demás hospitales de ejemplo (`HOSP-2`, `HOSP-3`) guardan
sus datos embebidos en su propio `hospitales[i].equiposResumen`/`ordenesResumen`, sin tocar
esos arrays. Varias funciones en `provider.js` bifurcan explícitamente por
`hospId === 'HOSP-1'` para saber de dónde leer — es un atajo de este mockup; un backend real
necesita un único modelo de datos para todos los hospitales.

**Deuda técnica conocida, no corregida en este pase** (documentada para que se sepa que
existe, no porque sea urgente arreglarla en el mockup):
- La secuencia `renderX(); renderY(); ...; updateNavBadges();` que sigue a casi toda
  mutación de datos está repetida (no extraída a un solo `refreshAll()`) en ~11 lugares
  distintos — al agregar una vista nueva hay que recordar añadirla a cada una.
- La apertura/cierre de los 9 modales sigue un patrón idéntico (`classList.add/remove` sobre
  un overlay) repetido función por función, en vez de una sola función genérica.
- El generador de folios (`'MC-' + String(seq++).padStart(4,'0')`) está inlineado en varios
  puntos en vez de un solo helper `nextFolio(prefijo, contador)`.

## Qué es simulado vs. lógica real

Este es un **mockup de demostración**, no una app en producción. En particular:

- No hay backend ni API: todo el "guardado" ocurre en memoria y se pierde al recargar
  (excepto la sesión de usuario, en `localStorage`).
- Varios indicadores en la vista **Indicadores** están marcados explícitamente en el código
  (comentarios `scope-note` / "dato ilustrativo") como valores fijos de ejemplo, no calculados
  a partir del historial real (p. ej. tasa de localización de equipos, tiempo promedio de
  respuesta, productividad de IMP por área).
- La validación de formularios es mínima; la mayoría de los campos vacíos se guardan con un
  valor por defecto (`—`) en vez de bloquear el guardado.
- El botón de notificaciones y el buscador global de la barra superior son decorativos (sin
  lógica conectada todavía).

## Próximos pasos

A partir de esta base, el trabajo continuará módulo por módulo (inventario, mantenimiento,
revisiones, correctivo, indicadores, portal de proveedor) según se vaya priorizando.
