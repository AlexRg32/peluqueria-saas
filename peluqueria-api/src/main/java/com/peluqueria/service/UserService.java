package com.peluqueria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.peluqueria.dto.UserResponse;
import com.peluqueria.model.User;
import com.peluqueria.repository.UserRepository;
import java.util.stream.Collectors;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

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

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
