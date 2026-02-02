package com.peluqueria.repository;

import com.peluqueria.model.WorkingHour;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkingHourRepository extends JpaRepository<WorkingHour, Long> {
  List<WorkingHour> findByEnterpriseIdAndUserIdIsNull(Long enterpriseId);

  List<WorkingHour> findByUser_Id(Long userId);

  List<WorkingHour> findByEnterpriseId(Long enterpriseId);
}
