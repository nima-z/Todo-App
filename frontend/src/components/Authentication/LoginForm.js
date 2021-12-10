import { Flex, Spacer } from "@chakra-ui/react";

import Buttons from "../UI/Button";

import styles from "./LoginForm.module.css";

function LoginForm(props) {
  return (
    <form className={styles.form}>
      <Flex direction="column" align="flex-start">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="example@something.com" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="+6 character" />
      </Flex>
      <Buttons>Login</Buttons>
      <p>
        You dont have an account?{" "}
        <button onClick={props.onSignup}>Sign up</button>.
      </p>
    </form>
  );
}

export default LoginForm;
