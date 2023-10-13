import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UseShowToast from "../Hooks/UseShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import PostAtom from "../Atom/PostAtom";

export default function Home() {
  const [posts, setposts] = useRecoilState<any>(PostAtom);
  const showToast = UseShowToast();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setposts([]);
      try {
        const res = await fetch("/api/post/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setposts(data);
      } catch (error: any) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setposts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {posts?.map((post: any) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
    </Flex>
  );
}
