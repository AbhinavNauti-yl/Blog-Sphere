import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import { Provider } from "react-redux";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()

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
