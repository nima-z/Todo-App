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

import styles from "./TodoItem.module.css";

function TodoItem(props) {
  const stringDate = props.date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
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
        <div className={styles.priority}>{props.priority}</div>
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
                  <EditTask />
                  <MenuItem
                    _focus="none"
                    _hover={{
                      backgroundColor: "rgba(237, 242, 247, 1)",
                    }}
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
