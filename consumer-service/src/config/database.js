const { Pool } = require("pg");
const logger = require("../utils/logger");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDatabase = async () => {
  try {
    const client = await pool.connect();

    logger.info("PostgreSQL connected successfully");

    client.release();
  } catch (error) {
    logger.error("Failed to connect to PostgreSQL", error);

    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDatabase,
};