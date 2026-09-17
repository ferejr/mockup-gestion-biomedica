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
(doble clic o `file://`). Todos los datos son de ejemplo y viven en memoria (`js/app.js`);
se reinician al recargar la página, excepto la sesión de usuario, que se guarda en
`localStorage` para no tener que volver a iniciar sesión en cada recarga.

## Estructura de carpetas

```
/
├── index.html          Shell HTML: <head>, todo el markup de vistas/modales, y las
│                        referencias a css/js externos.
├── css/
│   └── styles.css        Todos los estilos (variables de diseño, componentes, layout).
├── js/
│   └── app.js             Datos de ejemplo + toda la lógica de la app (una sola vista SPA
│                          con secciones mostradas/ocultadas por JS, sin router real).
├── legacy/
│   └── mockup-gestion-equipos-medicos.html
│                          Snapshot histórico de una versión anterior y más simple del
│                          mockup (sin login, sin roles, sin portal de proveedor). Se
│                          conserva solo como referencia — no tiene funcionalidad que no
│                          esté ya cubierta por index.html. No se sigue desarrollando.
└── README.md            Este archivo.
```

Esta versión (`index.html` + `css/` + `js/`) fue reestructurada a partir de un único
archivo HTML de ~4,460 líneas: la separación es puramente física (mover el CSS y el JS a
sus propios archivos) — no se cambió ninguna lógica ni comportamiento al hacerlo.

## Mapa de vistas / módulos

La app tiene dos "aplicaciones" independientes que se muestran una u otra según el usuario
que inicia sesión (ver [Roles y usuarios de prueba](#roles-y-usuarios-de-prueba)):

### App hospitalaria (`.app`, secciones `id="view-*"`)

| Vista | id | Descripción |
|---|---|---|
| Panel General | `view-dashboard` | KPIs (equipos registrados, incluidos en el programa de mantenimiento preventivo, revisiones pendientes, solicitudes abiertas), equipos críticos, distribución por clasificación de riesgo GE, actividad reciente. |
| Inventario | `view-inventario` | Tabla filtrable/buscable de equipos; alta de equipo; acceso al detalle (drawer). |
| Programa de Mantenimiento | `view-mantenimiento` | Tabla de clasificación de riesgo (Número GE), calendario de mantenimiento preventivo navegable mes a mes. |
| Revisiones Diarias | `view-revisiones` | Checklists diarios/semanales por equipo, solicitudes de revisión, cola de aprobaciones (coordinador/admin), seguimiento de solicitudes propias (técnico). |
| Órdenes de Mantenimiento | `view-correctivo` | Órdenes correctivas con niveles de urgencia, flujo de doble validación (proveedor resuelve → hospital confirma y cierra). |
| Indicadores | `view-indicadores` | Cumplimiento de programa preventivo, tiempos de respuesta, costos, preventivo vs. correctivo. Varios paneles están marcados explícitamente en el código como **datos ilustrativos**, no calculados en tiempo real (ver [Qué es simulado](#qué-es-simulado-vs-lógica-real)). |

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

## Modelo de datos (en `js/app.js`)

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
