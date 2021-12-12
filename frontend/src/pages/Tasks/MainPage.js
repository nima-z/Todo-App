import { Fragment } from "react";
import { useParams } from "react-router-dom";

import MainHeader from "../../components/Navigation/MainHeader";
import TodoList from "../../components/Todo/TodoList";

import Dummy_Data from "../../Dummy_Data";

function MainPage(props) {
  const { uid } = useParams();
  return (
    <Fragment>
      <MainHeader uid={uid} />
      <TodoList items={Dummy_Data} />
    </Fragment>
  );
}

export default MainPage;
