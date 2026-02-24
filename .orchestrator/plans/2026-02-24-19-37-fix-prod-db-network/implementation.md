# Implementation Log: Fix Production DB Network Unreachable
>
> Started: 2026-02-24T19:37:00+01:00
> Tasks: 2
---

### Task 1: Add IPv4 preference to Dockerfile ✅ — Files: `peluqueria-api/Dockerfile`

- Added `-Djava.net.preferIPv4Stack=true` JVM flag to ENTRYPOINT
- Forces Java to use IPv4 addresses, avoiding the IPv6 `Network is unreachable` error

### Task 2: Clean query params in DatabaseConfig ✅ — Files: `DatabaseConfig.java`

- When credentials are extracted from URI userInfo, `user=` and `password=` query params are now stripped
- Prevents sending credentials in both HikariCP config AND URL query string

---

## Summary

- Completed: 2 tasks
- Skipped: 0
- Build: PASS (`./mvnw compile` succeeded)
- Finished: 2026-02-24T19:40:00+01:00
