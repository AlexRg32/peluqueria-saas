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
public class AppointmentResponse {
  private Long id;
  private String customerName;
  private String customerPhone;
  private String employeeName;
  private String serviceName;
  private LocalDateTime date;
  private Integer duration;
  private double price;
  private String status;
  private boolean paid;
  private String paymentMethod;
  private LocalDateTime paidAt;
  private Long enterpriseId;
  private String enterpriseName;
  private String enterpriseSlug;
}
