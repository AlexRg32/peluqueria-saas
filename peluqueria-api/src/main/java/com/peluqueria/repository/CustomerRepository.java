package com.peluqueria.repository;

import com.peluqueria.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  List<Customer> findByEnterpriseId(Long enterpriseId);

  Optional<Customer> findByEnterpriseIdAndUserId(Long enterpriseId, Long userId);

  Optional<Customer> findByEnterpriseIdAndPhone(Long enterpriseId, String phone);

  Optional<Customer> findByUserId(Long userId);
}
