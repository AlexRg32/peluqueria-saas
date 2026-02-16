# Plan: Fix Backend Main Class Not Found

The goal is to resolve the `ClassNotFoundException` by fixing the compilation error caused by Lombok's incompatibility with JDK 24.

## Tasks

- [ ] Update Lombok to version 1.18.36 in `pom.xml`.
- [ ] Run `./mvnw clean compile` to verify the fix.
- [ ] Verify that `target/classes/com/peluqueria/PeluqueriaApplication.class` exists.
- [ ] Inform the user to try running the application again.

## Rationale

The `ClassNotFoundException` is a side effect of the compilation failure. By fixing the Lombok issue, Maven will be able to generate the necessary `.class` files, allowing the application to start.
