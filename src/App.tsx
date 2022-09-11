import React, { useState } from "react";
import "./App.css";
import LetterGenerator from "./utils/LetterGenerator";
import WordInserter from "./utils/WordInserter";
import {
  Box,
  Input,
  Heading,
  SimpleGrid,
  Skeleton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import WinnerModal from "./components/WinnerModal";
import Timer from "./components/Timer";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timed, setTimed] = useState(false);
  const [easy, setEasy] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function containsNumbers(str: string) {
    return str.match(/^[^a-zA-Z]+$/) ? true : false;
  }
  const isError = containsNumbers(chosenWord);

  let maximumLetters = 100; // has to return a solid number on square root.
  if (easy) maximumLetters = 49;
  const columns = Math.sqrt(maximumLetters);
  const letterSize = 4;
  const letterSizeVw = `${letterSize}vw`;
  const totalSize = columns * letterSize;
  const totalSizeVw = `${totalSize}vw`;
  const word: string = chosenWord.toLowerCase();
  const selectedLetters: string[] = [];

  setTimeout(() => {
    WordInserter({ maximumLetters, columns, word });
  }, 100);

  function GameWon() {
    onOpen();
    setFinished(true);
  }

  function Reset() {
    setChosenWord("");
    setTimed(false);
    setFinished(false);
    setStarted(false);
  }

  return (
    <div className="app">
      <WinnerModal isOpen={isOpen} onClose={onClose} Reset={Reset} />

      <Box width="30vw" textAlign="center" margin="0 auto" height="20vh">
        <Heading textAlign="center" color="white">
          Wordsearch Generator
        </Heading>
        <FormControl
          isInvalid={isError}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          margin="0"
          padding="0"
        >
          <Box display="flex" gap="1rem" alignItems="center" marginTop="1rem">
            <Input
              placeholder="Enter a 6 letter word."
              size="lg"
              value={chosenWord}
              onChange={(e) => setChosenWord(e.target.value)}
              disabled={started}
              variant="solid"
            />

            <Button
              colorScheme="green"
              onClick={() => {
                setStarted(true);
              }}
              disabled={
                started ||
                chosenWord.length > 6 ||
                chosenWord.length < 3 ||
                isError
              }
            >
              Start!
            </Button>
          </Box>
          <Box display="flex" gap="2rem" margin="1rem 0">
            {!started ? (
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="timed" mb="0" color="white">
                  Timed?
                </FormLabel>
                <Switch
                  id="timed"
                  onChange={() => {
                    if (timed === true) {
                      setTimed(false);
                    } else {
                      setTimed(true);
                    }
                  }}
                />
              </FormControl>
            ) : timed ? (
              <Timer
                started={started}
                finished={finished}
                setFinished={setFinished}
                Reset={Reset}
              />
            ) : (
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="timed" mb="0" color="white">
                  Timed?
                </FormLabel>
                <Switch id="timed" isDisabled={true} />
              </FormControl>
            )}
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="easy" mb="0" color="white">
                Easy?
              </FormLabel>
              <Switch
                id="easy"
                isDisabled={started}
                onChange={() => {
                  if (easy === true) {
                    setEasy(false);
                  } else {
                    setEasy(true);
                  }
                }}
              />
            </FormControl>
          </Box>
        </FormControl>
      </Box>
      <Box width="40vw" margin="0 auto"></Box>
      <Box
        width={totalSizeVw}
        height={totalSizeVw}
        background="background.primary"
        margin="1rem auto"
      >
        <Skeleton
          isLoaded={started && !finished}
          width={totalSizeVw}
          height={totalSizeVw}
          fadeDuration={1}
          speed={2}
        >
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
    </div>
  );
}
export default App;
