package com.saloria;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(properties = {
    "spring.flyway.enabled=true",
    "spring.jpa.hibernate.ddl-auto=none",
    "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
@ActiveProfiles("test")
public class FlywayMigrationSmokeTest {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Test
  void archivedUserColumnExistsAfterMigrations() {
    Integer count = jdbcTemplate.queryForObject(
        "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE LOWER(TABLE_NAME) = 'app_users' AND LOWER(COLUMN_NAME) = 'archived'",
        Integer.class);

    assertEquals(1, count);
  }
}
