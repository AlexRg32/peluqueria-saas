package com.peluqueria.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.peluqueria.service.EnterpriseService;

import java.util.List;
import com.peluqueria.model.Enterprise;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/enterprises")
@CrossOrigin(origins = "http://localhost:3000")
public class EnterpriseController {

  @Autowired
  private EnterpriseService enterpriseService;

  @GetMapping
  public List<Enterprise> findAll() {
    return enterpriseService.findAll();
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Enterprise enterprise) {
    try {
      Enterprise newEnterprise = enterpriseService.save(enterprise);
      return ResponseEntity.ok(newEnterprise);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable Long id) {
    try {
      Enterprise enterprise = enterpriseService.findById(id);
      return ResponseEntity.ok(enterprise);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @org.springframework.web.bind.annotation.PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Enterprise enterprise) {
    try {
      Enterprise updatedEnterprise = enterpriseService.update(id, enterprise);
      return ResponseEntity.ok(updatedEnterprise);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
