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

  if (title === "Password") {
    return (
      <div
        className={`${styles.formControl} ${
          !inputState.isValid && styles.invalid
        }`}
      >
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            id={title}
            placeholder={placeHolder}
            onChange={ChangeInputHandler}
            value={inputState.value}
            pr="4.5rem"
            isInvalid={!inputState.isValid}
            variant="filled"
          />
          <InputRightElement width="3rem" mr="0.3rem">
            <Button
              h="24px"
              size="sm"
              onClick={handleClick}
              fontSize="11px"
              bg="#CBD5E0"
              color="white"
            >
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
      <Input
        type={type}
        id={title}
        placeholder={placeHolder}
        onChange={ChangeInputHandler}
        value={inputState.value}
        // isInvalid={props.isInvalid}
        variant="filled"
      />
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
}

export default InputForm;
