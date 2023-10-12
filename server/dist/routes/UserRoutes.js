"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const AuthController_1 = require("../controller/AuthController");
const express_1 = require("express");
const ProtectedRoute_1 = __importDefault(require("../middleware/ProtectedRoute"));
const router = (0, express_1.Router)();
router.post("/login", AuthController_1.LoginUser);
router.post("/register", AuthController_1.RegisterUser);
router.get("/logout", AuthController_1.LogoutUser);
router.get('/profile/:query', UserController_1.GetUserProfile);
router.put("/update/:id", ProtectedRoute_1.default, UserController_1.UpdateUserProfile);
router.post('/follow/:id', ProtectedRoute_1.default, UserController_1.FollowUnFollowUser);
exports.default = router;
