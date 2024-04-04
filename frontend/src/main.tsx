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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground',
      },
    },
  },
  colors: {
    darkBackground: '#222',
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
            <ToastContainer />
          </Provider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
