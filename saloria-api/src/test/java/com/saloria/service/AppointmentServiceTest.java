package com.saloria.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.access.AccessDeniedException;

import com.saloria.dto.AppointmentResponse;
import com.saloria.dto.CreateAppointmentRequest;
import com.saloria.model.Appointment;
import com.saloria.model.AppointmentStatus;
import com.saloria.model.Customer;
import com.saloria.model.Enterprise;
import com.saloria.model.Role;
import com.saloria.model.ServiceOffering;
import com.saloria.model.User;
import com.saloria.repository.AppointmentRepository;
import com.saloria.repository.CustomerRepository;
import com.saloria.repository.EnterpriseRepository;
import com.saloria.repository.ServiceOfferingRepository;
import com.saloria.repository.UserRepository;
import com.saloria.repository.WorkingHourRepository;
import com.saloria.model.WorkingHour;

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
  @Mock
  private WorkingHourRepository workingHourRepository;

  private AppointmentService appointmentService;

  private Appointment buildAppointmentFixture(AppointmentStatus status) {
    Enterprise enterprise = Enterprise.builder().id(1L).name("Enterprise A").slug("enterprise-a").build();
    User employee = User.builder()
        .id(1L)
        .name("Employee")
        .role(Role.EMPLEADO)
        .active(true)
        .enterprise(enterprise)
        .build();
    ServiceOffering service = ServiceOffering.builder()
        .id(1L)
        .name("Service")
        .duration(30)
        .price(10.0)
        .enterprise(enterprise)
        .deleted(false)
        .build();
    Customer customer = Customer.builder()
        .id(1L)
        .name("Test Customer")
        .phone("123456789")
        .enterprise(enterprise)
        .visitsCount(0)
        .build();

    Appointment appointment = new Appointment();
    appointment.setId(9L);
    appointment.setStatus(status);
    appointment.setCustomer(customer);
    appointment.setEmployee(employee);
    appointment.setService(service);
    appointment.setEnterprise(enterprise);
    appointment.setDate(LocalDateTime.now().plusDays(1));
    appointment.setPrice(10.0);
    return appointment;
  }

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    appointmentService = new AppointmentService(
        appointmentRepository,
        userRepository,
        customerRepository,
        serviceOfferingRepository,
        enterpriseRepository,
        workingHourRepository);
    when(userRepository.findByIdForUpdate(anyLong())).thenAnswer(invocation -> userRepository.findById(invocation.getArgument(0)));
    when(workingHourRepository.findFirstByUser_IdAndDay(anyLong(), anyString())).thenReturn(Optional.empty());
    when(workingHourRepository.findFirstByEnterpriseIdAndUserIdIsNullAndDay(anyLong(), anyString()))
        .thenReturn(Optional.empty());
  }

  @Test
  public void testCreateAppointmentMapping() {
    // Arrange
    CreateAppointmentRequest request = new CreateAppointmentRequest();
    request.setEmployeeId(1L);
    request.setServiceId(1L);
    request.setEnterpriseId(1L);
    request.setDate(LocalDateTime.now().plusDays(1).withHour(10).withMinute(0).withSecond(0).withNano(0));
    request.setCustomerName("Test Customer");
    request.setCustomerPhone("123456789");

    Enterprise enterprise = Enterprise.builder().id(1L).name("Enterprise A").slug("enterprise-a").build();
    User employee = User.builder()
        .id(1L)
        .name("Employee")
        .role(Role.EMPLEADO)
        .active(true)
        .enterprise(enterprise)
        .build();
    ServiceOffering service = ServiceOffering.builder()
        .id(1L)
        .name("Service")
        .duration(30)
        .price(10.0)
        .enterprise(enterprise)
        .deleted(false)
        .build();
    Customer customer = Customer.builder()
        .id(1L)
        .name("Test Customer")
        .phone("123456789")
        .enterprise(enterprise)
        .visitsCount(0)
        .build();

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

  @Test
  public void testUpdateStatusAllowsPendingToConfirmed() {
    Appointment appointment = buildAppointmentFixture(AppointmentStatus.PENDING);
    when(appointmentRepository.findById(9L)).thenReturn(Optional.of(appointment));
    when(appointmentRepository.save(appointment)).thenReturn(appointment);

    AppointmentResponse response = appointmentService.updateStatus(9L, AppointmentStatus.CONFIRMED);

    assertEquals("CONFIRMED", response.getStatus());
  }

  @Test
  public void testUpdateStatusRejectsCompletedToCanceled() {
    Appointment appointment = buildAppointmentFixture(AppointmentStatus.COMPLETED);
    when(appointmentRepository.findById(9L)).thenReturn(Optional.of(appointment));

    IllegalStateException error = assertThrows(IllegalStateException.class,
        () -> appointmentService.updateStatus(9L, AppointmentStatus.CANCELED));

    assertEquals("No se puede cambiar la cita de COMPLETED a CANCELED.", error.getMessage());
  }

  @Test
  public void testCheckoutRejectsPendingAppointments() {
    Appointment appointment = buildAppointmentFixture(AppointmentStatus.PENDING);
    appointment.setId(11L);
    when(appointmentRepository.findById(11L)).thenReturn(Optional.of(appointment));

    IllegalStateException error = assertThrows(IllegalStateException.class,
        () -> appointmentService.checkout(11L, com.saloria.model.PaymentMethod.CASH));

    assertEquals("Solo se pueden cobrar citas completadas.", error.getMessage());
  }

  @Test
  public void testRescheduleUpdatesDateWhenSlotIsAvailable() {
    Appointment appointment = buildAppointmentFixture(AppointmentStatus.PENDING);
    LocalDateTime nextDate = LocalDateTime.of(2026, 4, 6, 12, 0);
    when(appointmentRepository.findById(9L)).thenReturn(Optional.of(appointment));
    when(userRepository.findByIdForUpdate(1L)).thenReturn(Optional.of(appointment.getEmployee()));
    when(workingHourRepository.findFirstByUser_IdAndDay(1L, "LUNES")).thenReturn(Optional.empty());
    when(workingHourRepository.findFirstByEnterpriseIdAndUserIdIsNullAndDay(1L, "LUNES")).thenReturn(Optional.empty());
    when(appointmentRepository.findByEmployeeIdAndDateBetween(anyLong(), any(), any())).thenReturn(Collections.emptyList());
    when(appointmentRepository.save(appointment)).thenReturn(appointment);

    AppointmentResponse response = appointmentService.reschedule(9L, nextDate);

    assertEquals(nextDate, response.getDate());
  }

  @Test
  public void testRescheduleRejectsOverlappingSlot() {
    Appointment appointment = buildAppointmentFixture(AppointmentStatus.CONFIRMED);
    Appointment conflicting = buildAppointmentFixture(AppointmentStatus.PENDING);
    conflicting.setId(12L);
    conflicting.setDate(LocalDateTime.of(2026, 4, 6, 12, 0));
    LocalDateTime nextDate = LocalDateTime.of(2026, 4, 6, 12, 15);

    when(appointmentRepository.findById(9L)).thenReturn(Optional.of(appointment));
    when(userRepository.findByIdForUpdate(1L)).thenReturn(Optional.of(appointment.getEmployee()));
    when(workingHourRepository.findFirstByUser_IdAndDay(1L, "LUNES")).thenReturn(Optional.empty());
    when(workingHourRepository.findFirstByEnterpriseIdAndUserIdIsNullAndDay(1L, "LUNES")).thenReturn(Optional.empty());
    when(appointmentRepository.findByEmployeeIdAndDateBetween(anyLong(), any(), any())).thenReturn(List.of(conflicting));

    IllegalStateException error = assertThrows(IllegalStateException.class,
        () -> appointmentService.reschedule(9L, nextDate));

    assertEquals("El empleado ya tiene una cita en ese horario.", error.getMessage());
  }

  @Test
  public void testFindBusySlotsByEmployeeReturnsOnlyFutureBlockingAppointments() {
    Appointment pending = buildAppointmentFixture(AppointmentStatus.PENDING);
    pending.setId(14L);
    pending.setDate(LocalDateTime.now().plusDays(2).withHour(11).withMinute(0));

    Appointment canceled = buildAppointmentFixture(AppointmentStatus.CANCELED);
    canceled.setId(15L);
    canceled.setDate(LocalDateTime.now().plusDays(2).withHour(12).withMinute(0));

    Appointment pastConfirmed = buildAppointmentFixture(AppointmentStatus.CONFIRMED);
    pastConfirmed.setId(16L);
    pastConfirmed.setDate(LocalDateTime.now().minusDays(1).withHour(10).withMinute(0));

    when(appointmentRepository.findByEmployeeIdOrderByDateDesc(1L)).thenReturn(List.of(canceled, pending, pastConfirmed));

    List<com.saloria.dto.BusySlotResponse> response = appointmentService.findBusySlotsByEmployee(1L);

    assertEquals(1, response.size());
    assertEquals(14L, response.get(0).getAppointmentId());
    assertEquals(pending.getDate(), response.get(0).getStart());
    assertEquals(pending.getDate().plusMinutes(pending.getService().getDuration()), response.get(0).getEnd());
  }

  @Test
  public void testCreateAppointmentRejectsCrossEnterpriseEmployee() {
    CreateAppointmentRequest request = new CreateAppointmentRequest();
    request.setEmployeeId(1L);
    request.setServiceId(1L);
    request.setEnterpriseId(1L);
    request.setDate(LocalDateTime.now().plusDays(1));
    request.setCustomerName("Test Customer");
    request.setCustomerPhone("123456789");

    Enterprise requestedEnterprise = Enterprise.builder().id(1L).name("Enterprise A").build();
    Enterprise foreignEnterprise = Enterprise.builder().id(2L).name("Enterprise B").build();

    User employee = User.builder()
        .id(1L)
        .name("Employee")
        .role(Role.EMPLEADO)
        .active(true)
        .enterprise(foreignEnterprise)
        .build();

    ServiceOffering service = ServiceOffering.builder()
        .id(1L)
        .name("Service")
        .duration(30)
        .price(10.0)
        .enterprise(requestedEnterprise)
        .deleted(false)
        .build();

    when(userRepository.findById(1L)).thenReturn(Optional.of(employee));
    when(serviceOfferingRepository.findById(1L)).thenReturn(Optional.of(service));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(requestedEnterprise));

    assertThrows(AccessDeniedException.class, () -> appointmentService.create(request));
  }

  @Test
  public void testCreateAppointmentRejectsOutsideEnterpriseWorkingHours() {
    CreateAppointmentRequest request = new CreateAppointmentRequest();
    request.setEmployeeId(1L);
    request.setServiceId(1L);
    request.setEnterpriseId(1L);
    request.setDate(LocalDateTime.of(2026, 3, 30, 18, 0));
    request.setCustomerName("Test Customer");
    request.setCustomerPhone("123456789");

    Enterprise enterprise = Enterprise.builder().id(1L).name("Enterprise A").build();
    User employee = User.builder()
        .id(1L)
        .name("Employee")
        .role(Role.EMPLEADO)
        .active(true)
        .enterprise(enterprise)
        .build();
    ServiceOffering service = ServiceOffering.builder()
        .id(1L)
        .name("Service")
        .duration(30)
        .price(10.0)
        .enterprise(enterprise)
        .deleted(false)
        .build();

    WorkingHour enterpriseHours = new WorkingHour();
    enterpriseHours.setDay("LUNES");
    enterpriseHours.setStartTime("09:00");
    enterpriseHours.setEndTime("18:00");
    enterpriseHours.setDayOff(false);
    enterpriseHours.setEnterprise(enterprise);

    when(userRepository.findById(1L)).thenReturn(Optional.of(employee));
    when(serviceOfferingRepository.findById(1L)).thenReturn(Optional.of(service));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(enterprise));
    when(workingHourRepository.findFirstByEnterpriseIdAndUserIdIsNullAndDay(1L, "LUNES"))
        .thenReturn(Optional.of(enterpriseHours));

    IllegalStateException error = assertThrows(IllegalStateException.class, () -> appointmentService.create(request));

    assertEquals("La cita debe estar dentro del horario laboral del profesional.", error.getMessage());
  }

  @Test
  public void testCreateAppointmentRejectsOutsideEmployeeWorkingHours() {
    CreateAppointmentRequest request = new CreateAppointmentRequest();
    request.setEmployeeId(1L);
    request.setServiceId(1L);
    request.setEnterpriseId(1L);
    request.setDate(LocalDateTime.of(2026, 3, 30, 15, 45));
    request.setCustomerName("Test Customer");
    request.setCustomerPhone("123456789");

    Enterprise enterprise = Enterprise.builder().id(1L).name("Enterprise A").build();
    User employee = User.builder()
        .id(1L)
        .name("Employee")
        .role(Role.EMPLEADO)
        .active(true)
        .enterprise(enterprise)
        .build();
    ServiceOffering service = ServiceOffering.builder()
        .id(1L)
        .name("Service")
        .duration(30)
        .price(10.0)
        .enterprise(enterprise)
        .deleted(false)
        .build();

    WorkingHour employeeHours = new WorkingHour();
    employeeHours.setDay("LUNES");
    employeeHours.setStartTime("10:00");
    employeeHours.setEndTime("16:00");
    employeeHours.setDayOff(false);
    employeeHours.setEnterprise(enterprise);
    employeeHours.setUser(employee);

    when(userRepository.findById(1L)).thenReturn(Optional.of(employee));
    when(serviceOfferingRepository.findById(1L)).thenReturn(Optional.of(service));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(enterprise));
    when(workingHourRepository.findFirstByUser_IdAndDay(1L, "LUNES"))
        .thenReturn(Optional.of(employeeHours));

    IllegalStateException error = assertThrows(IllegalStateException.class, () -> appointmentService.create(request));

    assertEquals("La cita debe estar dentro del horario laboral del profesional.", error.getMessage());
  }
}
