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

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "http://localhost:5173") // Updated to match dev port
@RequiredArgsConstructor
public class PublicController {

  private final EnterpriseService enterpriseService;
  private final ServiceOfferingService serviceOfferingService;

  @GetMapping("/enterprises/slug/{slug}")
  public ResponseEntity<EnterpriseResponse> getEnterpriseBySlug(@PathVariable String slug) {
    return ResponseEntity.ok(enterpriseService.findBySlug(slug));
  }

  @GetMapping("/enterprises/{id}/services")
  public ResponseEntity<List<ServiceOfferingResponse>> getEnterpriseServices(@PathVariable Long id) {
    return ResponseEntity.ok(serviceOfferingService.getAllServicesByEnterpriseId(id));
  }

  @GetMapping("/enterprises/{id}/employees")
  public ResponseEntity<List<UserResponse>> getEnterpriseEmployees(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.getEmployeesByEnterpriseId(id));
  }
}
