import { atom } from "recoil";

const UserAtom = atom({
  key: "UserAtom",
  default: JSON.parse(localStorage.getItem('threads')!)
});

export default UserAtom;
