package com.peluqueria.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.peluqueria.model.ServiceOffering;
import com.peluqueria.dto.ServiceOfferingResponse;
import com.peluqueria.repository.ServiceOfferingRepository;
import com.peluqueria.repository.EnterpriseRepository;
import com.peluqueria.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceOfferingService {

  private final ServiceOfferingRepository serviceOfferingRepository;
  private final EnterpriseRepository enterpriseRepository;

  public List<ServiceOfferingResponse> getAllServicesByEnterpriseId(Long enterpriseId) {
    return serviceOfferingRepository.findByEnterpriseIdAndDeletedFalse(enterpriseId).stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public ServiceOfferingResponse createServiceOffering(ServiceOffering serviceOffering, Long enterpriseId) {
    com.peluqueria.model.Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
        .orElseThrow(() -> new ResourceNotFoundException("Empresa no encontrada"));
    serviceOffering.setEnterprise(enterprise);
    return mapToResponse(serviceOfferingRepository.save(serviceOffering));
  }

  public ServiceOfferingResponse getServiceByIdResponse(Long id) {
    return serviceOfferingRepository.findById(id)
        .map(this::mapToResponse)
        .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
  }

  public ServiceOffering getServiceById(Long id) {
    return serviceOfferingRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
  }

  public void deleteService(Long id) {
    ServiceOffering service = serviceOfferingRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
    service.setDeleted(true);
    serviceOfferingRepository.save(service);
  }

  private ServiceOfferingResponse mapToResponse(ServiceOffering service) {
    return ServiceOfferingResponse.builder()
        .id(service.getId())
        .name(service.getName())
        .description(service.getDescription())
        .price(service.getPrice())
        .image(service.getImage())
        .duration(service.getDuration())
        .category(service.getCategory())
        .enterpriseId(service.getEnterprise() != null ? service.getEnterprise().getId() : null)
        .build();
  }
}
