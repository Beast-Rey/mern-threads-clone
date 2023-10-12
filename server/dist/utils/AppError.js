"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(args) {
        super(args.message);
        this.statusCode = args.statusCode;
    }
}
exports.default = AppError;
