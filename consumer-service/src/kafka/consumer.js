const { Kafka } = require("kafkajs");
const logger = require("../utils/logger");
const { processOrder } = require("../services/order.service");

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
});

async function startConsumer() {
  try {
    await consumer.connect();
    logger.info("Kafka consumer connected successfully");

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC,
      fromBeginning: true,
    });

    logger.info("Subscribed to Kafka topic", {
      topic: process.env.KAFKA_TOPIC,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const order = JSON.parse(message.value.toString());

          logger.info("Order event received", {
            topic,
            partition,
            offset: message.offset,
            order,
          });

          await processOrder(order);
        } catch (error) {
          logger.error("Failed to process Kafka message", {
            error: error.message,
            topic,
            partition,
            offset: message.offset,
          });
        }
      },
    });
  } catch (error) {
    logger.error("Kafka consumer startup failed", {
      error: error.message,
    });
    throw error;
  }
}

async function shutdown() {
  try {
    logger.info("Disconnecting Kafka consumer...");
    await consumer.disconnect();
    logger.info("Kafka consumer disconnected successfully");
  } catch (error) {
    logger.error("Error disconnecting Kafka consumer", {
      error: error.message,
    });
  }
}

module.exports = {
  startConsumer,
  shutdown,
};