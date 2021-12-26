import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./util/context/auth-context";

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ChakraProvider>,

  document.getElementById("root")
);
