# ADR-002: Kafka Dual Listener Configuration

## Status

Accepted

## Context

The modernization platform supports two execution environments:

1. Local development
2. Docker Compose

Kafka advertises broker addresses to clients. A single advertised listener cannot satisfy both environments because:

- Local applications resolve `localhost`
- Docker containers resolve the Docker service name (`kafka`)

## Decision

Configure two Kafka listeners:

- PLAINTEXT → localhost:9092
- DOCKER → kafka:29092

## Consequences

### Advantages

- Local applications connect without Docker networking.
- Containerized services communicate using Docker DNS.
- No code changes are required when moving between environments.

### Disadvantages

- Slightly more Kafka configuration.
- Requires documenting which listener each client should use.

## Client Configuration

| Environment | Broker |
|-------------|--------|
| Local Development | localhost:9092 |
| Docker Compose | kafka:29092 |