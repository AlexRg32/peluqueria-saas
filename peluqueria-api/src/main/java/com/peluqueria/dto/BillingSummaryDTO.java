package com.peluqueria.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BillingSummaryDTO {
  private double revenueToday;
  private double revenueThisWeek;
  private double revenueThisMonth;
  private long transactionsCount;
}
