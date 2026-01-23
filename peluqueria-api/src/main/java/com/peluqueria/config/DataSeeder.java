package com.peluqueria.config;

import com.peluqueria.model.Enterprise;
import com.peluqueria.model.ServiceOffering;
import com.peluqueria.model.User;
import com.peluqueria.model.Role;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.repository.ServiceOfferingRepository;
import com.peluqueria.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

  @Bean
  CommandLineRunner initDatabase(EnterpriseRepository enterpriseRepository,
      ServiceOfferingRepository serviceOfferingRepository,
      UserRepository userRepository) {
    return args -> {
      if (enterpriseRepository.count() == 0) {
        // 1. MACIA BARBER
        Enterprise macia = new Enterprise();
        macia.setName("Macia Barber");
        macia.setCif("B11111111");
        macia.setAddress("Calle Peluquería 1");
        enterpriseRepository.save(macia);

        createUser("Joel", "joel@maciabarber.com", macia, userRepository);
        createUser("Alejandro", "alejandro@maciabarber.com", macia, userRepository);

        createService("Corte Clásico", 15.0, 30, macia, serviceOfferingRepository);
        createService("Corte Degradado", 20.0, 45, macia, serviceOfferingRepository);

        // 2. BARBERÍA SERGIO
        Enterprise sergioEnt = new Enterprise();
        sergioEnt.setName("Barbería Sergio");
        sergioEnt.setCif("B22222222");
        sergioEnt.setAddress("Avenida Barbero 22");
        enterpriseRepository.save(sergioEnt);

        createUser("Sergio", "sergio@barberiasergio.com", sergioEnt, userRepository);
        createUser("Juaki", "juaki@barberiasergio.com", sergioEnt, userRepository);
        createUser("Giovanny", "giovanny@barberiasergio.com", sergioEnt, userRepository);

        createService("Corte Clásico", 15.0, 30, sergioEnt, serviceOfferingRepository);
        createService("Barba Premium", 12.0, 25, sergioEnt, serviceOfferingRepository);

        // 3. BARBERÍA HB
        Enterprise hb = new Enterprise();
        hb.setName("Barbería HB");
        hb.setCif("B33333333");
        hb.setAddress("Plaza HB 3");
        enterpriseRepository.save(hb);

        createUser("Jamid", "jamid@barberiahb.com", hb, userRepository);
        createUser("Joel", "joel@barberiahb.com", hb, userRepository);

        createService("Corte + Barba", 25.0, 60, hb, serviceOfferingRepository);
        createService("Corte Infantil", 12.0, 20, hb, serviceOfferingRepository);

        System.out.println("Base de datos inicializada con Macia Barber, Barbería Sergio y Barbería HB.");
      }
    };
  }

  private void createUser(String name, String email, Enterprise enterprise, UserRepository userRepository) {
    User user = new User();
    user.setName(name);
    user.setEmail(email);
    user.setPassword("123456");
    user.setRole(Role.EMPLEADO);
    user.setEnterprise(enterprise);
    userRepository.save(user);
  }

  private void createService(String name, double price, int duration, Enterprise enterprise,
      ServiceOfferingRepository repo) {
    ServiceOffering s = new ServiceOffering();
    s.setName(name);
    s.setPrice(price);
    s.setDuration(duration);
    s.setCategory("General");
    s.setEnterprise(enterprise);
    repo.save(s);
  }
}
