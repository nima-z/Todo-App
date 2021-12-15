import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
} from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import SortForm from "../Form/SortForm";
import EmptyList from "../../components/Todo/EmptyList";

import styles from "./TodoList.module.css";

function TodoList(props) {
  return (
    <Table>
      <Thead>
        <SortForm />
      </Thead>
      {props.items.length === 0 ? (
        <EmptyList />
      ) : (
        <Tbody className={styles.container}>
          {props.items.map((todo) => (
            <TodoItem
              title={todo.title}
              id={todo.id}
              key={todo.id}
              date={todo.createDate}
              priority={todo.priority}
            />
          ))}
        </Tbody>
      )}
    </Table>
  );
}

export default TodoList;
