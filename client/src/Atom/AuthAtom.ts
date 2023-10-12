import { atom } from "recoil";

const AuthAtom = atom({
  key: "AuthAtom",
  default: "login",
});

export default AuthAtom;
