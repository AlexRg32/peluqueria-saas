package com.peluqueria.service;

import com.peluqueria.dto.WorkingHourDTO;
import com.peluqueria.model.Enterprise;
import com.peluqueria.model.User;
import com.peluqueria.model.WorkingHour;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.repository.WorkingHourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkingHourService {

  private final WorkingHourRepository workingHourRepository;
  private final EnterpriseRepository enterpriseRepository;
  private final UserRepository userRepository;

  private static final List<String> DAYS = Arrays.asList(
      "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO");

  @Transactional
  public List<WorkingHourDTO> getEnterpriseHours(Long enterpriseId) {
    List<WorkingHour> hours = workingHourRepository.findByEnterpriseIdAndUserIdIsNull(enterpriseId);
    if (hours.isEmpty()) {
      return initializeHours(enterpriseId, null);
    }
    return hours.stream().map(this::mapToDTO).collect(Collectors.toList());
  }

  @Transactional
  public List<WorkingHourDTO> getUserHours(Long userId) {
    List<WorkingHour> hours = workingHourRepository.findByUser_Id(userId);
    if (hours.isEmpty()) {
      User user = userRepository.findById(userId)
          .orElseThrow(() -> new RuntimeException("User not found"));
      return initializeHours(user.getEnterprise().getId(), userId);
    }
    return hours.stream().map(this::mapToDTO).collect(Collectors.toList());
  }

  @Transactional
  public List<WorkingHourDTO> saveBatch(List<WorkingHourDTO> dtos) {
    return dtos.stream().map(dto -> {
      WorkingHour entity;
      if (dto.getId() != null) {
        entity = workingHourRepository.findById(dto.getId())
            .orElse(new WorkingHour());
      } else {
        entity = new WorkingHour();
      }

      entity.setDay(dto.getDay());
      entity.setStartTime(dto.getStartTime());
      entity.setEndTime(dto.getEndTime());
      entity.setDayOff(dto.isDayOff());

      if (entity.getEnterprise() == null) {
        Enterprise enterprise = enterpriseRepository.findById(dto.getEnterpriseId())
            .orElseThrow(() -> new RuntimeException("Enterprise not found"));
        entity.setEnterprise(enterprise);
      }

      if (dto.getUserId() != null && entity.getUser() == null) {
        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        entity.setUser(user);
      }

      return mapToDTO(workingHourRepository.save(entity));
    }).collect(Collectors.toList());
  }

  private List<WorkingHourDTO> initializeHours(Long enterpriseId, Long userId) {
    Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
        .orElseThrow(() -> new RuntimeException("Enterprise not found"));
    User user = userId != null ? userRepository.findById(userId).orElse(null) : null;

    return DAYS.stream().map(day -> {
      WorkingHour wh = new WorkingHour();
      wh.setDay(day);
      wh.setStartTime("09:00");
      wh.setEndTime("20:00");
      wh.setDayOff(day.equals("DOMINGO"));
      wh.setEnterprise(enterprise);
      wh.setUser(user);
      return mapToDTO(workingHourRepository.save(wh));
    }).collect(Collectors.toList());
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
}
