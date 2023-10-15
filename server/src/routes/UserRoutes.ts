
import {
  FollowUnFollowUser,
  GetUserProfile,
  UpdateUserProfile,
} from "../controller/UserController";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../controller/AuthController";
import { Router } from "express";
import ProtectedRoute from "../middleware/ProtectedRoute";
import ValidateSchema from "../middleware/ValidateSchema";
import { Registerschema, Loginschema } from "../validation/ValidationSchema";

const router = Router();

router.post("/login", ValidateSchema(Loginschema), LoginUser);
router.post("/register", ValidateSchema(Registerschema), RegisterUser);
router.get("/logout", LogoutUser);
router.get("/profile/:query", GetUserProfile);
router.put("/update/:id", ProtectedRoute, UpdateUserProfile);
router.post("/follow/:id", ProtectedRoute, FollowUnFollowUser);

export default router;
