import { useState, ChangeEvent } from "react"
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
import { API } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

type ThreadPost = {
  content?: string,
  image?: string
}


export default function FormThread({refetch}: {refetch: () => void}) {
  const [form, setForm] = useState<ThreadPost>({
    content: "",
    image: "",
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }


  const mutation = useMutation({
    mutationFn: async () => {await API.post("/thread", form)},
    onSuccess: () => {
      console.log("hahahaah");
      refetch()
    }
  })

  return (
    <FormControl 
      display={"flex"} 
      flexDirection={"column"} 
      gap={2} 
      bg={"transparent"}  
      color={"white"}
      // onSubmit={() => mutation.mutate()}
    >
      <FormLabel>Content</FormLabel>
      <Input 
        placeholder="isikan apa yang kamu pikirkan..." 
        name="content" 
        onChange={handleChange} 
      />
      <Input 
        placeholder="image..." 
        name="image" 
        onChange={handleChange} 
      />
      <Box display={"flex"} justifyContent={"end"}>
        <Button 
          backgroundColor={"green"} 
          color={"white"} 
          colorScheme="green" 
          onClick={() => mutation.mutate()}
          // type="submit"
        >
          Submit
        </Button>
      </Box>
    </FormControl>
  )
}
// import { useState, ChangeEvent } from "react"
// import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
// import { API } from "@/lib/api"

// type ThreadPost = {
//   content?: string,
//   image?: string
// }

// type FormThreadProps = {
//   getThreads: () => void;
// };

// export default function FormThread(props: FormThreadProps) {
//   const [form, setForm] = useState<ThreadPost>({
//     content: "",
//     image: "",
//   })

//   async function handlePost() {
//     const response = await API.post('/thread', form)
//     console.log("berhasil menambahkan thread", response)
//     props.getThreads()
//   }

//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     setForm({
//       ...form,
//       [event.target.name]: event.target.value
//     })
//   }

//   return (
//     <FormControl display={"flex"} flexDirection={"column"} gap={2} bg={"transparent"}  color={"white"}>
//       <FormLabel>Content</FormLabel>
//       <Input 
//         placeholder="isikan apa yang kamu pikirkan..." 
//         name="content" 
//         onChange={handleChange} 
//       />
//       <Input 
//         placeholder="image..." 
//         name="image" 
//         onChange={handleChange} 
//       />
//       <Box display={"flex"} justifyContent={"end"}>
//         <Button 
//           backgroundColor={"green"} 
//           color={"white"} 
//           colorScheme="green" 
//           onClick={handlePost}
//         >
//           Submit
//         </Button>
//       </Box>
//     </FormControl>
//   )
// }
