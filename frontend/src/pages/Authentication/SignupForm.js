import { Fragment } from "react";
import { Flex } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";
import Input from "../../components/Form/Input";
import signup_pic from "../../assets/signup.svg";
import { useForm } from "../../util/Hooks/useForm";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";

import styles from "./SignupForm.module.css";

function SignupForm(props) {
  const [formState, inputHandler] = useForm(
    {
      Name: { value: "", isValid: false },
      Email: { value: "", isValid: false },
      Password: { value: "", isValid: false },
    },
    false
  );

  async function submitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);

    // try {
    //   const response = await fetch("http://localhost:5000/api/users/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       email: formData.email,
    //       password: formData.password,
    //     }),
    //   });
    //   const responseData = await response.json();
    //   console.log(responseData);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <Fragment>
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
        <Buttons type="submit" disabled={!formState.isValid}>
          Sign Up &rarr;
        </Buttons>
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
