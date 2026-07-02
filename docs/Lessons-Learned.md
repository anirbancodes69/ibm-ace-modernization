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

# Sprint 4 - Consumer Initialization

## Key Learnings

- Producer and Consumer should share common logging standards.
- Separate environment files simplify local and Docker execution.
- Mirroring project structure across services improves maintainability.

## Kafka Validation

### Key Learnings

- Validate Kafka independently before debugging application consumers.
- A console consumer is the fastest way to verify end-to-end message flow.
- Kafka consumer groups were verified before implementing the Consumer Service.

## Kafka Consumer

- Validate Kafka infrastructure before implementing application consumers.
- Consumer groups distribute work while ensuring each message is processed by only one consumer in the group.
- Graceful shutdown allows the consumer to leave the group cleanly and reduces unnecessary rebalancing.

## Kafka Consumer Groups

### Key Learnings

- Single-node Kafka requires explicit replication settings for internal topics.
- Kafka should be validated inside Docker before implementing application logic.
- Verify consumer groups before debugging KafkaJS consumers.


## Sprint 5 - Milestone 1

Avoid placing business logic directly inside Kafka consumers.

The consumer should only:

- Receive events
- Validate payloads
- Delegate processing

Business orchestration belongs in a dedicated service layer, while message transformation belongs in a transformer layer.

This separation closely mirrors IBM App Connect Enterprise, where MQ Input, Compute, and Mapping nodes each have distinct responsibilities.

## Sprint 5 - Milestone 2

Repositories encapsulate persistence logic and isolate database operations from business services.

The Order Service now focuses only on orchestration, while the Order Repository handles SQL interaction.

This separation improves maintainability and mirrors IBM ACE Database node responsibilities.

## Sprint 5 - Milestone 2

A repository layer was introduced to isolate database operations from business orchestration.

The event processing pipeline now follows:

Kafka Consumer → Service → Transformer → Repository → PostgreSQL

This mirrors IBM ACE Database Node responsibilities while keeping the service layer focused on orchestration.

## Sprint 5 - Milestone 3

Validation should occur after message transformation and before persistence.

By validating the canonical model instead of the incoming event, downstream systems always receive a consistent enterprise data model regardless of the source payload.

## Sprint 6 - Milestone 1

Introducing an API Gateway decouples clients from backend services.

Clients communicate only with Kong, allowing routing, authentication, rate limiting, and observability to be implemented centrally without changing application code.

### Sprint 6 - Kong Routing

Kong's `strip_path` setting determines whether the matched route prefix is removed before forwarding the request to the upstream service.

For services that expose versioned REST endpoints (e.g., `/api/v1/orders`), `strip_path: false` preserves the original request path, ensuring the upstream service receives the expected endpoint.

Incorrect configuration can result in the upstream receiving `/` instead of `/api/v1/orders`, leading to HTTP 404 responses.