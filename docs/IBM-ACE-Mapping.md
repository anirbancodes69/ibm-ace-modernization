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