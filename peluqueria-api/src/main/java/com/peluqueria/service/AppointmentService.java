package com.peluqueria.service;

import com.peluqueria.dto.CreateAppointmentRequest;
import com.peluqueria.dto.AppointmentResponse;
import com.peluqueria.model.*;
import com.peluqueria.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

  private final AppointmentRepository appointmentRepository;
  private final UserRepository userRepository;
  private final CustomerRepository customerRepository;
  private final ServiceOfferingRepository serviceOfferingRepository;
  private final EnterpriseRepository enterpriseRepository;

  public AppointmentResponse create(CreateAppointmentRequest request) {
    User employee = userRepository.findById(request.getEmployeeId())
        .orElseThrow(() -> new RuntimeException("Employee not found"));
    ServiceOffering service = serviceOfferingRepository.findById(request.getServiceId())
        .orElseThrow(() -> new RuntimeException("Service not found"));
    Enterprise enterprise = enterpriseRepository.findById(request.getEnterpriseId())
        .orElseThrow(() -> new RuntimeException("Enterprise not found"));

    Customer customer = getOrCreateCustomer(request, enterprise);

    Appointment appointment = new Appointment();
    appointment.setCustomer(customer);
    appointment.setEmployee(employee);
    appointment.setService(service);
    appointment.setEnterprise(enterprise);
    appointment.setDate(request.getDate());
    appointment.setPrice(service.getPrice());
    appointment.setStatus(AppointmentStatus.PENDING);

    Appointment saved = appointmentRepository.save(appointment);

    // Increment visit count
    customer.setVisitsCount(customer.getVisitsCount() + 1);
    customerRepository.save(customer);

    return mapToResponse(saved);
  }

  private Customer getOrCreateCustomer(CreateAppointmentRequest request, Enterprise enterprise) {
    if (request.getCustomerId() != null) {
      return customerRepository.findById(request.getCustomerId())
          .orElseThrow(() -> new RuntimeException("Customer not found"));
    } else if (request.getUserId() != null) {
      // Registered User
      return customerRepository.findByEnterpriseIdAndUserId(enterprise.getId(), request.getUserId())
          .orElseGet(() -> {
            User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            return customerRepository.save(Customer.builder()
                .name(user.getName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .enterprise(enterprise)
                .user(user)
                .build());
          });
    } else {
      // Guest / Walk-in
      return customerRepository.findByEnterpriseIdAndPhone(enterprise.getId(), request.getCustomerPhone())
          .map(existing -> {
            // Update name if it was empty or changed
            if (request.getCustomerName() != null && !request.getCustomerName().equals(existing.getName())) {
              existing.setName(request.getCustomerName());
              return customerRepository.save(existing);
            }
            return existing;
          })
          .orElseGet(() -> customerRepository.save(Customer.builder()
              .name(request.getCustomerName())
              .phone(request.getCustomerPhone())
              .enterprise(enterprise)
              .build()));
    }
  }

  public List<AppointmentResponse> findByEnterpriseId(Long enterpriseId) {
    return appointmentRepository.findByEnterpriseId(enterpriseId).stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public AppointmentResponse checkout(Long id, PaymentMethod method) {
    Appointment appointment = appointmentRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setPaid(true);
    appointment.setPaymentMethod(method);
    appointment.setPaidAt(java.time.LocalDateTime.now());
    appointment.setStatus(AppointmentStatus.COMPLETED);

    return mapToResponse(appointmentRepository.save(appointment));
  }

  private AppointmentResponse mapToResponse(Appointment a) {
    Customer c = a.getCustomer();
    return AppointmentResponse.builder()
        .id(a.getId())
        .customerName(c.getName())
        .customerPhone(c.getPhone())
        .employeeName(a.getEmployee().getName())
        .serviceName(a.getService().getName())
        .date(a.getDate())
        .duration(a.getService().getDuration())
        .price(a.getPrice())
        .status(a.getStatus().name())
        .paid(a.isPaid())
        .paymentMethod(a.getPaymentMethod() != null ? a.getPaymentMethod().name() : null)
        .paidAt(a.getPaidAt())
        .build();
  }
}
