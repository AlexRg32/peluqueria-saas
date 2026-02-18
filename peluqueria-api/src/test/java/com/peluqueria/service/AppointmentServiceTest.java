package com.peluqueria.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.peluqueria.dto.AppointmentResponse;
import com.peluqueria.dto.CreateAppointmentRequest;
import com.peluqueria.model.Appointment;
import com.peluqueria.model.AppointmentStatus;
import com.peluqueria.model.Customer;
import com.peluqueria.model.Enterprise;
import com.peluqueria.model.ServiceOffering;
import com.peluqueria.model.User;
import com.peluqueria.repository.AppointmentRepository;
import com.peluqueria.repository.CustomerRepository;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.repository.ServiceOfferingRepository;
import com.peluqueria.repository.UserRepository;

public class AppointmentServiceTest {

  @Mock
  private AppointmentRepository appointmentRepository;
  @Mock
  private UserRepository userRepository;
  @Mock
  private CustomerRepository customerRepository;
  @Mock
  private ServiceOfferingRepository serviceOfferingRepository;
  @Mock
  private EnterpriseRepository enterpriseRepository;

  private AppointmentService appointmentService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    appointmentService = new AppointmentService(
        appointmentRepository, userRepository, customerRepository, serviceOfferingRepository, enterpriseRepository);
  }

  @Test
  public void testCreateAppointmentMapping() {
    // Arrange
    CreateAppointmentRequest request = new CreateAppointmentRequest();
    request.setEmployeeId(1L);
    request.setServiceId(1L);
    request.setEnterpriseId(1L);
    request.setDate(LocalDateTime.now().plusDays(1));
    request.setCustomerName("Test Customer");
    request.setCustomerPhone("123456789");

    User employee = User.builder().id(1L).name("Employee").build();
    ServiceOffering service = ServiceOffering.builder().id(1L).name("Service").duration(30).price(10.0).build();
    Enterprise enterprise = Enterprise.builder().id(1L).name("Enterprise A").slug("enterprise-a").build();
    Customer customer = Customer.builder().id(1L).name("Test Customer").phone("123456789").build();

    when(userRepository.findById(1L)).thenReturn(Optional.of(employee));
    when(serviceOfferingRepository.findById(1L)).thenReturn(Optional.of(service));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(enterprise));
    when(appointmentRepository.findByEmployeeIdAndDateBetween(any(), any(), any())).thenReturn(Collections.emptyList());

    // For getOrCreateCustomer (guest path)
    when(customerRepository.findByEnterpriseIdAndPhone(1L, "123456789")).thenReturn(Optional.empty());
    when(customerRepository.save(any(Customer.class))).thenReturn(customer);

    Appointment savedAppointment = new Appointment();
    savedAppointment.setId(100L);
    savedAppointment.setCustomer(customer);
    savedAppointment.setEmployee(employee);
    savedAppointment.setService(service);
    savedAppointment.setEnterprise(enterprise);
    savedAppointment.setDate(request.getDate());
    savedAppointment.setPrice(10.0);
    savedAppointment.setStatus(AppointmentStatus.PENDING);

    when(appointmentRepository.save(any(Appointment.class))).thenReturn(savedAppointment);

    // Act
    AppointmentResponse response = appointmentService.create(request);

    // Assert
    assertNotNull(response);
    assertEquals("Test Customer", response.getCustomerName());
    assertEquals("Enterprise A", response.getEnterpriseName());
    assertEquals("enterprise-a", response.getEnterpriseSlug());
    assertEquals(1L, response.getEnterpriseId());
  }
}
