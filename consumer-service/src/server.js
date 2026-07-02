require("dotenv").config();

const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Consumer Service running on port ${PORT}`);
});