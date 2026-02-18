package com.peluqueria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "enterprises")
public class Enterprise {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String name;

  private String cif;

  private String address;

  private String phone;

  private String email;

  private String website;

  private String logo;

  private String banner;

  private String instagram;

  private String facebook;

  private String tiktok;

  private String whatsapp;

  private String primaryColor;

  private String secondaryColor;

  private String description;

  @Column(unique = true)
  private String slug;
}
