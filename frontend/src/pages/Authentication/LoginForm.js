import { Fragment, useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../../util/context/auth-context";
import { useNavigate } from "react-router-dom";

import Buttons from "../../components/UI/Buttons";
import Input from "../../components/Form/Input";
import login_pic from "../../assets/login.svg";
import { useForm } from "../../util/Hooks/useForm";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";

import styles from "./LoginForm.module.css";

function LoginForm(props) {
  const authCTX = useContext(AuthContext);
  const Navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      Email: { value: "", isValid: false },
      Password: { value: "", isValid: false },
    },
    false
  );

  async function submitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
    console.log(authCTX.isLoggedin);
    authCTX.login();
  }

  return (
    <Fragment>
      <div className={styles.svg}>
        <img src={login_pic} alt="" />
      </div>
      <form className={styles.form} onSubmit={submitHandler}>
        <Flex direction="column" align="flex-start">
          <Input
            type="email"
            id="Email"
            placeHolder="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            type="password"
            id="Password"
            placeHolder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Password should be at least 5 characters"
            onInput={inputHandler}
          />
        </Flex>
        <Buttons disabled={!formState.isValid} type="Submit">
          Login &rarr;
        </Buttons>
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
