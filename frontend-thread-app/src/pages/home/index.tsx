import { Box } from '@chakra-ui/react'
import { ThreadCard } from '@/features/thread';
import { Footer, MyProfile, Navbar } from "@/components";
import SuggestedFollow from '@/components/SuggestedFollow';
import FormThread from '@/features/thread/components/FormThread';
import Dummy from '@/mocks/theads.json';

export function Home() {
  console.log(Dummy);
  
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box 
        display={"flex"}
        width={"300px"}
        position={"fixed"}
        left={"30px"}
        top={"30px"}
        height={"fit-content"}
      >
        <Navbar />
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"10px"}
      >
        <FormThread />
        <Box>
        {Dummy.map((item) => {
            return (
              <Box>
                <ThreadCard
                  id={item.id}
                  content={item.content}
                  likes_count={item.likes_count}
                  posted_at={item.posted_at}
                  replies_count={item.replies_count}
                  image={item.image}
                  author_name={item.author_name}
                  author_username={item.author_username}
                  author_picture={item.author_picture}
                  isLike={item.is_liked}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"30px"}
      >
        <MyProfile />
        <SuggestedFollow />
        <Footer />
      </Box>
    </Box>
  )
}
