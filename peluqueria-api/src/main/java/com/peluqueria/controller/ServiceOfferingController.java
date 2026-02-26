package com.peluqueria.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import com.peluqueria.model.ServiceOffering;
import com.peluqueria.dto.ServiceOfferingResponse;
import com.peluqueria.service.ServiceOfferingService;
import com.peluqueria.service.StorageService;
import com.peluqueria.security.SecurityService;
import org.springframework.security.core.Authentication;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "6. Servicios", description = "Catálogo de servicios que ofrece la empresa.")
@SecurityRequirement(name = "bearerAuth")
public class ServiceOfferingController {

  private final ServiceOfferingService serviceOfferingService;
  private final StorageService storageService;
  private final ObjectMapper objectMapper;
  private final SecurityService securityService;

  @Operation(summary = "Listar servicios por empresa", description = "Devuelve el catálogo de servicios ofrecidos por una empresa concreta.")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN') and @securityService.hasEnterpriseAccess(authentication, #enterpriseId)")
  @GetMapping("/{enterpriseId}")
  public List<ServiceOfferingResponse> getAllServicesByEnterpriseId(@PathVariable Long enterpriseId) {
    return serviceOfferingService.getAllServicesByEnterpriseId(enterpriseId);
  }

  @Operation(summary = "Crear nuevo servicio", description = "Crea un nuevo servicio en la base de datos subiendo además su imagen ilustrativa.")
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<ServiceOfferingResponse> createServiceOffering(
      @RequestPart("service") String serviceJson,
      @RequestPart(value = "image", required = false) MultipartFile image,
      Authentication authentication) throws Exception {

    ServiceOffering serviceOffering = objectMapper.readValue(serviceJson, ServiceOffering.class);

    if (image != null && !image.isEmpty()) {
      String filename = storageService.store(image);
      serviceOffering.setImage(storageService.getPublicUrl(filename));
    }

    // Extract enterpriseId from DTO or use a separate header/path param
    Long enterpriseId = serviceOffering.getEnterprise() != null ? serviceOffering.getEnterprise().getId() : null;

    if (!securityService.hasEnterpriseAccess(authentication, enterpriseId)) {
      throw new org.springframework.security.access.AccessDeniedException("Access Denied");
    }

    return ResponseEntity.ok(serviceOfferingService.createServiceOffering(serviceOffering, enterpriseId));
  }

  @Operation(summary = "Obtener servicio por ID", description = "Recupera la información completa de un servicio activo.")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN') and @securityService.hasEnterpriseAccess(authentication, #enterpriseId)")
  @GetMapping("/{enterpriseId}/{id}")
  public ResponseEntity<ServiceOfferingResponse> getServiceById(@PathVariable Long enterpriseId,
      @PathVariable Long id) {
    return ResponseEntity.ok(serviceOfferingService.getServiceByIdResponse(id));
  }

  @Operation(summary = "Eliminar servicio", description = "Borra un servicio existente indicando su ID y la empresa asociada.")
  @DeleteMapping("/{enterpriseId}/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN') and @securityService.hasEnterpriseAccess(authentication, #enterpriseId)")
  public ResponseEntity<Void> deleteService(@PathVariable Long enterpriseId, @PathVariable Long id) {
    serviceOfferingService.deleteService(id);
    return ResponseEntity.ok().build();
  }
}
