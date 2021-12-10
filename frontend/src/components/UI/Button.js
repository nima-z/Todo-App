import { Button, ButtonGroup } from "@chakra-ui/react";

function Buttons(props) {
  return (
    <Button colorScheme="green" type={props.type}>
      {props.children}
    </Button>
  );
}

export default Buttons;
