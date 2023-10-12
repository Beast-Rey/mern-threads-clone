import { NextFunction, Request, Response } from "express";
import UserModel from "../models/UserModel";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import AsyncWrapper from "../utils/AsyncWrapper";
import AppError from "../utils/AppError";

export const UpdateUserProfile = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, name, bio, email, password } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    let findUser = (await UserModel.findById(userId)) as any;
    if (!findUser) {
      throw new AppError({
        message: "User not found!!",
        statusCode: 400,
      });
    }
    if (req.params.id !== userId.toString()) {
      throw new AppError({
        message: "Failed to update!!",
        statusCode: 400,
      });
    }
    if (profilePic) {
      if (findUser.profilePic) {
        await cloudinary.uploader.destroy(
          findUser.profilePic.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }
    findUser.name = name || findUser.name;
    findUser.email = email || findUser.email;
    findUser.username = username || findUser.username;
    findUser.bio = bio || findUser.bio;
    findUser.profilePic = profilePic || findUser.profilePic;
    findUser.password = password || findUser.password;
    findUser = await findUser.save();
    return res.status(200).json({ message: "updated!!", data: findUser });
  }
);

export const GetUserProfile = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.params;
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await UserModel.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await UserModel.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }
    if (!user) {
      throw new AppError({
        message: "Something went wrong!!",
        statusCode: 400,
      });
    }
    res.status(200).json({ data: user });
  }
);

export const FollowUnFollowUser = AsyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const userToModify = await UserModel.findById(id);
      const currentUser = await UserModel.findById(req.user._id);

      if (id === req.user._id.toString()) {
        throw new AppError({
          message: "You cannot follow/unfollow yourself",
          statusCode: 400,
        });
      }

      if (!userToModify || !currentUser) {
        throw new AppError({
          message: "User not found!!",
          statusCode: 400,
        });
      }

      const isFollowing = currentUser.following.includes(id);

      if (isFollowing) {
        await UserModel.findByIdAndUpdate(id, {
          $pull: { followers: req.user._id },
        });
        await UserModel.findByIdAndUpdate(req.user._id, {
          $pull: { following: id },
        });
        res.status(200).json({ message: "User unfollowed successfully" });
      } else {
        await UserModel.findByIdAndUpdate(id, {
          $push: { followers: req.user._id },
        });
        await UserModel.findByIdAndUpdate(req.user._id, {
          $push: { following: id },
        });
        res.status(200).json({ message: "User followed successfully" });
      }
   
  }
);
