package com.peluqueria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.peluqueria.model.User;
import com.peluqueria.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public List<User> getAllUsers(Long enterpriseId) {
    return userRepository.findByEnterpriseId(enterpriseId);
  }

  public User createUser(User user) {
    if (userRepository.findByEmail(user.getEmail()) != null) {
      throw new RuntimeException("El usuario ya existe");
    }
    return userRepository.save(user);
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public List<User> getUsersByEnterpriseId(Long enterpriseId) {
    return userRepository.findByEnterpriseId(enterpriseId);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
