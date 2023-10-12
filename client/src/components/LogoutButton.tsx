import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import UseLogout from "../Hooks/UseLogout";

export default function LogoutButton() {
  const handleLogout = UseLogout()
  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
}
