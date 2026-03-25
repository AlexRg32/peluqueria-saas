package com.saloria.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicEnterpriseSummaryResponse {
  private Long id;
  private String slug;
  private String name;
  private String city;
  private Double rating;
  private Integer reviewCount;
  private String thumbnail;
  private List<String> services;
  private String priceRange;
  private String address;
}
