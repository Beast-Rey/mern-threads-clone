"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostController_1 = require("../controller/PostController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/create', PostController_1.CreatePost);
exports.default = router;
