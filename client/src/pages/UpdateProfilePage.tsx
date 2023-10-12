import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import UseShowToast from '../Hooks/UseShowToast'
import UsePreview from '../Hooks/UsePreview'
import UserAtom from '../Atom/UserAtom'


export default function UpdateProfilePage() {
  const fileRef = useRef<null | any>(null)
  const showToast = UseShowToast()
  const [user, setUser] = useRecoilState(UserAtom)
  const {handleImageChange, imageUrl} = UsePreview()
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: ""
  })
  

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/user/update/${user._id}`, {
        method: 'PUT',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...inputs, profilePic:imageUrl})
      })
      const data = await response.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Profile updated successfully", "success");
			setUser(data.data);
			localStorage.setItem("threads", JSON.stringify(data.data));
    } catch (error:any) {
      showToast("Error", error?.message, "error")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <Flex
      align={'center'}
      justify={'center'} my={6}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imageUrl || "https://bit.ly/sage-adebayo"} />
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef?.current.click()}>Change Avatar</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text" value={inputs.name}
            onChange={(e) => setInputs({...inputs, name: e.target.value})}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="john doe"
            _placeholder={{ color: 'gray.500' }}
            type="text" value={inputs.username}
            onChange={(e) => setInputs({...inputs, username: e.target.value})}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email" value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Your bio"
            _placeholder={{ color: 'gray.500' }}
            type="text" value={inputs.bio}
            onChange={(e) => setInputs({...inputs, bio: e.target.value})} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password" value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }} >
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }} type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}