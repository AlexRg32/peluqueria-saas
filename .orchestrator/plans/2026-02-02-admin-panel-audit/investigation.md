# Investigación: Auditoría del Panel de Administración

**Estado actual**: El panel base es funcional, estéticamente agradable y cubre las operaciones CRUD esenciales. Sin embargo, para ser una solución SaaS competitiva y completa, faltan componentes críticos de gestión operativa y refinamiento de datos.

## 1. Análisis de Funcionalidades Existentes

### 📊 Dashboard (Resumen de Negocio)

- **Estado**: Bueno (Vista general de ingresos, citas, clientes y rendimiento de equipo).
- **Lo que falta**:
  - **Filtros Temporales**: Actualmente los datos parecen ser globales o de un rango fijo. Es vital poder filtrar por "Hoy", "Esta Semana", "Este Mes" o rangos personalizados.
  - **Insights de Clientes**: Ticket promedio, tasa de recurrencia (cuántos clientes vuelven).
  - **Próximas Citas**: Una lista rápida de las siguientes 5 citas del día directamente en el dashboard.

### 📅 Agenda (Calendario)

- **Estado**: Funcional (Uso de `react-big-calendar`).
- **Lo que falta**:
  - **Zonas Muertas Visuales**: No se visualizan las horas en las que el negocio está cerrado o el empleado no trabaja (aparece todo el día en blanco).
  - **Gestión de Estados**: Poder marcar una cita como "Llegó", "Completada", "Cancelada" o "No se presentó" (No-show). Esto es clave para las estadísticas.

### 👥 Gestión de Personal (Empleados)

- **Estado**: Crítico (Falta interfaz de configuración).
- **Lo que falta**:
  - **Horarios de Trabajo (Working Hours)**: Aunque el modelo existe en el backend (`WorkingHour.java`), no hay una UI para que el admin configure a qué hora entra y sale cada peluquero cada día de la semana.
  - **Días Libres/Vacaciones**: Poder bloquear días específicos por empleado.

### 🏢 Mi Peluquería (Enterprise)

- **Estado**: Incompleto.
- **Lo que falta**:
  - **Horario de Apertura General**: El negocio como tal necesita un horario global que dicte cuándo se pueden pedir citas en la web pública.
  - **Días de Cierre**: Festivos o periodos de vacaciones del local.

### ✂️ Servicios

- **Estado**: Básico.
- **Lo que falta**:
  - **Categorización**: A medida que el catálogo crece, separar por "Corte", "Color", "Tratamientos", "Barbería", etc.
  - **Orden/Prioridad**: Poder ordenar cómo aparecen en el formulario de citas.

## 2. Brechas Técnicas / Arquitectónicas

- **Validación de Disponibilidad**: No he visto una lógica robusta que impida crear una cita fuera de horario o cuando un empleado ya está ocupado (en el frontend se permite arrastrar/seleccionar cualquier slot).
- **Reportes Explotables**: Falta una opción para exportar (Excel/PDF) los cierres de caja o el listado de clientes para gestorías.

## 3. Propuestas de "Valor Premium"

- **CRM Detallado**: Ficha de cliente con historial de servicios anteriores y notas (ej. "Usa tinte número 5", "Prefiere corte a tijera").
- **Inventario/Productos**: Venta de productos adicionales (ceras, champús) que sumen a la factura.
- **Notificaciones**: Centro de control para ver si los recordatorios de SMS/Email se han enviado correctamente.

---

**Conclusión**: Para una fase "MVP Plus", priorizaría la **UI de Horarios (Empleados y Negocio)** y el **Estado de las Citas**. Sin horarios configurables, el sistema de citas es "a ciegas".
