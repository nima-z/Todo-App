import { createContext, useReducer } from "react";

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "COUNTER":
      return { ...state, counter: state.counter + action.val };
    case "TASK":
      if (action.val.length > 0 || action.val.length === 0) {
        return { ...state, tasks: action.val };
      } else {
        return { ...state, tasks: [...state.tasks, action.val] };
      }
    case "SORT":
      const { by, asc } = action.payload;
      return { ...state, sort: { by, asc } };
    default:
      return state;
  }
};
export function TaskProvider(props) {
  const [taskState, dispatch] = useReducer(taskReducer, {
    counter: 0,
    tasks: [],
    sort: { type: "createDate", asc: true },
  });

  return (
    <TaskContext.Provider
      value={{
        taskState,
        dispatch,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
