package com.peluqueria.service;

import com.peluqueria.dto.AuthRequest;
import com.peluqueria.dto.AuthResponse;
import com.peluqueria.dto.RegisterRequest;
import com.peluqueria.model.Enterprise;
import com.peluqueria.model.Role;
import com.peluqueria.model.User;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final EnterpriseRepository enterpriseRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request) {
    Enterprise enterprise = null;
    Role role = Role.CLIENTE;

    // Si hay nombre de empresa, es un registro Profesional (ADMIN)
    if (request.getEnterpriseName() != null && !request.getEnterpriseName().trim().isEmpty()) {
      enterprise = enterpriseRepository.findByName(request.getEnterpriseName())
          .orElseGet(() -> {
            Enterprise newEnterprise = new Enterprise();
            newEnterprise.setName(request.getEnterpriseName());
            return enterpriseRepository.save(newEnterprise);
          });
      role = Role.ADMIN;
    }

    var user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(role)
        .enterprise(enterprise)
        .build();
    repository.save(user);

    Map<String, Object> extraClaims = new HashMap<>();
    if (enterprise != null) {
      extraClaims.put("enterpriseName", enterprise.getName());
      extraClaims.put("enterpriseId", enterprise.getId());
      extraClaims.put("primaryColor", enterprise.getPrimaryColor());
      extraClaims.put("secondaryColor", enterprise.getSecondaryColor());
    }
    extraClaims.put("role", user.getRole().name());

    var jwtToken = jwtService.generateToken(extraClaims, user);
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

    // Validar que el rol sea acorde al portal (requiredRole)
    if (request.getRequiredRole() != null) {
      boolean isValid = false;
      if (request.getRequiredRole().equalsIgnoreCase("ADMIN")) {
        // Portal profesional acepta ADMIN, SUPER_ADMIN y EMPLEADO
        isValid = user.getRole() == Role.ADMIN || user.getRole() == Role.SUPER_ADMIN || user.getRole() == Role.EMPLEADO;
      } else if (request.getRequiredRole().equalsIgnoreCase("CLIENTE")) {
        // Portal cliente solo acepta CLIENTE
        isValid = user.getRole() == Role.CLIENTE;
      }

      if (!isValid) {
        throw new BadCredentialsException("Credenciales inválidas para este portal");
      }
    }

    Map<String, Object> extraClaims = new HashMap<>();
    if (user.getEnterprise() != null) {
      extraClaims.put("enterpriseName", user.getEnterprise().getName());
      extraClaims.put("enterpriseId", user.getEnterprise().getId());
      extraClaims.put("primaryColor", user.getEnterprise().getPrimaryColor());
      extraClaims.put("secondaryColor", user.getEnterprise().getSecondaryColor());
    }
    extraClaims.put("role", user.getRole().name());

    var jwtToken = jwtService.generateToken(extraClaims, user);
    return AuthResponse.builder()
        .token(jwtToken)
        .build();
  }
}
