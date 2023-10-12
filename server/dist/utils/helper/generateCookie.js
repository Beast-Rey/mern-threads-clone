"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateCookie = (token, res) => {
    return res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });
};
exports.default = generateCookie;
