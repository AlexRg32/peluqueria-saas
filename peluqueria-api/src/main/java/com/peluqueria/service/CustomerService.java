package com.peluqueria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.peluqueria.dto.AppointmentSummaryDTO;
import com.peluqueria.dto.CustomerDetailResponse;
import com.peluqueria.dto.CustomerResponse;
import com.peluqueria.dto.UpdateCustomerRequest;
import com.peluqueria.exception.ResourceNotFoundException;
import com.peluqueria.model.Customer;
import com.peluqueria.repository.AppointmentRepository;
import com.peluqueria.repository.CustomerRepository;

@Service
@RequiredArgsConstructor
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final AppointmentRepository appointmentRepository;

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

  public CustomerDetailResponse getCustomerDetails(Long id) {
    Customer customer = customerRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

    List<AppointmentSummaryDTO> appointments = appointmentRepository.findByCustomerIdOrderByDateDesc(id)
        .stream()
        .map(a -> AppointmentSummaryDTO.builder()
            .id(a.getId())
            .date(a.getDate())
            .serviceName(a.getService().getName())
            .price(a.getPrice())
            .employeeName(a.getEmployee().getName())
            .status(a.getStatus().name())
            .build())
        .collect(Collectors.toList());

    return CustomerDetailResponse.builder()
        .id(customer.getId())
        .name(customer.getName())
        .phone(customer.getPhone())
        .email(customer.getEmail())
        .visitsCount(customer.getVisitsCount())
        .internalNotes(customer.getInternalNotes())
        .appointments(appointments)
        .build();
  }

  public CustomerResponse updateCustomer(Long id, UpdateCustomerRequest request) {
    Customer customer = customerRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

    customer.setName(request.getName());
    customer.setPhone(request.getPhone());
    customer.setEmail(request.getEmail());
    customer.setInternalNotes(request.getInternalNotes());

    Customer saved = customerRepository.save(customer);

    return CustomerResponse.builder()
        .id(saved.getId())
        .name(saved.getName())
        .phone(saved.getPhone())
        .email(saved.getEmail())
        .userId(saved.getUser() != null ? saved.getUser().getId() : null)
        .build();
  }
}
