# Lessons Learned

This document captures the important architectural, infrastructure, and implementation lessons learned while building the IBM ACE Modernization POC.

---

# Sprint 1 - Docker Foundation

## Key Learnings

- Containers are ephemeral; persistent data must be stored in Docker volumes.
- Docker Compose orchestrates services but does not guarantee application readiness.
- Health checks verify service readiness, not just container startup.
- Docker service names provide built-in DNS for inter-service communication.
- Configuration should be externalized using environment variables.
- Infrastructure should be reproducible through code.

---

# Sprint 2 - Apache Kafka Foundation

## Key Learnings

- Successfully deployed Apache Kafka 4.0 in KRaft mode.
- Created Kafka topics manually.
- Verified topic metadata and partition leadership.
- Produced events using Kafka CLI.
- Verified persistence through offsets and log segments.
- Learned to troubleshoot Kafka using:
  - kafka-topics.sh
  - kafka-console-producer.sh
  - kafka-get-offsets.sh
  - kafka-dump-log.sh
- Understood the relationship between partitions, offsets and log files.

---

# Sprint 3 - Producer Service

## Milestone 1

- Initialized Producer Service.
- Established project structure.
- Installed:
  - Express
  - KafkaJS
  - Winston
  - Zod
  - UUID
- Configured environment variables.

---

## Milestone 2

- Built Express application.
- Added Health endpoint.
- Configured JSON middleware.

---

## Milestone 3

- Introduced structured logging using Winston.
- Centralized logging.
- Removed console.log usage.

---

## Milestone 4

- Connected Producer Service to Apache Kafka.
- Implemented startup connection verification.
- Added fail-fast startup if Kafka is unavailable.

---

## Kafka Networking

- Kafka clients first connect to the bootstrap server.
- Kafka then returns advertised broker addresses.
- Incorrect advertised listeners break producers even when bootstrap succeeds.
- Implemented dual listeners for:
  - localhost (development)
  - Docker network (Compose)

---

## Milestone 5

- Published first business event.
- Implemented POST /api/v1/orders.
- Introduced service layer.
- Added asynchronous event publishing.

---

## Milestone 6

- Added request validation using Zod.
- Validation occurs before controller execution.
- Invalid requests never reach business logic.

---

## Milestone 7

- Added Correlation ID middleware.
- Supports client-provided Correlation IDs.
- Automatically generates IDs when missing.
- Returns Correlation ID in response headers.
- Propagates Correlation IDs into Kafka events.

---

## Milestone 8

- Added centralized error handling.
- Standardized API error responses.
- Logged application errors using Winston.

---

## Milestone 9

- Implemented graceful shutdown.
- Closes HTTP server.
- Disconnects Kafka Producer.
- Prevents resource leaks.

---

## Milestone 10

- Dockerized Producer Service.
- Runs completely inside Docker Compose.
- Uses Docker networking.
- Supports separate local and Docker environment configuration.

---

# Overall Architectural Lessons

- Infrastructure should be version controlled.
- Small focused services are easier to evolve than monoliths.
- Event-driven systems should publish immutable events.
- Correlation IDs are essential for distributed tracing.
- Validation belongs at service boundaries.
- Logging should be structured from day one.
- Docker networking differs from host networking.
- Kafka advertised listeners are one of the most common deployment pitfalls.