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
      throw new RuntimeException("Enterprise already exists");
    }
    return enterpriseRepository.save(enterprise);
  }

  public Enterprise findById(Long id) {
    return enterpriseRepository.findById(id).orElse(null);
  }

  public void delete(Long id) {
    enterpriseRepository.deleteById(id);
  }

}
