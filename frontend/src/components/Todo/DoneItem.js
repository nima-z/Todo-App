import { useContext } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  Tr,
  Td,
  Button,
  Checkbox,
} from "@chakra-ui/react";

import { AuthContext } from "../../util/context/auth-context";

import styles from "./DoneItem.module.css";

function DoneItem(props) {
  const authCTX = useContext(AuthContext);
  const stringDate = new Date(props.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  function deleteHandler() {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/tasks/${props.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        authCTX.setTasks(-1);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }

  let proClass;
  if (props.priority === "High") {
    proClass = "high";
  }
  if (props.priority === "Medium") {
    proClass = "medium";
  }
  if (props.priority === "Low") {
    proClass = "low";
  }

  return (
    <Tr className={styles.main} maxWidth="375px" bg="grey" opacity="90%">
      <Td padding="8px">
        <form className={styles.checkbox}>
          <Checkbox
            colorScheme="green"
            className={styles.checkbox}
            size="lg"
            defaultIsChecked
            isDisabled
          />
        </form>
      </Td>
      <Td padding="16px" minWidth="170px" paddingLeft="22px">
        <div className={styles.title}>{props.title}</div>
        <div className={styles.date}>{stringDate}</div>
      </Td>
      <Td padding="13px">
        <div className={`${styles.priority}  ${styles[proClass]}`}>
          {props.priority}
        </div>
      </Td>
      <Td padding="20px">
        <div className={styles.action}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  bg="inherit"
                  _hover={{ bg: "none" }}
                  _focus={{ boxShadow: "none" }}
                  fontSize="20px"
                >
                  {isOpen ? "..." : "..."}
                </MenuButton>
                <MenuList>
                  <Button
                    focus="none"
                    width="100%"
                    justifyContent="flex-start"
                    _active={{ bg: "none" }}
                    _focus={{ boxShadow: "none" }}
                    bg="inherit"
                    borderRadius="0"
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </MenuList>
              </>
            )}
          </Menu>
        </div>
      </Td>
    </Tr>
  );
}

export default DoneItem;
