const { v4: uuid } = require("uuid");
const { publishOrder } = require("../services/orderService");

async function createOrder(req, res, next) {
    try {
        const order = {
            correlationId: uuid(),
            ...req.body,
            createdAt: new Date().toISOString(),
        };

        await publishOrder(order);

        return res.status(202).json({
            message: "Order accepted",
            correlationId: order.correlationId,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
};