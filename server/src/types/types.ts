export type UserModelType = {
    name:string;
    username:string;
    email:string;
    password: string;
    profilePic: string;
    followers: [string];
    following: [string];
    bio: string;
    isFrozen: boolean
}

export type PostModelType = {
    postedBy: Object;
    text:string;
    likes:Object;
    replies: [];
    img:string
  }

export type RegisterBodyType = Pick<UserModelType, "name"| "username"| "email" | "password">
export type LoginBodyType = Pick<UserModelType, "username"| "password">
export type JwtType = string | object | Buffer


declare global {
    namespace Express {
        export interface Request {
            user:any
        }
        export interface Response {
            cookie:any
        }
    }
}

