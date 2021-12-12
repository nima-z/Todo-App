import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Buttons(props) {
  if (props.href) {
    return (
      <Button href={props.href} colorScheme="blue">
        {props.children}
      </Button>
    );
  }
  if (props.to) {
    <Button>
      <Link to={props.to} exact={props.exact} colorScheme="blue">
        {props.children}
      </Link>
    </Button>;
  }
  return (
    <Button
      colorScheme="green"
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}

export default Buttons;
