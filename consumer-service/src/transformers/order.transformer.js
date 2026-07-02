const { v4: uuidv4 } = require("uuid");

function transformOrder(order) {
  return {
    eventId: uuidv4(),
    orderId: order.orderId,
    customerName: order.customer,
    totalAmount: order.amount,
    currency: "INR",
    status: "RECEIVED",
    receivedAt: new Date().toISOString()
  };
}

module.exports = {
  transformOrder
};