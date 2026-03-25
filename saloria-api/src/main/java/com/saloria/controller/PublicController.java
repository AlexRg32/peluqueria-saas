package com.saloria.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

import com.saloria.service.EnterpriseService;
import com.saloria.service.ServiceOfferingService;
import com.saloria.service.WorkingHourService;
import com.saloria.dto.EnterpriseResponse;
import com.saloria.dto.PublicEnterpriseSummaryResponse;
import com.saloria.dto.ServiceOfferingResponse;
import com.saloria.dto.UserResponse;
import com.saloria.dto.WorkingHourDTO;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/public")
@Tag(name = "2. Público", description = "Endpoints de acceso público para consultar información de empresas (perfiles).")
@RequiredArgsConstructor
public class PublicController {

  private final EnterpriseService enterpriseService;
  private final ServiceOfferingService serviceOfferingService;
  private final WorkingHourService workingHourService;

  @Operation(summary = "Directorio público de empresas", description = "Lista negocios públicos disponibles y permite filtrarlos por nombre, dirección o servicios.")
  @GetMapping("/enterprises")
  public ResponseEntity<List<PublicEnterpriseSummaryResponse>> getPublicEnterprises(
      @RequestParam(required = false, name = "q") String query) {
    return ResponseEntity.ok(enterpriseService.findPublicDirectory(query));
  }

  @Operation(summary = "Obtener empresa por Slug", description = "Recupera la información pública de una empresa a partir de su identificador único (slug).")
  @GetMapping("/enterprises/slug/{slug}")
  public ResponseEntity<EnterpriseResponse> getEnterpriseBySlug(@PathVariable String slug) {
    return ResponseEntity.ok(enterpriseService.findBySlug(slug));
  }

  @Operation(summary = "Listar servicios de empresa", description = "Obtiene el catálogo completo de servicios activos que ofrece una empresa específica.")
  @GetMapping("/enterprises/{id}/services")
  public ResponseEntity<List<ServiceOfferingResponse>> getEnterpriseServices(@PathVariable Long id) {
    return ResponseEntity.ok(serviceOfferingService.getAllServicesByEnterpriseId(id));
  }

  @Operation(summary = "Listar empleados de empresa", description = "Obtiene la lista de empleados (barberos/estilistas) de una empresa específica para que el usuario pueda reservar citas con ellos.")
  @GetMapping("/enterprises/{id}/employees")
  public ResponseEntity<List<UserResponse>> getEnterpriseEmployees(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.getEmployeesByEnterpriseId(id));
  }

  @Operation(summary = "Consultar horarios públicos de empresa", description = "Devuelve los horarios generales publicados de la empresa para el perfil público sin requerir autenticación.")
  @GetMapping("/enterprises/{id}/working-hours")
  public ResponseEntity<List<WorkingHourDTO>> getEnterpriseWorkingHours(@PathVariable Long id) {
    return ResponseEntity.ok(workingHourService.getEnterpriseHoursSnapshot(id));
  }

  @Operation(summary = "Consultar horarios públicos de un profesional", description = "Devuelve la disponibilidad efectiva del profesional, aplicando sus horas específicas y, si no existen, el horario general de la empresa.")
  @GetMapping("/enterprises/{enterpriseId}/employees/{userId}/working-hours")
  public ResponseEntity<List<WorkingHourDTO>> getEmployeeWorkingHours(@PathVariable Long enterpriseId,
      @PathVariable Long userId) {
    return ResponseEntity.ok(workingHourService.getPublicEmployeeHoursSnapshot(enterpriseId, userId));
  }
}
