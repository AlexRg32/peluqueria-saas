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

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceOfferingController {

  private final ServiceOfferingService serviceOfferingService;
  private final StorageService storageService;
  private final ObjectMapper objectMapper;

  @GetMapping("/{enterpriseId}")
  public List<ServiceOfferingResponse> getAllServicesByEnterpriseId(@PathVariable Long enterpriseId) {
    return serviceOfferingService.getAllServicesByEnterpriseId(enterpriseId);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<ServiceOfferingResponse> createServiceOffering(
      @RequestPart("service") String serviceJson,
      @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {

    ServiceOffering serviceOffering = objectMapper.readValue(serviceJson, ServiceOffering.class);

    if (image != null && !image.isEmpty()) {
      String filename = storageService.store(image);
      // TODO: Move base URL to properties
      serviceOffering.setImage("http://localhost:8080/uploads/" + filename);
    }

    // Extract enterpriseId from DTO or use a separate header/path param
    // For now, it's inside the JSON or we assume it's there
    Long enterpriseId = serviceOffering.getEnterprise() != null ? serviceOffering.getEnterprise().getId() : null;

    return ResponseEntity.ok(serviceOfferingService.createServiceOffering(serviceOffering, enterpriseId));
  }

  @GetMapping("/{enterpriseId}/{id}")
  public ResponseEntity<ServiceOfferingResponse> getServiceById(@PathVariable Long enterpriseId,
      @PathVariable Long id) {
    return ResponseEntity.ok(serviceOfferingService.getServiceByIdResponse(id));
  }

  @DeleteMapping("/{enterpriseId}/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<Void> deleteService(@PathVariable Long enterpriseId, @PathVariable Long id) {
    serviceOfferingService.deleteService(id);
    return ResponseEntity.ok().build();
  }
}
