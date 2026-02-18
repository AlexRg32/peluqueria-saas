package com.peluqueria.config;

import com.peluqueria.model.*;
import com.peluqueria.repository.*;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Configuration
@RequiredArgsConstructor
@Profile("!test")
public class DataSeeder {

  private final PortfolioSeederService seederService;

  @Bean
  CommandLineRunner initDatabase() {
    return args -> {
      boolean seedRequested = Arrays.asList(args).contains("--seed.portfolio=true") ||
          "true".equalsIgnoreCase(System.getProperty("seed.portfolio")) ||
          "true".equalsIgnoreCase(System.getenv("SEED_PORTFOLIO"));
      if (seedRequested) {
        seederService.seed();
      }
    };
  }

  @Service
  @RequiredArgsConstructor
  public static class PortfolioSeederService {
    private final EnterpriseRepository enterpriseRepository;
    private final UserRepository userRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;
    private final CustomerRepository customerRepository;
    private final AppointmentRepository appointmentRepository;
    private final WorkingHourRepository workingHourRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;

    private final Faker faker = new Faker(new Locale("es"));
    private final Random random = new Random();

    @Transactional
    public void seed() {
      System.out.println("🚀 SEEDING PORTFOLIO DATA...");
      // 1. LIMPIEZA TOTAL (Nuclear Reset)
      try {
        entityManager.createNativeQuery(
            "DO $$ DECLARE r RECORD; " +
                "BEGIN " +
                "  FOR r IN (SELECT constraint_name, table_name FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND table_schema = 'public') LOOP "
                +
                "    EXECUTE 'ALTER TABLE ' || quote_ident(r.table_name) || ' DROP CONSTRAINT ' || quote_ident(r.constraint_name); "
                +
                "  END LOOP; " +
                "END $$;")
            .executeUpdate();

        entityManager.createNativeQuery(
            "DO $$ DECLARE r RECORD; " +
                "BEGIN " +
                "  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%') LOOP "
                +
                "    EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE'; " +
                "  END LOOP; " +
                "END $$;")
            .executeUpdate();
        entityManager.flush();
      } catch (Exception e) {
        // Silent
      }

      // 2. CREAR EMPRESAS
      Enterprise mainEnterprise = createEnterprise("Peluking Premium ✨", "B12345678",
          "Calle de la Estética 12, Madrid", "peluking-premium");

      createEnterprise("Barbería Paco", "B87654321", "Calle del Peinado 5, Madrid", "barberia-paco");

      // 3. CREAR USUARIOS DE PRUEBA
      User admin = userRepository.save(User.builder()
          .name("Admin Peluquería")
          .email("admin@peluqueria.com")
          .password(passwordEncoder.encode("password123"))
          .role(Role.ADMIN)
          .enterprise(mainEnterprise)
          .phone("600111222")
          .active(true)
          .build());

      User employee = userRepository.save(User.builder()
          .name("Juan Cortes")
          .email("trabajador@peluqueria.com")
          .password(passwordEncoder.encode("password123"))
          .role(Role.EMPLEADO)
          .enterprise(mainEnterprise)
          .phone("600333444")
          .active(true)
          .build());

      userRepository.save(User.builder()
          .name("Alberto Cliente")
          .email("cliente@peluqueria.com")
          .password(passwordEncoder.encode("password123"))
          .role(Role.CLIENTE)
          .phone("600555666")
          .active(true)
          .build());

      userRepository.save(User.builder()
          .name("Super Administrador")
          .email("superadmin@peluqueria.com")
          .password(passwordEncoder.encode("password123"))
          .role(Role.SUPER_ADMIN)
          .active(true)
          .build());

      // 4. CREAR SERVICIOS
      List<ServiceOffering> services = new ArrayList<>();
      services.add(createService("Corte Moderno", "Corte", 18.50, 30, mainEnterprise));
      services.add(createService("Arreglo de Barba", "Barba", 12.00, 20, mainEnterprise));
      services.add(createService("Corte + Barba Premium", "Combo", 28.00, 60, mainEnterprise));
      services.add(createService("Tratamiento Capilar", "Tratamiento", 35.00, 45, mainEnterprise));
      services.add(createService("Corte Infantil", "Corte", 14.50, 25, mainEnterprise));
      services.add(createService("Degradado Extremo", "Corte", 22.00, 40, mainEnterprise));
      serviceOfferingRepository.saveAll(services);

      // 5. HORARIOS
      seedWorkingHours(mainEnterprise, admin);
      seedWorkingHours(mainEnterprise, employee);

      // 6. CLIENTES
      List<Customer> customers = new ArrayList<>();
      for (int i = 0; i < 20; i++) {
        customers.add(Customer.builder()
            .name(faker.name().fullName())
            .email(faker.internet().emailAddress())
            .phone(faker.phoneNumber().phoneNumber())
            .enterprise(mainEnterprise)
            .visitsCount(random.nextInt(0, 10))
            .build());
      }
      customerRepository.saveAll(customers);

      // Create a customer link for the test client
      User clientUser = userRepository.findByEmail("cliente@peluqueria.com").get();
      Customer linkedCustomer = customerRepository.save(Customer.builder()
          .name(clientUser.getName())
          .email(clientUser.getEmail())
          .phone(clientUser.getPhone())
          .enterprise(mainEnterprise)
          .user(clientUser)
          .visitsCount(3)
          .build());
      customers.add(linkedCustomer);

      // 7. CITAS
      seedAppointments(mainEnterprise, List.of(admin, employee), services, customers);
      System.out.println("✅ SEEDING COMPLETED SUCCESSFULLY!");
    }

    private Enterprise createEnterprise(String name, String cif, String address, String slug) {
      Enterprise e = new Enterprise();
      e.setName(name);
      e.setCif(cif);
      e.setAddress(address);
      e.setSlug(slug);
      return enterpriseRepository.save(e);
    }

    private ServiceOffering createService(String name, String cat, double price, int duration, Enterprise ent) {
      ServiceOffering s = new ServiceOffering();
      s.setName(name);
      s.setCategory(cat);
      s.setPrice(price);
      s.setDuration(duration);
      s.setEnterprise(ent);
      return s;
    }

    private void seedWorkingHours(Enterprise ent, User user) {
      String[] days = { "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" };
      for (String day : days) {
        WorkingHour wh = new WorkingHour();
        wh.setDay(day);
        wh.setStartTime("09:00");
        wh.setEndTime(day.equals("Sábado") ? "14:00" : "20:00");
        wh.setDayOff(false);
        wh.setEnterprise(ent);
        wh.setUser(user);
        workingHourRepository.save(wh);
      }
    }

    private void seedAppointments(Enterprise ent, List<User> employees, List<ServiceOffering> services,
        List<Customer> customers) {
      for (int i = 0; i < 50; i++) {
        Appointment a = new Appointment();
        int randomDays = random.nextInt(-30, 15);
        int randomHour = random.nextInt(9, 19);
        LocalDateTime date = LocalDateTime.now().plusDays(randomDays).withHour(randomHour).withMinute(0).withSecond(0)
            .withNano(0);

        a.setDate(date);
        a.setEnterprise(ent);
        a.setEmployee(employees.get(random.nextInt(employees.size())));
        ServiceOffering service = services.get(random.nextInt(services.size()));
        a.setService(service);
        a.setPrice(service.getPrice());
        a.setCustomer(customers.get(random.nextInt(customers.size())));

        if (date.isBefore(LocalDateTime.now())) {
          a.setStatus(AppointmentStatus.COMPLETED);
          a.setPaid(true);
          a.setPaymentMethod(PaymentMethod.CARD);
          a.setPaidAt(date);
        } else {
          a.setStatus(AppointmentStatus.PENDING);
        }
        appointmentRepository.save(a);
      }
    }
  }
}
