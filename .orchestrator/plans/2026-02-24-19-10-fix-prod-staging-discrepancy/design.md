# Design: robust-database-connection-v2

## Architecture Overview

The `DatabaseConfig` will be updated to be "parameter-aware". Instead of just taking the path, it will rebuild the connection string including any query parameters.

## Logic Flow

1. **Detect Potential URI**: Check if it contains `@` or starts with common URI schemes.
2. **Standardize Scheme**: Always use `jdbc:postgresql://` for the final string.
3. **Parse and Rebuild**:
   - Extract `userInfo` for creds.
   - Extract `host`, `port`.
   - Extract `path` AND `query`.
   - Result: `jdbc:postgresql://[host]:[port][path]?[query]`
4. **Validation**: Mask the password and log the result.

## Modified Files

- `peluqueria-api/src/main/java/com/peluqueria/config/DatabaseConfig.java`
