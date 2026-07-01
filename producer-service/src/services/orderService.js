const { producer } = require("../kafka/producer");

async function publishOrder(order) {
    await producer.send({
        topic: process.env.KAFKA_TOPIC,
        messages: [
            {
                value: JSON.stringify(order),
            },
        ],
    });
}

module.exports = {
    publishOrder,
};