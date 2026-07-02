const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer-service",
  brokers: [process.env.KAFKA_BROKER],
});

module.exports = kafka;