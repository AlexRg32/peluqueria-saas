package com.peluqueria.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.peluqueria.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEnterpriseId(Long enterpriseId);

  List<User> findByEnterpriseIdAndRole(Long enterpriseId, com.peluqueria.model.Role role);

  Optional<User> findByEmail(String email);
}
