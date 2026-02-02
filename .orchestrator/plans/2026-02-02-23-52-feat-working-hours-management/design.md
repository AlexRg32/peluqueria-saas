# Diseño: Gestión de Horarios

## 1. REST API

### Endpoints

- `GET /api/working-hours/enterprise/{enterpriseId}`: Obtiene los horarios generales de la empresa.
- `GET /api/working-hours/user/{userId}`: Obtiene los horarios de un empleado específico.
- `PUT /api/working-hours/batch`: Actualiza una lista de horarios (para guardar los 7 días de golpe).

### DTOs

```java
public class WorkingHourRequest {
    private Long id; // null para nuevos
    private String day; // "LUNES", "MARTES", etc.
    private String startTime;
    private String endTime;
    private boolean dayOff;
    private Long enterpriseId;
    private Long userId; // null si es horario de empresa
}

public class WorkingHourResponse {
    private Long id;
    private String day;
    private String startTime;
    private String endTime;
    private boolean dayOff;
    private String dayDisplayName; // "Lunes", "Martes"...
}
```

## 2. Definición del Modelo (Ajuste)

```java
@Entity
@Data
@Table(name = "working_hours")
public class WorkingHour {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String day; // LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO
    private String startTime; // "09:00"
    private String endTime; // "20:00"
    private boolean isDayOff;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id", nullable = false)
    private Enterprise enterprise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true) // <--- Cambiado a nullable
    private User user;
}
```

## 3. UI Frontend

### Componente `WorkingHourSettings`

- Recibe `enterpriseId` y opcionalmente `userId`.
- Muestra una lista de 7 filas.
- Diseño:

  ```
  [Icon] Lunes    [ 09:00 ] - [ 20:00 ]   ( ) Abierto / (X) Cerrado
  [Icon] Martes   [ 09:00 ] - [ 20:00 ]   (X) Abierto / ( ) Cerrado
  ...
  ```

- Botón "Guardar Horarios" en la parte inferior.

### Integración en `Users.tsx`

- Añadir un botón de "Reloj" en la tabla de empleados que abra un Modal con `WorkingHourSettings`.

### Integración en `Enterprises.tsx`

- Nueva pestaña "Horario de Apertura" que renderice `WorkingHourSettings` pasándole solo el `enterpriseId`.
