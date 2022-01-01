import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

function initializer() {
  const localAuthObject = localStorage.getItem("auth");
  if (localAuthObject) {
    const localAuth = JSON.parse(localAuthObject);
    if (localAuth && localAuth.isLoggedin) return localAuth;
    else {
      return { userId: null, userName: null, isLoggedin: false };
    }
  } else {
    return { userId: null, userName: null, isLoggedin: false };
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedin: true,
        userId: action.userId,
        userName: action.userName,
        avatar: action.avatar,
      };
    case "LOGOUT":
      return { ...state, isLoggedin: false };

    case "AVATAR":
      return { ...state, avatar: action.val };
    default:
      return state;
  }
};
export function AuthProvider(props) {
  const [authState, dispatch] = useReducer(authReducer, {
    userId: initializer().userId,
    userName: initializer().userName,
    isLoggedin: initializer().isLoggedin,
    avatar: "",
  });

  const { isLoggedin } = authState;

  useEffect(() => {
    if (isLoggedin) localStorage.setItem("auth", JSON.stringify(authState));
    else localStorage.removeItem("auth");
  }, [isLoggedin, authState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
