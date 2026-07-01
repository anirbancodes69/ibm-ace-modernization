const { v4: uuid } = require("uuid");

module.exports = (req, res, next) => {
    const correlationId = req.header("X-Correlation-ID") || uuid();

    req.correlationId = correlationId;

    res.setHeader("X-Correlation-ID", correlationId);

    next();
};