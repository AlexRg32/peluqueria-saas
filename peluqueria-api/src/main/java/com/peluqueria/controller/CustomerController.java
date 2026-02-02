package com.peluqueria.controller;

import com.peluqueria.dto.CustomerResponse;
import com.peluqueria.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CustomerController {

  private final CustomerRepository customerRepository;

  @GetMapping("/enterprise/{enterpriseId}")
  public ResponseEntity<List<CustomerResponse>> getCustomersByEnterprise(@PathVariable Long enterpriseId) {
    List<CustomerResponse> customers = customerRepository.findByEnterpriseId(enterpriseId)
        .stream()
        .map(c -> CustomerResponse.builder()
            .id(c.getId())
            .name(c.getName())
            .phone(c.getPhone())
            .email(c.getEmail())
            .userId(c.getUser() != null ? c.getUser().getId() : null)
            .build())
        .collect(Collectors.toList());
    return ResponseEntity.ok(customers);
  }
}
