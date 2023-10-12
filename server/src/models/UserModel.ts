import mongoose from "mongoose";
import { UserModelType } from "types/types";
import bcrypt from "bcryptjs";

interface Iuser extends UserModelType, mongoose.Document {
  _doc?:any
}

let userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.isComparePassword = async function (enterPassword: string) {
  return bcrypt.compareSync(enterPassword, this.password);
};

const UserModel = mongoose.model<Iuser>("User", userSchema);
export default UserModel;
