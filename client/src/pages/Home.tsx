import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UseShowToast from "../Hooks/UseShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import PostAtom from "../Atom/PostAtom";

export default function Home() {
  const showToast = UseShowToast();
  const [posts, setposts] = useRecoilState<any>(PostAtom)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setposts([])
      try {
        const response = await fetch("/api/post/feed");
        const data = await response.json();
        setposts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some users to see the feed.</h1>
      )}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts?.map((post:any) => (
        <Post key={post?._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  );
}
