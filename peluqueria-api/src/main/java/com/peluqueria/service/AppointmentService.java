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
  private final ServiceOfferingRepository serviceOfferingRepository;
  private final EnterpriseRepository enterpriseRepository;

  public AppointmentResponse create(CreateAppointmentRequest request) {
    User user = userRepository.findById(request.getUserId())
        .orElseThrow(() -> new RuntimeException("User not found"));
    User employee = userRepository.findById(request.getEmployeeId())
        .orElseThrow(() -> new RuntimeException("Employee not found"));
    ServiceOffering service = serviceOfferingRepository.findById(request.getServiceId())
        .orElseThrow(() -> new RuntimeException("Service not found"));
    Enterprise enterprise = enterpriseRepository.findById(request.getEnterpriseId())
        .orElseThrow(() -> new RuntimeException("Enterprise not found"));

    Appointment appointment = new Appointment();
    appointment.setUser(user);
    appointment.setEmployee(employee);
    appointment.setService(service);
    appointment.setEnterprise(enterprise);
    appointment.setDate(request.getDate());
    appointment.setPrice(service.getPrice());
    appointment.setStatus(AppointmentStatus.PENDING);

    Appointment saved = appointmentRepository.save(appointment);
    return mapToResponse(saved);
  }

  public List<AppointmentResponse> findByEnterpriseId(Long enterpriseId) {
    return appointmentRepository.findByEnterpriseId(enterpriseId).stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  private AppointmentResponse mapToResponse(Appointment a) {
    return AppointmentResponse.builder()
        .id(a.getId())
        .customerName(a.getUser().getName())
        .employeeName(a.getEmployee().getName())
        .serviceName(a.getService().getName())
        .date(a.getDate())
        .duration(a.getService().getDuration())
        .price(a.getPrice())
        .status(a.getStatus().name())
        .build();
  }
}
