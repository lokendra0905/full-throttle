const rateLimit = require("express-rate-limit");

const bidLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    message: "Too many bids from this IP, please try again after 15 minutes.",
  },
  headers: true,
});

module.exports = bidLimiter;
