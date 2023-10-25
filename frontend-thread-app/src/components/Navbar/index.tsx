import { Box, Text, Button } from '@chakra-ui/react'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

export function Navbar() {
  return (
    <>
        <Text fontWeight={"bold"} fontSize={"50px"} color={"green"}>
          Circle
        </Text>

        <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
          <AiFillHome />
          <Text marginLeft={"10px"}> Home</Text>
        </Button>
        
        <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
          <AiOutlineSearch />
          <Text marginLeft={"10px"}> Search</Text>
        </Button>

        <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
          <AiOutlineHeart />
          <Text marginLeft={"10px"}> Follow</Text>
        </Button>

        <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
          <AiOutlineUser />
          <Text marginLeft={"10px"}> Profile</Text>
        </Button>

        <Button
          bgColor={"green"}
          borderRadius={"30px"}
          color={"white"}
          marginTop={"30px"}
          colorScheme="green"
        >
          Create Post
        </Button>
    </>
  )
}