# Product Decisions — SimplicAI

Este documento conserva las **decisiones de producto y su razonamiento**: por qué SimplicAI
se comporta como se describe en [`docs/BACKLOG.md`](BACKLOG.md). No repite las User Stories
ni sus Acceptance Criteria — para eso está el backlog. Aquí vive el "por qué", y las
decisiones que todavía no se han tomado.

---

## Decisiones resueltas

### Búsqueda global y navegación

Se reemplazó el buscador original (una lista desplegable que solo encontraba registros) por
una paleta de comandos: además de encontrar registros, ofrece los módulos y las acciones que
el rol de quien la usa tiene disponibles. La paleta responde "¿a dónde voy?", no solo "¿qué
existe?". *(Ver US-005.)*

### Centro de notificaciones — alcance por rol

El centro de notificaciones muestra, además de las órdenes urgentes abiertas, lo que cada rol
tiene pendiente:

- **Director / Coordinador Biomédico:** aprobaciones esperando su decisión, y órdenes
  "Resuelto por proveedor" esperando su validación.
- **Técnico Biomédico:** el resultado de sus propias solicitudes (aprobadas, rechazadas o
  resueltas).
- **Proveedor de Servicio:** administra la cartera completa de hospitales cliente, así que ve
  eventos de **todos** ellos (una nueva orden de servicio, o una orden que el hospital validó
  y cerró) — no solo lo "asignado a él personalmente".
- **Técnico Biomédico de Proveedor:** solo eventos de sus propias órdenes — que se le asigne
  o reasigne una, que una que tenía se reasigne a otro técnico, o que el hospital valide y
  cierre una que él atendió.

Quedan **fuera de alcance por decisión consciente** (no por olvido): checklists sin
completar, vencimientos del programa preventivo (se atienden por la generación automática de
órdenes "IMP programado", ver abajo), SLA, contratos, costos, recordatorios por tiempo e
indicadores. *(Ver US-006.)*

### Posponer una orden de mantenimiento

Solo el Director o el Coordinador Biomédico pueden posponer una orden — el proveedor no
puede. Motivo y nueva fecha son obligatorios para confirmar el aplazamiento. Una orden
pospuesta sigue siendo válida para resolverse y cerrarse por el flujo normal. *(Ver US-041.)*

### La urgencia de una orden se fija al reportarla

Es una **regla de negocio intencional**, no un vacío del producto: una vez creada la orden,
su categoría de urgencia (Regular / Urgente / Urgente emergencia) no se recategoriza después.

**Razonamiento:** la urgencia refleja la evaluación al momento del reporte. Permitir
cambiarla después distorsionaría cualquier indicador de tiempo de respuesta por urgencia,
porque no se sabría contra qué criterio se midió originalmente. Si la situación de un equipo
cambia, eso se documenta en la bitácora de la orden, o se abre una orden nueva con la
urgencia correcta.

Posponer una orden (arriba) es un concepto distinto de aplazamiento, no una recategorización:
por eso al posponerla se **conserva la urgencia con la que fue reportada originalmente**, en
vez de reevaluarla.

### Generación automática de órdenes "IMP programado"

El sistema abre automáticamente una orden con origen "IMP programado" cuando un equipo del
programa preventivo entra en la ventana de anticipación configurada para su hospital — un
parámetro con valor por defecto, ajustable por hospital, no un número único fijo para todos.
No se duplican órdenes para el mismo equipo y ciclo. Los equipos fuera del programa preventivo
(clasificación GE "N", y los de categoría "TI / Activo") nunca generan estas órdenes.

En el producto real, esta evaluación debe ejecutarse de forma periódica e independiente de
que alguien tenga la aplicación abierta — a diferencia del mockup, donde solo puede evaluarse
cuando alguien la carga. *(Ver US-027, US-047.)*

### Captura de la ficha detallada del equipo

Accesorios, manuales, garantía y vida útil estimada se capturan tanto en el alta como en la
edición del equipo; accesorios y manuales admiten múltiples entradas (agregar/quitar). Se
decidió que los manuales se registren como una **referencia de texto**, no como un archivo
adjunto real — adjuntar archivos reales implica una decisión de almacenamiento de documentos
que todavía no se ha tomado para el producto real. *(Ver US-017.)*

### Capacidades del proveedor según el modelo de servicio contratado

Las capacidades del Proveedor de Servicio sobre un hospital cliente dependen del
**modelo de servicio** contratado:

| Capacidad | Gestionado por SimplicAI | Autogestionado |
| --- | --- | --- |
| Ver equipos y órdenes del hospital | Sí | Sí |
| Resolver órdenes asignadas | Sí | Sí |
| Dar de alta y editar equipos | Sí | No — lo hace el personal del hospital |
| Crear órdenes | Sí | No |
| Asignar técnicos | Sí | Sí |

**Razonamiento:** en un hospital "Gestionado por SimplicAI" el proveedor opera el software en
nombre del hospital, así que necesita las mismas capacidades que el personal interno. En un
hospital "Autogestionado", el hospital mantiene su propio inventario y el proveedor es un
prestador de servicio que solo atiende las órdenes que se le asignan. *(Ver US-048, US-049,
US-050.)*

### Indicadores que deben calcularse con datos reales

Ningún indicador de la pestaña Indicadores debe quedar como un valor fijo de ejemplo — deben
calcularse a partir del historial real, igual que ya ocurre con cumplimiento de IMP,
preventivo vs. correctivo, costos e inactividad.

| Indicador | Estado de la decisión |
| --- | --- |
| Órdenes por categoría (30 días) | Resuelto — se calcula contando las órdenes reales por categoría dentro del periodo |
| Productividad de IMP por área | Resuelto — se calcula cruzando los equipos del programa por área contra las inspecciones completadas |
| Tiempo promedio de respuesta | **Abierta** — ver "Decisiones abiertas" |
| Tasa de localización de equipos | **Abierta y bloqueada** — ver "Decisiones abiertas" |

*(Ver US-012, US-013.)*

---

## Decisiones abiertas

> ## OPEN PRODUCT DECISION — Modelo de autenticación
>
> El mockup usa una sola contraseña compartida entre todos los usuarios de prueba; eso nunca
> debe llegar a producción. El modelo real todavía no está definido. Opciones consideradas:
>
> | Opción | A favor | En contra |
> | --- | --- | --- |
> | Credenciales por persona + recuperación de contraseña | Modelo estándar, control total, trazabilidad real por persona | Hay que construir y mantener recuperación de contraseña, política de contraseñas, bloqueos por intentos fallidos |
> | Lo anterior + segundo factor (2FA) | Relevante si hay información clínica sensible o requisitos regulatorios del hospital | Fricción para personal operativo que entra varias veces al día desde piso |
> | SSO del directorio del hospital | Sin contraseñas nuevas para el personal; altas y bajas las controla el hospital | Depende de la infraestructura de cada cliente; complica el modelo "Gestionado por SimplicAI", donde el operador es externo al hospital |
>
> Esta decisión también determina qué tan confiable es la bitácora de cada orden como
> registro auditable: hoy identifica a quien hizo cada cambio por un nombre de usuario, no
> por una identidad verificada.
>
> **Bloquea:** US-001.

> ## OPEN PRODUCT DECISION — Tiempo promedio de respuesta
>
> Falta decidir qué evento marca el fin del tiempo medido: la **primera atención del
> técnico**, o el **cierre de la orden**. Son dos métricas distintas, y la elección cambia el
> número que se reporta.
>
> **Bloquea:** US-014.

> ## OPEN PRODUCT DECISION — Tasa de localización de equipos
>
> No es calculable con el modelo de datos actual. Requiere definir primero un flujo funcional
> completo de **censo de inventario físico**: qué se revisa, quién registra cada recorrido,
> cómo se marca un equipo como encontrado o no encontrado, y cómo se cierra un censo. Nada de
> eso existe hoy — comprometer este indicador implica diseñar primero ese flujo completo.
>
> **Bloquea:** US-015.
