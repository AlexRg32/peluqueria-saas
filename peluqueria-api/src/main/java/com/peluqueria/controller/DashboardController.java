package com.peluqueria.controller;

import com.peluqueria.dto.DashboardStatsDTO;
import com.peluqueria.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "5. Dashboard y Métricas", description = "Indicadores y métricas globales para el panel inicial del administrador.")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

  private final DashboardService dashboardService;

  @Operation(summary = "Obtener métricas del Dashboard", description = "Calcula total de citas del día, total de ingresos estimados del mes y estadísticas demográficas.")
  @GetMapping("/stats/{enterpriseId}")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<DashboardStatsDTO> getStats(@PathVariable Long enterpriseId) {
    return ResponseEntity.ok(dashboardService.getStats(enterpriseId));
  }
}
