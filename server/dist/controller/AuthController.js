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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUser = exports.LoginUser = exports.RegisterUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const genCookieAndToken_1 = require("../helper/genCookieAndToken");
const AppError_1 = __importDefault(require("../utils/AppError"));
const AsyncWrapper_1 = __importDefault(require("../utils/AsyncWrapper"));
const ValidationSchema_1 = require("../validation/ValidationSchema");
//register user
exports.RegisterUser = (0, AsyncWrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    ValidationSchema_1.Registerschema.validate({});
    const { username, name, email, password: pass, } = req.body;
    const findUser = yield UserModel_1.default.findOne({ email });
    if (findUser) {
        throw new AppError_1.default({
            message: "Email Already Taken!!",
            statusCode: 400,
        });
    }
    const newUser = new UserModel_1.default({
        username,
        email,
        name,
        password: pass,
    });
    yield newUser.save();
    const accessToken = (0, genCookieAndToken_1.generateToken)(newUser._id, { expiresIn: "1h" });
    (0, genCookieAndToken_1.generateCookie)(accessToken, res);
    if (newUser) {
        const _a = newUser._doc, { password } = _a, user = __rest(_a, ["password"]);
        return res
            .status(201)
            .json({ message: "User Created Successfully!!", data: user });
    }
    else {
        throw new AppError_1.default({
            message: "Something went wrong!!",
            statusCode: 400,
        });
    }
}));
//login user
exports.LoginUser = (0, AsyncWrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    ValidationSchema_1.Loginschema.validate({});
    const { username, password: pass } = req.body;
    const findUser = (yield UserModel_1.default.findOne({ username }));
    if (!findUser) {
        throw new AppError_1.default({
            message: "Login failed. Invalid Username or Password.",
            statusCode: 400,
        });
    }
    yield findUser.isComparePassword(pass);
    const accessToken = (0, genCookieAndToken_1.generateToken)(findUser._id, { expiresIn: "1h" });
    (0, genCookieAndToken_1.generateCookie)(accessToken, res);
    const _b = findUser._doc, { password } = _b, user = __rest(_b, ["password"]);
    res
        .status(200)
        .json({ message: `${user.name} logged In`, data: user });
}));
//logout user
exports.LogoutUser = (0, AsyncWrapper_1.default)((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "You have been logged out successfully." });
}));
