const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
    logger.error(err.message, {
        correlationId: req.correlationId,
        stack: err.stack,
    });

    res.status(err.statusCode || 500).json({
        success: false,
        correlationId: req.correlationId,
        message: err.message || "Internal Server Error",
    });
};