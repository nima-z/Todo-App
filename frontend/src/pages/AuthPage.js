import { useState, Fragment } from "react";
import { Container } from "@chakra-ui/react";

import SignupForm from "../components/Authentication/SignupForm";
import LoginForm from "../components/Authentication/LoginForm";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  function changeAuthPage() {
    setIsLogin((prev) => !prev);
  }

  return (
    <Fragment>
      <Container maxW="sm" centerContent padding="0" textAlign="center">
        {!isLogin ? (
          <SignupForm onLogin={changeAuthPage} />
        ) : (
          <LoginForm onSignup={changeAuthPage} />
        )}
      </Container>
    </Fragment>
  );
}

export default AuthPage;
