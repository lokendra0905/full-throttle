import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./Theme/theme";
import AuthContextWrapper from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextWrapper>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </AuthContextWrapper>
);

reportWebVitals();
