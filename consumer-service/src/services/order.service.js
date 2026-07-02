const logger = require("../utils/logger");
const { transformOrder } = require("../transformers/order.transformer");
const { saveOrder } = require("../repositories/order.repository");

async function processOrder(order) {
  logger.info("Processing order event", {
    orderId: order.orderId,
  });

  const canonicalOrder = transformOrder(order);

  logger.info("Canonical order created", canonicalOrder);

  await saveOrder(canonicalOrder);

  return canonicalOrder;
}

module.exports = {
  processOrder,
};