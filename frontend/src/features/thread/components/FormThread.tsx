import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
import { useThreads } from "../hooks/useThreads"

export default function FormThread() {
  const { handlePost, handleChange } = useThreads()

  return (
    <form encType="multipart/form-data" onSubmit={handlePost}>
      <FormControl
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        bg={"transparent"}
        color={"white"}
      >
        <FormLabel>Content</FormLabel>
        <Input
          placeholder="isikan apa yang kamu pikirkan..."
          name="content"
          onChange={handleChange}
        />
        <Input
          type="file"
          placeholder="image..."
          name="image"
          onChange={handleChange}
        />
        <Box display={"flex"} justifyContent={"end"}>
          <Button
            type="submit"
            backgroundColor={"green"}
            color={"white"}
            colorScheme="green"
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </form>
  )
}