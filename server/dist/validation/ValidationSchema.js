"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loginschema = exports.Registerschema = void 0;
const zod_1 = require("zod");
exports.Registerschema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(30),
        username: zod_1.z.string().min(3).max(30),
        password: zod_1.z.string(),
        email: zod_1.z.string().email(),
    }),
});
exports.Loginschema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(3).max(30),
        password: zod_1.z.string(),
    }),
});
