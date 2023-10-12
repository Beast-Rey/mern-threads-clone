
import { useRecoilValue } from "recoil";
import RegisterCard from "../components/RegisterCard";
import LoginCard from "../components/LoginCard";
import AuthAtom from "../Atom/AuthAtom";


export default function Auth() {
  const authState = useRecoilValue(AuthAtom)
  return (
    <div>
        {authState === 'register' ? <RegisterCard /> : <LoginCard />}
    </div>
  )
}
