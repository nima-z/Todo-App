import { useState } from "react";
import { Container } from "@chakra-ui/react";

import { Fragment } from "react";

import MainHeader from "../../components/Navigation/MainHeader";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import styles from "./AuthPage.module.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  function changeAuthPage() {
    setIsLogin((prev) => !prev);
  }
  return (
    <Fragment>
      {/* <MainHeader /> */}
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
