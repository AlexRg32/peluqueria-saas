# Plan: Lombok Java 24 Compatibility Fix
>
> Goal: Fix build error caused by Lombok incompatibility with JDK 24.
> Architecture: Dependency update in `pom.xml`.

## Foundation

- [x] **Task 1: Update Lombok version** — `pom.xml`
  - What: Change Lombok version from `1.18.36` to `1.18.42` in both dependencies and `maven-compiler-plugin`.
  - Verify: Check `pom.xml` file content.

## Implementation & Polish

- [x] **Task 2: Verify build** — `peluqueria-api` root
  - What: Run `./mvnw clean package`.
  - Verify: Build success output.
