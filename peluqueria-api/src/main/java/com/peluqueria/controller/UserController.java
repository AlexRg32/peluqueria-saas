package com.peluqueria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.peluqueria.model.User;
import com.peluqueria.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/{enterpriseId}")
  public List<User> getAllUsers(@PathVariable Long enterpriseId) {
    return userService.getUsersByEnterpriseId(enterpriseId);
  }

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody User user) {
    try {
      return ResponseEntity.ok(userService.createUser(user));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
