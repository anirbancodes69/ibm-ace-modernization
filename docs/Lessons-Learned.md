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