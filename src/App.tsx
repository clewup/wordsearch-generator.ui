import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Text,
  Input,
  Wrap,
  WrapItem,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Button,
} from "@chakra-ui/react";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [chosenWord, setChosenWord] = useState("");

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

  const WordGenerator = () => {};
  WordGenerator();
  return (
    <>
      <Heading margin="1rem 0" textAlign="center">
        Wordsearch Generator
      </Heading>
      <Box width="30vw" textAlign="center" margin="0 auto">
        <Text>Enter a word!</Text>
        <Box display="flex" gap="1rem" alignItems="center" margin="1rem">
          <Input
            placeholder=""
            size="lg"
            value={chosenWord}
            onChange={(e) => setChosenWord(e.target.value)}
          />
          <Button colorScheme="green">Add!</Button>
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
        <Skeleton isLoaded={loaded} width={totalSizeVw} height={totalSizeVw}>
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
