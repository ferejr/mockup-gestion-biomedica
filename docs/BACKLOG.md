# Product Backlog Funcional — SimplicAI

> **Objetivo:** especificar funcionalmente SimplicAI para que pueda construirse desde cero.  
> **Fuente:** mockup actual del repositorio + decisiones funcionales documentadas en `docs/PRODUCT_DECISIONS.md`.  
> **Regla:** este documento define **qué debe hacer el producto y cómo se valida**, no cómo debe programarse.

## Convenciones

- **Must Have:** necesario para el flujo principal del producto.
- **Should Have:** importante, pero puede entrar después del núcleo funcional.
- **Could Have:** valor adicional no indispensable para el primer release.
- **Lista:** funcionalmente definida.
- **Bloqueada:** existe la necesidad, pero falta una decisión de producto antes de construirla.

## Tabla 1 — User Stories

| ID | Módulo | Persona | User Story | Prioridad | Estado |
|---|---|---|---|---|---|
| US-001 | Acceso y sesión | Usuario del sistema | Como usuario de la plataforma, quiero autenticarme con una identidad válida, para acceder de forma segura a las funciones correspondientes a mi rol. | Must Have | **Bloqueada:** falta definir el modelo de autenticación de producción. |
| US-002 | Acceso y sesión | Usuario del sistema | Como usuario autenticado, quiero conservar mi sesión al recargar la aplicación, para no tener que iniciar sesión nuevamente en cada recarga. | Should Have | Lista |
| US-003 | Acceso y sesión | Usuario del sistema | Como usuario autenticado, quiero cerrar sesión, para terminar mi acceso cuando deje de utilizar el sistema. | Must Have | Lista |
| US-004 | Acceso y sesión | Todas las personas | Como usuario autenticado, quiero ver únicamente los módulos y acciones permitidos para mi rol, para interactuar solo con funciones que me corresponden. | Must Have | Lista |
| US-005 | Navegación global | Todas las personas | Como usuario, quiero abrir una paleta de comandos global para encontrar módulos, acciones y registros disponibles para mi rol, para llegar rápidamente a lo que necesito. | Should Have | Lista |
| US-006 | Notificaciones | Todas las personas | Como usuario con pendientes, quiero consultar un centro de notificaciones cuyo contenido dependa de mi rol, para identificar acciones que requieren mi atención. | Should Have | Lista |
| US-007 | Notificaciones | Director / Coordinador / Técnico Biomédico | Como usuario hospitalario, quiero recibir al iniciar sesión un resumen breve de los pendientes relevantes para mi rol, para comenzar mi jornada sabiendo qué requiere atención. | Could Have | Lista |
| US-008 | Panel General | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero ver un resumen operativo de la flota, para conocer rápidamente el estado general de los equipos y pendientes. | Must Have | Lista |
| US-009 | Panel General | Técnico Biomédico | Como Técnico Biomédico, quiero ver un panel simplificado con mis revisiones pendientes y solicitudes abiertas, para concentrarme en mis actividades operativas. | Should Have | Lista |
| US-010 | Panel General | Todos los roles del hospital | Como usuario hospitalario, quiero ver la actividad reciente del día, para conocer qué revisiones y solicitudes se han registrado sin entrar a cada módulo. | Could Have | Lista |
| US-011 | Indicadores | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar indicadores calculados de cumplimiento preventivo, relación preventivo-correctivo, costos e inactividad, para evaluar el desempeño del mantenimiento. | Should Have | Lista |
| US-012 | Indicadores | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero ver la distribución real de órdenes por categoría de los últimos 30 días, para entender la composición de la carga correctiva. | Should Have | Lista |
| US-013 | Indicadores | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero ver la productividad real del programa de mantenimiento preventivo por área, para identificar diferencias de cumplimiento entre áreas. | Should Have | Lista |
| US-014 | Indicadores | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar el tiempo promedio de respuesta a las órdenes, para evaluar la oportunidad de atención. | Should Have | **Bloqueada:** falta definir si el tiempo termina en primera atención o en cierre. |
| US-015 | Indicadores | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar la tasa de localización de equipos, para conocer qué proporción del inventario puede ser localizada físicamente. | Could Have | **Bloqueada:** requiere definir primero el flujo de censo físico. |
| US-016 | Inventario | Todos los roles del hospital | Como usuario hospitalario, quiero consultar, buscar y filtrar el inventario de equipos, para localizar rápidamente un equipo específico. | Must Have | Lista |
| US-017 | Inventario | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero dar de alta un equipo con su información general y detallada, para incorporarlo al control de inventario y mantenimiento. | Must Have | Lista |
| US-018 | Inventario | Todos los roles del hospital | Como usuario hospitalario, quiero abrir la ficha de un equipo con información general, detallada, mantenimiento e historial, para consultar su contexto completo en un solo lugar. | Must Have | Lista |
| US-019 | Inventario | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero editar la información general y detallada de un equipo, para mantener su expediente actualizado. | Must Have | Lista |
| US-020 | Inventario | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero marcar un equipo como fuera de servicio, para dejar claro que no se encuentra operativo. | Must Have | Lista |
| US-021 | Inventario / Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero enviar un equipo a servicio desde su ficha o desde la programación de mantenimiento, para abrir una orden sin duplicar captura. | Must Have | Lista |
| US-022 | Inventario | Director Biomédico | Como Director Biomédico, quiero eliminar definitivamente un equipo después de confirmarlo, para retirar registros obsoletos o incorrectos. | Should Have | Lista |
| US-023 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar y ordenar la clasificación de riesgo de los equipos, para priorizar aquellos que requieren mayor atención. | Must Have | Lista |
| US-024 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero calcular y guardar el Número GE de un equipo, para determinar su inclusión y frecuencia dentro del programa preventivo. | Must Have | Lista |
| US-025 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar los vencidos, equipos sin historial y mantenimientos programados, y navegar el calendario por mes, para gestionar el backlog preventivo. | Must Have | Lista |
| US-026 | Programa de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero registrar un mantenimiento preventivo como realizado, para actualizar el historial y calcular la siguiente fecha objetivo. | Must Have | Lista |
| US-027 | Programa de Mantenimiento | Coordinador Biomédico | Como Coordinador Biomédico, quiero que el sistema genere automáticamente una orden de origen IMP programado cuando un mantenimiento se acerque a su fecha objetivo, para no depender de revisar manualmente el calendario. | Must Have | Lista |
| US-028 | Revisiones Diarias | Todos los roles del hospital | Como usuario hospitalario, quiero ver los equipos que requieren revisión diaria o semanal, para saber qué rutinas debo realizar. | Must Have | Lista |
| US-029 | Revisiones Diarias | Todos los roles del hospital | Como usuario hospitalario, quiero completar y guardar el checklist de un equipo, para dejar registrado quién realizó la revisión y cuándo. | Must Have | Lista |
| US-030 | Revisiones Diarias | Todos los roles del hospital | Como usuario hospitalario, quiero justificar cada punto no cumplido y asignar una urgencia antes de guardar una revisión incompleta, para que toda desviación quede explicada. | Must Have | Lista |
| US-031 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero que una revisión incompleta que envío genere una orden de mantenimiento, para dar seguimiento inmediato al hallazgo. | Must Have | Lista |
| US-032 | Revisiones Diarias | Técnico Biomédico | Como Técnico Biomédico, quiero que una revisión incompleta genere una solicitud pendiente de aprobación, para que un responsable valide el envío a mantenimiento. | Must Have | Lista |
| US-033 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero reabrir una revisión completada, para corregirla cuando sea necesario. | Could Have | Lista |
| US-034 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero solicitar la revisión de un equipo fuera de la rutina programada, para abrir una orden cuando detecte una necesidad puntual. | Must Have | Lista |
| US-035 | Revisiones Diarias | Todos los roles del hospital | Como usuario hospitalario, quiero consultar las solicitudes de revisión y su estado, para conocer qué casos siguen abiertos o ya fueron resueltos. | Should Have | Lista |
| US-036 | Revisiones Diarias | Técnico Biomédico | Como Técnico Biomédico, quiero solicitar que un equipo sea enviado a servicio indicando motivo y urgencia, para que un Director o Coordinador decida si debe abrirse una orden. | Must Have | Lista |
| US-037 | Revisiones Diarias | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero aprobar o rechazar solicitudes de servicio de los técnicos, para convertir las aprobadas en órdenes y dejar motivo en las rechazadas. | Must Have | Lista |
| US-038 | Revisiones Diarias | Técnico Biomédico | Como Técnico Biomédico, quiero consultar el estado de mis solicitudes, para saber si están pendientes, aprobadas, rechazadas o resueltas. | Should Have | Lista |
| US-039 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero consultar y buscar las órdenes de mantenimiento con sus contadores de urgencia y pendientes de validación, para controlar la carga activa. | Must Have | Lista |
| US-040 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero abrir el detalle de una orden con su origen, estado, técnico y bitácora, para comprender su historial completo. | Must Have | Lista |
| US-041 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero posponer una orden indicando motivo y nueva fecha, para registrar formalmente el aplazamiento sin perder la urgencia con la que fue reportada. | Should Have | Lista |
| US-042 | Órdenes de Mantenimiento | Director Biomédico / Coordinador Biomédico | Como Director o Coordinador Biomédico, quiero validar y cerrar una orden que el proveedor marcó como resuelta, para completar formalmente el ciclo de mantenimiento. | Must Have | Lista |
| US-043 | Portal de Proveedor — Panel General | Proveedor de Servicio | Como Proveedor de Servicio, quiero ver KPIs consolidados de mis hospitales cliente, para conocer el estado global de mi cartera. | Must Have | Lista |
| US-044 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio, quiero ver mis hospitales cliente con su estado de contrato, modelo de servicio y carga operativa, para evaluar rápidamente cada cuenta. | Must Have | Lista |
| US-045 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio, quiero registrar un nuevo hospital con sus datos generales, contrato y modelo de servicio, para incorporarlo a mi cartera. | Must Have | Lista |
| US-046 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio, quiero consultar el detalle de un hospital con información general, equipos y órdenes, para revisar el contexto completo del cliente. | Must Have | Lista |
| US-047 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio, quiero configurar la anticipación con la que se generan las órdenes IMP programadas de cada hospital, para adaptar la planeación preventiva al cliente. | Should Have | Lista |
| US-048 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio de un hospital Gestionado por SimplicAI, quiero dar de alta y editar equipos del hospital, para operar su inventario en nombre del cliente. | Must Have | Definida; el mockup no la aplica de forma completa. |
| US-049 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio de un hospital Gestionado por SimplicAI, quiero crear órdenes de servicio para ese hospital, para operar el mantenimiento en nombre del cliente cuando sea necesario. | Must Have | Definida; el mockup no la aplica de forma completa. |
| US-050 | Portal de Proveedor — Hospitales | Proveedor de Servicio | Como Proveedor de Servicio, quiero que mis capacidades sobre cada hospital se ajusten a su modelo de servicio contratado, para no realizar acciones que correspondan al cliente en un hospital autogestionado. | Must Have | Definida; permisos pendientes de aplicación completa. |
| US-051 | Portal de Proveedor — Órdenes | Proveedor de Servicio | Como Proveedor de Servicio, quiero consultar y buscar todas las órdenes de todos mis hospitales cliente, para tener visibilidad de todo el trabajo en curso. | Must Have | Lista |
| US-052 | Portal de Proveedor — Órdenes | Técnico Biomédico de Proveedor | Como Técnico Biomédico de Proveedor, quiero ver únicamente las órdenes asignadas a mí, para concentrarme en mi propia carga de trabajo. | Must Have | Lista |
| US-053 | Portal de Proveedor — Órdenes | Proveedor de Servicio | Como Proveedor de Servicio, quiero asignar o reasignar un técnico a una orden, para dejar clara la responsabilidad de atención. | Must Have | Lista |
| US-054 | Portal de Proveedor — Órdenes | Proveedor de Servicio / Técnico Biomédico de Proveedor | Como usuario del proveedor que atiende una orden, quiero guardar notas de diagnóstico y costo estimado sin cerrarla, para registrar el avance del servicio. | Should Have | Lista |
| US-055 | Portal de Proveedor — Órdenes | Proveedor de Servicio / Técnico Biomédico de Proveedor | Como usuario del proveedor que atiende una orden, quiero marcarla como resuelta con un diagnóstico o solución, para enviarla al hospital a validación. | Must Have | Lista |
| US-056 | Portal de Proveedor — Órdenes | Proveedor de Servicio / Técnico Biomédico de Proveedor | Como usuario del proveedor, quiero consultar la bitácora completa de una orden, para mantener trazabilidad de sus cambios y responsables. | Should Have | Lista |

## Tabla 2 — Acceptance Criteria

| User Story ID | Escenario | Given | When | Then |
|---|---|---|---|---|
| US-001 | Autenticación válida | El usuario dispone de una identidad válida y activa | Intenta autenticarse | El sistema valida su identidad y abre la experiencia correspondiente a su rol. |
| US-001 | Autenticación inválida | La identidad o credenciales no son válidas | Intenta autenticarse | El sistema rechaza el acceso y muestra un mensaje de error sin iniciar sesión. |
| US-001 | Decisión pendiente | Se construirá la versión de producción | Se implemente esta historia | El Product Owner ya definió el mecanismo de autenticación antes de considerarla terminada. |
| US-002 | Recarga con sesión activa | El usuario ya inició sesión y su sesión sigue vigente | Recarga la aplicación | Continúa dentro de la experiencia autorizada sin volver a autenticarse. |
| US-002 | Sesión no vigente | No existe una sesión válida | Abre o recarga la aplicación | Se le solicita autenticación. |
| US-003 | Cerrar sesión | El usuario está autenticado | Selecciona cerrar sesión | La sesión termina y el sistema vuelve a la pantalla de acceso. |
| US-004 | Rol hospitalario | Un usuario hospitalario inicia sesión | Carga la aplicación | Solo ve los módulos y acciones permitidos para su rol. |
| US-004 | Rol proveedor | Un usuario del proveedor inicia sesión | Carga la aplicación | Accede al portal de proveedor con el alcance correspondiente a su rol. |
| US-004 | Acción no permitida | Una acción no pertenece al rol del usuario | Navega por la aplicación | Esa acción no está disponible para él. |
| US-004 | Director / Coordinador | Un Director o Coordinador Biomédico inicia sesión | Carga la app hospitalaria | Tiene acceso a Panel General, Inventario, Programa de Mantenimiento, Revisiones Diarias y Órdenes de Mantenimiento. |
| US-004 | Técnico hospitalario | Un Técnico Biomédico inicia sesión | Carga la app hospitalaria | Tiene acceso a Panel General, Inventario y Revisiones Diarias, sin Programa de Mantenimiento ni Órdenes de Mantenimiento. |
| US-004 | Proveedor de Servicio | Un Proveedor de Servicio inicia sesión | Carga el portal | Tiene acceso a Panel General, Mis Hospitales y Órdenes de Servicio. |
| US-004 | Técnico de proveedor | Un Técnico Biomédico de Proveedor inicia sesión | Carga el portal | Tiene acceso únicamente a Mis Órdenes de Servicio. |
| US-005 | Abrir paleta | El usuario está dentro de la plataforma | Usa Ctrl/⌘+K o el acceso de la barra superior | Se abre la paleta de comandos. |
| US-005 | Contenido por rol | La paleta está abierta | Muestra resultados | Solo incluye módulos, acciones y registros que el rol puede abrir. |
| US-005 | Buscar sin acentos | Existe un registro con caracteres acentuados | Busca el término equivalente sin acentos | El registro puede encontrarse. |
| US-005 | Sin coincidencias | Ningún elemento coincide con la búsqueda | Escribe el término | Se muestra un estado vacío explícito. |
| US-005 | Tipos de resultado | La paleta está abierta | El usuario busca o explora comandos | Puede encontrar módulos, acciones, equipos, órdenes, solicitudes y, en el portal del Proveedor de Servicio, hospitales. |
| US-005 | Navegación por teclado | La paleta está abierta | Usa flechas, Enter o Escape | Puede recorrer resultados, abrir el seleccionado o cerrar la paleta sin usar el mouse. |
| US-006 | Contador | Existen notificaciones activas para el usuario | Se muestra la barra superior | La campana muestra el número de notificaciones activas. |
| US-006 | Contenido por rol | El usuario abre la campana | Se despliega el centro de notificaciones | Solo aparecen eventos que corresponden a su rol y alcance. |
| US-006 | Navegar desde notificación | Existe una notificación vinculada a un registro | El usuario la selecciona | El sistema navega al elemento correspondiente. |
| US-006 | Sin pendientes | No existen notificaciones activas | El usuario abre el centro | Se muestra un estado vacío y no aparece contador. |
| US-006 | Director / Coordinador | Existen órdenes urgentes, aprobaciones pendientes u órdenes resueltas por proveedor | El Director o Coordinador abre notificaciones | Ve únicamente los eventos hospitalarios que requieren su atención. |
| US-006 | Técnico hospitalario | Una solicitud propia cambió de estado | El Técnico abre notificaciones | Ve el resultado de sus propias solicitudes y no pendientes de otros usuarios. |
| US-006 | Proveedor de Servicio | Se genera una nueva orden en un hospital cliente o el hospital valida y cierra una orden resuelta por el proveedor | Abre notificaciones | Ve el evento con hospital, equipo y folio, y puede abrir la orden. |
| US-006 | Técnico de proveedor — asignación | Una orden es asignada o reasignada al técnico | Abre notificaciones | Ve la orden dentro de sus propios eventos. |
| US-006 | Técnico de proveedor — desasignación | Una orden que tenía asignada se reasigna a otra persona o se desasigna | Abre notificaciones | Ve que ya no tiene esa orden asignada. |
| US-006 | Técnico de proveedor — cierre | El hospital valida y cierra una orden que el técnico atendió | Abre notificaciones | Ve el cierre de esa orden. |
| US-006 | Exclusión técnico de proveedor | Existen eventos de órdenes que el técnico nunca atendió | Abre notificaciones | Esos eventos no aparecen. |
| US-007 | Director / Coordinador | Un Director o Coordinador inicia sesión con equipos fuera de servicio, emergencias, IMP vencidos o aprobaciones pendientes | Termina el acceso | Recibe un resumen de esas condiciones. |
| US-007 | Técnico | Un Técnico Biomédico inicia sesión | Termina el acceso | Recibe su porcentaje de cumplimiento del checklist del día. |
| US-008 | Resumen operativo | Un Director o Coordinador abre Panel General | Carga el resumen | Ve equipos registrados, incluidos en IMP, revisiones pendientes, solicitudes abiertas, equipos críticos y distribución por clasificación. |
| US-009 | Vista simplificada | Un Técnico Biomédico abre Panel General | Carga el resumen | Ve revisiones pendientes y solicitudes abiertas, sin los paneles de clasificación reservados a coordinación. |
| US-010 | Actividad disponible | Hoy se completaron revisiones o registraron solicitudes | Abre Panel General | Esos eventos aparecen en Actividad reciente. |
| US-010 | Sin actividad | No hay actividad registrada hoy | Abre Panel General | Se muestra un estado vacío. |
| US-011 | Indicadores principales | Un Director o Coordinador abre la pestaña Indicadores | El sistema carga los datos | Muestra valores calculados de cumplimiento IMP, preventivo vs. correctivo, costo de mantenimiento e inactividad. |
| US-011 | Restricción por rol | Un Técnico Biomédico usa el sistema | Abre Panel General | La pestaña Indicadores no está disponible. |
| US-012 | Cálculo real | Existen órdenes dentro y fuera de los últimos 30 días | Se muestra la distribución por categoría | El indicador se calcula solo con las órdenes del periodo y no con valores fijos. |
| US-013 | Productividad por área | Existen equipos del programa preventivo en distintas áreas y mantenimientos realizados | Se muestra la productividad IMP | El porcentaje de cada área se calcula con datos reales del programa y sus cumplimientos. |
| US-014 | Definición requerida | Existen marcas de tiempo de creación y eventos de la orden | Se calcula el tiempo promedio de respuesta | El cálculo utiliza el hito final definido por Producto de manera consistente para todas las órdenes. |
| US-015 | Dependencia de censo | El indicador requiere saber si cada equipo fue encontrado físicamente | Se pretende calcular la tasa de localización | Solo puede considerarse implementado cuando exista un flujo de censo que registre encontrado/no encontrado, fecha y responsable. |
| US-016 | Listado | Existen equipos registrados | El usuario abre Inventario | Ve el inventario con identificación, ubicación, categoría, estado, GE y clasificación. |
| US-016 | Buscar | El usuario está en Inventario | Busca por nombre, folio o serie | Solo se muestran coincidencias. |
| US-016 | Filtrar | El usuario selecciona área, categoría, estado o clasificación | Aplica uno o varios criterios | Se muestran solo los equipos que cumplen todos los criterios. |
| US-016 | Sin resultados | Ningún equipo coincide | Se actualiza la tabla | Se muestra un estado vacío. |
| US-017 | Alta exitosa | Un Director o Coordinador captura al menos el nombre del equipo | Guarda el alta | El equipo se crea operativo y queda disponible para inventario y clasificación. |
| US-017 | Información detallada | El formulario de alta está abierto | Captura accesorios, manuales, garantía o vida útil | Esa información queda guardada en la ficha del equipo. |
| US-017 | Listas múltiples | Se capturan accesorios o manuales | Agrega o quita entradas | Puede mantener múltiples elementos antes de guardar. |
| US-017 | Nombre requerido | No se capturó nombre | Intenta guardar | El equipo no se crea y el sistema solicita el dato. |
| US-018 | Abrir ficha | El usuario ve un equipo en Inventario o Mantenimiento | Selecciona el equipo | Se abre su ficha en la pestaña General. |
| US-018 | Navegar ficha | La ficha está abierta | Cambia entre General, Detallada, Mantenimiento e Historial | Se muestra la información correspondiente. |
| US-019 | Editar | Un Director o Coordinador abre la edición de un equipo | Modifica y guarda sus datos | La ficha refleja la información general y detallada actualizada. |
| US-019 | Nombre requerido | El nombre queda vacío | Intenta guardar | El cambio no se aplica y el sistema solicita el nombre. |
| US-019 | Cambio de categoría | Se cambia un equipo entre equipo médico y TI/Activo | Se guardan los cambios | Su participación en las rutinas de revisión se ajusta a la nueva categoría. |
| US-020 | Confirmar fuera de servicio | Un equipo no está ya fuera de servicio | Un Director o Coordinador confirma deshabilitarlo | Su estado cambia a Fuera de servicio y el evento queda registrado. |
| US-020 | Cancelar | Se solicita confirmación | El usuario cancela | El estado no cambia. |
| US-021 | Desde ficha | Un equipo no está ya en mantenimiento | Un Director o Coordinador lo envía a servicio desde su ficha y confirma | Se crea una orden vinculada y el equipo pasa a En mantenimiento. |
| US-021 | Desde programación | El equipo aparece en el calendario preventivo | Se envía a servicio desde esa vista | Se crea la misma clase de orden sin volver a capturar el equipo. |
| US-021 | Cancelar | Se solicita confirmación | El usuario cancela | No se crea orden ni cambia el estado. |
| US-022 | Eliminar | Un Director Biomédico abre un equipo | Confirma eliminarlo | El registro y sus elementos asociados dejan de formar parte del sistema. |
| US-022 | Sin permiso | Un Coordinador abre la ficha | Revisa las acciones disponibles | No puede eliminar el equipo. |
| US-023 | Ver clasificación | Existen equipos registrados | El Director o Coordinador abre Programa de Mantenimiento | Ve su clasificación, GE, último y próximo mantenimiento. |
| US-023 | Ordenar | Está viendo la tabla | Selecciona una columna ordenable | Los equipos se reordenan según ese criterio. |
| US-024 | Calcular GE | El usuario selecciona un equipo y asigna función, aplicación clínica, mantenimiento y antecedentes | Modifica los valores | El sistema muestra el total, inclusión y frecuencia resultantes. |
| US-024 | Guardar GE | Existe un cálculo para un equipo seleccionado | Guarda la clasificación | El GE y la frecuencia quedan reflejados en las vistas relacionadas. |
| US-024 | Sin equipo | No hay equipo seleccionado | Intenta guardar | No se aplica ningún cambio. |
| US-025 | KPIs preventivos | Existen equipos con diferentes fechas e historial | Abre Programa de Mantenimiento | Ve los contadores de vencidos, sin historial y programados este mes. |
| US-025 | Navegar meses | Está viendo un mes del calendario | Avanza o retrocede | Ve los equipos cuyo próximo preventivo corresponde al mes seleccionado. |
| US-025 | Mes vacío | No hay mantenimientos programados para el mes | Se carga la programación | Se muestra un estado vacío. |
| US-026 | Registrar realizado | Un equipo tiene un mantenimiento preventivo programado | Un Director o Coordinador confirma que fue realizado | Se agrega el evento al historial y se recalcula la siguiente fecha. |
| US-026 | Cancelar | Se solicita confirmación | El usuario cancela | No cambia el historial ni la próxima fecha. |
| US-027 | Generar por anticipación | Un equipo incluido en el programa entra en la ventana de anticipación configurada para su hospital | El sistema evalúa la programación | Existe una orden abierta con origen IMP programado. |
| US-027 | Evitar duplicados | Ya existe una orden IMP abierta para el mismo equipo y ciclo | Se vuelve a evaluar la programación | No se crea una segunda orden. |
| US-027 | Excluir no aplicables | Un equipo no pertenece al programa preventivo o es TI/Activo | Se evalúa la programación | No se genera una orden IMP. |
| US-027 | Trazabilidad | El sistema genera una orden automáticamente | Se consulta su historial | Queda identificado que fue creada por el sistema. |
| US-028 | Agrupación | El usuario abre Revisiones Diarias | Carga el checklist | Los equipos aparecen agrupados según su frecuencia diaria o semanal. |
| US-028 | Excluir TI | Existe un registro clasificado como TI/Activo | Se generan las rutinas | No aparece como equipo biomédico a revisar. |
| US-029 | Completar revisión | El usuario marca todos los puntos del checklist | Guarda la revisión | Queda registrada como completada con usuario y hora. |
| US-029 | Bloquear edición | Una revisión del día ya fue guardada | Vuelve a verla | No puede modificarse salvo que un rol autorizado la reabra. |
| US-030 | Pendientes justificados | Hay puntos sin marcar | El usuario intenta guardar | Debe capturar un motivo por cada punto pendiente y seleccionar una urgencia. |
| US-030 | Motivo faltante | Falta el motivo de al menos un punto | Intenta confirmar | La revisión no se envía. |
| US-031 | Orden automática | Un Director o Coordinador confirma una revisión incompleta con motivos y urgencia | Guarda | Se crea inmediatamente una orden vinculada al equipo. |
| US-032 | Solicitud de aprobación | Un Técnico Biomédico confirma una revisión incompleta | Guarda | Se crea una solicitud pendiente de aprobación en lugar de una orden directa. |
| US-033 | Reabrir | Una revisión fue completada hoy | Un Director o Coordinador selecciona reabrir | El checklist vuelve a ser editable y deja de figurar como completado. |
| US-034 | Solicitar revisión | Un Director o Coordinador selecciona equipo, tipo, descripción y urgencia | Envía la solicitud | Se registra la solicitud y se crea una orden vinculada. |
| US-034 | Datos obligatorios | Falta equipo o descripción | Intenta enviar | La solicitud no se crea. |
| US-035 | Seguimiento | Existen solicitudes de revisión | El usuario abre la pestaña correspondiente | Ve cada solicitud con su estado y, cuando aplique, quién la resolvió y cuándo. |
| US-035 | Sin solicitudes | No existen solicitudes | Abre la pestaña | Se muestra un estado vacío. |
| US-036 | Solicitar servicio | Un Técnico selecciona equipo, motivo y urgencia | Envía la solicitud | Queda pendiente de aprobación por Director o Coordinador. |
| US-036 | Datos obligatorios | Falta equipo o motivo | Intenta enviar | No se crea la solicitud. |
| US-037 | Aprobar | Existe una solicitud pendiente | Un Director o Coordinador la aprueba | Se crea la orden correspondiente y la solicitud queda aprobada. |
| US-037 | Rechazar | Existe una solicitud pendiente | La rechaza e indica un motivo | Queda rechazada y se conserva el motivo. |
| US-037 | Cancelar rechazo | Inició el rechazo | Cancela sin confirmar | La solicitud permanece pendiente. |
| US-038 | Estado propio | El Técnico ha enviado solicitudes | Abre Mis solicitudes | Ve si cada una está pendiente, aprobada, rechazada o resuelta y la información asociada. |
| US-039 | Listado y contadores | Existen órdenes | Un Director o Coordinador abre Órdenes de Mantenimiento | Ve la tabla y los contadores por urgencia sobre el total correspondiente. |
| US-039 | Buscar | Está viendo la tabla | Escribe folio, equipo o técnico | La tabla se filtra inmediatamente sin alterar los contadores totales. |
| US-039 | Pendientes de validar | Existen órdenes Resuelto por proveedor | Abre la vista | Aparece un aviso con el número pendiente de validación. |
| US-040 | Detalle | Un Director o Coordinador selecciona una orden | Abre su detalle | Ve origen, categoría, estado, fecha, técnico, información reportada y bitácora. |
| US-041 | Posponer | Una orden no está cerrada ni ya pospuesta | Un Director o Coordinador captura motivo y nueva fecha y confirma | La orden queda marcada como pospuesta con la reprogramación y la decisión registrada. |
| US-041 | Preservar urgencia original | Una orden se pospone | Se registra el aplazamiento | Se conserva la urgencia original con la que fue reportada. |
| US-041 | Datos obligatorios | Falta motivo o nueva fecha | Intenta confirmar | La orden no se pospone. |
| US-041 | Proveedor sin permiso | Un usuario del proveedor abre la orden | Revisa sus acciones | No puede posponerla. |
| US-042 | Validar y cerrar | Una orden está Resuelto por proveedor | Un Director o Coordinador confirma el trabajo y opcionalmente agrega comentario | La orden pasa a Cerrada y se registra la validación. |
| US-042 | Restaurar equipo | El equipo está En mantenimiento y no tiene otra orden abierta | Se cierra la orden | El equipo vuelve a Operativo. |
| US-042 | Cerrar solicitud relacionada | La orden nació de una solicitud de revisión | La orden se cierra | La solicitud vinculada queda resuelta. |
| US-042 | Registrar preventivo | La orden corresponde a IMP programado o envío desde el programa preventivo | El hospital la cierra | Se registra el mantenimiento preventivo y se recalcula la próxima fecha. |
| US-043 | KPIs consolidados | El Proveedor de Servicio abre su Panel General | Carga la vista | Ve hospitales activos, equipos gestionados, órdenes abiertas/por validar/cerradas, tiempo de resolución y contratos próximos a renovación. |
| US-043 | Carga por hospital | Existen órdenes abiertas en varios hospitales | Carga el panel | Puede ver cómo se distribuye la carga entre hospitales. |
| US-044 | Tarjetas de hospital | Existen hospitales cliente | El Proveedor abre Mis Hospitales | Cada hospital muestra su estado contractual, modelo de servicio, equipos y órdenes abiertas. |
| US-045 | Alta de hospital | El Proveedor captura al menos el nombre y los datos disponibles del hospital | Confirma el alta | El hospital se incorpora a la cartera y puede abrirse su detalle. |
| US-045 | Nombre obligatorio | No se capturó nombre | Intenta registrar | El hospital no se crea. |
| US-046 | Detalle por pestañas | El Proveedor de Servicio abre un hospital cliente | Carga el detalle | Puede consultar Información general, Equipos y Órdenes de servicio. |
| US-046 | Regresar | Está en el detalle de un hospital | Selecciona volver | Regresa al listado cuando su rol tiene acceso a él. |
| US-047 | Configurar anticipación | El Proveedor administra la configuración de un hospital | Cambia los días de anticipación IMP y guarda | Ese valor se usa para determinar cuándo se generan las órdenes IMP del hospital. |
| US-047 | Valor por defecto | No existe una configuración específica | Se evalúa el IMP programado | Se utiliza el valor por defecto definido por el producto. |
| US-048 | Gestionado | Un hospital tiene modelo Gestionado por SimplicAI | El Proveedor opera su inventario | Puede dar de alta y editar equipos de ese hospital. |
| US-048 | Autogestionado | Un hospital tiene modelo Autogestionado | El Proveedor consulta sus equipos | Puede verlos pero no dar de alta ni editarlos. |
| US-049 | Crear orden gestionada | El hospital tiene modelo Gestionado por SimplicAI | El Proveedor reporta una necesidad de servicio para un equipo | Puede crear una orden para ese hospital. |
| US-049 | No crear en autogestionado | El hospital tiene modelo Autogestionado | El Proveedor consulta sus acciones | No dispone de la creación de órdenes en nombre del hospital. |
| US-050 | Permisos por modelo | El Proveedor abre un hospital | El sistema determina su modelo de servicio | Las acciones disponibles corresponden a la matriz definida: ver equipos/órdenes y resolver/asignar en ambos modelos; alta/edición de equipos y creación de órdenes solo en Gestionado por SimplicAI. |
| US-051 | Todas las órdenes | El Proveedor de Servicio abre Órdenes de Servicio | Carga la vista | Ve las órdenes de todos sus hospitales cliente y los contadores de urgencia. |
| US-051 | Buscar | Está en la tabla | Busca por folio, hospital, equipo o técnico | La lista se filtra dentro de su alcance. |
| US-051 | Sin coincidencias | La búsqueda no devuelve resultados | Se actualiza la tabla | Se muestra un estado vacío. |
| US-052 | Solo asignadas | Un Técnico de Proveedor abre Mis Órdenes de Servicio | Carga la vista | Solo aparecen las órdenes cuyo técnico asignado es él. |
| US-052 | Sin órdenes | No tiene órdenes asignadas | Abre la vista | Se muestra un estado vacío. |
| US-053 | Asignar | El Proveedor abre una orden | Selecciona un técnico o la deja sin asignar | La asignación se actualiza y queda registrada en la bitácora. |
| US-053 | Técnico sin permiso | Un Técnico de Proveedor abre una orden | Consulta el técnico asignado | Lo ve como información de solo lectura. |
| US-054 | Guardar avance | Una orden está abierta o en proceso | Un usuario del proveedor guarda notas y/o costo estimado | El avance se conserva sin cerrar la orden. |
| US-054 | Pasar a proceso | La orden estaba Abierta | Se guardan notas por primera vez | La orden pasa a En proceso. |
| US-054 | Costo inválido | Se captura un costo negativo o no válido | Se guarda | Ese valor no se registra como costo estimado. |
| US-055 | Resolver | El usuario del proveedor capturó un diagnóstico o solución | Marca la orden como resuelta | Cambia a Resuelto por proveedor y queda pendiente de validación hospitalaria. |
| US-055 | Diagnóstico requerido | El diagnóstico está vacío | Intenta resolver | La orden no cambia de estado. |
| US-055 | Trazabilidad | Se resuelve la orden | Se registra el cambio | Quedan guardados responsable y fecha. |
| US-056 | Bitácora | Una orden tiene eventos registrados | Un usuario autorizado abre su detalle | Ve cada evento con fecha, responsable y descripción. |
| US-056 | Sin eventos | Una orden no tiene eventos | Abre el detalle | Se muestra un estado vacío de bitácora. |

## Pendientes de producto que bloquean historias

1. **Autenticación de producción — bloquea US-001.** Falta decidir el modelo funcional: credenciales individuales, SSO, 2FA u otra combinación.
2. **Tiempo promedio de respuesta — bloquea US-014.** Falta decidir qué evento termina el tiempo: primera atención del técnico o cierre de la orden.
3. **Tasa de localización — bloquea US-015.** Antes debe definirse el flujo funcional de censo físico de inventario (qué se revisa, quién registra, cómo se marca encontrado/no encontrado y cómo se cierra un censo).

El razonamiento y las opciones consideradas para cada una viven en [`docs/PRODUCT_DECISIONS.md`](PRODUCT_DECISIONS.md), bajo **OPEN PRODUCT DECISION**.

## Reglas funcionales transversales

- La urgencia de una orden se fija al reportarla; posponerla no reevalúa esa urgencia original.
- El proveedor no puede posponer órdenes; esa decisión corresponde al hospital.
- Los equipos clasificados como **TI / Activo** no forman parte del programa preventivo biomédico ni de las rutinas biomédicas.
- El proveedor marca una orden como **Resuelto por proveedor** y el hospital es quien la valida y cierra.
- Un Técnico Biomédico hospitalario no abre órdenes directamente: cuando requiere servicio genera una solicitud que debe ser aprobada por Director o Coordinador.
- Las capacidades del Proveedor de Servicio sobre un hospital dependen del `modeloServicio`: **Gestionado por SimplicAI** o **Autogestionado**.
- Las User Stories de este documento son independientes de la arquitectura y tecnología elegidas para construir el producto.

El razonamiento detrás de cada una de estas reglas vive en [`docs/PRODUCT_DECISIONS.md`](PRODUCT_DECISIONS.md).
