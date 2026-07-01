require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info("Producer Service started", {
        port: PORT,
        environment: process.env.NODE_ENV
    });
});