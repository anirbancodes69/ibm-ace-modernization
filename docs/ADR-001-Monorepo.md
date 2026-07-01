# ADR-001: Monorepo

## Status
Accepted

## Context

The project consists of multiple services that evolve together as part of a single integration platform.

## Decision

Use a monorepo.

## Consequences

Advantages

- Single Docker Compose
- Easier onboarding
- Shared documentation
- Easier demos
- Shared CI/CD initially

Trade-offs

- Repository grows over time.
- Independent releases become harder if many teams own different services.