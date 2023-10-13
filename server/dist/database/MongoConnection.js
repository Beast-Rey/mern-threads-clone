"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger/logger"));
function MongoConnection() {
    mongoose_1.default
        .connect(process.env.MONGO_DB_URL)
        .then((success) => {
        logger_1.default.info(`[Mongo DB]: ${success.connection.host}`);
    })
        .catch((error) => {
        logger_1.default.error(`[Mongo DB]: ${error.messages}`);
    });
}
exports.default = MongoConnection;
