import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/Authentication/AuthPage";
import MainPage from "./pages/Tasks/MainPage";
import { AuthProvider, AuthContext } from "./util/context/auth-context";

import "./App.css";

function App() {
  const authCTX = useContext(AuthContext);

  let routes;
  console.log(authCTX.isLoggedin);
  if (authCTX.isLoggedin) {
    routes = (
      <Routes>
        <Route path="/:uid/" element={<MainPage />} />
        <Route path="*" element={<Navigate replace to="/:uid" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Routes>
    );
  }
  return <AuthProvider>{routes}</AuthProvider>;
}

export default App;
