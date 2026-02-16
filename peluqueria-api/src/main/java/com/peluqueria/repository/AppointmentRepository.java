package com.peluqueria.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.peluqueria.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  List<Appointment> findByEnterpriseId(Long enterpriseId);

  void deleteByEmployeeId(Long employeeId);

  void deleteByCustomerId(Long customerId);

  List<Appointment> findByCustomerIdOrderByDateDesc(Long customerId);

  List<Appointment> findByCustomerUserIdOrderByDateDesc(Long userId);

  long countByEnterpriseId(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT SUM(a.price) FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.paid = true")
  Double sumRevenueByEnterpriseId(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT COUNT(a) FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.status = 'PENDING'")
  long countPendingByEnterpriseId(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT s.name as name, COUNT(a) as count FROM Appointment a JOIN a.service s WHERE a.enterprise.id = :enterpriseId GROUP BY s.name ORDER BY COUNT(a) DESC")
  List<Object[]> findPopularServices(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT e.name as name, COUNT(a) as count FROM Appointment a JOIN a.employee e WHERE a.enterprise.id = :enterpriseId GROUP BY e.name ORDER BY COUNT(a) DESC")
  List<Object[]> findEmployeePerformance(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT CAST(a.date AS date) as date, SUM(a.price) as revenue FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.paid = true GROUP BY CAST(a.date AS date) ORDER BY CAST(a.date AS date) ASC")
  List<Object[]> findRevenueByDate(Long enterpriseId);

  @org.springframework.data.jpa.repository.Query("SELECT a FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.status = 'COMPLETED' AND a.date BETWEEN :start AND :end ORDER BY a.date DESC")
  List<Appointment> findTransactions(Long enterpriseId, java.time.LocalDateTime start, java.time.LocalDateTime end);

  @org.springframework.data.jpa.repository.Query("SELECT SUM(a.price) FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.paid = true AND a.date >= :start")
  Double sumRevenueSince(Long enterpriseId, java.time.LocalDateTime start);

  List<Appointment> findByEmployeeIdAndDateBetween(Long employeeId, java.time.LocalDateTime start,
      java.time.LocalDateTime end);

  List<Appointment> findByEmployeeIdOrderByDateDesc(Long employeeId);
}
