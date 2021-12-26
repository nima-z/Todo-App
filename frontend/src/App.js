import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import AuthPage from "./pages/AuthPage";
// import MainPage from "./pages/MainPage";
import { AuthContext } from "./util/context/auth-context";

import "./App.css";

const MainPage = React.lazy(() => import("./pages/MainPage"));

function App() {
  const authCTX = useContext(AuthContext);

  let routes;

  if (authCTX.userState.isLoggedin) {
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
  return (
    <Suspense
      fallback={
        <div className="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
