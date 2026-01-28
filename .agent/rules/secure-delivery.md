# Secure Software Delivery Rules (Google Cloud Inspired)

These rules implement a "Shift Left" security approach following SLSA and Zero Trust principles.

## 1. Source Security (Código)

- **SIGNED COMMITS**: Every commit MUST be signed with GPG or SSH keys.
- **SECRET SCANNERS**: No secrets in code. Use `.env.template` and reference a secret manager (Secret Manager, Vault).
- **DEPENDENCY AUDIT**: Before adding a library, check its "Scorecard" (OpenSSF) or run `npm audit` / `mvn dependency:analyze`.
- **CODE REVIEWS**: Large architectural changes REQUIRE a review from `@architect`.

## 2. Build Security (Compilación)

- **ISOLATED BUILDS**: Build process should not have unfettered internet access.
- **SLSA PROVENANCE**: Generate build metadata (provenance) to prove HOW and WHERE the binary was created.
- **HERMETIC BUILDS**: Dependencies must be locked (use `pom.xml`, `package-lock.json`, `pnpm-lock.yaml`).

## 3. Deployment & Attestations (Despliegue)

- **BINARY AUTHORIZATION**: Artifacts must be signed. Only signed artifacts can be deployed to production.
- **VULNERABILITY SCANNING**: Images in the registry must be scanned for CVEs before deployment.
- **ATTESTATION-BASED TRUST**: Trust the cryptographic signature of the build process, not just the human developer.

## 4. Design Patterns for Security

- **ZERO TRUST**: "Never trust, always verify". Every inter-service request must be authenticated (e.g., mTLS + JWT).
- **LEAST PRIVILEGE**: Accounts and services only have the permissions they strictly need.
- **IMMUTABLE INFRASTRUCTURE**: Do not patch running servers; redeploy from a new signed image.

## 5. Continuous Validation (Run)

- Monitor running containers for deviation from the "Known Good" state.
- Automated rotation of secrets and API keys every 30-90 days.
