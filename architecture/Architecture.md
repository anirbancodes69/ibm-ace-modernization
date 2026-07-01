
# IBM ACE Modernization Architecture

## Current Architecture

                Docker Compose

        +-------------------------+
        |                         |
        |  PostgreSQL             |
        |                         |
        |  Apache Kafka           |
        |                         |
        +-------------------------+

## Upcoming Architecture

Client

↓

Producer Service

↓

Apache Kafka

↓

Consumer Service

↓

PostgreSQL