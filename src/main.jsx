import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import store from "./store/store";
import { Provider } from "react-redux";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.withCredentials = true
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
