const kafka = require("./client");
const logger = require("../utils/logger");

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
});

const startConsumer = async () => {
  await consumer.connect();

  logger.info("Kafka consumer connected");

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: false,
  });

  logger.info(`Subscribed to ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());

      logger.info({
        message: "Order event received",
        topic,
        partition,
        offset: message.offset,
        event,
      });
    },
  });
};

module.exports = {
  startConsumer,
  consumer,
};