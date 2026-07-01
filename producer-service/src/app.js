const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "producer-service"
    });
});

module.exports = app;