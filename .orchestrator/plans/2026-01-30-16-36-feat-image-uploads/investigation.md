# Investigation Report: Image Uploads

## 1. Request Analysis

The user wants to allow users to upload images for services instead of pasting URLs.
Questions: "Where can we save them and how to save them correctly?"

## 2. Options Analysis

### Option A: Local Filesystem (Spring Boot `ResourceHandler`)

- **Pros**: Zero external dependencies. Fast for local dev. Free.
- **Cons**: Stateless constraints (Docker/Heroku will wipe files on restart). Not scalable. Hard to migrate later.
- **Suitability**: Good for PoC, bad for "SaaS" unless utilizing Persistent Volumes.

### Option B: Cloud Storage (AWS S3 / Google Cloud Storage)

- **Pros**: Industry standard. Scalable. Secure.
- **Cons**: Requires credit card/AWS account. Setup complexity (IAM, Buckets). Local testing requires mocking or LocalStack.
- **Suitability**: Best for "Correct" Production apps.

### Option C: Cloudinary (PaaS)

- **Pros**: Specialized for images (transformations, compression). Free tier is great. Simple API.
- **Cons**: External dependency.
- **Suitability**: Excellent for SaaS MVP / Rapid Dev.

## 3. Recommended Approach: Cloudinary

Given this is a React + Spring Boot SaaS, Cloudinary solves the "Optimization" and "CDN" part out of the box. However, without user credentials providing them, we cannot implement it immediately.

## 4. Immediate Implementation: "Local Storage Service" (Interface-based)

We should implement a `StorageService` interface.

- `String store(MultipartFile file)`
- `void delete(String path)`

We will implement a `FileSystemStorageService` for NOW (Development), which saves to a local folder `uploads/` and serves them via static resource mapping.
**Why?** It works immediately without asking the user for Credit Cards/API Keys, but keeps the architecture clean (Interface) so switching to S3 later is just a new implementation class.

## 5. Technical Changes

### Backend

- **New Dependency**: None needed for standard Multipart (Spring Web has it).
- **Configuration**:
  - `FileStorageConfig`: Define upload dir.
  - `WebConfig`: Add `addResourceHandlers` to map `/uploads/**` to `file:uploads/`.
- **Service**: `FileSystemStorageService`.
- **Controller**: Update `ServiceOfferingController` to accept `MultipartFile image` instead of `@RequestBody`.
  - This changes the content-type from `application/json` to `multipart/form-data`.

### Frontend

- **Modal**:
  - Change `input type="url"` to `input type="file"`.
  - Handle `onChange` to capture File object.
- **Service**:
  - Change `create` to send `FormData`.
  - Append fields manually: `formData.append('name', data.name)`.
  - `formData.append('image', file)`.

## 6. Security Note

- Validate file types (jpg, png).
- Validate size (< 5MB).
- Randomize filenames to avoid collisions/overwrites.

## 7. Plan

1. **Backend**: Create `StorageService` interface & `FileSystemStorageService`.
2. **Backend**: Configure Static Resource serving.
3. **Backend**: Refactor `createServiceOffering` to accept `MultipartFile`.
4. **Frontend**: Update `CreateServiceModal` and `serviceOfferingService`.
