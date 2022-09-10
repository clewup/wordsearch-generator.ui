import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const WinnerModal = (props: any) => {
  const { isOpen, onClose, Reset } = props;
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
        <ModalHeader>Winner!</ModalHeader>
        <ModalBody>
          <Text>Great job! You found the word.</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() => {
              Reset();
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
export default WinnerModal;
