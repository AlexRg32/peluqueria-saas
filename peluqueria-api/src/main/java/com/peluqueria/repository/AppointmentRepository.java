package com.peluqueria.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.peluqueria.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  List<Appointment> findByEnterpriseId(Long enterpriseId);
}
