---
name: backend-dev-guidelines
description: Opinionated backend development standards for Spring Boot (Java) microservices. Covers layered architecture, Global Exception Handling, dependency injection, JPA repositories, JSR 303 validation, and testing discipline.
---

# Backend Development Guidelines

**(Spring Boot · Java · Maven)**

You are a **senior backend engineer** operating production-grade services under strict architectural and reliability constraints.

Your goal is to build **predictable, observable, and maintainable backend systems** using:

* Layered architecture (Controller, Service, Repository)
* Explicit error boundaries via `@ControllerAdvice`
* Strong typing and JSR 303/380 validation
* Centralized configuration via `application.yml`
* First-class observability (Spring Boot Actuator)

This skill defines **how backend code must be written**, not merely suggestions.

---

## 1. Backend Feasibility & Risk Index (BFRI)

Before implementing or modifying a backend feature, assess feasibility.

### BFRI Dimensions (1–5)

| Dimension                     | Question                                                         |
| ----------------------------- | ---------------------------------------------------------------- |
| **Architectural Fit**         | Does this follow Controller → Service → Repository?             |
| **Business Logic Complexity** | How complex is the domain logic?                                 |
| **Data Risk**                 | Does this affect critical data paths or transactions?            |
| **Operational Risk**          | Does this impact auth, billing, messaging, or infra?             |
| **Testability**               | Can this be reliably unit + integration tested?                  |

### Score Formula

```
BFRI = (Architectural Fit + Testability) − (Complexity + Data Risk + Operational Risk)
```

**Range:** `-10 → +10`

### Interpretation

| BFRI     | Meaning   | Action                 |
| -------- | --------- | ---------------------- |
| **6–10** | Safe      | Proceed                |
| **3–5**  | Moderate  | Add tests + monitoring |
| **0–2**  | Risky     | Refactor or isolate    |
| **< 0**  | Dangerous | Redesign before coding |

---

## 2. When to Use This Skill

Automatically applies when working on:

* REST Controllers, Services, JPA Repositories
* Spring Security configuration
* Hibernate / JPA database access
* JSR 303 (Hibernate Validator)
* Global Exception Handlers
* Configuration management (`@ConfigurationProperties`)
* Backend refactors or migrations

---

## 3. Core Architecture Doctrine (Non-Negotiable)

### 1. Layered Architecture Is Mandatory

```
Controller → Service → Repository → Database
```

* No layer skipping
* No cross-layer leakage
* Each layer has **one responsibility**

---

### 2. DTO First Pattern (Non-Negotiable)

* **NEVER** expose JPA entities directly via REST controllers.
* **NEVER** accept JPA entities as request bodies.
* **ALWAYS** use DTOs for communication between the API and clients.
* This prevents:
  * Accidental exposure of sensitive internal fields.
  * Recursive serialization issues (Infinite Loops).
  * Tight coupling between the API contract and the database schema.
  * Forced lazy loading of unintended relationships.

---

### 3. Controllers Only Route

Controllers must contain **zero business logic**.

```java
// ✅ ALWAYS
@PostMapping("/users")
public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDto) {
    return ResponseEntity.ok(userService.create(userDto));
}
```

---

### 3. Controllers Coordinate, Services Decide

* Controllers:
  * Parse request (via `@RequestBody`, `@PathVariable`)
  * Call services
  * Handle response status codes
  * Handle errors via `@ControllerAdvice`

* Services:
  * Contain business rules
  * Are framework-agnostic where possible
  * Use Dependency Injection (Constructor-based)
  * Are unit-testable

---

### 4. Global Exception Handling

Use `@RestControllerAdvice` to handle exceptions globally.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        // Collect all validation errors into a friendly message or map
        // Ensure personalized messages from @NotNull(message = "...") are preserved
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(...);
    }
}
```

### 5. Personalized Error Messages (Mandatory)

* **Human-Readable**: All exceptions thrown to the user must contain a human-readable, localized (if applicable) message.
* **No Technical Leaks**: Never show stack traces or internal db errors (e.g., "ConstraintViolationException") directly. Map them to a friendly message like "This name is already in use."
* **Validation Errors**: Use the `message` attribute in JSR 303 annotations to provide clear instructions (e.g., `@NotBlank(message = "El nombre es obligatorio")`).

---

### 5. Centralized Configuration

Use `application.yml` and `@ConfigurationProperties` for configuration.

---

### 6. Validate All External Input

Use `@Valid` and JSR 303 annotations (`@NotNull`, `@Email`, etc.).

---

## 4. Directory Structure (Canonical)

```
src/main/java/com/peluqueria/
├── config/              # Security, Beans, etc.
├── controller/          # REST Controllers
├── service/             # Business logic interfaces & implementations
├── repository/          # JPA Repositories
├── model/               # JPA Entities
├── dto/                 # Data Transfer Objects
├── exception/           # Custom exceptions & Global Handler
└── mapper/              # Object mapping (MapStruct or manual)
```

---

## 5. Naming Conventions (Strict)

| Layer      | Convention                |
| ---------- | ------------------------- |
| Controller | `PascalCaseController.java` |
| Service    | `PascalCaseService.java`    |
| Repository | `PascalCaseRepository.java` |
| Entity     | `PascalCase.java`           |
| DTO        | `PascalCaseDTO.java`        |

---

## 6. Dependency Injection Rules

* **Constructor Injection** is mandatory. Avoid `@Autowired` on fields.
* No importing repositories directly inside controllers (always go through service).

---

## 7. JPA & Repository Rules

* Repositories should only be accessed by Services.
* Use `@Transactional` at the Service level for operations that require atomicity.

---

## 8. Observability & Monitoring

* **Spring Boot Actuator** must be enabled.
* Use structured logging with SLF4J/Logback.

---

## 9. API Security (Non-Negotiable)

### Rate Limiting Is Mandatory

**ANY endpoint exposed to unauthenticated users MUST have rate limiting.** This is not optional.

#### Rules

1. **Auth endpoints** (`/auth/login`, `/auth/register`, password reset, etc.) → **5 requests per 15 minutes per IP**. This prevents brute-force attacks and protects the expensive bcrypt hashing.
2. **General API endpoints** → **60 requests per minute per IP**. This prevents DoS attacks from overwhelming the backend.
3. **Static/file endpoints** (`/uploads/**`, health checks) → Exempt from rate limiting.
4. **Rate limit filter MUST execute BEFORE Spring Security filters** — if a client is rate-limited, we skip all expensive work (JWT parsing, DB lookups, bcrypt).
5. **Response**: Return HTTP `429 Too Many Requests` with `Retry-After` header when limit is exceeded.

#### Implementation Pattern (Bucket4j)

```java
// SecurityConfig.java — Filter ordering is CRITICAL
.addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
.addFilterAfter(jwtAuthFilter, RateLimitFilter.class)
```

#### When to Apply

* ✅ Creating ANY new auth endpoint (login, register, forgot-password, verify-email)
* ✅ Adding new public-facing endpoints (contact forms, public APIs)
* ✅ Every new Spring Boot project setup (rate limiting from day 1)

#### Anti-Rationalization

* ❌ "We'll add rate limiting later" — **NO. It ships with the feature or the feature doesn't ship.**
* ❌ "It's just an internal API" — **NO. Internal APIs get brute-forced too.**
* ❌ "The frontend already prevents spam" — **NO. Frontend validation is cosmetic; security lives in the backend.**

### Account Lockout Awareness

When implementing authentication:

* Log failed authentication attempts
* Consider temporary IP-based bans after repeated failures (handled by rate limiting)
* Never reveal whether an email exists (use generic "Invalid credentials" messages)

---

## 10. Testing Discipline

### Required Tests

* **Unit tests** for services (using Mockito)
* **Integration tests** for controllers (using `@WebMvcTest` or `@SpringBootTest`)
* **Repository tests** (using `@DataJpaTest`)

---

## 11. Anti-Patterns (Immediate Rejection)

❌ Business logic in controllers
❌ Skipping service layer
❌ Field injection (@Autowired on private fields)
❌ Missing validation (@Valid)
❌ Using raw JDBC when JPA is available
❌ Swallow exceptions in catch blocks
❌ Untested business logic
❌ **Auth endpoints without rate limiting**
❌ **Public endpoints without rate limiting**
❌ **Rate limit filter placed AFTER authentication filters**

---

## 12. Skill Status

**Status:** Stable · Enforceable · Production-grade
**Intended Use:** Spring Boot microservices for the Peluquería SaaS platform
---
