const { z } = require("zod");

const orderSchema = z.object({
    orderId: z.number().int().positive(),
    customer: z.string().min(1).max(100),
    amount: z.number().positive(),
});

module.exports = {
    orderSchema,
};