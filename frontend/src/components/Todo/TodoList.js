import TodoItem from "./TodoItem";
import SortForm from "../Form/SortForm";

import styles from "./TodoList.module.css";

function TodoList(props) {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No task found.</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <SortForm />
      <div className={styles.list}>
        <ul>
          {props.items.map((todo) => (
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
