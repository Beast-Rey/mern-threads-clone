"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    return res.status(400).send(error.message);
};
exports.default = errorHandler;
