// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );


import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./stores/RootReducer.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const colors: Colors = {
//   brand: {
//     grey: "#878787",
//     green: "#04A51E",
//   },
// };

// const config: ThemeConfig = {
//   initialColorMode: "dark",
// };

// const theme = extendTheme({ colors, config });

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

const store = configureStore({
  reducer: rootReducer
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
