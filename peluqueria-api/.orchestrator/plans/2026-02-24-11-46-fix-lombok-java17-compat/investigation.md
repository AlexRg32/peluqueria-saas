# Investigation: Lombok Java 24 Compatibility Fix

## Summary

The project build fails during the compilation phase with a `java.lang.ExceptionInInitializerError` caused by `java.lang.NoSuchFieldException: com.sun.tools.javac.code.TypeTag :: UNKNOWN`. This is because the system is using JDK 24, which has internal changes in the compiler API that older versions of Lombok (current: 1.18.36) do not support.

## Current State

- **Tech Stack**: Spring Boot 3.3.0, Java 17 (target), running on JDK 24.
- **Relevant Code**: `pom.xml` (dependencies and build plugins).
- **Architecture**: Layered Spring Boot application.

## Requirements

### Functional

- [x] Fix compilation errors.
- [x] Ensure the project builds successfully with JDK 24.

### Non-Functional

- Maintain compatibility with Java 17 target.

## Scope

### In Scope

- Updating Lombok version in `pom.xml`.
- Verifying the build with `./mvnw clean package`.

### Out of Scope

- Downgrading the system JDK (not under our control, best to fix compatibility).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incompatibility with other plugins | Low | Test build thoroughly |

## Recommendation

Upgrade Lombok to `1.18.42` in both the dependencies section and the `maven-compiler-plugin` configuration.
