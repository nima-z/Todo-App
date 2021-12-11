import { Fragment } from "react";
import { Routes, Route, Redirect } from "react-router-dom";

// import TodoList from "./components/Todo/TodoList";
// import InputForm from "./components/Form/InputForm";
import AuthPage from "./pages/Authentication/AuthPage";
import Header from "./components/Nav/Header";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/authentication" exact element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
