import { Fragment } from "react";
import { Flex } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";
import InputForm from "../../components/Form/InputForm";
import login_pic from "../../assets/login.svg";

import styles from "./LoginForm.module.css";

function LoginForm(props) {
  return (
    <Fragment>
      <div className={styles.svg}>
        <img src={login_pic} alt="" />
      </div>
      <form className={styles.form}>
        <Flex direction="column" align="flex-start">
          <InputForm
            type="email"
            title="Email"
            placeHolder="Email"
            validators={[]}
            errorText="Please enter a valid email"
          />
          <InputForm
            type="password"
            title="Password"
            placeHolder="Password"
            validators={[]}
            errorText="Please enter a valid password"
          />
        </Flex>
        <Buttons>Login &rarr;</Buttons>
        <div className={styles.footer}>
          <p>
            Not a member?
            <button onClick={props.onSignup}>Sign up</button>.
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default LoginForm;
