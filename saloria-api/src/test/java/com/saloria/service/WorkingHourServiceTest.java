package com.saloria.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.access.AccessDeniedException;

import com.saloria.dto.WorkingHourDTO;
import com.saloria.exception.ResourceNotFoundException;
import com.saloria.model.Enterprise;
import com.saloria.model.User;
import com.saloria.model.WorkingHour;
import com.saloria.repository.EnterpriseRepository;
import com.saloria.repository.UserRepository;
import com.saloria.repository.WorkingHourRepository;

public class WorkingHourServiceTest {

  @Mock
  private WorkingHourRepository workingHourRepository;
  @Mock
  private EnterpriseRepository enterpriseRepository;
  @Mock
  private UserRepository userRepository;

  private WorkingHourService workingHourService;
  private Enterprise ownEnterprise;
  private User employee;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    workingHourService = new WorkingHourService(workingHourRepository, enterpriseRepository, userRepository);
    ownEnterprise = Enterprise.builder().id(1L).name("Salon Norte").build();
    employee = User.builder().id(31L).name("Alex").enterprise(ownEnterprise).build();
  }

  @Test
  void saveBatchRejectsExistingWorkingHourFromAnotherEnterprise() {
    Enterprise foreignEnterprise = Enterprise.builder().id(2L).name("Salon Sur").build();
    WorkingHour existing = new WorkingHour();
    existing.setId(99L);
    existing.setEnterprise(foreignEnterprise);

    WorkingHourDTO dto = WorkingHourDTO.builder()
        .id(99L)
        .day("LUNES")
        .startTime("09:00")
        .endTime("18:00")
        .enterpriseId(1L)
        .build();

    when(workingHourRepository.findById(99L)).thenReturn(Optional.of(existing));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(ownEnterprise));

    assertThrows(AccessDeniedException.class, () -> workingHourService.saveBatch(List.of(dto)));
  }

  @Test
  void saveBatchRejectsEmployeeFromAnotherEnterprise() {
    WorkingHourDTO dto = WorkingHourDTO.builder()
        .day("LUNES")
        .startTime("09:00")
        .endTime("18:00")
        .enterpriseId(1L)
        .userId(31L)
        .build();

    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(ownEnterprise));
    when(userRepository.findByIdAndEnterpriseIdAndArchivedFalse(31L, 1L)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> workingHourService.saveBatch(List.of(dto)));
  }

  @Test
  void saveBatchAllowsOwnedExistingWorkingHour() {
    WorkingHour existing = new WorkingHour();
    existing.setId(99L);
    existing.setEnterprise(ownEnterprise);

    WorkingHourDTO dto = WorkingHourDTO.builder()
        .id(99L)
        .day("LUNES")
        .startTime("09:00")
        .endTime("18:00")
        .enterpriseId(1L)
        .build();

    when(workingHourRepository.findById(99L)).thenReturn(Optional.of(existing));
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(ownEnterprise));
    when(workingHourRepository.save(any(WorkingHour.class))).thenAnswer(invocation -> invocation.getArgument(0));

    assertDoesNotThrow(() -> workingHourService.saveBatch(List.of(dto)));
  }

  @Test
  void getEnterpriseHoursReturnsDefaultSnapshotWithoutPersisting() {
    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(ownEnterprise));
    when(workingHourRepository.findByEnterpriseIdAndUserIdIsNull(1L)).thenReturn(List.of());

    List<WorkingHourDTO> result = workingHourService.getEnterpriseHours(1L);

    assertEquals(7, result.size());
    assertEquals("LUNES", result.get(0).getDay());
    assertEquals("09:00", result.get(0).getStartTime());
    assertEquals("DOMINGO", result.get(6).getDay());
    assertEquals(true, result.get(6).isDayOff());
    verify(workingHourRepository, never()).save(any(WorkingHour.class));
  }

  @Test
  void getUserHoursFallsBackToEnterpriseScheduleWithoutPersisting() {
    WorkingHour enterpriseMonday = new WorkingHour();
    enterpriseMonday.setId(7L);
    enterpriseMonday.setDay("LUNES");
    enterpriseMonday.setStartTime("10:00");
    enterpriseMonday.setEndTime("18:00");
    enterpriseMonday.setDayOff(false);
    enterpriseMonday.setEnterprise(ownEnterprise);

    when(userRepository.findByIdAndArchivedFalse(31L)).thenReturn(Optional.of(employee));
    when(workingHourRepository.findByEnterpriseIdAndUserIdIsNull(1L)).thenReturn(List.of(enterpriseMonday));
    when(workingHourRepository.findByUser_Id(31L)).thenReturn(List.of());

    List<WorkingHourDTO> result = workingHourService.getUserHours(31L);

    assertEquals(7, result.size());
    assertEquals("10:00", result.get(0).getStartTime());
    assertEquals(Long.valueOf(31L), result.get(0).getUserId());
    assertEquals(null, result.get(0).getId());
    verify(workingHourRepository, never()).save(any(WorkingHour.class));
  }

  @Test
  void getPublicEmployeeHoursRejectsClientUsers() {
    User client = User.builder()
        .id(44L)
        .name("Cliente")
        .enterprise(ownEnterprise)
        .role(com.saloria.model.Role.CLIENTE)
        .active(true)
        .build();

    when(userRepository.findByIdAndEnterpriseIdAndArchivedFalse(44L, 1L)).thenReturn(Optional.of(client));

    assertThrows(ResourceNotFoundException.class, () -> workingHourService.getPublicEmployeeHoursSnapshot(1L, 44L));
  }

  @Test
  void saveBatchUpsertsExistingUserHourWhenDtoHasNoId() {
    WorkingHour existing = new WorkingHour();
    existing.setId(55L);
    existing.setDay("LUNES");
    existing.setStartTime("09:00");
    existing.setEndTime("18:00");
    existing.setDayOff(false);
    existing.setEnterprise(ownEnterprise);
    existing.setUser(employee);

    WorkingHourDTO dto = WorkingHourDTO.builder()
        .day("LUNES")
        .startTime("11:00")
        .endTime("19:00")
        .dayOff(false)
        .enterpriseId(1L)
        .userId(31L)
        .build();

    when(enterpriseRepository.findById(1L)).thenReturn(Optional.of(ownEnterprise));
    when(userRepository.findByIdAndEnterpriseIdAndArchivedFalse(31L, 1L)).thenReturn(Optional.of(employee));
    when(workingHourRepository.findFirstByUser_IdAndDay(31L, "LUNES")).thenReturn(Optional.of(existing));
    when(workingHourRepository.save(any(WorkingHour.class))).thenAnswer(invocation -> invocation.getArgument(0));

    List<WorkingHourDTO> result = workingHourService.saveBatch(List.of(dto));

    assertEquals(1, result.size());
    assertEquals(Long.valueOf(55L), result.get(0).getId());
    assertEquals("11:00", result.get(0).getStartTime());
    verify(workingHourRepository).save(argThat(saved -> Long.valueOf(55L).equals(saved.getId())
        && "11:00".equals(saved.getStartTime())
        && "19:00".equals(saved.getEndTime())));
  }
}
