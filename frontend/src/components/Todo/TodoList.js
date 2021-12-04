import Dummy_Data from "../../Dummy_Data";
import TodoItem from "./TodoItem";
import SortForm from "../Form/SortForm";

import styles from "./TodoList.module.css";

function TodoList() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.sort}></div> */}
      <SortForm />
      <div className={styles.list}>
        <ul>
          {Dummy_Data.map((todo) => (
            <TodoItem
              title={todo.title}
              id={todo.id}
              key={todo.id}
              date={todo.createDate}
              priority={todo.priority}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
