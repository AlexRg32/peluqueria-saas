package com.peluqueria.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

  private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);

  @Value("${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5433/peluqueria_db}")
  private String datasourceUrl;

  @Value("${SPRING_DATASOURCE_USERNAME:postgres}")
  private String username;

  @Value("${SPRING_DATASOURCE_PASSWORD:postgres}")
  private String password;

  @Bean
  @Primary
  public DataSource dataSource() {
    if (datasourceUrl.startsWith("jdbc:postgresql://") && datasourceUrl.contains("@")) {
      try {
        logger.info("Detected URI-style JDBC URL. Attempting to parse credentials.");

        // Strip "jdbc:" prefix
        String uriString = datasourceUrl.substring(5);
        URI uri = new URI(uriString);

        String host = uri.getHost();
        int port = uri.getPort();
        String path = uri.getPath();
        String userInfo = uri.getUserInfo();

        String cleanUrl = "jdbc:postgresql://" + host + (port != -1 ? ":" + port : "") + path;
        String user = username;
        String pass = password;

        if (userInfo != null && userInfo.contains(":")) {
          String[] parts = userInfo.split(":", 2);
          user = parts[0];
          pass = parts[1];
          logger.info("Extracted username and password from JDBC URL.");
        }

        return DataSourceBuilder.create()
            .url(cleanUrl)
            .username(user)
            .password(pass)
            .driverClassName("org.postgresql.Driver")
            .build();

      } catch (URISyntaxException | IndexOutOfBoundsException e) {
        logger.warn("Failed to parse URI-style JDBC URL. Falling back to default configuration. Error: {}",
            e.getMessage());
      }
    }

    return DataSourceBuilder.create()
        .url(datasourceUrl)
        .username(username)
        .password(password)
        .driverClassName("org.postgresql.Driver")
        .build();
  }
}
