package com.peluqueria.config;

import com.peluqueria.model.*;
import com.peluqueria.repository.*;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

// @Component
@RequiredArgsConstructor
public class BulkDataSeeder implements CommandLineRunner {

  private final EnterpriseRepository enterpriseRepository;
  private final UserRepository userRepository;
  private final ServiceOfferingRepository serviceOfferingRepository;
  private final CustomerRepository customerRepository;
  private final AppointmentRepository appointmentRepository;
  private final PasswordEncoder passwordEncoder;

  private final Faker faker = new Faker(new Locale("es"));
  private final Random random = new Random();

  @Override
  public void run(String... args) throws Exception {
    String seedBulk = System.getProperty("seed.bulk", System.getenv("SEED_BULK"));

    if (!"true".equalsIgnoreCase(seedBulk)) {
      return;
    }

    System.out.println("Starting Bulk Data Seeding...");

    List<Enterprise> enterprises = enterpriseRepository.findAll();
    if (enterprises.isEmpty()) {
      System.out.println("No enterprises found. Please ensure initial data is seeded first.");
      return;
    }

    for (Enterprise enterprise : enterprises) {
      System.out.println("Seeding data for enterprise: " + enterprise.getName());

      // 1. Ensure services
      List<ServiceOffering> services = seedServices(enterprise);

      // 2. Ensure employees
      List<User> employees = seedEmployees(enterprise);

      // 3. Ensure customers
      List<Customer> customers = seedCustomers(enterprise);

      // 4. Seed appointments
      seedAppointments(enterprise, services, employees, customers);
    }

    System.out.println("Bulk Data Seeding completed successfully.");
  }

  private List<ServiceOffering> seedServices(Enterprise enterprise) {
    List<ServiceOffering> existing = serviceOfferingRepository.findByEnterpriseId(enterprise.getId());
    if (existing.size() >= 8)
      return existing;

    String[] categories = { "Corte", "Barba", "Color", "Tratamiento", "Estética" };
    List<ServiceOffering> created = new ArrayList<>(existing);

    for (int i = 0; i < 10 - existing.size(); i++) {
      ServiceOffering s = new ServiceOffering();
      s.setName(faker.commerce().productName() + " " + i);
      s.setPrice(random.nextInt(15, 60));
      s.setDuration(random.nextBoolean() ? 30 : 60);
      s.setCategory(categories[random.nextInt(categories.length)]);
      s.setEnterprise(enterprise);
      created.add(serviceOfferingRepository.save(s));
    }
    return created;
  }

  private List<User> seedEmployees(Enterprise enterprise) {
    List<User> existing = userRepository.findByEnterpriseIdAndRole(enterprise.getId(), Role.EMPLEADO);
    if (existing.size() >= 5)
      return existing;

    List<User> created = new ArrayList<>(existing);
    for (int i = 0; i < 5 - existing.size(); i++) {
      User user = new User();
      user.setName(faker.name().fullName());
      user.setEmail(
          faker.internet().emailAddress(user.getName().toLowerCase().replace(" ", ".") + "." + enterprise.getId()));
      user.setPassword(passwordEncoder.encode("123456"));
      user.setRole(Role.EMPLEADO);
      user.setEnterprise(enterprise);
      created.add(userRepository.save(user));
    }
    return created;
  }

  private List<Customer> seedCustomers(Enterprise enterprise) {
    long count = customerRepository.countByEnterpriseId(enterprise.getId());
    if (count >= 50)
      return customerRepository.findByEnterpriseId(enterprise.getId());

    List<Customer> created = new ArrayList<>();
    for (int i = 0; i < 50; i++) {
      Customer c = Customer.builder()
          .name(faker.name().fullName())
          .email(faker.internet().emailAddress())
          .phone(faker.phoneNumber().phoneNumber())
          .enterprise(enterprise)
          .visitsCount(random.nextInt(0, 10))
          .internalNotes(faker.lorem().sentence())
          .build();
      created.add(customerRepository.save(c));
    }
    return created;
  }

  private void seedAppointments(Enterprise enterprise, List<ServiceOffering> services, List<User> employees,
      List<Customer> customers) {
    long count = appointmentRepository.countByEnterpriseId(enterprise.getId());
    if (count >= 100)
      return;

    for (int i = 0; i < 200; i++) {
      Appointment a = new Appointment();

      // Random date between 30 days ago and 15 days ahead
      int randomDays = random.nextInt(-30, 15);
      int randomHour = random.nextInt(9, 20);
      int randomMinute = random.nextBoolean() ? 0 : 30;

      LocalDateTime date = LocalDateTime.now().plusDays(randomDays).withHour(randomHour).withMinute(randomMinute)
          .withSecond(0).withNano(0);

      a.setDate(date);
      a.setEnterprise(enterprise);
      a.setEmployee(employees.get(random.nextInt(employees.size())));

      ServiceOffering service = services.get(random.nextInt(services.size()));
      a.setService(service);
      a.setPrice(service.getPrice());

      a.setCustomer(customers.get(random.nextInt(customers.size())));

      if (date.isBefore(LocalDateTime.now())) {
        a.setStatus(AppointmentStatus.COMPLETED);
      } else {
        a.setStatus(AppointmentStatus.PENDING);
      }

      appointmentRepository.save(a);
    }
  }
}
