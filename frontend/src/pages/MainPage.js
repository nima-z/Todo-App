import { useContext, useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { AuthContext } from "../util/context/auth-context";
import { useFetch } from "../util/Hooks/useFetch";
import MainHeader from "../components/Header/MainHeader";
import TodoList from "../components/Todo/TodoList";
import ErrorModal from "../components/Modals/ErrorModal";

function MainPage() {
  const authCTX = useContext(AuthContext);
  const { error, clearError, sendRequest } = useFetch();
  const { userId, tasks } = authCTX.userState;
  console.log("main");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/tasks/${userId}`
        );

        authCTX.setList(responseData.tasks);
        authCTX.setAvatar(responseData.user.avatar);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [tasks, sendRequest, userId]);

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      {error ? <ErrorModal message={error} clearError={clearError} /> : null}
      <MainHeader />
      <TodoList />
    </Container>
  );
}

export default MainPage;
