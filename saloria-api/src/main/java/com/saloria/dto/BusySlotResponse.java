package com.saloria.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusySlotResponse {
  private Long appointmentId;
  private LocalDateTime start;
  private LocalDateTime end;
  private String status;
}
