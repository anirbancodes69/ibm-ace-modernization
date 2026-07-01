const { producer } = require("../config/kafka");

async function connectProducer() {
    await producer.connect();
}

module.exports = {
    producer,
    connectProducer,
};