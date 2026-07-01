const express = require("express");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "producer-service",
    });
});

app.use("/api/v1", orderRoutes);

module.exports = app;