package com.saloria.dto;

import com.saloria.model.AppointmentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAppointmentStatusRequest {
  @NotNull(message = "El estado es obligatorio")
  private AppointmentStatus status;
}
