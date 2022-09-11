import { Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTimer } from "use-timer";
import LoserModal from "./LoserModal";

const Timer = (props: any) => {
  const { started, finished, setFinished, Reset } = props;
  const { time, start, pause, reset } = useTimer({
    initialTime: 30,
    timerType: "DECREMENTAL",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  setTimeout(() => {
    if (started) {
      start();
    }
    if (finished) pause();
  }, 500);
  useEffect(() => {
    if (time === 0) {
      GameLost();
    }
  }, [time, GameLost]);

  function GameLost() {
    setFinished(true);
    onOpen();
  }

  return (
    <>
      <LoserModal
        isOpen={isOpen}
        onClose={onClose}
        Reset={Reset}
        reset={reset}
      />
      <Text color="white">{time}s</Text>
    </>
  );
};
export default Timer;
