import { useState } from "react";
import { Flex } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";
import InputForm from "../../components/Form/InputForm";

import styles from "./SignupForm.module.css";

function SignupForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
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
        <InputForm
          type="text"
          title="name"
          label="Name"
          placeHolder="Enter your name"
          validators={[]}
          errorText="Please enter a valid name"
        />
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
      <Buttons type="submit">Sign up</Buttons>
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
  );
}

export default SignupForm;
