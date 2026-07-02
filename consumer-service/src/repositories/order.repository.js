const pool = require("../database/postgres");
const logger = require("../utils/logger");

async function saveOrder(order) {
  try {
    const query = `
      INSERT INTO orders (
        event_id,
        order_id,
        customer_name,
        total_amount,
        currency,
        status,
        received_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
      order.eventId,
      order.orderId,
      order.customerName,
      order.totalAmount,
      order.currency,
      order.status,
      order.receivedAt,
    ];

    await pool.query(query, values);

    logger.info("Order persisted successfully", {
      orderId: order.orderId,
    });
  } catch (error) {
    logger.error("Repository insert failed", {
      error: error.message,
      stack: error.stack,
    });

    throw error;
  }
}

module.exports = {
  saveOrder,
};