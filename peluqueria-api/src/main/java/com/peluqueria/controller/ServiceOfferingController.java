package com.peluqueria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.peluqueria.model.ServiceOffering;
import com.peluqueria.service.ServiceOfferingService;
import com.peluqueria.service.StorageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/services")
public class ServiceOfferingController {

  @Autowired
  private ServiceOfferingService serviceOfferingService;

  @Autowired
  private StorageService storageService;

  @Autowired
  private ObjectMapper objectMapper;

  @GetMapping("/{enterpriseId}")
  public List<ServiceOffering> getAllServicesByEnterpriseId(@PathVariable Long enterpriseId) {
    return serviceOfferingService.getAllServicesByEnterpriseId(enterpriseId);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<?> createServiceOffering(
      @RequestPart("service") String serviceJson,
      @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
    ServiceOffering serviceOffering = objectMapper.readValue(serviceJson, ServiceOffering.class);

    if (image != null && !image.isEmpty()) {
      String filename = storageService.store(image);
      serviceOffering.setImage("http://localhost:8080/uploads/" + filename);
    }

    return ResponseEntity.ok(serviceOfferingService.createServiceOffering(serviceOffering));
  }

  @GetMapping("/{enterpriseId}/{id}")
  public ResponseEntity<?> getServiceById(@PathVariable Long enterpriseId, @PathVariable Long id) {
    return ResponseEntity.ok(serviceOfferingService.getServiceById(id));
  }

  @DeleteMapping("/{enterpriseId}/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<?> deleteService(@PathVariable Long enterpriseId, @PathVariable Long id) {
    serviceOfferingService.deleteService(id);
    return ResponseEntity.ok().build();
  }

}
