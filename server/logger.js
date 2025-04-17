// logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

// รูปแบบ log message
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// สร้าง logger
const logger = createLogger({
  level: "info", // เก็บ log ตั้งแต่ระดับ info ขึ้นไป (info, warn, error)
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // เก็บ stack ของ error
    logFormat
  ),
  transports: [
    new transports.Console(), // แสดงใน console ด้วย
    new transports.File({ filename: "logs/error.log", level: "error" }), // เก็บเฉพาะ error
    new transports.File({ filename: "logs/combined.log" }), // เก็บทุกระดับที่ >= info
  ],
});

module.exports = logger;
