import { useState } from "react";
import { Flex, Spacer } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";

import styles from "./SignupForm.module.css";

function SignupForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function nameHandler(e) {
    setFormData((prev) => {
      return { ...prev, name: e.target.value };
    });
    console.log(formData);
  }
  function emailHandler(e) {
    setFormData((prev) => {
      return { ...prev, email: e.target.value };
    });
  }
  function passwordHandler(e) {
    setFormData((prev) => {
      return { ...prev, password: e.target.value };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Type-Content": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const responseData = await response.json();
      console.log(formData);
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
          onChange={nameHandler}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@something.com"
          onChange={emailHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="+6 character"
          onChange={passwordHandler}
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
