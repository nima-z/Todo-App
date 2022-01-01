import { Fragment, useContext } from "react";
import { Table, Thead, Tbody } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import SortForm from "../Operations/SortForm";
import EmptyList from "../../components/Todo/EmptyList";
import { TaskContext } from "../../context/task-context";

import styles from "./TodoList.module.css";

function TodoList() {
  const {
    taskState: { sort, tasks: todoList },
  } = useContext(TaskContext);

  function sortByDate(a, b) {
    return sort.asc
      ? a[sort.by] < b[sort.by]
        ? 1
        : -1
      : a[sort.by] < b[sort.by]
      ? -1
      : 1;
  }

  function sortByPriority(a, b) {
    const order = ["High", "Medium", "Low"];
    return sort.asc
      ? order.indexOf(a[sort.by]) < order.indexOf(b[sort.by])
        ? 1
        : -1
      : order.indexOf(a[sort.by]) < order.indexOf(b[sort.by])
      ? -1
      : 1;
  }

  return (
    <Fragment>
      <Table minWidth="100%">
        <Thead>
          <SortForm />
        </Thead>
        {todoList.length === 0 ? (
          <EmptyList />
        ) : (
          <Tbody className={styles.container}>
            {todoList
              .sort((a, b) => {
                if (sort.by === "createDate") {
                  return sortByDate(a, b);
                } else {
                  return sortByPriority(a, b);
                }
              })
              .map((todo) => (
                <TodoItem
                  title={todo.title}
                  id={todo._id}
                  key={todo._id}
                  date={todo.createDate}
                  priority={todo.priority}
                />
              ))}
          </Tbody>
        )}
      </Table>
    </Fragment>
  );
}

export default TodoList;
