"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, printf, label, timestamp } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "debug",
    format: combine(label({ label: "Logger", message: true }), timestamp(), myFormat),
    transports: [new winston_1.transports.Console()],
});
exports.default = logger;
