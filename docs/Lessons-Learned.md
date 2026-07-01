## Sprint 1 - Docker Foundation

### Key Learnings

- Containers are ephemeral; data should be stored in persistent volumes.
- Docker Compose provides service orchestration, not application readiness.
- Health checks verify application readiness, not just container startup.
- Service discovery should rely on Docker DNS (service names), not container IP addresses.
- Configuration should be externalized using environment variables.
- Infrastructure should be reproducible through code.

## Sprint 2 - Kafka Broker

- Added a single-node Apache Kafka broker using KRaft mode.
- Kafka runs as both broker and controller for local development.
- Kafka data is persisted using a named Docker volume.

## Sprint 2 - Milestone 1

- Successfully started Apache Kafka 4.0 in KRaft mode.
- Verified broker startup through container logs.
- Kafka is listening on port 9092 and ready to accept client connections.