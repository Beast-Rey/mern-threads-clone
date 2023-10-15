"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
        });
        next();
    }
    catch (error) {
        return res.status(400).send(error);
    }
};
exports.default = ValidateSchema;
