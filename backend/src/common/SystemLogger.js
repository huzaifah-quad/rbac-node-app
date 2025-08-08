// pino logger time stamp date format
require('dotenv').config();
const os = require('os');
const { createLogger } = require("winston");

const logger = createLogger({
})
module.exports = logger;