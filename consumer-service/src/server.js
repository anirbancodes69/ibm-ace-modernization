require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");
const { connectDatabase } = require("./config/database");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info(`Consumer Service running on port ${PORT}`);
  });
};

startServer();