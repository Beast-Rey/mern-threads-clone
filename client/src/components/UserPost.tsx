import {Link} from 'react-router-dom'
import {Avatar, Box, Flex, Text, Image} from '@chakra-ui/react'
import {BsThreeDots} from 'react-icons/bs'
import Actions from './Actions'


export default function UserPost() {
  return (
    <Link to="/markzuckerberg/post/1">
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size="md" name="mark zuckerberg" src="/zuck-avatar.webp"/>
                <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar size="xs" name='john doe' src='https://bit.ly/dan-abramov' position={"absolute"} 
                    left={"15px"} padding={"2px"} top={"0px"}/>
                     <Avatar size="xs" name='john doe' src='https://bit.ly/dan-abramov' position={"absolute"} 
                    right="-5px" padding={"2px"} bottom={"0px"}/>
                     <Avatar size="xs" name='john doe' src='https://bit.ly/dan-abramov' position={"absolute"} 
                    left="4px" padding={"2px"} bottom={"0px"}/>
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                        <Image src="/verified.png" w={4} h={4} ml={1}/>
                    </Flex>
                    <Flex gap={4} alignItems={"center"}>
                        <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>
                <Text fontSize={"sm"}>This is my first post</Text>
                <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray"}>
                    <Image src='/post1.jpg' w={"full"}/>
                </Box>
                <Flex gap={3} my={1}>
                    <Actions />
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"}>123 Replies</Text>
                    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"}>456 likes</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
  )
}
