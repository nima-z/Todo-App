import { useState, Fragment } from "react";
import { Flex } from "@chakra-ui/react";

import Buttons from "../../components/UI/Buttons";
import InputForm from "../../components/Form/InputForm";
import signup_pic from "../../assets/signup.svg";

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
    <Fragment>
      <div className={styles.svg}>
        <img src={signup_pic} alt="" />
      </div>
      <form className={styles.form} onSubmit={submitHandler}>
        <Flex direction="column" align="flex-start">
          <InputForm
            type="text"
            title="Name"
            placeHolder="Name"
            validators={[]}
            errorText="Please enter a valid name"
          />
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
        <Buttons type="submit">Sign Up &rarr;</Buttons>
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
