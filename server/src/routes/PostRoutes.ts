import ProtectedRoute from "../middleware/ProtectedRoute";
import { CreatePost, DeletePost, GetFeedPosts,ReplyToPost, LikeUnlikePost, GetUserPosts, GetPost } from "../controller/PostController";
import { Router } from "express";


const router = Router()
router.get("/feed", ProtectedRoute, GetFeedPosts);
router.get('/user/:username', GetUserPosts)
router.post('/create', ProtectedRoute, CreatePost)
router.delete("/delete/:id", ProtectedRoute, DeletePost)
router.put("/like/:id", ProtectedRoute, LikeUnlikePost);
router.put("/reply/:id", ProtectedRoute, ReplyToPost);
router.get("/:id", GetPost);
export default router