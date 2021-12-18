import { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  isLoggedin: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const [isLoggedin, setIsLoggedin] = useState(true);

  const loginHandler = useCallback(() => {
    setIsLoggedin(true);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedin(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedin,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
