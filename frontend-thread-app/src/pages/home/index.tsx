import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ThreadCard } from '@/features/thread';
import { Footer, MyProfile, Navbar, SuggestedFollow } from "@/components";
import FormThread from '@/features/thread/components/FormThread';
import { API } from '@/lib/api';

export function Home() {
  const [threads, setThreads] = useState<ThreadCard[]>()

  async function getThreads() {
    const response = await API.get('/threads')
    setThreads(response?.data)
  }

  useEffect(() => {
    getThreads()
  }, [])  

  console.log(threads);
  
  
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
        <FormThread 
          getThreads={getThreads}
        />

        <Box>
        {threads?.map((item) => {
            return (
              <Box key={item.id}>
                <ThreadCard
                  user={item.user}
                  content={item.content}
                  likes_count={item.likes_count}
                  posted_at={item.posted_at}
                  replies_count={item.replies_count}
                  image={item.image}
                  is_liked={item.is_liked}
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
