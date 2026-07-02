const healthCheck = (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "consumer-service",
  });
};

module.exports = {
  healthCheck,
};