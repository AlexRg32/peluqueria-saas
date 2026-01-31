package com.peluqueria.controller;

import com.peluqueria.dto.AppointmentResponse;
import com.peluqueria.dto.CreateAppointmentRequest;
import com.peluqueria.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AppointmentController {

  private final AppointmentService appointmentService;

  @PostMapping
  public ResponseEntity<AppointmentResponse> create(@RequestBody CreateAppointmentRequest request) {
    return ResponseEntity.ok(appointmentService.create(request));
  }

  @GetMapping
  public ResponseEntity<List<AppointmentResponse>> getAll(@RequestParam Long enterpriseId) {
    return ResponseEntity.ok(appointmentService.findByEnterpriseId(enterpriseId));
  }
}
