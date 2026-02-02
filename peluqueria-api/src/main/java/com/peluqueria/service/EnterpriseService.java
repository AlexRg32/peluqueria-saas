package com.peluqueria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.peluqueria.model.Enterprise;
import com.peluqueria.model.Role;
import com.peluqueria.dto.EnterpriseResponse;
import com.peluqueria.dto.UserResponse;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.repository.UserRepository;
import com.peluqueria.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class EnterpriseService {

  private final EnterpriseRepository enterpriseRepository;
  private final UserRepository userRepository;

  public List<EnterpriseResponse> findAll() {
    return enterpriseRepository.findAll().stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public EnterpriseResponse save(Enterprise enterprise) {
    if (enterpriseRepository.findByCif(enterprise.getCif()).isPresent()) {
      throw new RuntimeException("La empresa ya existe");
    }
    return mapToResponse(enterpriseRepository.save(enterprise));
  }

  public Enterprise findById(Long id) {
    return enterpriseRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Empresa no encontrada"));
  }

  public EnterpriseResponse findByIdResponse(Long id) {
    return mapToResponse(findById(id));
  }

  public EnterpriseResponse update(Long id, Enterprise enterpriseDetails) {
    Enterprise enterprise = findById(id);

    enterprise.setName(enterpriseDetails.getName());
    enterprise.setCif(enterpriseDetails.getCif());
    enterprise.setAddress(enterpriseDetails.getAddress());
    enterprise.setPhone(enterpriseDetails.getPhone());
    enterprise.setEmail(enterpriseDetails.getEmail());
    enterprise.setWebsite(enterpriseDetails.getWebsite());
    enterprise.setLogo(enterpriseDetails.getLogo());
    enterprise.setBanner(enterpriseDetails.getBanner());
    enterprise.setInstagram(enterpriseDetails.getInstagram());
    enterprise.setFacebook(enterpriseDetails.getFacebook());
    enterprise.setTiktok(enterpriseDetails.getTiktok());
    enterprise.setWhatsapp(enterpriseDetails.getWhatsapp());
    enterprise.setPrimaryColor(enterpriseDetails.getPrimaryColor());
    enterprise.setSecondaryColor(enterpriseDetails.getSecondaryColor());
    enterprise.setDescription(enterpriseDetails.getDescription());

    return mapToResponse(enterpriseRepository.save(enterprise));
  }

  public List<UserResponse> getEmployeesByEnterpriseId(Long enterpriseId) {
    return userRepository.findByEnterpriseIdAndRole(enterpriseId, Role.EMPLEADO)
        .stream()
        .map(user -> UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .enterpriseId(user.getEnterprise() != null ? user.getEnterprise().getId() : null)
            .build())
        .collect(Collectors.toList());
  }

  public void delete(Long id) {
    enterpriseRepository.deleteById(id);
  }

  private EnterpriseResponse mapToResponse(Enterprise enterprise) {
    return EnterpriseResponse.builder()
        .id(enterprise.getId())
        .name(enterprise.getName())
        .cif(enterprise.getCif())
        .address(enterprise.getAddress())
        .phone(enterprise.getPhone())
        .email(enterprise.getEmail())
        .website(enterprise.getWebsite())
        .logo(enterprise.getLogo())
        .banner(enterprise.getBanner())
        .instagram(enterprise.getInstagram())
        .facebook(enterprise.getFacebook())
        .tiktok(enterprise.getTiktok())
        .whatsapp(enterprise.getWhatsapp())
        .primaryColor(enterprise.getPrimaryColor())
        .secondaryColor(enterprise.getSecondaryColor())
        .description(enterprise.getDescription())
        .build();
  }
}
