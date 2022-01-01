import { Tbody, Tr, Td } from "@chakra-ui/react";

import emptyList_pic from "../../assets/empty-list.svg";

import NewTask from "../Operations/NewTask";

import styles from "./EmptyList.module.css";

function EmptyList() {
  return (
    <Tbody>
      <Tr>
        <Td border="none">
          <div className={styles.container}>
            <div>
              <img src={emptyList_pic} alt="Empty list" />
            </div>
            <div className={styles.description}>
              <p>There are no items here!</p>
              <p>Start adding your tasks</p>
            </div>
            <div className={styles.action}>
              <NewTask />
            </div>
          </div>
        </Td>
      </Tr>
    </Tbody>
  );
}
export default EmptyList;
