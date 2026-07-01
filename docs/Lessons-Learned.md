## Sprint 1 - Docker Foundation

### Key Learnings

- Containers are ephemeral; data should be stored in persistent volumes.
- Docker Compose provides service orchestration, not application readiness.
- Health checks verify application readiness, not just container startup.
- Service discovery should rely on Docker DNS (service names), not container IP addresses.
- Configuration should be externalized using environment variables.
- Infrastructure should be reproducible through code.