package com.peluqueria.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceOfferingRequest {
  private String name;
  private String description;
  private double price;
  private Integer duration;
  private String category;
  private Long enterpriseId;
}
