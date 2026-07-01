# Lessons Learned

## Sprint 1 - Docker Foundation

### Key Learnings

- Containers are ephemeral; data should be stored in persistent volumes.
- Docker Compose provides service orchestration, not application readiness.
- Health checks verify application readiness, not just container startup.
- Service discovery should rely on Docker DNS (service names), not container IP addresses.
- Configuration should be externalized using environment variables.
- Infrastructure should be reproducible through code.

---

## Sprint 2 - Apache Kafka Foundation

### Key Learnings

- Successfully deployed Apache Kafka 4.0 in KRaft mode using Docker Compose.
- Created a Kafka topic (`order.created`).
- Verified topic metadata and partition leadership.
- Produced an event to Kafka.
- Verified event persistence by inspecting Kafka log segments and offsets.
- Learned to troubleshoot Kafka using:
  - `kafka-topics.sh`
  - `kafka-get-offsets.sh`
  - `kafka-dump-log.sh`
- Validated that the broker is healthy and storing events correctly.
- Kafka CLI consumer behavior differed from expectations, but broker persistence and offsets confirmed correct operation.

## Sprint 3 - Producer Service

### Milestone 1

- Initialized the Producer Service.
- Created a scalable folder structure.
- Installed core dependencies:
  - Express
  - KafkaJS
  - Winston
  - Zod
  - UUID
- Configured environment variables.

### Milestone 2

- Created the Express application.
- Added JSON middleware.
- Implemented a health check endpoint.
- Verified the service starts successfully.

### Milestone 3

- Introduced structured logging with Winston.
- Centralized logging into a reusable logger module.
- Replaced console logging with structured JSON logs.

### Kafka Networking

- Kafka clients connect to the bootstrap server first.
- After bootstrapping, Kafka returns the advertised broker addresses.
- Incorrect advertised listeners cause clients to fail even when the initial connection succeeds.
- Dual listeners support both local development and Docker networking without changing application code.

### Milestone 6

- Added request validation using Zod.
- Validation is implemented as reusable Express middleware.
- Invalid requests are rejected before reaching business logic.