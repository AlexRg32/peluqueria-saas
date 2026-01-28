package com.peluqueria.service;

import com.peluqueria.dto.AuthRequest;
import com.peluqueria.dto.AuthResponse;
import com.peluqueria.dto.RegisterRequest;
import com.peluqueria.model.Role;
import com.peluqueria.model.User;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request) {
    var user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.EMPLEADO)
        .build();
    repository.save(user);
    var jwtToken = jwtService.generateToken(user);
    return AuthResponse.builder()
        .token(jwtToken)
        .build();
  }

  public AuthResponse authenticate(AuthRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    return AuthResponse.builder()
        .token(jwtToken)
        .build();
  }
}
