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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@Table(name = "services")
public class ServiceOffering {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String description;

  private double price;

  private String image;

  private Integer duration;

  private String category;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enterprise_id", nullable = false)
  @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
  private Enterprise enterprise;

}
