import React, { useState } from "react";
import "./App.css";
import LetterGenerator from "./utils/LetterGenerator";
import WordInserter from "./utils/WordInserter";
import {
  Box,
  Text,
  Input,
  Heading,
  SimpleGrid,
  Skeleton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import WinnerModal from "./components/WinnerModal";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [started, setStarted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const maximumLetters = 169; // has to return a solid number on square root.
  const columns = Math.sqrt(maximumLetters);
  const letterSize = 4;
  const letterSizeVw = `${letterSize}vw`;
  const totalSize = columns * letterSize;
  const totalSizeVw = `${totalSize}vw`;
  const word: string = chosenWord.toLowerCase();
  const selectedLetters: string[] = [];

  setTimeout(() => {
    WordInserter({ maximumLetters, columns, word });
  }, 1000);

  function GameWon() {
    onOpen();
  }

  function Reset() {
    setChosenWord("");
    setStarted(false);
  }

  return (
    <>
      <WinnerModal isOpen={isOpen} onClose={onClose} Reset={Reset} />
      <Heading margin="1rem 0" textAlign="center">
        Wordsearch Generator
      </Heading>
      <Box width="30vw" textAlign="center" margin="0 auto">
        <Text>Enter a word!</Text>
        <Box display="flex" gap="1rem" alignItems="center" margin="1rem">
          <Input
            placeholder="Enter a 6 letter word."
            size="lg"
            value={chosenWord}
            onChange={(e) => setChosenWord(e.target.value)}
            disabled={started}
          />
          <Button
            colorScheme="green"
            onClick={() => {
              setStarted(true);
            }}
            disabled={started || chosenWord.length > 6 || chosenWord.length < 3}
          >
            Start!
          </Button>
        </Box>
      </Box>
      <Box width="40vw" margin="0 auto"></Box>
      <Box
        width={totalSizeVw}
        height={totalSizeVw}
        background="background.primary"
        margin="1rem auto"
      >
        <Skeleton isLoaded={started} width={totalSizeVw} height={totalSizeVw}>
          <SimpleGrid columns={columns}>
            {[...Array(maximumLetters)].map((e, i) => (
              <Box
                key={i}
                id="letterSquare"
                className="letter-square-inactive"
                width={letterSizeVw}
                height={letterSizeVw}
                textAlign="center"
                lineHeight={letterSizeVw}
                fontSize="1.2rem"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains("letter-square-inactive")) {
                    target.classList.replace(
                      "letter-square-inactive",
                      "letter-square-active"
                    );
                    selectedLetters.push(target.innerHTML);
                    const selectedWord = selectedLetters.join("");
                    if (selectedWord === word) {
                      GameWon();
                    }
                  } else if (
                    target.classList.contains("letter-square-active")
                  ) {
                    target.classList.replace(
                      "letter-square-active",
                      "letter-square-inactive"
                    );
                    const index = selectedLetters.indexOf(target.innerHTML);
                    selectedLetters.splice(index, 1);
                    const selectedWord = selectedLetters.join("");
                    if (selectedWord === word) {
                      GameWon();
                    }
                  }
                }}
              >
                {LetterGenerator()}
              </Box>
            ))}
          </SimpleGrid>
        </Skeleton>
      </Box>
    </>
  );
}
export default App;
