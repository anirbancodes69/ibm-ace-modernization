require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");

const { connectDatabase } = require("./config/database");
const {
  startConsumer,
  shutdown: shutdownConsumer,
} = require("./kafka/consumer");

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectDatabase();
    await startConsumer();

    app.listen(PORT, () => {
      logger.info(`Consumer Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start Consumer Service", {
      error: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
}

startServer();

async function shutdown() {
  try {
    logger.info("Shutting down Consumer Service");

    await shutdownConsumer();

    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", {
      error: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);