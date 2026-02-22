package com.peluqueria.controller;

import com.peluqueria.dto.CustomerDetailResponse;
import com.peluqueria.dto.CustomerResponse;
import com.peluqueria.dto.UpdateCustomerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Tag(name = "9. Clientes", description = "Fichas de clientes, historial asociado e información de contacto centralizada en este panel.")
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

  private final com.peluqueria.service.CustomerService customerService;

  @Operation(summary = "Listado de clientes", description = "Listado paginado/completo con nombres, nota o etiqueta, de clientes registrados para la empresa.")
  @GetMapping("/enterprise/{enterpriseId}")
  public ResponseEntity<List<CustomerResponse>> getCustomersByEnterprise(@PathVariable Long enterpriseId) {
    return ResponseEntity.ok(customerService.getCustomersByEnterprise(enterpriseId));
  }

  @Operation(summary = "Expediente del cliente", description = "Obtiene los detalles integrales de contacto, además de sumar/listar el historial de citas vinculadas si existieran.")
  @GetMapping("/{id}")
  public ResponseEntity<CustomerDetailResponse> getCustomerDetails(@PathVariable Long id) {
    return ResponseEntity.ok(customerService.getCustomerDetails(id));
  }

  @Operation(summary = "Actualizar datos/notas de cliente", description = "Edita la ficha principal del cliente.")
  @PatchMapping("/{id}")
  public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable Long id,
      @RequestBody UpdateCustomerRequest request) {
    return ResponseEntity.ok(customerService.updateCustomer(id, request));
  }
}
