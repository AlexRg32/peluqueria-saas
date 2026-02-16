# Investigation: Backend Main Class Not Found

## Issue

The user is unable to start the Spring Boot application.

- Error during run: `ClassNotFoundException: com.peluqueria.PeluqueriaApplication`
- Error during compilation (`./mvnw clean compile`): `java.lang.ExceptionInInitializerError` caused by Lombok (`java.lang.NoSuchFieldException: com.sun.tools.javac.code.TypeTag :: UNKNOWN`).

## Findings

1. **JDK Mismatch**:
   - User's run command uses JDK 17.
   - Maven (`./mvnw`) is using **JDK 24**.
2. **Lombok Compatibility**: The error in Lombok is a known issue when running on newer JDKs than the version of Lombok supports. Specifically, the internal `javac` APIs changed, and Lombok needs an update to handle them.
3. **Compilation Failure**: Because Maven fails to compile the project, no `.class` files are generated in `target/classes`. This leads to the `ClassNotFoundException` when attempting to run the application.

## Potential Fixes

1. **Force JDK 17 for Maven**: Ensure `./mvnw` uses JDK 17 to match the project configuration and the user's runtime.
2. **Update Lombok**: Upgrade Lombok to a version that supports JDK 24 (if available) or at least the latest stable.
3. **Project Properties**: Ensure `maven-compiler-plugin` is correctly configured for Java 17.

## Next Step

I will attempt to update Lombok and see if it compiles with JDK 24. If not, I will recommend the user to switch their `JAVA_HOME` to JDK 17.
