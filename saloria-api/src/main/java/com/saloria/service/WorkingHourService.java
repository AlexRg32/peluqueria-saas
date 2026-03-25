package com.saloria.service;

import com.saloria.dto.WorkingHourDTO;
import com.saloria.exception.ResourceNotFoundException;
import com.saloria.model.Enterprise;
import com.saloria.model.Role;
import com.saloria.model.User;
import com.saloria.model.WorkingHour;
import com.saloria.repository.EnterpriseRepository;
import com.saloria.repository.UserRepository;
import com.saloria.repository.WorkingHourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkingHourService {

  private final WorkingHourRepository workingHourRepository;
  private final EnterpriseRepository enterpriseRepository;
  private final UserRepository userRepository;

  private static final List<String> DAYS = Arrays.asList(
      "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO");

  @Transactional(readOnly = true)
  public List<WorkingHourDTO> getEnterpriseHours(Long enterpriseId) {
    return getEnterpriseHoursSnapshot(enterpriseId);
  }

  @Transactional(readOnly = true)
  public List<WorkingHourDTO> getUserHours(Long userId) {
    User user = userRepository.findByIdAndArchivedFalse(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return buildUserHoursSnapshot(user);
  }

  @Transactional(readOnly = true)
  public List<WorkingHourDTO> getEnterpriseHoursSnapshot(Long enterpriseId) {
    enterpriseRepository.findById(enterpriseId)
        .orElseThrow(() -> new ResourceNotFoundException("Enterprise not found"));
    return buildEnterpriseHoursSnapshot(enterpriseId);
  }

  @Transactional(readOnly = true)
  public List<WorkingHourDTO> getPublicEmployeeHoursSnapshot(Long enterpriseId, Long userId) {
    User user = userRepository.findByIdAndEnterpriseIdAndArchivedFalse(userId, enterpriseId)
        .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado"));

    if (user.getRole() == Role.CLIENTE || !user.isEnabled()) {
      throw new ResourceNotFoundException("Empleado no encontrado");
    }

    return buildUserHoursSnapshot(user);
  }

  @Transactional
  public List<WorkingHourDTO> saveBatch(List<WorkingHourDTO> dtos) {
    if (dtos == null || dtos.isEmpty()) {
      return List.of();
    }

    return dtos.stream().map(dto -> {
      Enterprise enterprise = enterpriseRepository.findById(dto.getEnterpriseId())
          .orElseThrow(() -> new ResourceNotFoundException("Enterprise not found"));
      User user = resolveRequestedUser(dto);
      WorkingHour entity = resolveTargetWorkingHour(dto);

      validateWorkingHourOwnership(entity, dto.getEnterpriseId());
      validateScopeConsistency(entity, dto.getUserId());

      entity.setDay(dto.getDay());
      entity.setStartTime(dto.getStartTime());
      entity.setEndTime(dto.getEndTime());
      entity.setDayOff(dto.isDayOff());
      entity.setEnterprise(enterprise);
      entity.setUser(user);

      return mapToDTO(workingHourRepository.save(entity));
    }).collect(Collectors.toList());
  }

  private User resolveRequestedUser(WorkingHourDTO dto) {
    if (dto.getUserId() == null) {
      return null;
    }

    return userRepository.findByIdAndEnterpriseIdAndArchivedFalse(dto.getUserId(), dto.getEnterpriseId())
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  private WorkingHour resolveTargetWorkingHour(WorkingHourDTO dto) {
    Optional<WorkingHour> existing = dto.getId() != null
        ? workingHourRepository.findById(dto.getId())
        : findExistingByScopeAndDay(dto);

    return existing.orElseGet(WorkingHour::new);
  }

  private Optional<WorkingHour> findExistingByScopeAndDay(WorkingHourDTO dto) {
    if (dto.getUserId() != null) {
      return workingHourRepository.findFirstByUser_IdAndDay(dto.getUserId(), dto.getDay());
    }
    return workingHourRepository.findFirstByEnterpriseIdAndUserIdIsNullAndDay(dto.getEnterpriseId(), dto.getDay());
  }

  private List<WorkingHourDTO> buildEnterpriseHoursSnapshot(Long enterpriseId) {
    return overlayHours(
        buildDefaultHours(enterpriseId, null),
        workingHourRepository.findByEnterpriseIdAndUserIdIsNull(enterpriseId),
        enterpriseId,
        null);
  }

  private List<WorkingHourDTO> buildUserHoursSnapshot(User user) {
    if (user.getEnterprise() == null) {
      throw new ResourceNotFoundException("Enterprise not found");
    }

    return overlayHours(
        buildEnterpriseHoursSnapshot(user.getEnterprise().getId()),
        workingHourRepository.findByUser_Id(user.getId()),
        user.getEnterprise().getId(),
        user.getId());
  }

  private List<WorkingHourDTO> buildDefaultHours(Long enterpriseId, Long userId) {
    return DAYS.stream()
        .map(day -> WorkingHourDTO.builder()
            .day(day)
            .startTime("09:00")
            .endTime("20:00")
            .dayOff(day.equals("DOMINGO"))
            .enterpriseId(enterpriseId)
            .userId(userId)
            .build())
        .collect(Collectors.toList());
  }

  private List<WorkingHourDTO> overlayHours(List<WorkingHourDTO> baseHours, List<WorkingHour> overrides,
      Long enterpriseId, Long userId) {
    Map<String, WorkingHourDTO> byDay = new LinkedHashMap<>();

    for (String day : DAYS) {
      WorkingHourDTO base = baseHours.stream()
          .filter(dto -> day.equals(dto.getDay()))
          .findFirst()
          .orElseGet(() -> defaultHour(day, enterpriseId, userId));

      byDay.put(day, cloneForScope(base, enterpriseId, userId));
    }

    overrides.stream()
        .map(this::mapToDTO)
        .forEach(dto -> byDay.put(dto.getDay(), dto));

    return byDay.values().stream()
        .sorted(Comparator.comparingInt(dto -> DAYS.indexOf(dto.getDay())))
        .collect(Collectors.toList());
  }

  private WorkingHourDTO defaultHour(String day, Long enterpriseId, Long userId) {
    return WorkingHourDTO.builder()
        .day(day)
        .startTime("09:00")
        .endTime("20:00")
        .dayOff("DOMINGO".equals(day))
        .enterpriseId(enterpriseId)
        .userId(userId)
        .build();
  }

  private WorkingHourDTO cloneForScope(WorkingHourDTO dto, Long enterpriseId, Long userId) {
    return WorkingHourDTO.builder()
        .day(dto.getDay())
        .startTime(dto.getStartTime())
        .endTime(dto.getEndTime())
        .dayOff(dto.isDayOff())
        .enterpriseId(enterpriseId)
        .userId(userId)
        .build();
  }

  private WorkingHourDTO mapToDTO(WorkingHour wh) {
    return WorkingHourDTO.builder()
        .id(wh.getId())
        .day(wh.getDay())
        .startTime(wh.getStartTime())
        .endTime(wh.getEndTime())
        .dayOff(wh.isDayOff())
        .enterpriseId(wh.getEnterprise().getId())
        .userId(wh.getUser() != null ? wh.getUser().getId() : null)
        .build();
  }

  private void validateWorkingHourOwnership(WorkingHour workingHour, Long enterpriseId) {
    if (workingHour.getEnterprise() != null && !workingHour.getEnterprise().getId().equals(enterpriseId)) {
      throw new AccessDeniedException("El horario no pertenece a la empresa indicada");
    }
  }

  private void validateUserOwnership(User user, Long enterpriseId) {
    if (user == null || user.getEnterprise() == null || !user.getEnterprise().getId().equals(enterpriseId)) {
      throw new AccessDeniedException("El empleado no pertenece a la empresa indicada");
    }
  }

  private void validateScopeConsistency(WorkingHour entity, Long requestedUserId) {
    Long currentUserId = entity.getUser() != null ? entity.getUser().getId() : null;

    if (entity.getId() != null && !java.util.Objects.equals(currentUserId, requestedUserId)) {
      throw new AccessDeniedException("No se puede cambiar el alcance del horario existente");
    }

    if (entity.getUser() != null) {
      validateUserOwnership(entity.getUser(), entity.getEnterprise().getId());
    }
  }
}
