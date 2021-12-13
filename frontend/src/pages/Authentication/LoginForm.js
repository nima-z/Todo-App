import { Flex } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";
import InputForm from "../../components/Form/InputForm";

import styles from "./LoginForm.module.css";

function LoginForm(props) {
  return (
    <form className={styles.form}>
      <Flex direction="column" align="flex-start">
        <InputForm
          type="email"
          title="email"
          label="Email"
          placeHolder="example@something.com"
          validators={[]}
          errorText="Please enter a valid email"
        />
        <InputForm
          type="password"
          title="password"
          label="Password"
          placeHolder="+6 character"
          validators={[]}
          errorText="Please enter a valid password"
        />
      </Flex>
      <Buttons>Login</Buttons>
      <div className={styles.footer}>
        <p>
          You dont have an account?{" "}
          <button onClick={props.onSignup}>Sign up</button>.
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
