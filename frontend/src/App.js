import { ChakraProvider, Container } from "@chakra-ui/react";

// import TodoList from "./components/Todo/TodoList";
// import InputForm from "./components/Form/InputForm";
import AuthPage from "./components/Authentication/AuthPage";
import Header from "./components/Nav/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Container maxW="sm" centerContent padding="0">
          <Header />
          <AuthPage />
        </Container>
      </ChakraProvider>
    </div>
  );
}

export default App;
