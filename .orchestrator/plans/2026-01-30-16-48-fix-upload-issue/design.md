# Design Document: Debug and Fix Uploads

## 1. Backend Configuration

### `application.properties`

Add:

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

This ensures larger images don't fail immediately.

## 2. Controller Logging

Add logs to `ServiceOfferingController.createServiceOffering`.

```java
System.out.println("Received create service request");
System.out.println("Service JSON: " + serviceJson);
if (image != null) {
   System.out.println("Image: " + image.getOriginalFilename());
}
```

This helps confirm if the request passes the Security Filter Chain.

## 3. Frontend Check

Ensure `serviceOfferingService.ts` isn't setting `Content-Type: application/json` explicitly on the multipart request (Axios usually handles it, but our code explicitly set `multipart/form-data`, which is correct but let's verifying `JSON.stringify` didn't break anything).

The current frontend code:

```typescript
        const response = await apiClient.post<ServiceOffering>('/api/services', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
```

This is generally correct. The browser sets the boundary. **Wait**, manually setting `Content-Type: 'multipart/form-data'` in Axios *can* sometimes break the boundary generation if not careful. It is often better to let Axios set it.
**Design Change**: Remove the explicit `Content-Type` header in frontend service. Axios detects `FormData` and sets it with boundary.

## 4. Plan

1. **Backend**: Add properties + Logs.
2. **Frontend**: Remove manual Content-Type header.
