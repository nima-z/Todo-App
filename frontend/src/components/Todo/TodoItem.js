import { useContext } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tr,
  Td,
  Button,
  Checkbox,
} from "@chakra-ui/react";

import EditTask from "../../pages/Tasks/EditTask";
import { AuthContext } from "../../util/context/auth-context";

import styles from "./TodoItem.module.css";

function TodoItem(props) {
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
    <Tr className={styles.main}>
      <Td>
        <form className={styles.checkbox}>
          <Checkbox colorScheme="green" className={styles.checkbox}></Checkbox>
        </form>
      </Td>
      <Td>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.date}>{stringDate}</div>
      </Td>
      <Td>
        <div className={`${styles.priority}  ${styles[proClass]}`}>
          {props.priority}
        </div>
      </Td>
      <Td>
        <div className={styles.action}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button} bg="inherit">
                  {isOpen ? "..." : "..."}
                </MenuButton>
                <MenuList>
                  <EditTask
                    taskId={props.id}
                    title={props.title}
                    priority={props.priority}
                  />
                  <MenuItem
                    focus="none"
                    hover={{
                      backgroundColor: "rgba(237, 242, 247, 1)",
                    }}
                    onClick={deleteHandler}
                  >
                    Delete
                  </MenuItem>
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
