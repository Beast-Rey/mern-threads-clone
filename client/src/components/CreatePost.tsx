import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Text,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Flex,
  useColorModeValue,
  useDisclosure,
  Input,
  CloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import UsePreview from "../Hooks/UsePreview";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import UserAtom from "../Atom/UserAtom";
import UseShowToast from "../Hooks/UseShowToast";

export default function CreatePost() {
  const MAX_CHAR = 500;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imageUrl, setImageUrl } = UsePreview();
  const fileRef = useRef<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(MAX_CHAR)
  const user = useRecoilValue(UserAtom)
  const showToast = UseShowToast()
  const handleTextChange = (e:any) => {
    const inputText = e.target.value
    if(inputText.length > MAX_CHAR) {
        const truncatedText = inputText.slice(0, MAX_CHAR)
        setPostText(truncatedText)
        setRemaining(0)
    } else {
        setPostText(inputText);
		setRemaining(MAX_CHAR - inputText.length);
    }
  };
  const handleCreatePost = async () => {
     setLoading(true)
     try {
      const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({postedBy:user._id, text:postText, img: imageUrl})
      })
      const data = await response.json()
      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }
      showToast("Success", "Post created successfully", "success");
      onClose();
			setPostText("");
			setImageUrl("");
     } catch (error) {
      showToast("Error", error, "error")
     } finally {
      setLoading(false)
     }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                value={postText}
                onChange={handleTextChange}
              />
              <Text
                fontSize="xs"
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remaining}/ 500
              </Text>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => fileRef?.current.click()}
              />
            </FormControl>
            {imageUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageUrl} alt="image" />
                <CloseButton
                  onClick={() => {
                    setImageUrl(null);
                  }}
                  top={2}
                  right={2}
                  position={"absolute"}
                  bg={"gray.800"}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
