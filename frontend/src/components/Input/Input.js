import { useReducer, useState, useEffect } from "react";
import {
  Input as InputChakra,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import { validate } from "../../util/validators";
import styles from "./Input.module.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCHED":
      return { ...state, touched: true };
    default:
      return state;
  }
}

function Input(props) {
  const [show, setShow] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    touched: false,
  });
  const { id, type, placeHolder, validators, errorText, onInput } = props;

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  function handleClick() {
    setShow(!show);
  }

  function ChangeInputHandler(event) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  }

  function onTouchHandler() {
    dispatch({ type: "TOUCHED" });
  }
  if (id === "Password") {
    return (
      <div
        className={`${styles.formControl} ${
          !inputState.isValid && inputState.touched && styles.invalid
        }`}
      >
        <InputGroup size="md">
          <InputChakra
            type={show ? "text" : "password"}
            id={id}
            placeholder={placeHolder}
            onChange={ChangeInputHandler}
            onBlur={onTouchHandler}
            value={inputState.value}
            pr="4.5rem"
            isInvalid={!inputState.isValid && inputState.touched}
            variant="filled"
            required
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
        {!inputState.isValid && inputState.touched && <p>{errorText}</p>}
      </div>
    );
  }
  return (
    <div
      className={`${styles.formControl} ${
        !inputState.isValid && inputState.touched && styles.invalid
      }`}
    >
      <InputChakra
        type={type}
        id={id}
        placeholder={placeHolder}
        onChange={ChangeInputHandler}
        onBlur={onTouchHandler}
        value={inputState.value}
        isInvalid={!inputState.isValid && inputState.touched}
        variant="filled"
        required
      />
      {!inputState.isValid && inputState.touched && <p>{errorText}</p>}
    </div>
  );
}

export default Input;
