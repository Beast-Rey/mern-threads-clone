"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const zod_1 = require("zod");
const ErrorHandling = (error, _req, res, _next) => {
    if (error instanceof AppError_1.default) {
        return res.status(error.statusCode).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
    if (error instanceof zod_1.ZodError) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
    if (error.name === 'ValidationError') {
        return res.status(500).json({ error: error.name });
    }
    return res.status(500).json(error.message);
};
exports.default = ErrorHandling;
