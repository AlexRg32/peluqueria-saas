# Design: Fixing Production Image URLs and Persistence

## Architecture Overview

The system will transition from a local-only file storage to a provider-agnostic storage abstraction. In development, it will continue to use the local filesystem. In production, it will use Supabase Storage to ensure images persist across deployments.

## Data Model (if applicable)

No changes to existing entities, but the `image` field in `ServiceOffering` will now store a full URL instead of a relative path or a hardcoded localhost path.

## Storage Abstraction

### Interface `StorageService`

- `String store(MultipartFile file)`: Returns the **unique filename**.
- `String getPublicUrl(String filename)`: Returns the **full URL** to access the file.

### Implementations

1. **`FileSystemStorageService`** (Default/Local):
    - Uses `app.api.base-url` property to construct the URL: `${app.api.base-url}/uploads/${filename}`.
2. **`SupabaseStorageService`** (Production):
    - Uses Supabase Storage API to upload files.
    - Returns public URL: `${supabase.url}/storage/v1/object/public/${supabase.bucket}/${filename}`.

## API Contracts

| Method | Path | Body | Response | Auth |
|--------|------|------|----------|------|
| POST | `/api/services` | multipart/form-data | ServiceOfferingResponse | ADMIN |

## Component Design

N/A (Backend logic update)

## File Structure

- `com.peluqueria.service.StorageService` (modified)
- `com.peluqueria.service.FileSystemStorageService` (modified)
- `com.peluqueria.service.SupabaseStorageService` (new)
- `com.peluqueria.controller.ServiceOfferingController` (modified)
- `com.peluqueria.config.StorageConfig` (new - to handle conditional bean creation)

## Dependencies

- `org.springframework.web.client.RestTemplate` (for Supabase API calls)

## Testing Strategy

- Unit tests for `FileSystemStorageService` (verification of URL generation).
- Manual verification in staging.
