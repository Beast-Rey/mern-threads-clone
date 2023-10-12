import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import UseShowToast from "../Hooks/UseShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import UseGetUser from "../Hooks/UseGetUser";

export default function UserPage() {
  const showToast = UseShowToast();
  const [posts, setPosts] = useState<any>([])
  const [fetchingPost, setFetchingPost] = useState(true)
  const { username } = useParams();
  const { user, loading } = UseGetUser()

  useEffect(() => {
    
    const getPosts = async() => {
      setFetchingPost(true)
      try {
        const response = await fetch(`/api/post/user/${username}`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        showToast("Error", error, "error");
        setPosts([])
      } finally {
        setFetchingPost(false)
      }
    }
     getPosts()
  }, [username, showToast, setPosts, user]);

  if(!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  }

  if(!user && !loading) return <h1>User not found!</h1>;

  return (
    <>
      <UserHeader user={user} />
      {fetchingPost && posts.length === 0 && <h1>User has no post</h1>}
      {fetchingPost && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"}/>
        </Flex>
      )}
      {posts.map((val:any) => (
        <Post key={val._id} post={val} postedBy={val.postedBy}/>
        ))}
    </>
  );
}
