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

@RestController
@RequestMapping("/api/enterprises")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EnterpriseController {

  private final EnterpriseService enterpriseService;

  @GetMapping
  public List<EnterpriseResponse> findAll() {
    return enterpriseService.findAll();
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<EnterpriseResponse> create(@RequestBody Enterprise enterprise) {
    return ResponseEntity.ok(enterpriseService.save(enterprise));
  }

  @GetMapping("/{id}")
  public ResponseEntity<EnterpriseResponse> findById(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.findByIdResponse(id));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<EnterpriseResponse> update(@PathVariable Long id, @RequestBody Enterprise enterprise) {
    return ResponseEntity.ok(enterpriseService.update(id, enterprise));
  }

  @GetMapping("/{id}/employees")
  public ResponseEntity<List<UserResponse>> getEmployees(@PathVariable Long id) {
    return ResponseEntity.ok(enterpriseService.getEmployeesByEnterpriseId(id));
  }
}
