import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import MainHeader from "../../components/Navigation/MainHeader";
import TodoList from "../../components/Todo/TodoList";

import Dummy_Data from "../../Dummy_Data";

function MainPage(props) {
  const { uid } = useParams();

  return (
    <Container maxW="md" centerContent padding="0" textAlign="center">
      <MainHeader uid={uid} />
      <TodoList items={Dummy_Data} />
    </Container>
  );
}

export default MainPage;
