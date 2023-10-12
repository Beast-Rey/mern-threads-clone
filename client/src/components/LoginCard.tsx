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
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import UseShowToast from '../Hooks/UseShowToast'
import { useSetRecoilState } from 'recoil'
import AuthAtom from '../Atom/AuthAtom'
import UserAtom from '../Atom/UserAtom'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [inputs, setInputs] = useState({
    username: "",
    password: "", 
 })
 const showToast = UseShowToast()
 const setAuth = useSetRecoilState(AuthAtom)
  const setUser = useSetRecoilState(UserAtom)
  const [loading, setLoading] = useState(false)
 const handleSubmit = async() => {
  setLoading(true)
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      const data = await response.json()
      if(data?.error) {
        showToast("Error", data?.error, "error")
        return;
      }
      if(data?.message) {
         showToast("Success", data.message, "success")
      }
      localStorage.setItem('threads', JSON.stringify(data.data))
      setUser(data.data)
    } catch (error) {
      showToast("Error", error, "error")
    } finally {
      setLoading(false)
    }
 }
  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8} w={{base: "full", sm: "400px"}}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="username" value={inputs.username} onChange={(e) => setInputs({...inputs, username:e.target.value})}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e) => setInputs({...inputs, password:e.target.value})}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging in"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }} onClick={handleSubmit} isLoading={loading}>
                Login
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={'center'} pb={2}>
                Don't have an account? <Link color={'blue.400'} onClick={() => setAuth('register')}>Register</Link>
              </Text>
              <Text align={'center'}>
                Forgot Password? <Link color={'blue.400'} onClick={() => setAuth('register')}>Reset Password</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
