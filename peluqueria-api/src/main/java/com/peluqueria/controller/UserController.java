package com.peluqueria.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.RequiredArgsConstructor;

import com.peluqueria.dto.UserResponse;
import com.peluqueria.model.User;
import com.peluqueria.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
  @GetMapping("/{enterpriseId}")
  public List<UserResponse> getAllUsers(@PathVariable Long enterpriseId) {
    return userService.getUsersByEnterpriseId(enterpriseId);
  }

  @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
  @PostMapping
  public ResponseEntity<UserResponse> createUser(@RequestBody User user) {
    return ResponseEntity.ok(userService.createUser(user));
  }

  @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
  @PutMapping("/{id}")
  public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody User user) {
    return ResponseEntity.ok(userService.updateUser(id, user));
  }

  @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }
}
