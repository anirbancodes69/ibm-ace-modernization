require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");

const { connectDatabase } = require("./config/database");
const { startConsumer, consumer } = require("./kafka/consumer");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDatabase();
    await startConsumer();

    app.listen(PORT, () => {
      logger.info(`Consumer Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start Consumer Service", error);
    process.exit(1);
  }
};

startServer();

const shutdown = async () => {
  logger.info("Shutting down Consumer Service");

  await consumer.disconnect();

  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);