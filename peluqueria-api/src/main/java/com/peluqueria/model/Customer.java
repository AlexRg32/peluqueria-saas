package com.peluqueria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@lombok.EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers")
public class Customer extends AuditableEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String phone;
  private String email;

  @Builder.Default
  private Integer visitsCount = 0;

  @Column(columnDefinition = "TEXT")
  private String internalNotes;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enterprise_id", nullable = false)
  private Enterprise enterprise;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = true)
  private User user;
}
