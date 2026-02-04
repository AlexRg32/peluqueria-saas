package com.peluqueria.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Entity
@Data
@Table(name = "appointments")
public class Appointment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime date;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enterprise_id", nullable = false)
  private Enterprise enterprise;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false)
  private Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id", nullable = false)
  private User employee;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "service_id", nullable = false)
  private ServiceOffering service;

  @Enumerated(EnumType.STRING)
  private AppointmentStatus status = AppointmentStatus.PENDING;

  private double price;

  @Column(name = "paid")
  private boolean paid = false;

  @Enumerated(EnumType.STRING)
  private PaymentMethod paymentMethod;

  private LocalDateTime paidAt;

}
