package com.peluqueria.controller;

import com.peluqueria.dto.WorkingHourDTO;
import com.peluqueria.service.WorkingHourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/working-hours")
@RequiredArgsConstructor
public class WorkingHourController {

  private final WorkingHourService workingHourService;

  @GetMapping("/enterprise/{enterpriseId}")
  public ResponseEntity<List<WorkingHourDTO>> getEnterpriseHours(@PathVariable Long enterpriseId) {
    return ResponseEntity.ok(workingHourService.getEnterpriseHours(enterpriseId));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<WorkingHourDTO>> getUserHours(@PathVariable Long userId) {
    return ResponseEntity.ok(workingHourService.getUserHours(userId));
  }

  @PutMapping("/batch")
  public ResponseEntity<List<WorkingHourDTO>> saveBatch(@RequestBody List<WorkingHourDTO> dtos) {
    return ResponseEntity.ok(workingHourService.saveBatch(dtos));
  }
}
