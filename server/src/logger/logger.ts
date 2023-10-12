import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY:string = 'Logger'

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = createLogger({
    level: "debug",
    format: combine(label({label:CATEGORY}), timestamp(), customFormat, prettyPrint()),
    transports: [new transports.Console()]

})

export default logger