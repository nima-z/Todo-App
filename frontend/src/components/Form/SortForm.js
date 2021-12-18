import React, { useReducer } from "react";
import { Tr, Th } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import Buttons from "../UI/Buttons";

import styles from "./SortForm.module.css";

// function sortReducer(state, action) {
//   switch (action.type) {
//     case "task":
//       if (state.type === "task") {
//         return { ...state, sort: !state.sort };
//       }
//       return { ...state, type: "task", sort: dummy_data.sort() };
//     case "priority":
//       if (state.type === "priority") {
//         return { ...state, sort: !state.sort };
//       }
//       return { ...state, type: "task", sort: dummy_data.sort() };
//     case "date":
//       if (state.type === "date") {
//         return { ...state, sort: !state.sort };
//       }
//       return { ...state, type: "task", sort: dummy_data.sort() };
//     default:
//       return state;
//   }
// }

// const prioritysort = {
//   high: 3,
//   medium: 2,
//   low: 1,
// };

function SortForm() {
  //   function sortTaskHandler(event) {
  //     setSortTask(true);
  //   }
  return (
    <Tr className={styles.sort}>
      <Th></Th>
      <Th>
        <Buttons sort="true">
          Task
          <ChevronDownIcon />
          <ChevronUpIcon />
        </Buttons>
      </Th>
      <Th>
        <Buttons sort="true">
          Priority
          <ChevronDownIcon />
          <ChevronUpIcon />
        </Buttons>
      </Th>
      <Th></Th>
    </Tr>
  );
}

export default SortForm;
