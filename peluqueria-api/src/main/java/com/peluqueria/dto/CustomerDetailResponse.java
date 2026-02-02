package com.peluqueria.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDetailResponse {
  private Long id;
  private String name;
  private String phone;
  private String email;
  private Integer visitsCount;
  private String internalNotes;
  private List<AppointmentSummaryDTO> appointments;
}
