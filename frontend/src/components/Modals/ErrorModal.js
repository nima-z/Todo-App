import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

function ErrorModal(props) {
  return (
    <>
      <Modal isOpen isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="350px">
          <ModalHeader>Error</ModalHeader>
          <ModalBody>{props.message}</ModalBody>
          <ModalFooter>
            <Button onClick={props.clearError}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ErrorModal;
