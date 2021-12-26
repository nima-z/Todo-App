import { useContext, useEffect } from "react";
import { Container } from "@chakra-ui/react";

import MainHeader from "../../components/Navigation/MainHeader";
import TodoList from "../../components/Todo/TodoList";
import { AuthContext } from "../../util/context/auth-context";
import { useFetch } from "../../util/Hooks/fetch-hook";
import ErrorModal from "../../components/Modals/ErrorModal";

function MainPage() {
  const authCTX = useContext(AuthContext);
  const { error, clearError, sendRequest } = useFetch();

  console.log("main");

  const { userId } = authCTX.userState;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/tasks/${userId}`
        );

        authCTX.setList(responseData.tasks);
        authCTX.setAvatar(responseData.user.avatar);
        console.log("fetch again");
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [authCTX.userState.tasks]);

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      {error ? <ErrorModal message={error} clearError={clearError} /> : null}
      <MainHeader />
      <TodoList />
    </Container>
  );
}

export default MainPage;
