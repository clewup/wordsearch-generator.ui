import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Text,
  Input,
  Heading,
  SimpleGrid,
  Skeleton,
  Button,
} from "@chakra-ui/react";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [started, setStarted] = useState(false);

  const maximumLetters = 169; // has to return a solid number on square root.
  const columns = Math.sqrt(maximumLetters);
  const letterSize = 4;
  const letterSizeVw = `${letterSize}vw`;
  const totalSize = columns * letterSize;
  const totalSizeVw = `${totalSize}vw`;

  const LetterGenerator = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    const randomLetter = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    return randomLetter;
  };

  const word: string = chosenWord;

  const WordGenerator = () => {
    const letterSquares = document.querySelectorAll(
      "div#letterSquare"
    ) as NodeListOf<Element>;
    const letterSquaresArray = Array.prototype.slice.call(letterSquares);

    const random = Math.floor(Math.random() * maximumLetters);
    let selection = random;
    const finalSelection = selection - columns * word.length;

    if (finalSelection >= 0) {
      for (let i = 0; i < word.length; i++) {
        const selectedSquare = letterSquaresArray[selection];
        //selectedSquare.style.backgroundColor = "red";
        selectedSquare.innerHTML = word.charAt(i);
        selection = selection - columns;
      }
    } else {
      WordGenerator();
    }
  };

  setTimeout(() => {
    WordGenerator();
  }, 1000);

  return (
    <>
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
            disabled={started || chosenWord.length > 6}
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
        border="1px solid black"
      >
        <Skeleton isLoaded={started} width={totalSizeVw} height={totalSizeVw}>
          <SimpleGrid columns={columns}>
            {[...Array(maximumLetters)].map((e, i) => (
              <Box
                key={i}
                id="letterSquare"
                width={letterSizeVw}
                height={letterSizeVw}
                textAlign="center"
                lineHeight={letterSizeVw}
                fontSize="1.2rem"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.style.backgroundColor !== "black") {
                    target.style.backgroundColor = "black";
                    target.style.color = "white";
                  } else if (target.style.backgroundColor === "black") {
                    target.style.backgroundColor = "#f7fafc";
                    target.style.color = "black";
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
