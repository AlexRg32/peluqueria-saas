package com.peluqueria.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.peluqueria.model.Enterprise;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.dto.EnterpriseResponse;

@ExtendWith(MockitoExtension.class)
public class EnterpriseServiceTest {

  @Mock
  private EnterpriseRepository enterpriseRepository;

  @InjectMocks
  private EnterpriseService enterpriseService;

  @Test
  public void testFindBySlug() {
    String slug = "barberia-alex";
    Enterprise enterprise = new Enterprise();
    enterprise.setId(1L);
    enterprise.setName("Barberia Alex");
    enterprise.setSlug(slug);

    when(enterpriseRepository.findBySlug(slug)).thenReturn(Optional.of(enterprise));

    EnterpriseResponse response = enterpriseService.findBySlug(slug);

    assertNotNull(response);
    assertEquals("Barberia Alex", response.getName());
    assertEquals(slug, response.getSlug());
  }
}
