import TodoList from "./components/Todo/TodoList";
import InputForm from "./components/Form/InputForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <InputForm />
      <TodoList />
    </div>
  );
}

export default App;
