package com.peluqueria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peluqueria.model.ServiceOffering;
import com.peluqueria.repository.ServiceOfferingRepository;

import java.util.List;

@Service
public class ServiceOfferingService {
  @Autowired
  private ServiceOfferingRepository serviceOfferingRepository;

  public List<ServiceOffering> getAllServicesByEnterpriseId(Long enterpriseId) {
    return serviceOfferingRepository.findByEnterpriseId(enterpriseId);
  }

  public ServiceOffering createServiceOffering(ServiceOffering serviceOffering) {
    try {
      return serviceOfferingRepository.save(serviceOffering);
    } catch (Exception e) {
      throw new RuntimeException("Error al crear el servicio");
    }
  }

  public ServiceOffering getServiceById(Long id) {
    return serviceOfferingRepository.findById(id).orElse(null);
  }

  public void deleteService(Long id) {
    serviceOfferingRepository.deleteById(id);
  }
}
