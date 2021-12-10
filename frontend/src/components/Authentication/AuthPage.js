import { useState } from "react";
import { Container } from "@chakra-ui/react";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import styles from "./AuthPage.module.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  function changeAuthPage() {
    setIsLogin((prev) => !prev);
  }
  return (
    <Container maxW="xl" centerContent>
      {!isLogin ? (
        <SignupForm onLogin={changeAuthPage} />
      ) : (
        <LoginForm onSignup={changeAuthPage} />
      )}
    </Container>
  );
}

export default AuthPage;
