package com.saloria.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.saloria.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEnterpriseId(Long enterpriseId);

  List<User> findByEnterpriseIdAndRole(Long enterpriseId, com.saloria.model.Role role);

  Optional<User> findByEmail(String email);
}
