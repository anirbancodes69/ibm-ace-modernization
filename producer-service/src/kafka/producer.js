const { producer } = require("../config/kafka");

async function connectProducer() {
    await producer.connect();
}

async function disconnectProducer() {
    await producer.disconnect();
}

module.exports = {
    producer,
    connectProducer,
    disconnectProducer,
};