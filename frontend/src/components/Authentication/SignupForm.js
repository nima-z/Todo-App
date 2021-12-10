import { useRef } from "react";
import { Flex, Spacer } from "@chakra-ui/react";

import Buttons from "../UI/Button";

import styles from "./SignupForm.module.css";

function SignupForm(props) {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  async function submitHandler(event) {
    console.log("worked");
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        header: { "Type-Content": "application/json" },
        body: JSON.stringify({
          name: inputNameRef.current.value,
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Flex direction="column" align="flex-start">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="enter your name"
          ref={inputNameRef}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@something.com"
          ref={inputEmailRef}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="+6 character"
          ref={inputPasswordRef}
        />
      </Flex>
      <Buttons type="submit">Sign up</Buttons>
      <p>
        Already have an account?{" "}
        <button type="button" onClick={props.onLogin}>
          Login
        </button>
        .
      </p>
    </form>
  );
}

export default SignupForm;
