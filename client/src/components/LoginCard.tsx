import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import UseShowToast from "../Hooks/UseShowToast";
import { useSetRecoilState } from "recoil";
import AuthAtom from "../Atom/AuthAtom";
import UserAtom from "../Atom/UserAtom";
import { z } from "zod";
import { LoginSchema } from "../validation/ValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ErrorMessage } from "@hookform/error-message";

type loginType = z.infer<typeof LoginSchema>;

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm<loginType>({
    resolver: zodResolver(LoginSchema),
  });
  const showToast = UseShowToast();
  const setAuth = useSetRecoilState(AuthAtom);
  const setUser = useSetRecoilState(UserAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<loginType> = async (inputs: loginType) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data?.error) {
        showToast("Error", data?.error, "error");
        return;
      }
      if (data?.message) {
        showToast("Success", data.message, "success");
      }
      localStorage.setItem("threads", JSON.stringify(data.data));
      setUser(data.data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{ base: "full", sm: "400px" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="username" {...register("username")} />
                <Text color={"red.400"}>
                  <ErrorMessage errors={formState.errors} name="username" />
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      aria-label="show"
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color={"red.400"}>
                  <ErrorMessage errors={formState.errors} name="password" />
                </Text>
              </FormControl>
            </Stack>
            <Stack spacing={10} pt={4}>
              <Button
                loadingText="logging in"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                type="submit"
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an account?{" "}
              <Link color={"blue.400"} onClick={() => setAuth("register")}>
                Register
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
