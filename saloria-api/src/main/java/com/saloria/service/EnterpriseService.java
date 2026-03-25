package com.saloria.service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.saloria.model.Enterprise;
import com.saloria.model.Role;
import com.saloria.model.ServiceOffering;
import com.saloria.dto.EnterpriseRequest;
import com.saloria.dto.EnterpriseResponse;
import com.saloria.dto.PublicEnterpriseSummaryResponse;
import com.saloria.dto.UserResponse;
import com.saloria.repository.EnterpriseRepository;
import com.saloria.repository.ServiceOfferingRepository;
import com.saloria.repository.UserRepository;
import com.saloria.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class EnterpriseService {

  private final EnterpriseRepository enterpriseRepository;
  private final UserRepository userRepository;
  private final ServiceOfferingRepository serviceOfferingRepository;

  public List<EnterpriseResponse> findAll() {
    return enterpriseRepository.findAll().stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  public EnterpriseResponse save(EnterpriseRequest request) {
    if (StringUtils.hasText(request.getCif()) && enterpriseRepository.findByCif(request.getCif()).isPresent()) {
      throw new IllegalArgumentException("Ya existe una empresa con ese CIF");
    }
    Enterprise enterprise = new Enterprise();
    applyRequest(enterprise, request);
    return mapToResponse(enterpriseRepository.save(enterprise));
  }

  public Enterprise findById(Long id) {
    return enterpriseRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Empresa no encontrada"));
  }

  public EnterpriseResponse findByIdResponse(Long id) {
    return mapToResponse(findById(id));
  }

  public EnterpriseResponse findBySlug(String slug) {
    Enterprise enterprise = enterpriseRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Empresa no encontrada: " + slug));
    return mapToResponse(enterprise);
  }

  public List<PublicEnterpriseSummaryResponse> findPublicDirectory(String query) {
    List<Enterprise> enterprises = enterpriseRepository.findAll().stream()
        .filter(enterprise -> StringUtils.hasText(enterprise.getSlug()))
        .sorted((left, right) -> left.getName().compareToIgnoreCase(right.getName()))
        .collect(Collectors.toList());

    if (enterprises.isEmpty()) {
      return Collections.emptyList();
    }

    List<Long> enterpriseIds = enterprises.stream()
        .map(Enterprise::getId)
        .toList();

    Map<Long, List<ServiceOffering>> servicesByEnterprise = serviceOfferingRepository
        .findByEnterpriseIdInAndDeletedFalse(enterpriseIds)
        .stream()
        .collect(Collectors.groupingBy(service -> service.getEnterprise().getId(), LinkedHashMap::new, Collectors.toList()));

    String normalizedQuery = normalizeQuery(query);

    return enterprises.stream()
        .filter(enterprise -> matchesPublicQuery(enterprise, servicesByEnterprise.getOrDefault(enterprise.getId(), List.of()),
            normalizedQuery))
        .map(enterprise -> mapToPublicSummary(enterprise, servicesByEnterprise.getOrDefault(enterprise.getId(), List.of())))
        .collect(Collectors.toList());
  }

  public EnterpriseResponse update(Long id, EnterpriseRequest request) {
    Enterprise enterprise = findById(id);
    if (StringUtils.hasText(request.getCif())) {
      enterpriseRepository.findByCif(request.getCif())
          .filter(existing -> !existing.getId().equals(id))
          .ifPresent(existing -> {
            throw new IllegalArgumentException("Ya existe una empresa con ese CIF");
          });
    }
    applyRequest(enterprise, request);

    return mapToResponse(enterpriseRepository.save(enterprise));
  }

  public List<UserResponse> getEmployeesByEnterpriseId(Long enterpriseId) {
    return userRepository.findByEnterpriseIdAndRoleAndArchivedFalse(enterpriseId, Role.EMPLEADO)
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

  private void applyRequest(Enterprise enterprise, EnterpriseRequest request) {
    enterprise.setName(request.getName());
    enterprise.setCif(request.getCif());
    enterprise.setAddress(request.getAddress());
    enterprise.setPhone(request.getPhone());
    enterprise.setEmail(request.getEmail());
    enterprise.setWebsite(request.getWebsite());
    enterprise.setLogo(request.getLogo());
    enterprise.setBanner(request.getBanner());
    enterprise.setInstagram(request.getInstagram());
    enterprise.setFacebook(request.getFacebook());
    enterprise.setTiktok(request.getTiktok());
    enterprise.setWhatsapp(request.getWhatsapp());
    enterprise.setPrimaryColor(request.getPrimaryColor());
    enterprise.setSecondaryColor(request.getSecondaryColor());
    enterprise.setDescription(request.getDescription());
    if (request.getSlug() != null) {
      enterprise.setSlug(request.getSlug());
    }
  }

  private EnterpriseResponse mapToResponse(Enterprise enterprise) {
    return EnterpriseResponse.builder()
        .id(enterprise.getId())
        .name(enterprise.getName())
        .slug(enterprise.getSlug())
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

  private PublicEnterpriseSummaryResponse mapToPublicSummary(Enterprise enterprise, List<ServiceOffering> services) {
    List<String> serviceNames = services.stream()
        .map(ServiceOffering::getName)
        .filter(StringUtils::hasText)
        .distinct()
        .limit(3)
        .collect(Collectors.toList());

    return PublicEnterpriseSummaryResponse.builder()
        .id(enterprise.getId())
        .slug(enterprise.getSlug())
        .name(enterprise.getName())
        .city(extractCity(enterprise.getAddress()))
        .rating(null)
        .reviewCount(null)
        .thumbnail(StringUtils.hasText(enterprise.getLogo()) ? enterprise.getLogo() : enterprise.getBanner())
        .services(serviceNames)
        .priceRange(computePriceRange(services))
        .address(enterprise.getAddress())
        .build();
  }

  private boolean matchesPublicQuery(Enterprise enterprise, List<ServiceOffering> services, String normalizedQuery) {
    if (!StringUtils.hasText(normalizedQuery)) {
      return true;
    }

    if (containsIgnoreCase(enterprise.getName(), normalizedQuery)
        || containsIgnoreCase(enterprise.getDescription(), normalizedQuery)
        || containsIgnoreCase(enterprise.getAddress(), normalizedQuery)) {
      return true;
    }

    return services.stream()
        .anyMatch(service -> containsIgnoreCase(service.getName(), normalizedQuery)
            || containsIgnoreCase(service.getCategory(), normalizedQuery)
            || containsIgnoreCase(service.getDescription(), normalizedQuery));
  }

  private String extractCity(String address) {
    if (!StringUtils.hasText(address)) {
      return "Sin ubicación";
    }

    String[] segments = address.split(",");
    return segments[segments.length - 1].trim();
  }

  private String computePriceRange(List<ServiceOffering> services) {
    if (services.isEmpty()) {
      return "Consultar";
    }

    double averagePrice = services.stream()
        .mapToDouble(ServiceOffering::getPrice)
        .average()
        .orElse(0.0);

    if (averagePrice < 18) {
      return "€";
    }
    if (averagePrice < 35) {
      return "€€";
    }
    return "€€€";
  }

  private boolean containsIgnoreCase(String value, String normalizedQuery) {
    return StringUtils.hasText(value) && value.toLowerCase(Locale.ROOT).contains(normalizedQuery);
  }

  private String normalizeQuery(String query) {
    return StringUtils.hasText(query) ? query.trim().toLowerCase(Locale.ROOT) : "";
  }
}
