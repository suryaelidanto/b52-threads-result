import { FormRegister } from "@/features/auth";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={"50px"}
      color={"white"}
    >
      <FormRegister />
      <Box display={"flex"} gap={2}>
        <Text>Already have account?</Text>
        <Text color={"green"} cursor={"pointer"}  onClick={() => navigate("/auth/login")}>
          Login
        </Text>
      </Box>
    </Box>
  );
}
