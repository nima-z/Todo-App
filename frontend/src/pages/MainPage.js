import { useContext, useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { AuthContext } from "../context/auth-context";
import { TaskContext } from "../context/task-context";
import { useFetch } from "../Hooks/useFetch";
import MainHeader from "../components/Header/MainHeader";
import TodoList from "../components/Todo/TodoList";
import ErrorModal from "../components/Modals/ErrorModal";

function MainPage() {
  const {
    authState: { userId },
    dispatch: authDispatch,
  } = useContext(AuthContext);
  const {
    taskState: { counter },
    dispatch: taskDispatch,
  } = useContext(TaskContext);

  const { error, clearError, sendRequest } = useFetch();
  console.log("main");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/tasks/${userId}`
        );

        taskDispatch({ type: "TASK", val: responseData.tasks });
        authDispatch({ type: "AVATAR", val: responseData.user.avatar });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [counter, sendRequest, userId]);

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      {error ? <ErrorModal message={error} clearError={clearError} /> : null}
      <MainHeader />
      <TodoList />
    </Container>
  );
}

export default MainPage;
