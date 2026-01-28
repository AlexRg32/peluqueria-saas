package com.peluqueria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.peluqueria.model.ServiceOffering;
import com.peluqueria.service.ServiceOfferingService;

@RestController
@RequestMapping("/api/services")
public class ServiceOfferingController {

  @Autowired
  private ServiceOfferingService serviceOfferingService;

  @GetMapping("/{enterpriseId}")
  public List<ServiceOffering> getAllServicesByEnterpriseId(@PathVariable Long enterpriseId) {
    return serviceOfferingService.getAllServicesByEnterpriseId(enterpriseId);
  }

  @PostMapping
  public ResponseEntity<?> createServiceOffering(@RequestBody ServiceOffering serviceOffering) {
    try {
      return ResponseEntity.ok(serviceOfferingService.createServiceOffering(serviceOffering));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/{enterpriseId}/{id}")
  public ResponseEntity<?> getServiceById(@PathVariable Long enterpriseId, @PathVariable Long id) {
    try {
      return ResponseEntity.ok(serviceOfferingService.getServiceById(id));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("/{enterpriseId}/{id}")
  public ResponseEntity<?> deleteService(@PathVariable Long enterpriseId, @PathVariable Long id) {
    try {
      serviceOfferingService.deleteService(id);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
