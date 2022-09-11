import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";

const LoserModal = (props: any) => {
  const { isOpen, onClose, Reset, reset } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You lost!</ModalHeader>
        <ModalBody>
          <Text>Better luck next time!</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              Reset();
              reset();
              onClose();
            }}
          >
            Play Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default LoserModal;
