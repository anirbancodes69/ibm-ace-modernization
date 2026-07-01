require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");
const { connectProducer } = require("./kafka/producer");

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await connectProducer();

        logger.info("Connected to Kafka");

        app.listen(PORT, () => {
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

start();