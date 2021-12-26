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

import EditTask from "../Actions/EditTask";
import { AuthContext } from "../../util/context/auth-context";
import { useFetch } from "../../util/Hooks/useFetch";

import styles from "./TodoItem.module.css";

function TodoItem(props) {
  const authCTX = useContext(AuthContext);
  const { isLoading, sendRequest } = useFetch();
  const stringDate = new Date(props.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  async function deleteHandler() {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/tasks/${props.id}`,
        "DELETE"
      );

      authCTX.setTasks(-1);
    } catch (err) {
      console.log(err);
    }
  }

  async function checkDoneHandler() {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/tasks/done/${props.id}`,
        "PATCH"
      );

      authCTX.setTasks(-1);
    } catch (err) {
      console.log(err);
    }
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
    <Tr className={styles.main} maxWidth="375px">
      <Td padding="8px">
        <form className={styles.checkbox} onSubmit={checkDoneHandler}>
          <Checkbox
            onChange={checkDoneHandler}
            colorScheme="green"
            className={styles.checkbox}
            size="lg"
          ></Checkbox>
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
                  <EditTask
                    taskId={props.id}
                    title={props.title}
                    priority={props.priority}
                  />
                  <Button
                    focus="none"
                    width="100%"
                    justifyContent="flex-start"
                    _active={{ bg: "none" }}
                    _focus={{ boxShadow: "none" }}
                    bg="inherit"
                    borderRadius="0"
                    onClick={deleteHandler}
                    isLoading={isLoading}
                    loadingText="Deleting"
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

export default TodoItem;
