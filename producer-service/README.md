# Producer Service

## Purpose

The Producer Service receives HTTP requests, validates incoming payloads and publishes business events to Apache Kafka.

It represents the replacement for the IBM ACE HTTP Input + Compute flow in the modernization architecture.

---

## Responsibilities

- Accept HTTP requests
- Validate payloads
- Generate or propagate Correlation IDs
- Publish events to Kafka
- Return asynchronous responses

---

## Technology

- Node.js
- Express.js
- KafkaJS
- Winston
- Zod

---

## Folder Structure

```
src/

config/
controllers/
kafka/
middleware/
routes/
services/
utils/
validators/

app.js
server.js
```

---

## Endpoints

### Health

```
GET /health
```

Response

```json
{
    "status":"UP",
    "service":"producer-service"
}
```

---

### Create Order

```
POST /api/v1/orders
```

Headers

```
Content-Type: application/json

X-Correlation-ID (optional)
```

Request

```json
{
    "orderId":1,
    "customer":"Anirban",
    "amount":499
}
```

Response

```json
{
    "message":"Order accepted",
    "correlationId":"xxxxxxxx"
}
```

---

## Validation Rules

| Field | Rule |
|--------|------|
| orderId | Positive Integer |
| customer | Required |
| amount | Positive Number |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | HTTP Port |
| KAFKA_CLIENT_ID | Kafka Client ID |
| KAFKA_BROKER | Kafka Bootstrap Server |
| KAFKA_TOPIC | Kafka Topic |
| LOG_LEVEL | Winston Log Level |

---

## Running Locally

```
npm install
npm run dev
```

---

## Running with Docker

```
docker compose up -d producer-service
```

---

## Current Features

- Health endpoint
- Kafka Producer
- Structured Logging
- Request Validation
- Correlation IDs
- Global Error Handling
- Graceful Shutdown
- Dockerized Deployment