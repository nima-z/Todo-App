import { createContext, useCallback, useEffect, useReducer } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  userId: null,
  userName: null,
  tasks: 0,
  list: [],
  login: () => {},
  logout: () => {},
  setId: () => {},
  setTasks: () => {},
  setList: () => {},
});

function initializer() {
  const localAuthObject = localStorage.getItem("auth");
  if (localAuthObject) {
    const localAuth = JSON.parse(localAuthObject);
    if (localAuth && localAuth.isLoggedin) return localAuth;
    else {
      return { userId: null, userName: null, isLoggedin: false, tasks: 0 };
    }
  } else {
    return { userId: null, userName: null, isLoggedin: false, tasks: 0 };
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, userName: action.val };
    case "ID":
      return { ...state, userId: action.val };
    case "LOGIN":
      return { ...state, isLoggedin: true };
    case "LOGOUT":
      return { ...state, isLoggedin: false };
    case "TASK":
      return { ...state, tasks: state.tasks + action.val };
    case "LIST":
      return { ...state, list: action.val };
    default:
      return state;
  }
};
export function AuthProvider(props) {
  // const [isLoggedin, setIsLoggedin] = useState(initializer());
  const [userState, dispatch] = useReducer(userReducer, {
    userId: initializer().userId,
    userName: initializer().userName,
    isLoggedin: initializer().isLoggedin,
    tasks: initializer().tasks,
    list: [],
  });
  const loginHandler = useCallback(() => {
    dispatch({ type: "LOGIN" });
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const userIdHandler = useCallback((userId) => {
    dispatch({ type: "ID", val: userId });
  }, []);

  const userNameHandler = useCallback((userName) => {
    dispatch({ type: "NAME", val: userName });
  }, []);
  const updateTasksHandler = useCallback((x) => {
    dispatch({ type: "TASK", val: x });
  }, []);
  const updateListHandler = useCallback((x) => {
    dispatch({ type: "LIST", val: x });
  }, []);

  const { isLoggedin } = userState;

  useEffect(() => {
    if (isLoggedin) localStorage.setItem("auth", JSON.stringify(userState));
    else localStorage.removeItem("auth");
  }, [isLoggedin, userState]);

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        setId: userIdHandler,
        setName: userNameHandler,
        setTasks: updateTasksHandler,
        setList: updateListHandler,
        userState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
