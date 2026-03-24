package com.saloria.security;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.util.ReflectionTestUtils;

public class RateLimitFilterTest {

  private RateLimitFilter filter;

  @BeforeEach
  void setUp() {
    filter = new RateLimitFilter();
    ReflectionTestUtils.setField(filter, "trustedProxyConfig", "127.0.0.1,::1");
  }

  @Test
  void ignoresForwardedForWhenRemoteAddressIsNotTrusted() throws Exception {
    for (int i = 0; i < 5; i++) {
      MockHttpServletRequest request = new MockHttpServletRequest("POST", "/auth/login");
      request.setRemoteAddr("198.51.100.10");
      request.addHeader("X-Forwarded-For", "203.0.113." + i);
      MockHttpServletResponse response = new MockHttpServletResponse();

      filter.doFilter(request, response, new MockFilterChain());

      assertEquals(200, response.getStatus());
    }

    MockHttpServletRequest blockedRequest = new MockHttpServletRequest("POST", "/auth/login");
    blockedRequest.setRemoteAddr("198.51.100.10");
    blockedRequest.addHeader("X-Forwarded-For", "203.0.113.99");
    MockHttpServletResponse blockedResponse = new MockHttpServletResponse();

    filter.doFilter(blockedRequest, blockedResponse, new MockFilterChain());

    assertEquals(429, blockedResponse.getStatus());
  }

  @Test
  void usesForwardedForWhenRequestComesFromTrustedProxy() throws Exception {
    for (int i = 0; i < 5; i++) {
      MockHttpServletRequest request = new MockHttpServletRequest("POST", "/auth/login");
      request.setRemoteAddr("127.0.0.1");
      request.addHeader("X-Forwarded-For", "203.0.113.7");
      MockHttpServletResponse response = new MockHttpServletResponse();

      filter.doFilter(request, response, new MockFilterChain());

      assertEquals(200, response.getStatus());
    }

    MockHttpServletRequest blockedRequest = new MockHttpServletRequest("POST", "/auth/login");
    blockedRequest.setRemoteAddr("127.0.0.1");
    blockedRequest.addHeader("X-Forwarded-For", "203.0.113.7");
    MockHttpServletResponse blockedResponse = new MockHttpServletResponse();

    filter.doFilter(blockedRequest, blockedResponse, new MockFilterChain());

    assertEquals(429, blockedResponse.getStatus());
  }
}
