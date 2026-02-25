package com.peluqueria.service;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SupabaseStorageService implements StorageService {

  private final String supabaseUrl;
  private final String supabaseKey;
  private final String bucketName;
  private final RestTemplate restTemplate;

  public SupabaseStorageService(
      @Value("${supabase.url}") String supabaseUrl,
      @Value("${supabase.key}") String supabaseKey,
      @Value("${supabase.bucket:services}") String bucketName) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.bucketName = bucketName;
    this.restTemplate = new RestTemplate();
  }

  @Override
  public void init() {
    // Ideally check if bucket exists, but we'll assume it does or created manually
    log.info("Initialized Supabase Storage Service for bucket: {}", bucketName);
  }

  @Override
  public String store(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new RuntimeException("Failed to store empty file.");
      }
      String originalFilename = file.getOriginalFilename();
      String extension = "";
      if (originalFilename != null && originalFilename.contains(".")) {
        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      }

      String newFilename = UUID.randomUUID().toString() + extension;

      // Supabase Storage Upload API: POST /storage/v1/object/{bucket}/{path}
      String uploadUrl = String.format("%s/storage/v1/object/%s/%s", supabaseUrl, bucketName, newFilename);

      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "Bearer " + supabaseKey);
      headers.set("apikey", supabaseKey);
      headers.setContentType(MediaType.parseMediaType(file.getContentType()));

      HttpEntity<byte[]> entity = new HttpEntity<>(file.getBytes(), headers);

      restTemplate.exchange(uploadUrl, HttpMethod.POST, entity, String.class);

      return newFilename;
    } catch (IOException e) {
      throw new RuntimeException("Failed to store file in Supabase.", e);
    } catch (Exception e) {
      log.error("Error uploading to Supabase: {}", e.getMessage());
      throw new RuntimeException("Error uploading to Supabase storage", e);
    }
  }

  @Override
  public String getPublicUrl(String filename) {
    if (filename == null || filename.isEmpty()) {
      return null;
    }
    // https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
    return String.format("%s/storage/v1/object/public/%s/%s", supabaseUrl, bucketName, filename);
  }

  @Override
  public Stream<Path> loadAll() {
    throw new UnsupportedOperationException("Not implemented for Supabase storage");
  }

  @Override
  public Path load(String filename) {
    throw new UnsupportedOperationException("Not implemented for Supabase storage");
  }

  @Override
  public Resource loadAsResource(String filename) {
    throw new UnsupportedOperationException("Not implemented for Supabase storage - use getPublicUrl instead");
  }

  @Override
  public void deleteAll() {
    // Dangerous operation, not implemented
  }
}
