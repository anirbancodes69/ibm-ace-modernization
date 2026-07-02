const { z } = require("zod");

const canonicalOrderSchema = z.object({
  eventId: z.string().uuid(),
  orderId: z.number().int().positive(),
  customerName: z.string().min(1),
  totalAmount: z.number().positive(),
  currency: z.string().length(3),
  status: z.string(),
  receivedAt: z.string().datetime(),
});

function validateOrder(order) {
  return canonicalOrderSchema.parse(order);
}

module.exports = {
  validateOrder,
};