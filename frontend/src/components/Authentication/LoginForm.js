import { Fragment, useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { TaskContext } from "../../context/task-context";
import Input from "../Input/Input";
import login_pic from "../../assets/login.svg";
import { useForm } from "../../Hooks/useForm";
import { useFetch } from "../../Hooks/useFetch";
import ErrorModal from "../Modals/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";

import styles from "./LoginForm.module.css";

function LoginForm(props) {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: taskDispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      Email: { value: "", isValid: false },
      Password: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, error, clearError, sendRequest } = useFetch();

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.Email.value,
          password: formState.inputs.Password.value,
        })
      );

      authDispatch({
        type: "LOGIN",
        userId: responseData.user._id.toString(),
        userName: responseData.user.name,
        avatar: responseData.user.avatar,
      });
      taskDispatch({
        type: "COUNTER",
        val: responseData.user.tasks.length,
      });

      navigate(`/${responseData.user._id.toString()}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      {error ? <ErrorModal message={error} clearError={clearError} /> : null}

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
        <Button
          type="submit"
          disabled={!formState.isValid}
          isLoading={isLoading}
          loadingText="Logging in"
          colorScheme="green"
        >
          Login &rarr;
        </Button>
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
