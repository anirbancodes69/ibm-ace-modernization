# IBM ACE Modernization POC

## Overview

This repository demonstrates how a traditional IBM App Connect Enterprise (IBM ACE) integration platform can be modernized using cloud-native technologies.

The project replaces traditional integration patterns with containerized microservices communicating through Apache Kafka.

---

## High Level Architecture

```
Client
    │
    ▼
Kong API Gateway
    │
    ▼
Producer Service
    │
    ▼
Apache Kafka
    │
    ▼
Consumer Service
    │
    ▼
Downstream Services
    │
    ▼
PostgreSQL
```

---

## Technology Stack

- Node.js
- Express.js
- Apache Kafka
- KafkaJS
- Docker
- Docker Compose
- PostgreSQL
- Winston
- Zod

Future

- Kong Gateway
- Prometheus
- Grafana
- Kubernetes
- AWS ECS/EKS

---

## Repository Structure

```
ibm-ace-modernization/

producer-service/
consumer-service/

database/
kafka/
kong/

architecture/
docs/

docker-compose.yml
```

---

## Running the Platform

```bash
docker compose up -d
```

---

## Available Services

| Service | Port |
|----------|------|
| Producer Service | 3000 |
| Kafka | 9092 |
| PostgreSQL | 5432 |

---

## Progress

### Sprint 1 ✅

- Repository setup
- Docker Compose
- PostgreSQL
- Docker networking
- Persistent volumes

### Sprint 2 ✅

- Apache Kafka
- KRaft Mode
- Topic creation
- Event production
- Broker verification

### Sprint 3 ✅

- Producer Service
- Express.js
- KafkaJS
- Validation
- Correlation IDs
- Global Error Handling
- Graceful Shutdown
- Dockerized Producer

### Sprint 4

- Consumer Service
- Kafka Consumers
- Consumer Groups
- Retry Strategy
- Dead Letter Queue

### Sprint 5

- Database Persistence

### Sprint 6

- Downstream Services

### Sprint 7

- Monitoring

### Sprint 8

- IBM ACE Migration Story

---

## Documentation

- architecture/
- docs/
- ADRs
- Lessons Learned
- IBM ACE Mapping
- Migration Strategy

---

## Current Status

✔ Kafka running

✔ PostgreSQL running

✔ Producer Service running inside Docker

✔ Event publishing working

✔ Docker Compose deployment complete

## Sprint 4

Consumer Service initialized.

Current progress:

- Consumer project created
- Shared logging
- Environment configuration
- Docker ready

### Sprint 4 - Kafka Infrastructure Validation

Verified:

- Kafka broker is healthy
- Producer publishes successfully
- Topic exists
- Console consumer receives events
- Consumer groups function correctly

### Consumer Service

Implemented a Kafka consumer that:

- Connects to Kafka
- Joins a consumer group
- Subscribes to `order.created`
- Logs incoming events


### Sprint 4 - Dockerized Event Flow

Verified end-to-end event processing using Docker Compose.

Flow:

Client
→ Producer Service
→ Apache Kafka
→ Consumer Service

Kafka Consumer
      │
      ▼
Order Service
      │
      ▼
Order Transformer
      │
      ▼
Canonical Order


Kafka Consumer
      │
      ▼
Order Service
      │
      ▼
Order Transformer
      │
      ▼
Canonical Order
      │
      ▼
Order Repository
      │
      ▼
PostgreSQL


Kafka Consumer
      │
      ▼
Order Service
      │
      ▼
Order Transformer
      │
      ▼
Order Validator
      │
      ▼
Order Repository
      │
      ▼
PostgreSQL