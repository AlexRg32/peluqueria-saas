package com.peluqueria.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

import com.peluqueria.service.EnterpriseService;
import com.peluqueria.service.ServiceOfferingService;
import com.peluqueria.dto.EnterpriseResponse;
import com.peluqueria.dto.ServiceOfferingResponse;
import com.peluqueria.dto.UserResponse;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/public")
@Tag(name = "2. Público", description = "Endpoints de acceso público para consultar información de empresas (perfiles).")
@CrossOrigin(origins = "http://localhost:5173") // Updated to match dev port
@RequiredArgsConstructor
public class PublicController {

  private final EnterpriseService enterpriseService;
  private final ServiceOfferingService serviceOfferingService;

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
}
