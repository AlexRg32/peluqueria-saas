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
public class CreateAppointmentRequest {
  private Long userId;
  private Long employeeId;
  private Long serviceId;
  private Long enterpriseId;
  private LocalDateTime date;
}
