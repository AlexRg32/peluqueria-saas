package com.peluqueria.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.peluqueria.dto.EnterpriseResponse;
import com.peluqueria.service.EnterpriseService;

public class PublicControllerTest {

  private MockMvc mockMvc;
  private EnterpriseService enterpriseService;
  private com.peluqueria.service.ServiceOfferingService serviceOfferingService;
  private PublicController publicController;

  @BeforeEach
  public void setUp() {
    enterpriseService = mock(EnterpriseService.class);
    serviceOfferingService = mock(com.peluqueria.service.ServiceOfferingService.class);
    publicController = new PublicController(enterpriseService, serviceOfferingService);
    mockMvc = MockMvcBuilders.standaloneSetup(publicController).build();
  }

  @Test
  public void testGetEnterpriseBySlug() throws Exception {
    String slug = "barberia-alex";
    EnterpriseResponse response = EnterpriseResponse.builder()
        .id(1L)
        .name("Barberia Alex")
        .slug(slug)
        .build();

    doReturn(response).when(enterpriseService).findBySlug(any());

    mockMvc.perform(get("/api/public/enterprises/slug/" + slug))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Barberia Alex"));

    verify(enterpriseService).findBySlug(slug);
  }
}
