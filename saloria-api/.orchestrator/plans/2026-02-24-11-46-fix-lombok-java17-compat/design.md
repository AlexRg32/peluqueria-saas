# Design: Lombok Java 24 Compatibility Fix

## Architecture Overview

This is a dependency update to ensure the project can be built using recent JDK versions (JDK 24) while maintaining the target Java 17 compatibility.

## Changes

### pom.xml

- Update `<lombok.version>` (or the hardcoded version) to `1.18.42`.
- Update `annotationProcessorPaths` for `maven-compiler-plugin` to use the same version.

## Dependencies

- `org.projectlombok:lombok`: `1.18.36` -> `1.18.42`

## Testing Strategy

- Run `./mvnw clean package` to verify the build.
- No functional changes are expected, only build-time fixes.
