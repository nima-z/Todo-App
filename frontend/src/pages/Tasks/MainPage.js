import TodoList from "../../components/Todo/TodoList";

import Dummy_Data from "../../Dummy_Data";

function MainPage() {
  return <TodoList items={Dummy_Data} />;
}

export default MainPage;
