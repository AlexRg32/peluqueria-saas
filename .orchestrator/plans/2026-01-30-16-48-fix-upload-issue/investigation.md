# Investigation Report: Upload Failure

## 1. Problem Analysis

User reports an error "al cargar" (upon uploading/creating).
Logs show successful startup and some GET queries, but no stack trace for the error.
Previous 403 issue might persist or it could be a new 400/415/500 error.

## 2. Potential Causes

1. **Multipart Config**: Default Spring Boot limit is 1MB/10MB. If the image is larger, it throws `MaxUploadSizeExceededException`, often not logged clearly in `System.out` unless handled.
2. **CORS**: `multipart/form-data` requests sometimes trigger strict CORS checks or Preflight failures if headers aren't allowed.
3. **Controller Signature**: `@RequestPart("service") String serviceJson`. If the frontend sends `service` as a JSON object inside FormData, it might come across as Content-Type `application/json` but Spring treats it as String. This usually works, but if the browser sends it without Content-Type, it's just a string.
4. **Security**: The modification to `User.java` should have fixed the 403. If 403 persists, we need to verify the token/auth flow.

## 3. Strategy

1. **Add File Size Config**: Explicitly increase limits in `application.properties` to avoid silent rejections.
2. **Add Logging**: Add `System.out.println` or `Logger` in the Controller to see if the request hits the method.
3. **Exception Handling**: Ensure `GlobalExceptionHandler` (if exists) prints the error.

## 4. Plan

- Modify `application.properties`: Increase multipart limits.
- Modify `ServiceOfferingController`: Add logs at the start of the method.
