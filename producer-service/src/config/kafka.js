const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

module.exports = {
    kafka,
    producer,
};