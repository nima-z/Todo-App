import React, { useReducer } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

import styles from "./InputForm.module.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.val, isValid: true };
    default:
      return state;
  }
}

function InputForm(props) {
  const [show, setShow] = React.useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { label, title, type, placeHolder, validators, errorText } = props;

  function handleClick() {
    setShow(!show);
  }

  function ChangeInputHandler(event) {
    dispatch({ type: "CHANGE", val: event.target.value });
  }

  if (title === "password") {
    return (
      <div
        className={`${styles.formControl} ${
          !inputState.isValid && styles.invalid
        }`}
      >
        <label htmlFor={title}>{label}</label>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            id={title}
            placeholder="Enter password"
            onChange={ChangeInputHandler}
            value={inputState.value}
            pr="4.5rem"
            isInvalid={!inputState.isValid ? true : false}
          />
          <InputRightElement width="3rem" mr="0.3rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} fontSize="11px">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!inputState.isValid && <p>{errorText}</p>}
      </div>
    );
  }
  return (
    <div
      className={`${styles.formControl} ${
        !inputState.isValid && styles.invalid
      }`}
    >
      <label htmlFor={title}>{label}</label>
      <Input
        type={type}
        id={title}
        placeholder={placeHolder}
        onChange={ChangeInputHandler}
        value={inputState.value}
        isInvalid={!inputState.isValid ? true : false}
      />
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
}

export default InputForm;
