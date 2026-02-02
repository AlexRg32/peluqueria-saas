package com.peluqueria.controller;

import com.peluqueria.dto.CustomerDetailResponse;
import com.peluqueria.dto.CustomerResponse;
import com.peluqueria.dto.UpdateCustomerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CustomerController {

  private final com.peluqueria.service.CustomerService customerService;

  @GetMapping("/enterprise/{enterpriseId}")
  public ResponseEntity<List<CustomerResponse>> getCustomersByEnterprise(@PathVariable Long enterpriseId) {
    return ResponseEntity.ok(customerService.getCustomersByEnterprise(enterpriseId));
  }

  @GetMapping("/{id}")
  public ResponseEntity<CustomerDetailResponse> getCustomerDetails(@PathVariable Long id) {
    return ResponseEntity.ok(customerService.getCustomerDetails(id));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable Long id,
      @RequestBody UpdateCustomerRequest request) {
    return ResponseEntity.ok(customerService.updateCustomer(id, request));
  }
}
