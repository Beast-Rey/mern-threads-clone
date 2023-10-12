import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import LogoutButton from "./components/LogoutButton";
import { useRecoilValue } from "recoil";
import UserAtom from "./Atom/UserAtom";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import Setting from "./pages/Setting";

export default function App() {
  const user = useRecoilValue(UserAtom)
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={user ? <Setting /> : <Navigate to={"/auth"} />} />
      </Routes>
      {user && <LogoutButton />}
      {user && <CreatePost />}
    </Container>
  );
}
