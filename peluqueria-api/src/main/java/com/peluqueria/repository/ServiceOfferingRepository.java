package com.peluqueria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.peluqueria.model.ServiceOffering;
import java.util.List;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {
  List<ServiceOffering> findByEnterpriseId(Long enterpriseId);

  List<ServiceOffering> findByEnterpriseIdAndDeletedFalse(Long enterpriseId);
}
