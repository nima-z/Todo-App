import { useRef, useState, useContext } from "react";

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
  Avatar,
} from "@chakra-ui/react";

import { useFetch } from "../../util/Hooks/useFetch";
import { AuthContext } from "../../util/context/auth-context";
import image1 from "../../assets/avatars/Avatar-1.svg";
import image2 from "../../assets/avatars/Avatar-2.svg";
import image3 from "../../assets/avatars/Avatar-3.svg";
import image4 from "../../assets/avatars/Avatar-4.svg";
import image5 from "../../assets/avatars/Avatar-5.svg";
import image6 from "../../assets/avatars/Avatar-6.svg";
import image7 from "../../assets/avatars/Avatar-7.svg";
import image8 from "../../assets/avatars/Avatar-8.svg";

import styles from "./AvatarForm.module.css";

function AvatarForm() {
  const [avatarInput, setAvatarInput] = useState("avatar-1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, sendRequest } = useFetch();
  const authCTX = useContext(AuthContext);

  const initialRef = useRef();
  const finalRef = useRef();

  function avatarHandler(event) {
    setAvatarInput(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/users/${authCTX.userState.userId}`,
        "PATCH",
        JSON.stringify({
          avatar: avatarInput,
        })
      );
      authCTX.setAvatar(responseData.avatar);
      onClose();
    } catch (err) {
      console.log(err);
    }
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
        Select Avatar
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
        <ModalContent maxWidth="350px">
          <form onSubmit={onSubmitHandler}>
            <ModalHeader paddingBottom="8px">Pick an avatar</ModalHeader>
            <ModalCloseButton />

            <ModalBody display="flex" justifyContent="center" pb={6}>
              <FormControl
                className={styles.checkBox}
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                maxWidth="300px"
              >
                <input
                  type="radio"
                  id="avatar-1"
                  name="avatar"
                  value="0"
                  checked={avatarInput === "0"}
                  onChange={avatarHandler}
                  ref={initialRef}
                />
                <label htmlFor="avatar-1">
                  <Avatar name="avatar-1" src={image1} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-2"
                  name="avatar"
                  value="1"
                  checked={avatarInput === "1"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-2">
                  <Avatar name="avatar-2" src={image2} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-3"
                  name="avatar"
                  value="2"
                  checked={avatarInput === "2"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-3">
                  <Avatar name="avatar-3" src={image3} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-4"
                  name="avatar"
                  value="3"
                  checked={avatarInput === "3"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-4">
                  <Avatar name="avatar-4" src={image4} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-5"
                  name="avatar"
                  value="4"
                  checked={avatarInput === "4"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-5">
                  <Avatar name="avatar-5" src={image5} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-6"
                  name="avatar"
                  value="5"
                  checked={avatarInput === "5"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-6">
                  <Avatar name="avatar-6" src={image6} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-7"
                  name="avatar"
                  value="6"
                  checked={avatarInput === "6"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-7">
                  <Avatar name="avatar-7" src={image7} size="md" />
                </label>
                <input
                  type="radio"
                  id="avatar-8"
                  name="avatar"
                  value="7"
                  checked={avatarInput === "7"}
                  onChange={avatarHandler}
                />
                <label htmlFor="avatar-8">
                  <Avatar name="avatar-8" src={image8} size="md" />
                </label>
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

export default AvatarForm;
