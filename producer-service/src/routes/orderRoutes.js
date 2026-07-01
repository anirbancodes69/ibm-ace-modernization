const express = require("express");

const { createOrder } = require("../controllers/orderController");
const validateRequest = require("../middleware/validateRequest");
const { orderSchema } = require("../validators/orderValidator");

const router = express.Router();

router.post(
    "/orders",
    validateRequest(orderSchema),
    createOrder
);

module.exports = router;