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

  public List<UserResponse> getAllUsers(Long enterpriseId) {
    return userRepository.findByEnterpriseId(enterpriseId).stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public User createUser(User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new RuntimeException("El usuario ya existe");
    }
    return userRepository.save(user);
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
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
        .build();
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
