"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const CATEGORY = 'Logger';
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "debug",
    format: combine(label({ label: CATEGORY }), timestamp(), customFormat, prettyPrint()),
    transports: [new winston_1.transports.Console()]
});
exports.default = logger;
