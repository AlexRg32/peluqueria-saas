package com.peluqueria.controller;

import com.peluqueria.dto.CustomerResponse;
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
}
