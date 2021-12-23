import React, { useReducer, useContext } from "react";
import { Tr, Th, Button } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../util/context/auth-context";

import styles from "./SortForm.module.css";

function SortForm(props) {
  const authCTX = useContext(AuthContext);
  const [sortState, dispatch] = useReducer(sortReducer, {
    type: "task",
    sortedList: authCTX.userState.list,
    ascending: true,
  });

  function sortReducer(state, action) {
    switch (action.type) {
      case "TASK":
        if (state.type === "task") {
          return {
            ...state,
            sortedList: authCTX.userState.list.reverse(),
            ascending: !state.ascending,
          };
        }
        return {
          ...state,
          type: "task",
          sortedList: authCTX.userState.list.sort(
            (a, b) => new Date(b.createDate) - new Date(a.createDate)
          ),
          ascending: !state.ascending,
        };
      case "PRIORITY":
        const order = ["High", "Medium", "Low"];

        if (state.type === "priority") {
          return {
            ...state,
            sortedList: state.sortedList.reverse(),
            ascending: !state.ascending,
          };
        }

        return {
          ...state,
          type: "priority",
          sortedList: authCTX.userState.list.sort(
            (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority)
          ),
          ascending: !state.ascending,
        };
      default:
        return state;
    }
  }

  function sortTaskHandler() {
    dispatch({ type: "TASK" });
    props.listSorter();
  }
  function sortPriorityHandler() {
    dispatch({ type: "PRIORITY" });
    props.listSorter();
  }

  return (
    <Tr className={styles.sort}>
      <Th></Th>
      <Th>
        <Button onClick={sortTaskHandler}>
          Task
          {sortState.type === "task" ? (
            sortState.ascending ? (
              <ChevronDownIcon />
            ) : (
              <ChevronUpIcon />
            )
          ) : (
            ""
          )}
        </Button>
      </Th>
      <Th>
        <Button onClick={sortPriorityHandler}>
          Priority
          {sortState.type === "priority" ? (
            sortState.ascending ? (
              <ChevronDownIcon />
            ) : (
              <ChevronUpIcon />
            )
          ) : (
            ""
          )}
        </Button>
      </Th>
      <Th></Th>
    </Tr>
  );
}

export default SortForm;
