package com.peluqueria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peluqueria.model.Enterprise;
import com.peluqueria.repository.EnterpriseRepository;

@Service
public class EnterpriseService {

  @Autowired
  private EnterpriseRepository enterpriseRepository;

  public List<Enterprise> findAll() {
    return enterpriseRepository.findAll();
  }

  public Enterprise save(Enterprise enterprise) {
    if (enterpriseRepository.findByCif(enterprise.getCif()).isPresent()) {
      throw new RuntimeException("La empresa ya existe");
    }
    return enterpriseRepository.save(enterprise);
  }

  public Enterprise findById(Long id) {
    return enterpriseRepository.findById(id).orElse(null);
  }

  public Enterprise update(Long id, Enterprise enterpriseDetails) {
    Enterprise enterprise = enterpriseRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

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

    return enterpriseRepository.save(enterprise);
  }

  public void delete(Long id) {
    enterpriseRepository.deleteById(id);
  }

}
