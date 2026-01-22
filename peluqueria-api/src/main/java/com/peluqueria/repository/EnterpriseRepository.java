package com.peluqueria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.peluqueria.model.Enterprise;
import java.util.Optional;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
  Optional<Enterprise> findByCif(String cif);
}
