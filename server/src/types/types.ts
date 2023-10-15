export type UserModelType = {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  followers: [string];
  following: [string];
  bio: string;
  isFrozen: boolean;
};

export type PostModelType = {
  postedBy: Object;
  text: string;
  likes: Object;
  replies: [];
  img: string;
};

export interface MessageResponse {
  message: string;
}

export type LoginResBody = {
  data: Omit<UserModelType, "password">;
};
export type LoginReqType = Pick<UserModelType, "username" | "password">;

export type RegisterResType = Pick<
  UserModelType,
  "name" | "username" | "email" | "password"
>;

export type RegisterReqType = Pick<
  UserModelType,
  "name" | "username" | "email" | "password"
>;

export type JwtType = string | object | Buffer;

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
    export interface Response {
      cookie: any;
    }
  }
}
