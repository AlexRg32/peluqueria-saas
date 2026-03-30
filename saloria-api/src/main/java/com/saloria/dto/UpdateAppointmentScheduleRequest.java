package com.saloria.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAppointmentScheduleRequest {
  @NotNull(message = "La fecha es obligatoria")
  @FutureOrPresent(message = "La cita debe ser actual o futura")
  private LocalDateTime date;
}
