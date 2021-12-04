import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import styles from "./TodoItem.module.css";

function TodoItem(props) {
  return (
    <li className={styles.main}>
      <div className={styles.topRow}>
        <div className={styles.checkBox}>
          <form>
            <input type="checkbox" />
          </form>
          <div className={styles.title}>{props.title}</div>
        </div>
        <div className={styles.priority}>{props.priority}</div>
      </div>
      <div className={styles.botRow}>
        <div className={styles.date}>
          <span>Created: </span>
          {props.date}
        </div>
        <div className={styles.action}>
          <button>
            <FaRegEdit />
          </button>
          <button>
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
