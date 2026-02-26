package com.peluqueria.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.peluqueria.model.User;
import com.peluqueria.model.Customer;
import com.peluqueria.model.Appointment;
import com.peluqueria.model.ServiceOffering;
import com.peluqueria.model.Role;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.repository.CustomerRepository;
import com.peluqueria.repository.AppointmentRepository;
import com.peluqueria.repository.ServiceOfferingRepository;

@Service("securityService")
@RequiredArgsConstructor
public class SecurityService {

  private final UserRepository userRepository;
  private final CustomerRepository customerRepository;
  private final AppointmentRepository appointmentRepository;
  private final ServiceOfferingRepository serviceOfferingRepository;

  /**
   * Checks if the currently authenticated user has access to a specific
   * enterprise.
   * SUPER_ADMIN has access to all enterprises.
   * Validates that the user's assigned enterprise matches the target enterprise
   * ID.
   */
  public boolean hasEnterpriseAccess(Authentication authentication, Long targetEnterpriseId) {
    if (targetEnterpriseId == null || authentication == null || !authentication.isAuthenticated()) {
      return false;
    }

    Object principal = authentication.getPrincipal();
    if (!(principal instanceof User)) {
      return false;
    }

    User user = (User) principal;

    if (user.getRole() == Role.SUPER_ADMIN) {
      return true;
    }

    if (user.getEnterprise() == null) {
      return false;
    }

    return targetEnterpriseId.equals(user.getEnterprise().getId());
  }

  /**
   * Checks if the currently authenticated user can manage/update a specific user
   * account.
   */
  public boolean canManageUser(Authentication authentication, Long targetUserId) {
    if (targetUserId == null)
      return false;

    User targetUser = userRepository.findById(targetUserId).orElse(null);
    if (targetUser == null) {
      // Let the controller handle 404 naturally; from a security standpoint, if it
      // doesn't exist, we can't secure it here.
      // Wait, actually returning true allows it to pass to the service which will
      // throw 404.
      // Returning false throws 403 Forbidden.
      // It's safer to block it here or let it fail gracefully? Blocking is fine, 403
      // or 404 is acceptable.
      return false;
    }

    if (targetUser.getEnterprise() == null) {
      // Super admins are not tied to enterprises, only super admin can manage them
      return hasSuperAdminRole(authentication);
    }

    return hasEnterpriseAccess(authentication, targetUser.getEnterprise().getId());
  }

  /**
   * Checks if the currently authenticated user can manage a specific customer.
   */
  public boolean canManageCustomer(Authentication authentication, Long customerId) {
    if (customerId == null)
      return false;

    Customer c = customerRepository.findById(customerId).orElse(null);
    if (c == null)
      return false;

    if (c.getEnterprise() == null)
      return false;

    return hasEnterpriseAccess(authentication, c.getEnterprise().getId());
  }

  /**
   * Checks if the currently authenticated user can manage a specific appointment.
   */
  public boolean canManageAppointment(Authentication authentication, Long appointmentId) {
    if (appointmentId == null)
      return false;

    Appointment a = appointmentRepository.findById(appointmentId).orElse(null);
    if (a == null)
      return false;

    if (a.getEnterprise() == null)
      return false;

    return hasEnterpriseAccess(authentication, a.getEnterprise().getId());
  }

  /**
   * Checks if the currently authenticated user can manage a specific service
   * offering.
   */
  public boolean canManageServiceOffering(Authentication authentication, Long serviceId) {
    if (serviceId == null)
      return false;

    ServiceOffering so = serviceOfferingRepository.findById(serviceId).orElse(null);
    if (so == null)
      return false;

    if (so.getEnterprise() == null)
      return false;

    return hasEnterpriseAccess(authentication, so.getEnterprise().getId());
  }

  private boolean hasSuperAdminRole(Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated())
      return false;
    Object principal = authentication.getPrincipal();
    if (principal instanceof User) {
      return ((User) principal).getRole() == Role.SUPER_ADMIN;
    }
    return false;
  }
}
