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
exports.FollowUnFollowUser = exports.GetUserProfile = exports.UpdateUserProfile = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const cloudinary_1 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const AsyncWrapper_1 = __importDefault(require("../utils/AsyncWrapper"));
const AppError_1 = __importDefault(require("../utils/AppError"));
exports.UpdateUserProfile = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, bio, email, password } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    let findUser = (yield UserModel_1.default.findById(userId));
    if (!findUser) {
        throw new AppError_1.default({
            message: "User not found!!",
            statusCode: 400,
        });
    }
    if (req.params.id !== userId.toString()) {
        throw new AppError_1.default({
            message: "Failed to update!!",
            statusCode: 400,
        });
    }
    if (profilePic) {
        if (findUser.profilePic) {
            yield cloudinary_1.v2.uploader.destroy(findUser.profilePic.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = yield cloudinary_1.v2.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
    }
    findUser.name = name || findUser.name;
    findUser.email = email || findUser.email;
    findUser.username = username || findUser.username;
    findUser.bio = bio || findUser.bio;
    findUser.profilePic = profilePic || findUser.profilePic;
    findUser.password = password || findUser.password;
    findUser = yield findUser.save();
    return res.status(200).json({ message: "updated!!", data: findUser });
}));
exports.GetUserProfile = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    let user;
    if (mongoose_1.default.Types.ObjectId.isValid(query)) {
        user = yield UserModel_1.default.findOne({ _id: query })
            .select("-password")
            .select("-updatedAt");
    }
    else {
        user = yield UserModel_1.default.findOne({ username: query })
            .select("-password")
            .select("-updatedAt");
    }
    if (!user) {
        throw new AppError_1.default({
            message: "Something went wrong!!",
            statusCode: 400,
        });
    }
    res.status(200).json({ data: user });
}));
exports.FollowUnFollowUser = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userToModify = yield UserModel_1.default.findById(id);
    const currentUser = yield UserModel_1.default.findById(req.user._id);
    if (id === req.user._id.toString()) {
        throw new AppError_1.default({
            message: "You cannot follow/unfollow yourself",
            statusCode: 400,
        });
    }
    if (!userToModify || !currentUser) {
        throw new AppError_1.default({
            message: "User not found!!",
            statusCode: 400,
        });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
        yield UserModel_1.default.findByIdAndUpdate(id, {
            $pull: { followers: req.user._id },
        });
        yield UserModel_1.default.findByIdAndUpdate(req.user._id, {
            $pull: { following: id },
        });
        res.status(200).json({ message: "User unfollowed successfully" });
    }
    else {
        yield UserModel_1.default.findByIdAndUpdate(id, {
            $push: { followers: req.user._id },
        });
        yield UserModel_1.default.findByIdAndUpdate(req.user._id, {
            $push: { following: id },
        });
        res.status(200).json({ message: "User followed successfully" });
    }
}));
