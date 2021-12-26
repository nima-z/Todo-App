import { useReducer, useContext } from "react";
import { Tr, Th, Button } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { AuthContext } from "../../util/context/auth-context";

import styles from "./SortForm.module.css";

function SortForm(props) {
  const authCTX = useContext(AuthContext);
  const [sortState, dispatch] = useReducer(sortReducer, {
    type: "task",
    ascending: true,
  });

  function sortReducer(state, action) {
    switch (action.type) {
      case "TASK":
        if (state.type === "task") {
          authCTX.userState.list.reverse();
          return {
            ...state,
            ascending: !state.ascending,
          };
        } else {
          authCTX.userState.list.sort(
            (a, b) => new Date(b.createDate) - new Date(a.createDate)
          );
          return {
            ...state,
            type: "task",
            ascending: !state.ascending,
          };
        }
      case "PRIORITY":
        if (state.type === "priority") {
          authCTX.userState.list.reverse();
          return {
            ...state,
            ascending: !state.ascending,
          };
        } else {
          const order = ["High", "Medium", "Low"];
          authCTX.userState.list.sort(
            (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority)
          );
          return {
            ...state,
            type: "priority",
            ascending: !state.ascending,
          };
        }

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
    <Tr className={styles.sort} maxWidth="375px">
      <Th minWidth="120px">
        <Button
          onClick={sortTaskHandler}
          padding="0.2rem"
          _hover={{ bg: "none" }}
          _focus={{ boxShadow: "none" }}
        >
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
      <Th minWidth="110px" paddingLeft="50px" textAlign="center">
        <Button
          onClick={sortPriorityHandler}
          padding="0.2rem"
          _hover={{ bg: "none" }}
          _focus={{ boxShadow: "none" }}
        >
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
    </Tr>
  );
}

export default SortForm;
