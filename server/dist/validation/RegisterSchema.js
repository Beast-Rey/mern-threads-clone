"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Registerschema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});
exports.default = Registerschema;
