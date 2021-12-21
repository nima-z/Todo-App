import React, { useRef, useState, useEffect, useContext } from "react";

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

import { useFetch } from "../../util/Hooks/fetch-hook";
import { AuthContext } from "../../util/context/auth-context";

function EditTask(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState();
  const { sendRequest } = useFetch();
  const authCTX = useContext(AuthContext);

  const initialRef = useRef();
  const finalRef = useRef();
  const { title: oldTitle, priority: oldPriority } = props;
  useEffect(() => {
    setTitle(oldTitle);
    setPriority(oldPriority);
  }, [oldTitle, oldPriority]);

  function inputHandler(event) {
    setTitle(event.target.value);
  }
  function priorityHandler(event) {
    setPriority(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    const editTask = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/tasks/${props.taskId}`,
          "PATCH",
          JSON.stringify({
            title,
            priority,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    editTask();
    authCTX.setTasks(0);
    onClose();
  }

  return (
    <>
      <Button
        onClick={onOpen}
        w="100%"
        justifyContent="flex-start"
        fontWeight="400"
        bg="inherit"
        borderRadius="0"
      >
        Edit...
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered

        // isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmitHandler}>
            <ModalHeader>Edit item</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  onChange={inputHandler}
                  ref={initialRef}
                  placeholder="Title"
                  variant="filled"
                  focus="none"
                  value={title}
                  marginBottom="0.5rem"
                />

                <Select
                  placeholder="Priority"
                  onChange={priorityHandler}
                  value={priority}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
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

export default EditTask;
