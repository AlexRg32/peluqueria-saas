package com.peluqueria.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentSummaryDTO {
  private Long id;
  private LocalDateTime date;
  private String serviceName;
  private double price;
  private String employeeName;
  private String status;
}
