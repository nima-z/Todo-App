import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/Authentication/AuthPage";
import MainPage from "./pages/Tasks/MainPage";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:uid/" element={<MainPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
