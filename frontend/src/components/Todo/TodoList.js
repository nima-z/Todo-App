import React, { Fragment, useState, useContext } from "react";
import { Table, Thead, Tbody } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import DoneItem from "./DoneItem";
import SortForm from "../Form/SortForm";
import EmptyList from "../../components/Todo/EmptyList";
import { AuthContext } from "../../util/context/auth-context";

import styles from "./TodoList.module.css";

function TodoList() {
  const [toggle, setToggle] = useState(false);
  const authCTX = useContext(AuthContext);

  function listSorter() {
    setToggle(!toggle);
  }

  return (
    <Fragment>
      <Table size="lg" maxWidth="375px">
        <Thead maxWidth="375px">
          <SortForm listSorter={listSorter} />
        </Thead>
        {authCTX.userState.list.length === 0 ? (
          <EmptyList />
        ) : (
          <Fragment>
            <Tbody className={styles.container}>
              {authCTX.userState.list
                .filter((task) => task.status === "UnDone")
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
            <Tbody className={styles.container2}>
              {authCTX.userState.list
                .filter((task) => task.status === "Done")
                .map((todo) => (
                  <DoneItem
                    title={todo.title}
                    id={todo._id}
                    key={todo._id}
                    date={todo.createDate}
                    priority={todo.priority}
                  />
                ))}
            </Tbody>
          </Fragment>
        )}
      </Table>
    </Fragment>
  );
}

export default TodoList;
