package com.saloria.security;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.saloria.dto.CreateAppointmentRequest;
import com.saloria.model.Role;
import com.saloria.model.User;
import com.saloria.repository.AppointmentRepository;
import com.saloria.repository.CustomerRepository;
import com.saloria.repository.ServiceOfferingRepository;
import com.saloria.repository.UserRepository;

public class SecurityServiceTest {

  @Mock
  private UserRepository userRepository;
  @Mock
  private CustomerRepository customerRepository;
  @Mock
  private AppointmentRepository appointmentRepository;
  @Mock
  private ServiceOfferingRepository serviceOfferingRepository;

  private SecurityService securityService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    securityService = new SecurityService(
        userRepository,
        customerRepository,
        appointmentRepository,
        serviceOfferingRepository);
  }

  @Test
  void allowsClientToBookOnlyForOwnUserId() {
    User principal = User.builder()
        .id(42L)
        .email("cliente@example.com")
        .role(Role.CLIENTE)
        .active(true)
        .archived(false)
        .build();
    Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

    CreateAppointmentRequest request = CreateAppointmentRequest.builder()
        .enterpriseId(5L)
        .userId(42L)
        .employeeId(7L)
        .serviceId(9L)
        .build();

    assertTrue(securityService.canCreateOwnAppointment(authentication, request));
  }

  @Test
  void rejectsClientBookingForAnotherUserOrGuestPayload() {
    User principal = User.builder()
        .id(42L)
        .email("cliente@example.com")
        .role(Role.CLIENTE)
        .active(true)
        .archived(false)
        .build();
    Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

    CreateAppointmentRequest foreignUserRequest = CreateAppointmentRequest.builder()
        .enterpriseId(5L)
        .userId(99L)
        .employeeId(7L)
        .serviceId(9L)
        .build();
    CreateAppointmentRequest guestRequest = CreateAppointmentRequest.builder()
        .enterpriseId(5L)
        .userId(42L)
        .customerName("Invitado")
        .customerPhone("600000000")
        .employeeId(7L)
        .serviceId(9L)
        .build();

    assertFalse(securityService.canCreateOwnAppointment(authentication, foreignUserRequest));
    assertFalse(securityService.canCreateOwnAppointment(authentication, guestRequest));
  }
}
