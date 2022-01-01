import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { TaskProvider } from "./context/task-context";

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </Router>
  </ChakraProvider>,

  document.getElementById("root")
);
