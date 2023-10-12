"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AsyncWrapper_1 = __importDefault(require("../utils/AsyncWrapper"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const ProtectedRoute = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.EXPRESS_JWT_SECRET);
    if (!decoded) {
        throw new AppError_1.default({
            message: "Unauthorized",
            statusCode: 400,
        });
    }
    const user = yield UserModel_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.userId).select("-password");
    req.user = user;
    next();
}));
exports.default = ProtectedRoute;
