package com.saloria.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.saloria.dto.EnterpriseResponse;
import com.saloria.dto.PublicEnterpriseSummaryResponse;
import com.saloria.dto.WorkingHourDTO;
import com.saloria.service.EnterpriseService;
import com.saloria.service.WorkingHourService;

public class PublicControllerTest {

  private MockMvc mockMvc;
  private EnterpriseService enterpriseService;
  private com.saloria.service.ServiceOfferingService serviceOfferingService;
  private WorkingHourService workingHourService;
  private PublicController publicController;

  @BeforeEach
  public void setUp() {
    enterpriseService = mock(EnterpriseService.class);
    serviceOfferingService = mock(com.saloria.service.ServiceOfferingService.class);
    workingHourService = mock(WorkingHourService.class);
    publicController = new PublicController(enterpriseService, serviceOfferingService, workingHourService);
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

  @Test
  public void testGetPublicEnterprises() throws Exception {
    when(enterpriseService.findPublicDirectory("barber")).thenReturn(List.of(
        PublicEnterpriseSummaryResponse.builder()
            .id(1L)
            .slug("barberia-alex")
            .name("Barberia Alex")
            .city("Madrid")
            .services(List.of("Corte", "Barba"))
            .priceRange("€€")
            .build()));

    mockMvc.perform(get("/api/public/enterprises").param("q", "barber"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].slug").value("barberia-alex"))
        .andExpect(jsonPath("$[0].services[0]").value("Corte"));
  }

  @Test
  public void testGetEnterpriseWorkingHours() throws Exception {
    when(workingHourService.getEnterpriseHoursSnapshot(1L)).thenReturn(List.of(
        WorkingHourDTO.builder()
            .enterpriseId(1L)
            .day("LUNES")
            .startTime("09:00")
            .endTime("20:00")
            .dayOff(false)
            .build()));

    mockMvc.perform(get("/api/public/enterprises/1/working-hours"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].day").value("LUNES"))
        .andExpect(jsonPath("$[0].startTime").value("09:00"));
  }
}
