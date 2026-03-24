package com.saloria.security;

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
import java.time.Clock;
import java.time.Duration;
import java.util.Arrays;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

  private static final int AUTH_MAX_REQUESTS = 5;
  private static final int AUTH_WINDOW_MINUTES = 15;

  private static final int API_MAX_REQUESTS = 60;
  private static final int API_WINDOW_MINUTES = 1;
  private static final int CLEANUP_INTERVAL = 100;

  @org.springframework.beans.factory.annotation.Value("${app.rate-limit.trusted-proxies:127.0.0.1,0:0:0:0:0:0:0:1,::1}")
  private String trustedProxyConfig;

  private final Map<String, BucketState> authBuckets = new ConcurrentHashMap<>();
  private final Map<String, BucketState> apiBuckets = new ConcurrentHashMap<>();
  private final AtomicInteger requestCounter = new AtomicInteger();
  private Clock clock = Clock.systemUTC();

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String clientIp = getClientIp(request);
    String path = request.getRequestURI();

    if (requestCounter.incrementAndGet() % CLEANUP_INTERVAL == 0) {
      cleanupExpiredBuckets();
    }

    if (path.startsWith("/auth/")) {
      BucketState state = authBuckets.computeIfAbsent(clientIp, key -> createBucketState(true));
      state.touch(nowMillis());
      ConsumptionProbe probe = state.bucket().tryConsumeAndReturnRemaining(1);

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
      BucketState state = apiBuckets.computeIfAbsent(clientIp, key -> createBucketState(false));
      state.touch(nowMillis());
      ConsumptionProbe probe = state.bucket().tryConsumeAndReturnRemaining(1);

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

  private BucketState createBucketState(boolean authScope) {
    Duration ttl = authScope
        ? Duration.ofMinutes(AUTH_WINDOW_MINUTES * 2L)
        : Duration.ofMinutes(API_WINDOW_MINUTES * 5L);
    Bucket bucket = Bucket.builder()
        .addLimit(Bandwidth.builder()
            .capacity(authScope ? AUTH_MAX_REQUESTS : API_MAX_REQUESTS)
            .refillGreedy(
                authScope ? AUTH_MAX_REQUESTS : API_MAX_REQUESTS,
                Duration.ofMinutes(authScope ? AUTH_WINDOW_MINUTES : API_WINDOW_MINUTES))
            .build())
        .build();
    return new BucketState(bucket, ttl.toMillis(), nowMillis());
  }

  private void cleanupExpiredBuckets() {
    long now = nowMillis();
    authBuckets.entrySet().removeIf(entry -> entry.getValue().isExpired(now));
    apiBuckets.entrySet().removeIf(entry -> entry.getValue().isExpired(now));
  }

  private String getClientIp(HttpServletRequest request) {
    Set<String> trustedProxies = Arrays.stream(trustedProxyConfig.split(","))
        .map(String::trim)
        .filter(value -> !value.isEmpty())
        .collect(Collectors.toSet());
    String remoteAddr = request.getRemoteAddr();
    String xForwardedFor = request.getHeader("X-Forwarded-For");
    if (trustedProxies.contains(remoteAddr) && xForwardedFor != null && !xForwardedFor.isEmpty()) {
      return xForwardedFor.split(",")[0].trim();
    }
    return remoteAddr;
  }

  private long nowMillis() {
    return clock.millis();
  }

  static final class BucketState {
    private final Bucket bucket;
    private final long ttlMillis;
    private volatile long lastSeenAt;

    BucketState(Bucket bucket, long ttlMillis, long lastSeenAt) {
      this.bucket = bucket;
      this.ttlMillis = ttlMillis;
      this.lastSeenAt = lastSeenAt;
    }

    Bucket bucket() {
      return bucket;
    }

    void touch(long now) {
      this.lastSeenAt = now;
    }

    boolean isExpired(long now) {
      return now - lastSeenAt >= ttlMillis;
    }
  }
}
