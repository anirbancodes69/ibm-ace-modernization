require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");

const {
    connectProducer,
    disconnectProducer,
} = require("./kafka/producer");

const PORT = process.env.PORT || 3000;

let server;

async function start() {
    try {
        await connectProducer();

        logger.info("Connected to Kafka");

        server = app.listen(PORT, () => {
            logger.info("Producer Service started", {
                port: PORT,
                environment: process.env.NODE_ENV,
            });
        });
    } catch (error) {
        logger.error("Failed to start Producer Service", {
            error: error.message,
            stack: error.stack,
        });

        process.exit(1);
    }
}

async function shutdown(signal) {
    logger.info(`${signal} received. Shutting down gracefully...`);

    try {
        if (server) {
            server.close();
        }

        await disconnectProducer();

        logger.info("Kafka Producer disconnected");
        logger.info("Shutdown complete");

        process.exit(0);
    } catch (error) {
        logger.error("Graceful shutdown failed", {
            error: error.message,
        });

        process.exit(1);
    }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();