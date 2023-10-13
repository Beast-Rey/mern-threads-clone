import { createLogger, format, transports } from "winston";
const { combine, printf, label, timestamp } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: "Logger", message: true }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()],
});

export default logger;
