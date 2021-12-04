import React from "react";

import styles from "./SortForm.module.css";

function SortForm() {
  return (
    <div className={styles.sort}>
      <label htmlFor="Sort">Sort by</label>
      <select name="Sort" id="Sort" className={styles.select}>
        <option value="Title">Title</option>
        <option value="Priority">Priority</option>
        <option value="Date">Date</option>
      </select>
    </div>
  );
}

export default SortForm;
