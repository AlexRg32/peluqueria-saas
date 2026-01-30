package com.peluqueria.config;

import com.peluqueria.model.Role;
import com.peluqueria.model.User;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final StorageService storageService;

  @Override
  public void run(String... args) throws Exception {
    storageService.init();
    String email = "dios@dios.com";

    if (userRepository.findByEmail(email).isEmpty()) {
      User superAdmin = User.builder()
          .name("dios")
          .email(email)
          .password(passwordEncoder.encode("dios"))
          .role(Role.SUPER_ADMIN)
          .build();

      userRepository.save(superAdmin);
      System.out.println("SUPER_ADMIN user created: " + email);
    }
  }
}
