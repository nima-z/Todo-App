import { useContext, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";

import MainHeader from "../../components/Navigation/MainHeader";
import TodoList from "../../components/Todo/TodoList";
import { AuthContext } from "../../util/context/auth-context";
import { useFetch } from "../../util/Hooks/fetch-hook";
import SortForm from "../../components/Form/SortForm";

function MainPage(props) {
  const authCTX = useContext(AuthContext);
  const [loadedData, setLoadedData] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useFetch();

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
        setLoadedData(authCTX.userState.list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [authCTX.userState.tasks, authCTX.userState.avatar]);

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      <MainHeader />
      <TodoList />
    </Container>
  );
}

export default MainPage;
