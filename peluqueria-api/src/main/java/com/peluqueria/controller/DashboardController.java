package com.peluqueria.controller;

import com.peluqueria.dto.DashboardStatsDTO;
import com.peluqueria.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping("/stats/{enterpriseId}")
  public ResponseEntity<DashboardStatsDTO> getStats(@PathVariable Long enterpriseId) {
    return ResponseEntity.ok(dashboardService.getStats(enterpriseId));
  }
}
