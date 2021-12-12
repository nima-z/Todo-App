import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// import TodoList from "./components/Todo/TodoList";
// import InputForm from "./components/Form/InputForm";
// import MainHeader from "./components/Navigation/MainHeader";
import AuthPage from "./pages/Authentication/AuthPage";
import MainPage from "./pages/Tasks/MainPage";
import NewTask from "./pages/Tasks/NewTask";
import EditTask from "./pages/Tasks/EditTask";

import "./App.css";

function App() {
  return (
    <Fragment>
      {/* <MainHeader /> */}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:uid/" element={<MainPage />} />
        <Route path="/:uid/newtask" element={<NewTask />} />
        <Route path="/:uid/edittask" element={<EditTask />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
