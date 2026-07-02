const logger = require("../utils/logger");
const { transformOrder } = require("../transformers/order.transformer");

async function processOrder(order) {
  logger.info("Processing order event", {
    orderId: order.orderId
  });

  const canonicalOrder = transformOrder(order);

  logger.info("Canonical order created", canonicalOrder);

  return canonicalOrder;
}

module.exports = {
  processOrder
};