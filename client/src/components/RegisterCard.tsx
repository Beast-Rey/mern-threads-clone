import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
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
import { useSetRecoilState } from "recoil";
import AuthAtom from "../Atom/AuthAtom";
import UserAtom from "../Atom/UserAtom";
import UseShowToast from "../Hooks/UseShowToast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message"
import { RegisterSchema } from "../validation/ValidationSchema";


type inputType = z.infer<typeof RegisterSchema>;

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setUser = useSetRecoilState(UserAtom);
  const setAuth = useSetRecoilState(AuthAtom);
  const showToast = UseShowToast();

  const { register, handleSubmit, formState } = useForm<inputType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<inputType> = async (inputs: inputType) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      console.log(data)
      if (data?.error === "ValidationError") {
        showToast("Error", "Failed to Register try again later!!", "error");
        return;
      }
      if (data.message === "Your Account has been created.") {
        showToast("Success", data?.message, "success");
      }
      localStorage.setItem("threads", JSON.stringify(data.data));
      setUser(data.data);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register
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
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" {...register("name")} />
                  <Text color={"red.400"}><ErrorMessage errors={formState.errors} name="name"/></Text>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" {...register("username")} />
                  <Text color={"red.400"}><ErrorMessage errors={formState.errors} name="username"/></Text>
                </FormControl>
              </Box>
            </HStack>
            <Stack spacing={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
                <Text color={"red.400"}><ErrorMessage errors={formState.errors} name="email"/></Text>
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
                <Text color={"red.400"}><ErrorMessage errors={formState.errors} name="password" /></Text>
              </FormControl>
            </Stack>
            <Stack spacing={10} pt={4}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                type="submit"
              >
                Register
              </Button>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link color={"blue.400"} onClick={() => setAuth("login")}>
                Login
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
