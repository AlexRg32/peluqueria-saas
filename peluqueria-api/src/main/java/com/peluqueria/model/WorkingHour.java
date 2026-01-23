package com.peluqueria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import jakarta.persistence.Table;

@Entity
@Data
@Table(name = "working_hours")
public class WorkingHour {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String day;

  private String startTime;

  private String endTime;

  private boolean is_day_off;

  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enterprise_id", nullable = false)
  private Enterprise enterprise;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
}
