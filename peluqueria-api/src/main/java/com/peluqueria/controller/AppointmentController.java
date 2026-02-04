package com.peluqueria.controller;

import com.peluqueria.dto.AppointmentResponse;
import com.peluqueria.dto.CreateAppointmentRequest;
import com.peluqueria.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.peluqueria.model.PaymentMethod;
import java.util.List;
import java.util.Map;

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

  @PostMapping("/{id}/checkout")
  public ResponseEntity<AppointmentResponse> checkout(@PathVariable Long id, @RequestBody Map<String, String> payload) {
    PaymentMethod method = PaymentMethod.valueOf(payload.get("paymentMethod"));
    return ResponseEntity.ok(appointmentService.checkout(id, method));
  }
}
