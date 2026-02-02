package com.peluqueria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.peluqueria.dto.CustomerResponse;
import com.peluqueria.repository.CustomerRepository;

@Service
@RequiredArgsConstructor
public class CustomerService {

  private final CustomerRepository customerRepository;

  public List<CustomerResponse> getCustomersByEnterprise(Long enterpriseId) {
    return customerRepository.findByEnterpriseId(enterpriseId)
        .stream()
        .map(c -> CustomerResponse.builder()
            .id(c.getId())
            .name(c.getName())
            .phone(c.getPhone())
            .email(c.getEmail())
            .userId(c.getUser() != null ? c.getUser().getId() : null)
            .build())
        .collect(Collectors.toList());
  }
}
