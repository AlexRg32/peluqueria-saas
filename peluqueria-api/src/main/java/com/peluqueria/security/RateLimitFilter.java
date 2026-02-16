package com.peluqueria.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

  private static final int AUTH_MAX_REQUESTS = 5;
  private static final int AUTH_WINDOW_MINUTES = 15;

  private static final int API_MAX_REQUESTS = 60;
  private static final int API_WINDOW_MINUTES = 1;

  private final Map<String, Bucket> authBuckets = new ConcurrentHashMap<>();
  private final Map<String, Bucket> apiBuckets = new ConcurrentHashMap<>();

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String clientIp = getClientIp(request);
    String path = request.getRequestURI();

    if (path.startsWith("/auth/")) {
      Bucket bucket = authBuckets.computeIfAbsent(clientIp, this::createAuthBucket);
      ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

      if (!probe.isConsumed()) {
        long retryAfterSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
        response.getWriter().write(
            "{\"message\": \"Demasiados intentos. Inténtalo de nuevo en " + retryAfterSeconds + " segundos.\"}");
        return;
      }

      response.setHeader("X-RateLimit-Remaining", String.valueOf(probe.getRemainingTokens()));

    } else if (!path.startsWith("/uploads/")) {
      Bucket bucket = apiBuckets.computeIfAbsent(clientIp, this::createApiBucket);
      ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

      if (!probe.isConsumed()) {
        long retryAfterSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
        response.getWriter().write(
            "{\"message\": \"Demasiadas peticiones. Inténtalo de nuevo en " + retryAfterSeconds + " segundos.\"}");
        return;
      }

      response.setHeader("X-RateLimit-Remaining", String.valueOf(probe.getRemainingTokens()));
    }

    filterChain.doFilter(request, response);
  }

  private Bucket createAuthBucket(String key) {
    return Bucket.builder()
        .addLimit(Bandwidth.builder()
            .capacity(AUTH_MAX_REQUESTS)
            .refillGreedy(AUTH_MAX_REQUESTS, Duration.ofMinutes(AUTH_WINDOW_MINUTES))
            .build())
        .build();
  }

  private Bucket createApiBucket(String key) {
    return Bucket.builder()
        .addLimit(Bandwidth.builder()
            .capacity(API_MAX_REQUESTS)
            .refillGreedy(API_MAX_REQUESTS, Duration.ofMinutes(API_WINDOW_MINUTES))
            .build())
        .build();
  }

  private String getClientIp(HttpServletRequest request) {
    String xForwardedFor = request.getHeader("X-Forwarded-For");
    if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
      return xForwardedFor.split(",")[0].trim();
    }
    return request.getRemoteAddr();
  }
}
