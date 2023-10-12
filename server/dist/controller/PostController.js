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
exports.GetPost = exports.GetUserPosts = exports.ReplyToPost = exports.LikeUnlikePost = exports.DeletePost = exports.GetFeedPosts = exports.CreatePost = void 0;
const cloudinary_1 = require("cloudinary");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const PostModel_1 = __importDefault(require("../models/PostModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const AsyncWrapper_1 = __importDefault(require("../utils/AsyncWrapper"));
exports.CreatePost = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    if (!postedBy || !text) {
        throw new AppError_1.default({
            message: "Postedby and text fields are required",
            statusCode: 400,
        });
    }
    const user = yield UserModel_1.default.findById(postedBy);
    if (!user) {
        throw new AppError_1.default({
            message: "User not found",
            statusCode: 400,
        });
    }
    if (user._id.toString() !== req.user._id.toString()) {
        throw new AppError_1.default({
            message: "Unauthorized to create post",
            statusCode: 400,
        });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
        throw new AppError_1.default({
            message: `Text must be less than ${maxLength} characters`,
            statusCode: 400,
        });
    }
    if (img) {
        const uploadedResponse = yield cloudinary_1.v2.uploader.upload(img);
        img = uploadedResponse.secure_url;
    }
    const newPost = new PostModel_1.default({ postedBy, text, img });
    yield newPost.save();
    res.status(201).json(newPost);
}));
exports.GetFeedPosts = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const user = yield UserModel_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default({
            message: "User not found!!",
            statusCode: 400,
        });
    }
    const following = user.following;
    const feedPosts = yield PostModel_1.default.find({
        postedBy: { $in: following },
    }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
}));
exports.DeletePost = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = (yield PostModel_1.default.findById(req.params.id));
    if (!post) {
        throw new AppError_1.default({
            message: "Post not found!!",
            statusCode: 400,
        });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
        throw new AppError_1.default({
            message: "Unauthorized to delete",
            statusCode: 400,
        });
    }
    if (post.img) {
        const imgId = post.img.split("/").pop().split(".")[0];
        yield cloudinary_1.v2.uploader.destroy(imgId);
    }
    yield PostModel_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
}));
exports.LikeUnlikePost = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = (yield PostModel_1.default.findById(postId));
    if (!post) {
        throw new AppError_1.default({
            message: "Post not found!!",
            statusCode: 400,
        });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
        yield PostModel_1.default.updateOne({ _id: postId }, { $pull: { likes: userId } });
        res.status(200).json({ message: "Post unliked successfully" });
    }
    else {
        post.likes.push(userId);
        yield post.save();
        res.status(200).json({ message: "Post liked successfully" });
    }
}));
exports.ReplyToPost = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text) {
        throw new AppError_1.default({
            message: "Text Field is required",
            statusCode: 400,
        });
    }
    const post = (yield PostModel_1.default.findById(postId));
    if (!post) {
        throw new AppError_1.default({
            message: "Post not found!!",
            statusCode: 400,
        });
    }
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    yield post.save();
    res.status(200).json(reply);
}));
exports.GetUserPosts = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield UserModel_1.default.findOne({ username });
    if (!user) {
        throw new AppError_1.default({
            message: "User not found!!",
            statusCode: 400,
        });
    }
    const posts = yield PostModel_1.default.find({ postedBy: user._id }).sort({
        createdAt: -1,
    });
    res.status(200).json(posts);
}));
exports.GetPost = (0, AsyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield PostModel_1.default.findById(req.params.id);
    if (!post) {
        throw new AppError_1.default({
            message: "Post not found!!!",
            statusCode: 400,
        });
    }
    res.status(200).json(post);
}));
