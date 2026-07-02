CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    event_id UUID NOT NULL,
    order_id INTEGER NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(50) NOT NULL,
    received_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);