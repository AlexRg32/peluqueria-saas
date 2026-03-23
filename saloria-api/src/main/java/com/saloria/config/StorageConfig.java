package com.saloria.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.saloria.service.FileSystemStorageService;
import com.saloria.service.StorageService;
import com.saloria.service.SupabaseStorageService;

@Configuration
public class StorageConfig {

  @Bean
  @ConditionalOnProperty(name = "app.storage.type", havingValue = "local", matchIfMissing = true)
  public StorageService fileSystemStorageService(
      @Value("${app.upload.dir:uploads}") String uploadDir,
      @Value("${app.api.base-url:http://localhost:8080}") String baseUrl) {
    return new FileSystemStorageService(uploadDir, baseUrl);
  }

  @Bean
  @ConditionalOnProperty(name = "app.storage.type", havingValue = "supabase")
  public StorageService supabaseStorageService(
      @Value("${supabase.url}") String supabaseUrl,
      @Value("${supabase.key}") String supabaseKey,
      @Value("${supabase.bucket:services}") String bucketName) {
    return new SupabaseStorageService(supabaseUrl, supabaseKey, bucketName);
  }
}
