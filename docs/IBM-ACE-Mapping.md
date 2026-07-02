# IBM ACE Mapping

| Traditional IBM ACE | Modern Architecture |
|---------------------|---------------------|
| IBM MQ | Apache Kafka |
| Integration Runtime | Docker Containers |
| Integration Node | Producer Service + Consumer Service |
| Message Queue | Kafka Topics |

## Sprint 5 - Transformation Layer

Introduced an Order Service and Order Transformer to separate message consumption from business processing.

IBM ACE Mapping

Kafka Consumer
        ↓
MQ Input Node

Order Service
        ↓
Compute Node

Order Transformer
        ↓
Mapping Node

Canonical Order
        ↓
Enterprise Canonical Data Model

## Sprint 5 - Milestone 2

Added an Order Repository responsible for persisting canonical orders into PostgreSQL.

IBM ACE Mapping

Order Repository
        ↓
Database Node

PostgreSQL
        ↓
Enterprise Database


## Repository Layer

IBM ACE Database Node

↓

Order Repository

↓

PostgreSQL

## Sprint 5 - Milestone 3

Introduced canonical message validation before persistence.

IBM ACE Mapping

Validation Node (Compute)
        ↓
Order Validator (Zod)

## Sprint 6 - API Gateway

IBM DataPower / API Connect

↓

Kong Gateway

The API Gateway becomes the single entry point into the integration platform.