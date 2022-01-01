import { useContext } from "react";
import { Tr, Th, Button } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { TaskContext } from "../../context/task-context";

import styles from "./SortForm.module.css";

function SortForm() {
  const { taskState, dispatch } = useContext(TaskContext);
  const sort = taskState.sort;

  function dateSortHandler() {
    dispatch({ type: "SORT", payload: { by: "createDate", asc: !sort.asc } });
  }
  function prioritySortHandler() {
    dispatch({ type: "SORT", payload: { by: "priority", asc: !sort.asc } });
  }

  return (
    <Tr className={styles.sort}>
      <Th minWidth="120px">
        <Button
          onClick={dateSortHandler}
          padding="0.2rem"
          _hover={{ bg: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          Task
          {sort.by === "createDate" ? (
            sort.asc ? (
              <ChevronDownIcon />
            ) : (
              <ChevronUpIcon />
            )
          ) : (
            ""
          )}
        </Button>
      </Th>
      <Th minWidth="110px" textAlign="center">
        <Button
          onClick={prioritySortHandler}
          padding="0.2rem"
          _hover={{ bg: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          Priority
          {sort.by === "priority" ? (
            sort.asc ? (
              <ChevronDownIcon />
            ) : (
              <ChevronUpIcon />
            )
          ) : (
            ""
          )}
        </Button>
      </Th>
    </Tr>
  );
}

export default SortForm;
