package com.peluqueria.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.RequiredArgsConstructor;

import com.peluqueria.service.EnterpriseService;
import com.peluqueria.dto.EnterpriseResponse;
import com.peluqueria.dto.UserResponse;
import com.peluqueria.model.Enterprise;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/enterprises")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Tag(name = "4. Empresas", description = "Administración de los datos, sede y configuración general de la empresa.")
@SecurityRequirement(name = "bearerAuth")
public class EnterpriseController {

  private final EnterpriseService enterpriseService;

  @Operation(summary = "Listar todas las empresas", description = "Obtiene un directorio de todas las empresas afiliadas a la plataforma.")
  @GetMapping
  public List<EnterpriseResponse> findAll() {
    return enterpriseService.findAll();
  }

  @Operation(summary = "Crear nueva empresa internamente")
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<EnterpriseResponse> create(@RequestBody Enterprise enterprise) {
    return ResponseEntity.ok(enterpriseService.save(enterprise));
  }

  @Operation(summary = "Obtener detalles de empresa por ID")
  @GetMapping("/{id}")
  @PreAuthorize("@securityService.hasEnterpriseAccess(authentication, #id)")
  public ResponseEntity<EnterpriseResponse> findById(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.findByIdResponse(id));
  }

  @Operation(summary = "Actualizar información de la empresa")
  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN') and @securityService.hasEnterpriseAccess(authentication, #id)")
  public ResponseEntity<EnterpriseResponse> update(@PathVariable Long id, @RequestBody Enterprise enterprise) {
    return ResponseEntity.ok(enterpriseService.update(id, enterprise));
  }

  @Operation(summary = "Obtener empleados internos de la empresa")
  @GetMapping("/{id}/employees")
  @PreAuthorize("@securityService.hasEnterpriseAccess(authentication, #id)")
  public ResponseEntity<List<UserResponse>> getEmployees(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.getEmployeesByEnterpriseId(id));
  }
}
