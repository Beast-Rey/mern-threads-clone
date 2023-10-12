import { FollowUnFollowUser, GetUserProfile, UpdateUserProfile } from "../controller/UserController";
import { LoginUser, LogoutUser, RegisterUser } from "../controller/AuthController";
import { Router } from "express";
import ProtectedRoute from "../middleware/ProtectedRoute";

const router = Router();

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/logout", LogoutUser);
router.get('/profile/:query', GetUserProfile)
router.put("/update/:id", ProtectedRoute, UpdateUserProfile)
router.post('/follow/:id', ProtectedRoute, FollowUnFollowUser)

export default router;
