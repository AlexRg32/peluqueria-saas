package com.peluqueria.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DashboardStatsDTO {
  private double totalRevenue;
  private long totalAppointments;
  private long totalCustomers;
  private long pendingAppointments;
  private List<ChartDataDTO> revenueChart;
  private List<PopularItemDTO> popularServices;
  private List<PopularItemDTO> employeePerformance;

  @Data
  @Builder
  public static class ChartDataDTO {
    private String label;
    private double value;
  }

  @Data
  @Builder
  public static class PopularItemDTO {
    private String name;
    private long count;
  }
}
