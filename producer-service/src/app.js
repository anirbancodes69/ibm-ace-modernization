const express = require("express");

const orderRoutes = require("./routes/orderRoutes");
const correlationId = require("./middleware/correlationId");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(correlationId);

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "producer-service",
    });
});

app.use("/api/v1", orderRoutes);

// Must be LAST middleware
app.use(errorHandler);

module.exports = app;