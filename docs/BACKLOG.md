# SimplicAI — Product Backlog (funcional)

Este documento es la **fuente oficial y única** del Product Backlog de SimplicAI: el
inventario completo de User Stories vigentes, sus Acceptance Criteria, prioridades, personas
y los Pendientes por definir. Describe **qué debe hacer el software y cómo se valida**, nunca
cómo construirlo — no contiene arquitectura, tecnología, APIs, base de datos ni instrucciones
de implementación.

A partir de esta revisión, este archivo sustituye cualquier otra copia del backlog (incluido
el documento de trabajo usado para construirlo por primera vez, que queda congelado como
referencia histórica). Toda actualización futura del backlog se hace aquí:

1. Ante un cambio funcional, se revisa primero si pertenece a una User Story existente; se
   actualiza esa historia y sus Acceptance Criteria si es así.
2. Se crea una User Story nueva únicamente cuando el cambio representa una necesidad
   funcional distinta.
3. Los IDs existentes se conservan siempre (trazabilidad); una historia nueva usa el
   siguiente ID disponible y nunca reutiliza uno retirado o absorbido por una fusión anterior.
4. Una ambigüedad funcional que no pueda resolverse con el comportamiento actual o una
   decisión ya documentada se agrega a **Pendientes por definir**; al resolverse, se retira de
   ahí y pasa a **Registro de resoluciones**.

**Última sincronización:** contra `main` en el commit `02c5e79` (incluye hasta la extensión
del centro de notificaciones al portal de proveedor). Cobertura verificada: 51 User Stories
vigentes (US-001–US-062, con IDs no consecutivos donde hubo fusiones), sin funcionalidad
implementada en el repositorio que quede sin representar aquí.

---

## Tabla 1 — User Stories

| ID | Módulo | Persona | User Story | Prioridad |
| --- | --- | --- | --- | --- |
| US-001 | Acceso y Sesión | Usuario del sistema | As a user, I want to log in from the landing page with my user and the team password (with clear feedback if it fails), so that I can access the module for my role. | Must Have |
| US-004 | Acceso y Sesión | Usuario del sistema | As a user, I want my session to stay active after reloading, so that I don't have to log in again each time. | Should Have |
| US-005 | Acceso y Sesión | Usuario del sistema | As a user, I want to log out of SimplicAI, so that I can end my session on a shared device. | Must Have |
| US-006 | Acceso y Sesión | Todas las personas | As a user, I want to see only the modules and actions for my role, so that I only interact with relevant functionality. | Must Have |
| US-007 | Acceso y Sesión | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want login notifications about equipment issues, emergencies, overdue maintenance and pending approvals, so that I immediately know what needs attention. | Should Have |
| US-008 | Acceso y Sesión | Técnico Biomédico | As a Técnico, I want to see my daily checklist completion percentage at login, so that I know how much of my routine is pending. | Should Have |
| US-009 | Panel General | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want an operational summary on Panel General (KPIs, critical equipment and risk distribution), so that I get a full overview of the equipment fleet. | Must Have |
| US-010 | Panel General | Técnico Biomédico | As a Técnico, I want a simplified panel with only pending reviews and open requests, so that I can focus on my daily follow-up. | Should Have |
| US-012 | Panel General | Todos los roles del hospital | As a hospital user, I want a recent activity timeline, so that I know what happened today without navigating to each module. | Could Have |
| US-013 | Panel General | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want an "Indicadores" tab with compliance, preventive-vs-corrective ratio, cost and downtime metrics, so that I can evaluate maintenance performance. | Should Have |
| US-014 | Inventario | Todos los roles del hospital | As a hospital user, I want to view and filter/search the equipment inventory, so that I can quickly find specific equipment. | Must Have |
| US-016 | Inventario | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to add new equipment to the inventory, including its warranty, estimated useful life, accessories and manuals, so that its record is complete from the start. | Must Have |
| US-017 | Inventario | Todos los roles del hospital | As a hospital user, I want to open an equipment's detail view (general, detailed, maintenance, history), so that I can review everything about it in one place. | Must Have |
| US-018 | Inventario | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to edit an equipment's information, including its warranty, useful life, accessories and manuals, so that I can keep its record accurate over time. | Must Have |
| US-019 | Inventario | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to mark an equipment as "Fuera de servicio", so that it's clearly flagged as not operating. | Must Have |
| US-020 | Inventario | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to send an equipment to service from its record or from the maintenance schedule, so that a maintenance order opens for it. | Must Have |
| US-021 | Inventario | Director Biomédico | As a Director, I want to permanently delete an equipment, so that obsolete records don't remain in the system. | Should Have |
| US-022 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want a sortable equipment risk classification table, so that I can prioritize which equipment needs attention. | Must Have |
| US-023 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to classify an equipment with the GE calculator and save the result, so that its program inclusion and maintenance frequency are set. | Must Have |
| US-025 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to see and browse the monthly preventive maintenance schedule with overdue/no-history/due-this-month KPIs, so that I know how urgent the preventive backlog is. | Should Have |
| US-027 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to register a preventive maintenance as completed, so that the system recalculates the next due date. | Must Have |
| US-029 | Revisiones Diarias | Todos los roles del hospital | As a hospital user, I want to check off and save my daily/weekly routine checklist, so that it's recorded who reviewed each equipment and when. | Must Have |
| US-031 | Revisiones Diarias | Todos los roles del hospital | As a hospital user, I want to be required to justify any unchecked checklist item and pick an urgency, so that incomplete reviews are always explained. | Must Have |
| US-032 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want an incomplete checklist I submit to open a maintenance order automatically, so that the issue is tracked without extra steps. | Must Have |
| US-033 | Revisiones Diarias | Técnico Biomédico | As a Técnico, I want an incomplete checklist I submit to create a pending approval request instead, so that a coordinator or director validates it first. | Must Have |
| US-034 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to reopen a completed checklist, so that I can correct it if needed. | Could Have |
| US-035 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to request a review of a specific equipment outside the routine checklist, so that a maintenance order opens for it. | Must Have |
| US-036 | Revisiones Diarias | Todos los roles del hospital | As a hospital user, I want to see review requests with their status, so that I can track what's still pending. | Should Have |
| US-037 | Revisiones Diarias | Técnico Biomédico | As a Técnico, I want to request that an equipment be sent to service, so that a coordinator or director can approve it. | Must Have |
| US-038 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to approve or reject pending technician requests, so that approved ones generate an order and rejected ones record a reason. | Must Have |
| US-040 | Revisiones Diarias | Técnico Biomédico | As a Técnico, I want to see the status of my own submitted requests, so that I know what happened to each one. | Should Have |
| US-041 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to see, search and validate corrective orders (urgency KPIs, text search, pending-validation alert), so that I know the workload and don't miss orders to close. | Must Have |
| US-043 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to open an order's detail with its origin, status, technician and audit log, so that I understand its full history. | Must Have |
| US-044 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to confirm and close an order the provider resolved, so that the maintenance cycle is formally closed. | Must Have |
| US-045 | Portal de Proveedor — Panel General | Proveedor de Servicio | As a Proveedor, I want a consolidated panel of all my client hospitals (KPIs and open-orders distribution per hospital), so that I get an overview of my whole portfolio. | Must Have |
| US-047 | Portal de Proveedor — Mis Hospitales | Proveedor de Servicio | As a Proveedor, I want to see a card per client hospital with its contract status and service model, so that I can quickly assess each account. | Must Have |
| US-048 | Portal de Proveedor — Mis Hospitales | Proveedor de Servicio | As a Proveedor, I want to register a new client hospital, so that it becomes part of my managed portfolio. | Must Have |
| US-049 | Portal de Proveedor — Mis Hospitales | Proveedor de Servicio / Técnico Biomédico de Proveedor | As a provider-side user, I want a hospital's detail view (info, equipment, orders tabs), so that I can review everything about that client in one place. | Must Have |
| US-050 | Portal de Proveedor — Órdenes de Servicio | Proveedor de Servicio | As a Proveedor, I want to see and search all service orders from all my client hospitals with urgency KPIs, so that I have full visibility of the work in progress. | Must Have |
| US-051 | Portal de Proveedor — Órdenes de Servicio | Técnico Biomédico de Proveedor | As a Técnico de Proveedor, I want to see only the orders assigned to me, so that I can focus on my own workload. | Must Have |
| US-052 | Portal de Proveedor — Órdenes de Servicio | Proveedor de Servicio | As a Proveedor, I want to assign or reassign a technician to an order, so that responsibility is clear. | Must Have |
| US-053 | Portal de Proveedor — Órdenes de Servicio | Proveedor de Servicio / Técnico Biomédico de Proveedor | As a provider-side user, I want to save diagnosis notes and an estimated cost without closing the order, so that progress is recorded before the work is finished. | Should Have |
| US-054 | Portal de Proveedor — Órdenes de Servicio | Proveedor de Servicio / Técnico Biomédico de Proveedor | As a provider-side user, I want to mark an order as resolved with a required diagnosis, so that the hospital is notified it must validate and close it. | Must Have |
| US-055 | Portal de Proveedor — Órdenes de Servicio | Proveedor de Servicio / Técnico Biomédico de Proveedor | As a provider-side user, I want to see an order's full audit log, so that there's a traceable record of the service process. | Should Have |
| US-056 | Barra Superior — Búsqueda y Notificaciones | Todas las personas | As a user, I want a command palette (Ctrl/⌘ K) to search records and jump to any module or action, so that I stop navigating blind. | Should Have |
| US-057 | Barra Superior — Búsqueda y Notificaciones | Todas las personas | As a user, I want a notification panel under the bell —with content matched to my role, including order events for the provider-side roles—, so that I don't depend only on login-time toasts. | Should Have |
| US-058 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want to postpone an open order with a mandatory reason and new date, so that the delay is a recorded decision, not an order left open unexplained. | Must Have |
| US-059 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want preventive-maintenance orders to open automatically as their due date approaches, so that the program runs without someone having to watch the calendar. | Should Have |
| US-060 | Portal de Proveedor — Mis Hospitales | Proveedor de Servicio | As a Proveedor, I want to set and edit how many days in advance "IMP programado" orders open for each hospital, so that I can tune it per client. | Could Have |
| US-061 | Panel General | Director Biomédico / Coordinador Biomédico | As a Director/Coordinador, I want "Órdenes por categoría (30 días)" and "Productividad de IMP por área" to be calculated from real data instead of fixed illustrative values, so that the Indicadores tab is fully trustworthy. | Should Have |
| US-062 | Portal de Proveedor — Mis Hospitales | Proveedor de Servicio | As a Proveedor, I want my capabilities on a client hospital (creating orders, adding/editing equipment) to depend on its contracted service model ("Gestionado por SimplicAI" vs. "Autogestionado"), so that I only act where I'm actually responsible. | Could Have |

---

## Tabla 2 — Acceptance Criteria

| User Story ID | Escenario | Given | When | Then |
| --- | --- | --- | --- | --- |
| US-001 | Ingresar desde la landing page | The user is on the SimplicAI landing page | They click "Acceder a SimplicAI" | The landing page is hidden and the login screen is shown |
| US-001 | Login exitoso | The user is on the login screen | They select a valid user, enter the correct team password and submit | The corresponding application opens, showing the default view for that role |
| US-001 | Contraseña incorrecta | The user is on the login screen with a user selected | They enter an incorrect password and submit | The message "Usuario o contraseña incorrectos. Intenta de nuevo." is shown and the user stays on the login screen |
| US-001 | Ningún usuario seleccionado | The user is on the login screen | They enter a password without selecting a user and submit | The same error message is shown |
| US-004 | Recargar con sesión activa | A user has already logged in successfully | They reload the page | They are taken directly to their application without seeing the login screen again |
| US-004 | Recargar sin sesión previa | No user has logged in | The page loads | The login screen (or landing page) is shown |
| US-005 | Cerrar sesión | A logged-in user is inside the hospital app or the provider portal | They click "Cerrar sesión" | The session is cleared, the app is hidden, and the login screen is shown empty |
| US-006 | Técnico Biomédico inicia sesión | A Técnico Biomédico logs in | The app loads | Only "Panel General", "Inventario" and "Revisiones Diarias" are visible; "Programa de Mantenimiento" and "Órdenes de Mantenimiento" are hidden |
| US-006 | Director/Coordinador inicia sesión | A Director or Coordinador Biomédico logs in | The app loads | All hospital modules are visible |
| US-006 | Proveedor de Servicio inicia sesión | A Proveedor de Servicio logs in | The app loads | The provider portal opens showing Panel General, Mis Hospitales and Órdenes de Servicio |
| US-006 | Técnico de Proveedor inicia sesión | A Técnico Biomédico de Proveedor logs in | The app loads | Only "Órdenes de Servicio" (labeled "Mis Órdenes de Servicio") is visible; "Panel General" and "Mis Hospitales" are hidden |
| US-007 | Hay elementos que requieren atención | A Director/Coordinador logs in with pending issues, emergencies, overdue maintenance or requests | The login completes | A sequence of toast notifications summarizes each condition |
| US-007 | Nada requiere atención adicional | A Director/Coordinador logs in with nothing pending | The login completes | Only the daily checklist completion percentage toast is shown |
| US-008 | Notificación de cumplimiento | A Técnico Biomédico logs in | The login completes | A toast shows the percentage of today's checklist completed |
| US-009 | Ver resumen general | A Director/Coordinador is on Panel General | The "Resumen" tab is active | KPI cards show equipos registrados, incluidos en IMP, revisiones pendientes y solicitudes abiertas |
| US-009 | Ver equipos críticos y distribución | A Director/Coordinador is on Panel General | The Resumen tab loads | "Equipos críticos" lists the highest-GE equipment, and "Distribución por clasificación" shows counts by frequency |
| US-010 | Vista reducida para técnico | A Técnico Biomédico is on Panel General | The "Resumen" tab is shown | Only "Revisiones pendientes hoy" and "Solicitudes abiertas" cards are visible; classification detail panels are hidden |
| US-012 | Actividad del día | At least one checklist was completed or a request submitted today | Panel General loads | Those events appear in "Actividad reciente" |
| US-012 | Sin actividad | No checklist completed and no request submitted today | Panel General loads | The message "Aún no hay actividad registrada hoy..." is shown |
| US-013 | Cambiar a Indicadores | A Director/Coordinador is on Panel General | They click the "Indicadores" tab | Compliance %, preventive-vs-corrective ratio, cost and downtime are shown |
| US-013 | Técnico no ve Indicadores | A Técnico Biomédico is on Panel General | The page loads | The "Indicadores" tab is not visible |
| US-014 | Listado completo | A hospital user opens "Inventario" | The view loads | The table lists every registered equipment with name, folio/serie, ubicación, categoría, estado, puntaje GE y clasificación |
| US-014 | Filtrar por texto | The user is on Inventario | They type part of a name, folio or serial into the search box | Only matching rows remain |
| US-014 | Filtrar por combinación de criterios | The user is on Inventario | They select área, categoría, estado y/o clasificación | Only equipment matching all selected filters is shown |
| US-014 | Sin resultados | The user applies filters that match no equipment | The table refreshes | An empty-state message "Sin resultados" is shown |
| US-016 | Alta exitosa | A Director/Coordinador opens "Agregar equipo" and fills in at least the name | They click "Agregar equipo" | The equipment is added with status "Operativo", the modal closes, and a confirmation toast is shown |
| US-016 | Nombre obligatorio | The "Agregar equipo" modal is open | The user clicks "Agregar equipo" without a name | The message "Indica el nombre del equipo" is shown and nothing is created |
| US-016 | Cancelar alta | The modal is open with data entered | The user clicks "Cancelar" | The modal closes and no equipment is added |
| US-016 | Captura de ficha detallada al dar de alta | The "Agregar equipo" modal is open | The user adds one or more accesorios/manuales as chips and enters garantía and vida útil estimada, then confirms | The equipment is created with exactly those accesorios, manuales, garantía and vida útil values |
| US-016 | Alta sin datos detallados | The modal is open with only the required name filled | The user confirms without accesorios, manuales, garantía or vida útil | The equipment is created with empty accessory/manual lists, garantía "Sin registrar." and no vida útil value — never a hardcoded default |
| US-017 | Abrir ficha de equipo | The user is on Inventario or Programa de Mantenimiento | They click on an equipment row | The detail drawer opens on the "General" tab |
| US-017 | Navegar entre pestañas del drawer | The drawer is open | The user clicks "Detallada", "Mantenimiento" or "Historial" | The corresponding content is shown |
| US-017 | Cerrar la ficha | The drawer is open | The user clicks the close icon, clicks outside, or presses Escape | The drawer closes |
| US-018 | Edición exitosa | A Director/Coordinador opens "Editar" and changes fields | They click "Guardar cambios" | The equipment's info updates, the drawer refreshes, and a confirmation toast is shown |
| US-018 | Nombre obligatorio al editar | The "Editar equipo" modal is open | The user clears the name and clicks "Guardar cambios" | The message "Indica el nombre del equipo" is shown and the change is not saved |
| US-018 | Editar ficha detallada | An equipment's "Editar" modal is open | The user adds or removes accesorio/manual chips and updates garantía y vida útil, then saves | Those changes are saved and the drawer's "Detallada" tab reflects exactly what was captured |
| US-019 | Confirmar deshabilitación | A Director/Coordinador opens a drawer for equipment not already "Fuera de servicio" | They click "Deshabilitar" and confirm | The status changes to "Fuera de servicio" and is recorded in its history |
| US-019 | Cancelar deshabilitación | The confirmation prompt is shown | The user cancels it | The status remains unchanged |
| US-020 | Confirmar envío a servicio desde Inventario | A Director/Coordinador opens a drawer for equipment not already "En mantenimiento" | They click "Enviar a servicio" and confirm | The status changes to "En mantenimiento" and a new corrective order is created and linked to it |
| US-020 | Confirmar envío a servicio desde Programa de Mantenimiento | A Director/Coordinador is viewing the preventive schedule for equipment not already "En mantenimiento" | They click "Enviar a servicio" in that row and confirm | The same corrective order creation and status change occur, as from the Inventario drawer |
| US-020 | Cancelar envío a servicio | The confirmation prompt is shown (from either entry point) | The user cancels it | No order is created and the status remains unchanged |
| US-021 | Confirmar eliminación | A Director Biomédico opens a drawer | They click "Eliminar" and confirm | The equipment and related checklists, requests and orders are removed, and the drawer closes |
| US-021 | Coordinador sin acceso a eliminar | A Coordinador Biomédico opens a drawer | The drawer loads | No "Eliminar" action is available |
| US-022 | Ordenar por puntaje GE | A Director/Coordinador is on Programa de Mantenimiento | They click the "GE" column header | The table sorts by GE score, toggling ascending/descending on repeated clicks |
| US-023 | Clasificar un equipo | A Director/Coordinador opens "Calcular Número GE" | They select an equipment and choose valores for función, aplicación, mantenimiento y antecedentes | The resulting GE total, classification and frequency are shown immediately |
| US-023 | Guardar exitosamente | The GE calculator shows a result for a selected equipment | The user clicks "Guardar clasificación" | The equipment's GE values update and reflect in Programa de Mantenimiento, Inventario y Panel General |
| US-023 | Sin equipo seleccionado | The GE calculator is open without an equipment selected | The user clicks "Guardar clasificación" | The message "Selecciona un equipo para guardar" is shown and nothing is saved |
| US-025 | Ver contadores | A Director/Coordinador is on Programa de Mantenimiento | The view loads | "Vencidos", "Sin historial" y "Programados este mes" show counts based on classification and history |
| US-025 | Avanzar de mes | The user is viewing the current month's schedule | They click the next-month arrow | The table shows equipment whose next preventive maintenance falls in that month |
| US-025 | Volver al mes actual | The user has navigated to a future month | They click "Volver a este mes" | The table returns to the current month's view |
| US-025 | Mes sin mantenimientos programados | The user navigates to a month with no equipment due | The table refreshes | An empty-state message indicates nothing is scheduled for that month |
| US-027 | Confirmar registro | A Director/Coordinador is viewing the preventive schedule | They click "Registrar realizado" and confirm | A preventive event is added to the equipment's history and its next due date is recalculated |
| US-027 | Cancelar registro | The confirmation prompt is shown | The user cancels it | No event is added and the next due date does not change |
| US-029 | Ver ambos grupos | A hospital user opens Revisiones Diarias | The "Checklist del día" tab is active | Alto/Medio-risk equipment appear under "Revisión diaria" and Bajo-risk under "Revisión semanal" |
| US-029 | Completar todos los puntos | A checklist card shows all items unchecked | The user checks every item and clicks "Guardar revisión" | The card is marked completed with the current user and time shown, and edits are disabled until reopened |
| US-031 | Guardar con puntos sin marcar | The user clicks "Guardar revisión" with at least one item unchecked | The "Revisión con puntos pendientes" modal opens | A reason field is required per unchecked item and an urgency level must be selected before continuing |
| US-031 | Motivo faltante | The "puntos pendientes" modal is open | The user submits leaving any reason field empty | The message "Indica el motivo de cada punto pendiente" is shown and nothing is submitted |
| US-032 | Generación automática de orden | A Director/Coordinador submits a checklist with justified pending items | They confirm the modal | A new corrective order is created immediately with the selected urgency |
| US-033 | Generación de solicitud de aprobación | A Técnico Biomédico submits a checklist with justified pending items | They confirm the modal | A pending approval request (folio AP-####) is created instead of an order |
| US-034 | Reabrir revisión completada | A checklist card is marked completed today | A Director/Coordinador clicks "Reabrir revisión" | The checklist becomes editable again and its completion state is cleared |
| US-035 | Enviar solicitud completa | A Director/Coordinador opens "Solicitar revisión de equipo" and fills tipo, descripción y urgencia | They click "Enviar solicitud" | A review request (folio SR-####) is created, a linked order opens automatically, and the equipment goes to "En mantenimiento" if it was operational |
| US-035 | Campos obligatorios | The modal is open | The user submits without an equipment or without a description | A validation message is shown and the request is not created |
| US-036 | Ver listado con estado | There are existing review requests | The user opens "Solicitudes de revisión" | Each card shows its status and, if resolved, who validated it and when |
| US-036 | Sin solicitudes | No review request has been submitted | The tab is opened | An empty-state message invites the user to use "Solicitar revisión de equipo" |
| US-037 | Enviar solicitud | A Técnico Biomédico opens "Solicitar envío a servicio" and fills motivo y urgencia | They click "Enviar solicitud" | A pending approval request is created, awaiting coordinator approval |
| US-037 | Campos obligatorios | The modal is open | The technician submits without an equipment or without a motivo | A validation message is shown and nothing is created |
| US-038 | Aprobar | A Director/Coordinador is on "Aprobaciones pendientes" with a Pendiente request | They click "Aprobar" and confirm | A new order is created and linked; the request's status changes to "Aprobada" |
| US-038 | Rechazar con motivo | A pending request is shown | The user clicks "Rechazar" and enters a reason | The request's status changes to "Rechazada" and the reason is stored |
| US-038 | Cancelar el rechazo | The rejection prompt is open | The user cancels it without entering text | The request remains "Pendiente" |
| US-040 | Ver estado propio | A Técnico Biomédico has submitted requests | They open "Mis solicitudes" | Each shows pending, approved (with resulting order folio), or rejected (with reason) |
| US-041 | Ver tabla y contadores | A Director/Coordinador opens "Órdenes de Mantenimiento" | The view loads | The table lists every corrective order and KPI cards show open-order counts per urgency category |
| US-041 | Hay órdenes por validar | At least one order has status "Resuelto por proveedor" | A Director/Coordinador opens Órdenes de Mantenimiento | A banner shows how many orders are pending validation |
| US-041 | Ninguna orden por validar | No order has status "Resuelto por proveedor" | The view loads | The banner is hidden |
| US-041 | Buscar por texto | The user is on Órdenes de Mantenimiento | They type part of a folio, equipo or técnico into the search box | Only matching rows remain; the urgency KPI counters keep showing the real, unfiltered totals |
| US-041 | Sin coincidencias de búsqueda | The search text matches no order | The table refreshes | An empty-state message "Sin coincidencias" is shown |
| US-043 | Abrir orden | A Director/Coordinador clicks a row in Órdenes de Mantenimiento | The modal opens | It shows origin, category, status, report date, assigned technician, and the full audit log |
| US-044 | Validar y cerrar | An order has status "Resuelto por proveedor" and a Director/Coordinador opens it | They optionally add a comment and click "Confirmar que se realizó y cerrar" | The order's status changes to "Cerrada", the equipment returns to "Operativo" if no other orders are open, and a linked review request is marked "Resuelta" |
| US-044 | Sin permisos para validar | A Técnico Biomédico opened an order with status "Resuelto por proveedor" (via a direct action outside the restricted module) | The modal loads | No validation button is shown, only a message that only Director/Coordinador can confirm and close it |
| US-045 | Ver KPIs consolidados | A Proveedor de Servicio opens the provider "Panel General" | The view loads | It shows hospitales activos, equipos bajo gestión, órdenes abiertas/por validar/cerradas, tiempo promedio de resolución y contratos por vencer |
| US-045 | Ver carga por hospital | The provider Panel General loads | "Órdenes abiertas por hospital" renders | Each hospital shows a bar proportional to its current open orders |
| US-047 | Ver listado | A Proveedor de Servicio opens "Mis Hospitales" | The view loads | Each hospital appears as a card with type, contract status, service model, equipment count and open-orders count |
| US-048 | Registrar hospital exitosamente | A Proveedor de Servicio opens "Dar de alta nuevo hospital" and enters at least the name | They click "Dar de alta" | The hospital is added with empty equipment/order lists, the modal closes, and its detail view opens automatically |
| US-048 | Nombre obligatorio | The modal is open | The user clicks "Dar de alta" without a name | The message "Indica el nombre del hospital" is shown and no hospital is created |
| US-049 | Ver pestañas de detalle | A provider-side user opens a hospital's card | The detail view loads | "Información general", "Equipos" y "Órdenes de servicio" tabs are available with that hospital's data |
| US-049 | Volver al listado | The user is viewing a hospital's detail | They click "Volver a Mis Hospitales" | They return to the hospital cards list |
| US-050 | Ver todas las órdenes | A Proveedor de Servicio opens "Órdenes de Servicio" | The view loads | The table lists orders from every client hospital with urgency-category KPI counters |
| US-050 | Buscar por texto | A Proveedor de Servicio is on Órdenes de Servicio | They type part of a folio, hospital, equipo or técnico into the search box | Only matching rows remain |
| US-050 | Búsqueda respeta el alcance del rol | A Técnico Biomédico de Proveedor searches on Órdenes de Servicio | They type a matching term | Only their own assigned orders that match are shown |
| US-050 | Sin coincidencias de búsqueda | The search text matches no order | The table refreshes | An empty-state message is shown |
| US-051 | Ver solo asignadas | A Técnico Biomédico de Proveedor opens "Mis Órdenes de Servicio" | The view loads | Only orders assigned to them are shown, and the heading reflects "Mis Órdenes de Servicio" |
| US-051 | Sin órdenes asignadas | The technician has no orders assigned | The view loads | The message "No tienes órdenes asignadas por el momento." is shown |
| US-052 | Asignar o reasignar | A Proveedor de Servicio opens an order's detail | They select a technician (or "Sin asignar") | The assigned technician updates immediately and the change is logged in the audit trail |
| US-052 | Técnico de proveedor no puede reasignar | A Técnico Biomédico de Proveedor opens an order's detail | The modal loads | The assigned technician is shown as read-only text, not an editable dropdown |
| US-053 | Guardar avance | A provider-side user enters diagnosis notes and/or cost on an open order | They click "Guardar notas" | The notes/cost are saved, and an "Abierta" order changes to "En proceso" |
| US-054 | Resolver con diagnóstico | A provider-side user has entered diagnosis notes | They click "Marcar como resuelto" | The order's status changes to "Resuelto por proveedor", the resolving user/date are recorded, and a message says the hospital must validate it |
| US-054 | Diagnóstico obligatorio | The diagnosis field is empty | The user clicks "Marcar como resuelto" | The message "Describe el diagnóstico o la solución antes de marcarla como resuelta" is shown and the order is not marked resolved |
| US-055 | Consultar historial de eventos | An order has logged events | Its detail modal is opened | The "Bitácora de la orden" section lists each event with date, time, user and description |
| US-055 | Orden sin eventos | An order has no logged events | Its detail modal is opened | The message "Sin eventos registrados en la bitácora." is shown |
| US-056 | Abrir con atajo de teclado | The user has a session started, anywhere in either application | They press Ctrl+K (or ⌘K) | The command palette opens with focus on its search input |
| US-056 | Abrir con el botón de la barra | The user is in either app | They click the "Buscar o ir a…" button | The palette opens the same way as with the keyboard shortcut |
| US-056 | Estado inicial sin escribir | The palette just opened | No text has been typed | It shows the "Ir a" (allowed modules) and "Acciones" (allowed actions) groups as a starting point |
| US-056 | Navegación por teclado | The palette is open with results listed | The user presses ↓/↑, then Enter, then Esc on a later open | The highlighted result moves and wraps at the ends; Enter opens the highlighted result; Esc closes the palette |
| US-056 | Búsqueda ignora acentos | The palette is open | The user types "endoscopia" | Results including "Endoscopía" are shown |
| US-056 | Resultados limitados al rol | A Técnico Biomédico opens the palette | They search | No "Órdenes de Mantenimiento" module, action or order record appears, since their role can't open that module |
| US-056 | Sin coincidencias | The palette is open | The typed text matches nothing | An explicit empty-state message is shown |
| US-056 | Funciona en el portal de proveedor | A Proveedor de Servicio or Técnico de Proveedor opens the palette from the provider portal | They search | It offers that app's own modules, actions (e.g. "Dar de alta un hospital") and records (hospitales, órdenes de servicio) |
| US-057 | Ver contador | There's at least one urgent open order or a pending item for the user's role | The hospital app loads or data changes | The bell shows a numeric badge (capped at "9+") |
| US-057 | Abrir el panel | The user clicks the bell | The panel opens | It lists each notification with what happened and which folio/equipo it refers to |
| US-057 | Navegar desde una notificación | The panel is open | The user clicks a notification | They're taken to the relevant module and the specific order or request tab |
| US-057 | Contenido según el rol | A Técnico Biomédico opens the panel | It renders | They see only their own resolved/rejected/approved requests, never other users' pending approvals |
| US-057 | Sin pendientes | Nothing is pending for the user | The panel opens | It shows an empty state ("Todo al día") and the badge is hidden |
| US-057 | Cerrar el panel | The panel is open | The user clicks outside the topbar or presses Escape | The panel closes |
| US-057 | Proveedor — nueva orden de servicio | A Proveedor de Servicio has a session open | A new service order becomes "Abierta" for any of their client hospitals | The bell panel lists it as "Nueva orden de servicio", naming the hospital, equipo and folio |
| US-057 | Proveedor — orden validada y cerrada | A Proveedor de Servicio has a session open | A hospital confirms and closes an order the provider had marked "Resuelto por proveedor" | The bell panel lists it as "Orden validada y cerrada por el hospital" |
| US-057 | Proveedor ve toda la cartera, no solo lo asignado | A Proveedor de Servicio has a session open | The panel renders | It includes matching orders from every client hospital, regardless of which technician is assigned |
| US-057 | Técnico de Proveedor — orden asignada o reasignada a él | A Técnico Biomédico de Proveedor has a session open | An order's current assigned technician is him (initial assignment or a later reassignment to him) | The bell panel lists it as "Orden asignada a ti" |
| US-057 | Técnico de Proveedor — orden reasignada a otro técnico | An order's bitácora shows he was once the assigned technician and a later event reassigns it to someone else, or unassigns it | He opens the bell panel | It lists that order as "Ya no tienes esta orden asignada", but only while it isn't currently assigned back to him |
| US-057 | Técnico de Proveedor — orden que atendió fue cerrada | An order currently assigned to him has been confirmed and closed by the hospital | He opens the bell panel | It lists that order as "El hospital validó y cerró tu orden" |
| US-057 | Técnico de Proveedor no ve eventos de otras órdenes | A Técnico Biomédico de Proveedor has a session open | The panel renders | It never includes an order he has no history with, even if it belongs to one of the provider's hospitals |
| US-058 | Acción visible solo para roles autorizados | A Director/Coordinador opens a non-closed order that isn't already "Pospuesta" | The order detail modal loads | A "Posponer" button is shown; for other roles, or a closed/already-postponed order, it is not |
| US-058 | Campos obligatorios | The "Posponer orden" modal is open | The user confirms without a motivo or without a new date | A validation message is shown and nothing is saved |
| US-058 | Confirmar aplazamiento | Motivo and nueva fecha are filled in | The user clicks "Posponer orden" | The order's category changes to "Pospuesta", the reprogrammed date and reason are stored, the original urgency is preserved separately, and the event is logged in the audit trail |
| US-058 | Reflejo inmediato | An order was just postponed | The Órdenes de Mantenimiento view refreshes | The "Pospuesta" KPI counter reflects the change immediately |
| US-058 | Sigue siendo resoluble | An order has category "Pospuesta" | The provider later resolves it and the hospital validates it | It can still be closed through the normal flow |
| US-059 | Generación automática | An equipment in the preventive program is within its hospital's configured anticipation window of its next due date | The application loads | An open order with origin "IMP programado" exists for that equipment |
| US-059 | Sin duplicados | An equipment already has an open "IMP programado" order | The generator runs again | No second "IMP programado" order is created for it (other open orders of a different origin do not block a new one) |
| US-059 | Excluye equipo fuera del programa | An equipment is classified "N" (not included) or is category "TI / Activo" | The generator runs | It never creates an "IMP programado" order for that equipment |
| US-059 | Registro en bitácora | An "IMP programado" order was auto-created | Its detail is viewed | Its audit trail records it as created by the system, not by a person |
| US-059 | Ventana configurable por hospital | A hospital has its own anticipation-window value | The generator evaluates that hospital's equipment | It uses that hospital's value instead of the platform default |
| US-060 | Definir al dar de alta un hospital | A Proveedor de Servicio is on "Dar de alta nuevo hospital" | They set the "Anticipación de órdenes IMP" field, or leave it at its default | The new hospital is created with that value |
| US-060 | Editar en un hospital existente | A Proveedor de Servicio is viewing a hospital's "Información general" tab | They change the "Anticipación de órdenes IMP" value | It's saved immediately and a confirmation toast is shown |
| US-060 | Valor inválido | The field is being edited | The user enters a negative or non-numeric value | A validation message is shown and the previous value is kept |
| US-061 | Órdenes por categoría (30 días) calculado en vivo | The Indicadores tab is open | It loads | The "Órdenes de mantenimiento por categoría" chart reflects the real distribution of orders opened in the last 30 days, not a fixed value |
| US-061 | Productividad de IMP por área calculado en vivo | The Indicadores tab is open | It loads | The "Productividad de IMP por área" bars reflect completed preventive inspections against the program's equipment per area, not a fixed value |
| US-062 | Hospital "Gestionado por SimplicAI" | A hospital's modeloServicio is "Gestionado por SimplicAI" | A Proveedor de Servicio views that hospital | They can view/edit its equipment, create orders and assign technicians, the same as hospital staff would |
| US-062 | Hospital "Autogestionado" | A hospital's modeloServicio is "Autogestionado" | A Proveedor de Servicio views that hospital | They can view its equipment/orders and resolve orders assigned to them, but cannot add/edit equipment or create new orders |

---

## Pendientes por definir

Solo quedan **3 decisiones funcionales abiertas**. Ninguna tiene ya un comportamiento
implementado o un flujo alternativo que la resuelva.

### 1. Modelo de autenticación

El login usa una sola contraseña de equipo compartida entre los 5 usuarios de prueba, sin
credenciales individuales. Se consideraron tres opciones, ninguna decidida:

| Opción | A favor | En contra |
| --- | --- | --- |
| Credenciales por persona + recuperación | Modelo estándar, control total, trazabilidad real por usuario | Hay que construir y mantener recuperación de contraseña, política de contraseñas, bloqueos |
| Lo anterior + segundo factor (2FA) | Relevante si hay información clínica sensible o requisitos regulatorios del hospital | Fricción para personal operativo que entra varias veces al día |
| SSO del directorio del hospital | Sin contraseñas nuevas para el personal; altas y bajas las controla el hospital | Depende de la infraestructura de cada cliente; complica el modelo "Gestionado por SimplicAI" |

La trazabilidad de la bitácora de cada orden depende de esta decisión: hoy registra un
nombre de usuario como texto libre; con autenticación real debería apuntar a una identidad
verificada.

### 2. Indicadores ilustrativos restantes

De los 4 indicadores que antes eran valores fijos, 2 ya se resolvieron (ver US-061). Quedan
sin resolver:

- **Tiempo promedio de respuesta.** Falta decidir qué marca el fin del tiempo medido: la
  primera atención del técnico, o el cierre de la orden. Son dos métricas distintas y la
  elección cambia el número.
- **Tasa de localización de equipos.** Bloqueado: no es calculable con el modelo de datos
  actual. Requiere definir antes un flujo completo de censo de inventario físico (recorridos
  donde se marca cada equipo como encontrado o no encontrado, con fecha y responsable) que
  hoy no existe en absoluto.

### 3. Capacidades del proveedor según el modelo de servicio — implementación pendiente

US-062 ya define qué puede hacer el proveedor según `modeloServicio` de cada hospital, pero
esa historia todavía no está implementada: hoy ese campo no gobierna ningún permiso real, y
los hospitales de ejemplo (distintos del hospital principal) siguen siendo de solo lectura en
el portal de proveedor. Falta decidir cuándo se prioriza su construcción.

---

## Registro de resoluciones

Decisiones funcionales que estuvieron abiertas y ya se resolvieron, para trazabilidad:

- **Búsqueda global y centro de notificaciones** — resuelto con la paleta de comandos
  (US-056) y el centro de notificaciones (US-057, incluida su extensión al portal de
  proveedor).
- **Categoría "Pospuesta" y origen "IMP programado" sin flujo que los generara** — resuelto
  con "Posponer una orden" (US-058) y la generación automática de órdenes "IMP programado"
  con anticipación configurable por hospital (US-059, US-060).
- **Ficha detallada del equipo sin formulario de alta o edición** — resuelto: accesorios,
  manuales, garantía y vida útil ya se capturan en el alta y la edición del equipo (US-016,
  US-018). Los manuales se capturan como referencia de texto, no como archivo adjunto — subir
  archivos requeriría almacenamiento que el mockup no tiene; queda documentado por si se
  revisita para el producto real.
- **Tablas de órdenes sin filtros propios** — resuelto: tanto Órdenes de Mantenimiento
  (hospital) como Órdenes de Servicio (proveedor) tienen búsqueda por texto (US-041, US-050).
- **Recategorización de la urgencia de una orden** — resuelto como regla de negocio
  intencional, no como una funcionalidad faltante: la urgencia se fija al reportar la orden y
  no se reasigna después. Posponer una orden (US-058) es un concepto de aplazamiento aparte:
  cambia la categoría a "Pospuesta" pero conserva la urgencia original con la que se reportó,
  precisamente para no romper esta regla.
