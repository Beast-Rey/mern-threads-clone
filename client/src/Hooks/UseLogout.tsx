import { useSetRecoilState } from "recoil";
import UseShowToast from "../Hooks/UseShowToast";
import UserAtom from "../Atom/UserAtom";

export default function UseLogout() {
  const setUser = useSetRecoilState(UserAtom);
  const showToast = UseShowToast();
  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.error) {
        showToast("Error", data?.error, "error");
        return;
      }
      localStorage.removeItem("threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return handleLogout;
}
