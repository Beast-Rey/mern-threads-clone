import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/UserModel";
import PostModel from "../models/PostModel";
import AppError from "../utils/AppError";
import AsyncWrapper from "../utils/AsyncWrapper";

export const CreatePost = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text) {
      throw new AppError({
        message: "Postedby and text fields are required",
        statusCode: 400,
      });
    }

    const user = await UserModel.findById(postedBy);
    if (!user) {
      throw new AppError({
        message: "User not found",
        statusCode: 400,
      });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      throw new AppError({
        message: "Unauthorized to create post",
        statusCode: 400,
      });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      throw new AppError({
        message: `Text must be less than ${maxLength} characters`,
        statusCode: 400,
      });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new PostModel({ postedBy, text, img });
    await newPost.save();

    res.status(201).json(newPost);
  }
);

export const GetFeedPosts = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError({
        message: "User not found!!",
        statusCode: 400,
      });
    }

    const following = user.following;

    const feedPosts = await PostModel.find({
      postedBy: { $in: following },
    }).sort({ createdAt: -1 });

    res.status(200).json(feedPosts);
   
  }
);

export const DeletePost = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = (await PostModel.findById(req.params.id)) as any;
    if (!post) {
      throw new AppError({
        message: "Post not found!!",
        statusCode: 400,
      });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      throw new AppError({
        message: "Unauthorized to delete",
        statusCode: 400,
      });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await PostModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  }
);

export const LikeUnlikePost = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = (await PostModel.findById(postId)) as any;

    if (!post) {
      throw new AppError({
        message: "Post not found!!",
        statusCode: 400,
      });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await PostModel.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  }
);

export const ReplyToPost = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      throw new AppError({
        message: "Text Field is required",
        statusCode: 400,
      });
    }

    const post = (await PostModel.findById(postId)) as any;
    if (!post) {
      throw new AppError({
        message: "Post not found!!",
        statusCode: 400,
      });
    }

    const reply = { userId, text, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json(reply);
  }
);

export const GetUserPosts = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new AppError({
        message: "User not found!!",
        statusCode: 400,
      });
    }

    const posts = await PostModel.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  }
);

export const GetPost = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      throw new AppError({
        message: "Post not found!!!",
        statusCode: 400,
      });
    }

    res.status(200).json(post);
  }
);
