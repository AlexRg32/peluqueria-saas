package com.peluqueria.util;

import com.peluqueria.model.Customer;
import com.peluqueria.model.Enterprise;
import com.peluqueria.repository.CustomerRepository;
import com.peluqueria.repository.EnterpriseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// @Component
@RequiredArgsConstructor
public class CustomerDataSeeder implements CommandLineRunner {

  private final CustomerRepository customerRepository;
  private final EnterpriseRepository enterpriseRepository;

  @Override
  public void run(String... args) throws Exception {
    if (customerRepository.count() > 10) {
      return; // Skip if already seeded
    }

    Enterprise enterprise = enterpriseRepository.findById(4L).orElse(null);
    if (enterprise == null) {
      // Fallback if 4 doesn't exist
      enterprise = enterpriseRepository.findAll().stream().findFirst().orElse(null);
    }

    if (enterprise == null) {
      return;
    }

    String[] firstNames = { "Alex", "Maria", "Juan", "Elena", "Pablo", "Lucia", "Carlos", "Sonia", "David", "Laura",
        "Pedro", "Ana", "Jose", "Marta", "Diego", "Carmen" };
    String[] lastNames = { "Garcia", "Rodriguez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez",
        "Ruiz", "Hernandez", "Diaz", "Moreno", "Muñoz", "Alvarez", "Romero" };
    Random random = new Random();

    List<Customer> dummyCustomers = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
      String name = firstNames[random.nextInt(firstNames.length)] + " " + lastNames[random.nextInt(lastNames.length)];
      String phone = "6" + (10000000 + random.nextInt(89999999));
      String email = name.toLowerCase().replace(" ", ".") + i + "@example.com";

      Customer customer = Customer.builder()
          .name(name)
          .phone(phone)
          .email(email)
          .enterprise(enterprise)
          .visitsCount(random.nextInt(20))
          .internalNotes("Nota de prueba para " + name + ". Cliente habitual.")
          .build();
      dummyCustomers.add(customer);
    }

    customerRepository.saveAll(dummyCustomers);
    System.out.println("✅ Seeded 100 dummy customers for enterprise: " + enterprise.getName());
  }
}
