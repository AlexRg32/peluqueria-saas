package com.peluqueria.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkingHourDTO {
  private Long id;
  private String day;
  private String startTime;
  private String endTime;
  private boolean dayOff;
  private Long enterpriseId;
  private Long userId;
}
