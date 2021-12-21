import { useContext, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";

import MainHeader from "../../components/Navigation/MainHeader";
import TodoList from "../../components/Todo/TodoList";
import { AuthContext } from "../../util/context/auth-context";
import { useFetch } from "../../util/Hooks/fetch-hook";

function MainPage(props) {
  const authCTX = useContext(AuthContext);
  const [loadedData, setLoadedData] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useFetch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            `/tasks/${authCTX.userState.userId}`
        );

        setLoadedData(responseData.tasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [authCTX, sendRequest]);

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      <MainHeader uid={authCTX.userState.userId} />
      <TodoList items={loadedData} />
    </Container>
  );
}

export default MainPage;
