import { Box, Image, Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

type ThreadCard = {
  id: number;
  author_picture: string;
  author_name: string;
  author_username: string;
  posted_at: string;
  content: string;
  image: string;
  likes_count: number;
  replies_count: number;
  isLike: boolean
}

export function ThreadCard(props: ThreadCard) {
  const navigate: any = useNavigate()

  return (
    <>
      <Box
        display={"flex"}
        width="500px"
        borderBottom={"1px solid white"}
        padding={"20px 0px"}
        bg={"transparent"} 
        color={"white"}
      >
        <Image
          src={props.author_picture}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
        />
        <Box>
          <Box display={"flex"}>
            <Text>{props.author_name}</Text>
            <Text ms={2} color="grey">{props.author_username}</Text>
            <Text ms={2} color="grey">{props.posted_at}</Text>
          </Box>
          <Text>{props.content}</Text>
          <Image
            mt={3}
            src={props.image}
            width={"400px"}
            height={"300px"}
            objectFit={"contain"}
            marginRight={"20px"}
          />
          <Box display={"flex"} gap={2} marginTop={"10px"}>
            <Button backgroundColor={props.isLike ? "red" : "grey"}>
              {props.likes_count}
            </Button>
            <Button onClick={() => navigate(`/detail-posted/${props.id}`)}>{props.replies_count} Replies</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

