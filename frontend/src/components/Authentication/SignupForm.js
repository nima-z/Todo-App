import { Fragment, useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Input from "../Input/Input";
import signup_pic from "../../assets/signup.svg";
import { useForm } from "../../Hooks/useForm";
import { useFetch } from "../../Hooks/useFetch";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../Modals/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";

import styles from "./SignupForm.module.css";

function SignupForm(props) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      Name: { value: "", isValid: false },
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
        process.env.REACT_APP_BACKEND_URL + "/users/signup",
        "POST",
        JSON.stringify({
          name: formState.inputs.Name.value,
          email: formState.inputs.Email.value,
          password: formState.inputs.Password.value,
        })
      );

      dispatch({
        type: "LOGIN",
        userId: responseData.user._id.toString(),
        userName: responseData.user.name,
        avatar: "",
      });

      navigate(`/${responseData.user._id.toString()}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Fragment>
      {error ? <ErrorModal message={error} clearError={clearError} /> : null}
      <div className={styles.svg}>
        <img src={signup_pic} alt="" />
      </div>
      <form className={styles.form} onSubmit={submitHandler}>
        <Flex direction="column" align="flex-start">
          <Input
            type="text"
            id="Name"
            placeHolder="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            onInput={inputHandler}
          />
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
          loadingText="Submitting"
          colorScheme="green"
        >
          Sign Up &rarr;
        </Button>
        <div className={styles.footer}>
          <p>
            Already have an account?
            <button type="button" onClick={props.onLogin}>
              Login
            </button>
            .
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default SignupForm;
