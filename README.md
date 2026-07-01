# IBM ACE Modernization POC

## Overview

This repository demonstrates how a traditional IBM App Connect Enterprise (IBM ACE) integration platform can be modernized using cloud-native technologies.

The goal is not to rebuild IBM ACE, but to showcase an enterprise migration strategy using containerized microservices and event-driven architecture.

---

## Architecture

Client

↓

Kong API Gateway

↓

Producer Service (Node.js)

↓

Apache Kafka

↓

Consumer Service (Node.js)

↓

Downstream Services

↓

PostgreSQL

↓

Monitoring

---

## Technology Stack

- Node.js
- Express.js
- Apache Kafka
- KafkaJS
- Kong API Gateway
- PostgreSQL
- Docker
- Docker Compose

Future Enhancements

- Kubernetes
- AWS ECS/EKS
- Prometheus
- Grafana

---

## Repository Structure

```
producer-service/
consumer-service/
kong/
kafka/
database/
architecture/
docs/
```

---

## Status

🚧 Sprint 1 - Project Initialization