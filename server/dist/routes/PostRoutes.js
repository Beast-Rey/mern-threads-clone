"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProtectedRoute_1 = __importDefault(require("../middleware/ProtectedRoute"));
const PostController_1 = require("../controller/PostController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/user/:username', PostController_1.GetUserPosts);
router.post('/create', ProtectedRoute_1.default, PostController_1.CreatePost);
router.get("/feed", ProtectedRoute_1.default, PostController_1.GetFeedPosts);
router.delete("/delete/:id", ProtectedRoute_1.default, PostController_1.DeletePost);
router.put("/like/:id", ProtectedRoute_1.default, PostController_1.LikeUnlikePost);
router.put("/reply/:id", ProtectedRoute_1.default, PostController_1.ReplyToPost);
router.get("/:id", PostController_1.GetPost);
exports.default = router;
