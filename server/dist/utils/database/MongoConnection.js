"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function MongoConnection() {
    mongoose_1.default
        .connect(process.env.MONGO_DB_URL)
        .then((success) => {
        console.log(`[Mongo DB]: ${success.connection.host}`);
    })
        .catch((error) => {
        console.log(`[Mongo DB]: ${error.messages}`);
    });
}
exports.default = MongoConnection;
