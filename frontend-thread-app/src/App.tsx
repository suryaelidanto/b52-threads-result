import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home, PostDetail } from "./pages";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground', // Memanggil warna latar belakang yang sudah Anda tambahkan di konfigurasi
      },
    },
  },
  colors: {
    darkBackground: '#222', // Ganti ini dengan warna latar belakang gelap yang Anda inginkan
  },
})

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail-posted/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
