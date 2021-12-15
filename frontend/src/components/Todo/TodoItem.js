import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Checkbox,
} from "@chakra-ui/react";

import Buttons from "../UI/Buttons";

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
                  <MenuItem>Edit...</MenuItem>
                  <MenuItem>Delete</MenuItem>
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
