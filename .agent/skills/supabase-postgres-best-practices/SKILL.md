---
name: supabase-postgres-best-practices
description: Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.
---

# Supabase Postgres Best Practices

Comprehensive performance optimization guide for Postgres, maintained by Supabase. Contains rules across 8 categories, prioritized by impact to guide automated query optimization and schema design.

## When to Apply

Reference these guidelines when:

- Writing SQL queries or designing schemas
- Implementing indexes or query optimization
- Reviewing database performance issues
- Configuring connection pooling or scaling
- Optimizing for Postgres-specific features
- Working with Row-Level Security (RLS)

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
| :--- | :--- | :--- | :--- |
| 1 | Query Performance | CRITICAL | `query-` |
| 2 | Connection Management | CRITICAL | `conn-` |
| 3 | Security & RLS | CRITICAL | `security-` |
| 4 | Schema Design | HIGH | `schema-` |
| 5 | Concurrency & Locking | MEDIUM-HIGH | `lock-` |
| 6 | Data Access Patterns | MEDIUM | `data-` |
| 7 | Monitoring & Diagnostics | LOW-MEDIUM | `monitor-` |
| 8 | Advanced Features | LOW | `advanced-` |

## Core Rules Summary

### 1. Query Performance

- **Missing Indexes**: Avoid sequential scans on large tables by indexing columns used in WHERE, JOIN, and ORDER BY.
- **Index Types**: Use B-Tree for general purposes, GIN for JSONB/full-text, and BRIN for large ordered datasets.
- **Partial Indexes**: Use partial indexes (`WHERE condition`) to index only relevant rows, saving space and improving performance.

### 2. Connection Management

- **Connection Pooling**: Use a pooler (like Supavisor) for serverless or high-concurrency environments.
- **Statement Timeouts**: Set `statement_timeout` to prevent long-running queries from blocking the system.

### 3. Security & RLS

- **RLS Performance**: Ensure RLS policies are optimized. Use `auth.uid()` efficiently and avoid complex subqueries in policies.
- **Privileges**: Follow the principle of least privilege. Use dedicated roles for different application parts.

### 4. Schema Design

- **Data Types**: Use the most efficient data type (e.g., `text` instead of `varchar(N)`, `uuid` for IDs).
- **Constraints**: Use NOT NULL, CHECK, and FOREIGN KEY constraints to maintain data integrity at the database level.

## Implementation Workflow

1. **Investigate**: Check if the current task involves database changes.
2. **Design**: Apply schema best practices (types, constraints, indexes).
3. **Verify**: Use `EXPLAIN ANALYZE` to verify query performance.
4. **Optimize**: Refine based on Supabase-specific features (RLS, Supavisor).

## Anti-Rationalization

- **Don't skip indexes** just because "the table is small now". Small tables become large tables.
- **Don't use `timestamp`** because "timezone doesn't matter for this app". It always matters eventually.
- **Don't ignore RLS** because "I'm the only user". RLS is a core part of the Supabase security model.
- **Don't wrap SQL in application logic** for complex filters if a database view or index can do it better.
