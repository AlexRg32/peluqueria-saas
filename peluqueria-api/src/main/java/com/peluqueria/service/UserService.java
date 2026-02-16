package com.peluqueria.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

import com.peluqueria.dto.UserResponse;
import com.peluqueria.model.User;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.repository.AppointmentRepository;
import com.peluqueria.repository.CustomerRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final AppointmentRepository appointmentRepository;
  private final CustomerRepository customerRepository;
  private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

  public List<UserResponse> getAllUsers(Long enterpriseId) {
    return userRepository.findByEnterpriseId(enterpriseId).stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public UserResponse createUser(User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new RuntimeException("El usuario ya existe");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    User savedUser = userRepository.save(user);
    return mapToResponse(savedUser);
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public UserResponse updateUser(Long id, User userDetails) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    user.setName(userDetails.getName());
    user.setEmail(userDetails.getEmail());
    user.setRole(userDetails.getRole());
    user.setPhone(userDetails.getPhone());
    user.setActive(userDetails.getActive());

    if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
      user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
    }

    User updatedUser = userRepository.save(user);
    return mapToResponse(updatedUser);
  }

  public List<UserResponse> getUsersByEnterpriseId(Long enterpriseId) {
    return userRepository.findByEnterpriseId(enterpriseId).stream()
        .filter(user -> user.getRole() != com.peluqueria.model.Role.CLIENTE)
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  private UserResponse mapToResponse(User user) {
    return UserResponse.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .role(user.getRole())
        .enterpriseId(user.getEnterprise() != null ? user.getEnterprise().getId() : null)
        .phone(user.getPhone())
        .active(user.getActive() != null ? user.getActive() : true)
        .build();
  }

  @Transactional
  public void deleteUser(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    // 1. Delete appointments where user is the employee
    appointmentRepository.deleteByEmployeeId(id);

    // 2. Check if user is linked to a customer record
    customerRepository.findByUserId(id).ifPresent(customer -> {
      // Delete customer's appointments
      appointmentRepository.deleteByCustomerId(customer.getId());
      // Delete customer record
      customerRepository.delete(customer);
    });

    // 3. Delete user
    userRepository.delete(user);
  }
}
