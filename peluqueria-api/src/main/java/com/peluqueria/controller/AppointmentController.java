package com.peluqueria.controller;

import com.peluqueria.dto.AppointmentResponse;
import com.peluqueria.dto.CreateAppointmentRequest;
import com.peluqueria.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<AppointmentResponse> create(@RequestBody CreateAppointmentRequest request) {
    return ResponseEntity.ok(appointmentService.create(request));
  }

  @GetMapping("/me")
  public ResponseEntity<List<AppointmentResponse>> getMyAppointments(java.security.Principal principal) {
    return ResponseEntity.ok(appointmentService.findByUserEmail(principal.getName()));
  }

  @GetMapping
  public ResponseEntity<List<AppointmentResponse>> getAll(@RequestParam Long enterpriseId) {
    return ResponseEntity.ok(appointmentService.findByEnterpriseId(enterpriseId));
  }

  @GetMapping("/employee/{employeeId}")
  public ResponseEntity<List<AppointmentResponse>> getByEmployee(@PathVariable Long employeeId) {
    return ResponseEntity.ok(appointmentService.findByEmployeeId(employeeId));
  }

  @PostMapping("/{id}/checkout")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<AppointmentResponse> checkout(@PathVariable Long id, @RequestBody Map<String, String> payload) {
    PaymentMethod method = PaymentMethod.valueOf(payload.get("paymentMethod"));
    return ResponseEntity.ok(appointmentService.checkout(id, method));
  }

  @GetMapping("/transactions")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<List<AppointmentResponse>> getTransactions(
      @RequestParam Long enterpriseId,
      @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime start,
      @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime end) {
    return ResponseEntity.ok(appointmentService.findTransactions(enterpriseId, start, end));
  }

  @GetMapping("/billing-summary")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<com.peluqueria.dto.BillingSummaryDTO> getBillingSummary(@RequestParam Long enterpriseId) {
    return ResponseEntity.ok(appointmentService.getBillingSummary(enterpriseId));
  }
}
