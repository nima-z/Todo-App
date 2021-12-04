import styles from "./InputForm.module.css";
import { SiAddthis } from "react-icons/si";

function InputForm() {
  return (
    <form className={styles.form}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select name="priority" id="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className={styles.actions}>
        <button type="submit">
          <SiAddthis />
        </button>
      </div>
    </form>
  );
}

export default InputForm;
