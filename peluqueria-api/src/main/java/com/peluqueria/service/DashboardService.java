package com.peluqueria.service;

import com.peluqueria.dto.DashboardStatsDTO;
import com.peluqueria.repository.AppointmentRepository;
import com.peluqueria.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

  private final AppointmentRepository appointmentRepository;
  private final CustomerRepository customerRepository;

  public DashboardStatsDTO getStats(Long enterpriseId) {
    Double totalRevenue = appointmentRepository.sumRevenueByEnterpriseId(enterpriseId);
    long totalAppointments = appointmentRepository.countByEnterpriseId(enterpriseId);
    long pendingAppointments = appointmentRepository.countPendingByEnterpriseId(enterpriseId);
    long totalCustomers = customerRepository.countByEnterpriseId(enterpriseId);

    List<DashboardStatsDTO.PopularItemDTO> popularServices = appointmentRepository.findPopularServices(enterpriseId)
        .stream()
        .map(obj -> DashboardStatsDTO.PopularItemDTO.builder()
            .name((String) obj[0])
            .count((Long) obj[1])
            .build())
        .collect(Collectors.toList());

    List<DashboardStatsDTO.PopularItemDTO> employeePerformance = appointmentRepository
        .findEmployeePerformance(enterpriseId)
        .stream()
        .map(obj -> DashboardStatsDTO.PopularItemDTO.builder()
            .name((String) obj[0])
            .count((Long) obj[1])
            .build())
        .collect(Collectors.toList());

    List<DashboardStatsDTO.ChartDataDTO> revenueChart = appointmentRepository.findRevenueByDate(enterpriseId)
        .stream()
        .map(obj -> DashboardStatsDTO.ChartDataDTO.builder()
            .label(obj[0].toString())
            .value((Double) obj[1])
            .build())
        .collect(Collectors.toList());

    return DashboardStatsDTO.builder()
        .totalRevenue(totalRevenue != null ? totalRevenue : 0.0)
        .totalAppointments(totalAppointments)
        .totalCustomers(totalCustomers)
        .pendingAppointments(pendingAppointments)
        .popularServices(popularServices)
        .employeePerformance(employeePerformance)
        .revenueChart(revenueChart)
        .build();
  }
}
