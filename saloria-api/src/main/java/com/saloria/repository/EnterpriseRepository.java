package com.saloria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.saloria.model.Enterprise;
import java.util.Optional;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
  Optional<Enterprise> findByCif(String cif);

  Optional<Enterprise> findByName(String name);

  Optional<Enterprise> findBySlug(String slug);
}
