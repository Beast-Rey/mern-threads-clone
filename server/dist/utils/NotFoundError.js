"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super();
        this.statusCode = 404;
        this.message = message;
    }
}
exports.default = NotFoundError;
