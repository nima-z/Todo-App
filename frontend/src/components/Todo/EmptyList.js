import React from "react";

import emptyList_pic from "../../assets/empty-list.svg";
import Buttons from "../UI/Buttons";
import plusSign from "../../assets/plus-sign.svg";
import NewTask from "../../pages/Tasks/NewTask";

import styles from "./EmptyList.module.css";

function EmptyList(props) {
  return (
    <div className={styles.container}>
      <div>
        <img src={emptyList_pic} alt="Empty list" />
      </div>
      <div className={styles.description}>
        <p>There are no items here!</p>
        <p>Start ading your tasks</p>
      </div>
      <div className={styles.action}>
        <NewTask />
      </div>
    </div>
  );
}
export default EmptyList;
