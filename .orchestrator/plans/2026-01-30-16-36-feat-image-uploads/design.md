# Design Document: Image Uploads

## 1. Backend Architecture

### `StorageService` Interface

Define a contract for storage to allow future migration to S3.

```java
public interface StorageService {
    String store(MultipartFile file);
    void delete(String filename);
    Resource loadAsResource(String filename);
}
```

### `FileSystemStorageService` Implementation

- **Location**: `uploads/` (root of project, or relative to run dir).
- **Naming**: `UUID.randomUUID().toString() + extension`.
- **Validation**: Check content type (`image/jpeg`, `image/png`) and empty files.

### `WebMvcConfig`

Map external URL `/uploads/**` to local directory `file:uploads/`.

- **Security Warning**: Ensure we don't expose sensitive files. Only map the specific uploads folder.

### `ServiceOfferingController` Update

- **Method**: `createServiceOffering`
- **Params**:
  - `@RequestPart("service") String serviceJson` (or `@RequestPart("name") String name`, etc. - Mixing JSON string + File is cleanest).
  - `@RequestPart("image") MultipartFile image`
- **Flow**:
    1. Parse JSON/Params.
    2. Store image -> get `filename`.
    3. Construct entity.
    4. Set `image` field to `/uploads/{filename}` (Fully qualified URL returned to client is better, but relative path stored in DB is standard).

## 2. Frontend Architecture

### `serviceOfferingService.ts` Update

- **Method**: `create`
- **Change**: Content-Type `multipart/form-data`.
- **Payload**: `FormData` object.
  - `service`: JSON stringified object (excluding image).
  - `image`: File object.

### `CreateServiceModal.tsx` Update

- **Process**:
  - Add File Input.
  - Preview image (nice to have).
  - On Submit: Construct FormData.

## 3. Data Integrity

- If Image Save Fails -> Abort transaction.
- If Service Save Fails -> Delete uploaded image (cleanup).
- **Deletion**: When a service is deleted, the associated image should be deleted from disk. (Nice to have, but critical for long-term disk health).

## 4. Security

- Use `@Value("${app.upload.dir:uploads}")` to configure path.
- Sanitize filenames (though UUID approach handles this).
