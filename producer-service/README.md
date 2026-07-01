# Producer Service

The Producer Service accepts HTTP requests and publishes events to Apache Kafka.

## Responsibilities

- Accept HTTP requests
- Validate payloads
- Generate correlation IDs
- Publish events to Kafka
- Return asynchronous responses

## Endpoints

### Health Check

GET /health

Response:

```json
{
  "status": "UP",
  "service": "producer-service"
}