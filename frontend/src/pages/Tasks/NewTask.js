import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  Select,
} from "@chakra-ui/react";

import plusSign from "../../assets/plus-sign.svg";
import { AuthContext } from "../../util/context/auth-context";
import { useFetch } from "../../util/Hooks/fetch-hook";

function NewTask() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState();
  const authCTX = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, error, clearError, sendRequest } = useFetch();

  const initialRef = useRef();
  const finalRef = useRef();

  function inputHandler(event) {
    setTitle(event.target.value);
  }
  function priorityHandler(event) {
    setPriority(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/tasks",
        "POST",
        JSON.stringify({
          title,
          priority,
          creatorId: authCTX.userState.userId,
        })
      );
      authCTX.setTasks(1);
      authCTX.setList(response.task);

      onClose();
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Button onClick={onOpen} bg="rgba(104, 211, 145, 1)" w="32px" padding="0">
        <img src={plusSign} alt="" />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxWidth="350px">
          <form onSubmit={onSubmitHandler}>
            <ModalHeader>Add a new task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  onChange={inputHandler}
                  placeholder="Title"
                  variant="filled"
                  focus="none"
                  marginBottom="0.5rem"
                  value={title}
                />
                <Select placeholder="Priority" onChange={priorityHandler}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                type="submit"
                isLoading={isLoading}
                loadingText="Saving"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewTask;
