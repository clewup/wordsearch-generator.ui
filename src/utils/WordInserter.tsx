export default function WordInserter(props: any) {
  const { maximumLetters, columns, word } = props;
  const letterSquares = document.querySelectorAll(
    "div#letterSquare"
  ) as NodeListOf<Element>;
  const letterSquaresArray = Array.prototype.slice.call(letterSquares);
  let selection = Math.floor(Math.random() * maximumLetters);

  const gameFunctions = ["UPWARDS", "DOWNWARDS", "RIGHT", "LEFT"];

  function RandomGameFunction() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Can be adjusted to change frequency of functions
    if (randomNumber > 0 && randomNumber <= 10) {
      Upwards();
    }
    if (randomNumber > 10 && randomNumber <= 20) {
      Downwards();
    }
    if (randomNumber > 20 && randomNumber <= 60) {
      Right();
    }
    if (randomNumber > 60 && randomNumber <= 100) {
      Left();
    }
  }

  RandomGameFunction();

  function Upwards() {
    const finalSelection = selection - columns * word.length;

    if (finalSelection >= 0) {
      for (let i = 0; i < word.length; i++) {
        const selectedSquare = letterSquaresArray[selection];
        //selectedSquare.style.backgroundColor = "red";
        selectedSquare.innerHTML = word.charAt(i);
        selection = selection - columns;
      }
    } else {
      WordInserter({ maximumLetters, columns, word });
    }
  }

  function Downwards() {
    const finalSelection = selection + columns * word.length;

    if (finalSelection <= maximumLetters) {
      for (let i = 0; i < word.length; i++) {
        const selectedSquare = letterSquaresArray[selection];
        //selectedSquare.style.backgroundColor = "red";
        selectedSquare.innerHTML = word.charAt(i);
        selection = selection + columns;
      }
    } else {
      WordInserter({ maximumLetters, columns, word });
    }
  }

  function Right() {
    const finalSelection = selection + word.length;

    if (finalSelection % columns === 0 && finalSelection <= maximumLetters) {
      selection =
        selection -
        (Math.floor(Math.random() * (columns - word.length + 1)) + 0); // Randomises the initial point within the boundaries of the row
      for (let i = 0; i < word.length; i++) {
        const selectedSquare = letterSquaresArray[selection];
        //selectedSquare.style.backgroundColor = "red";
        selectedSquare.innerHTML = word.charAt(i);
        selection = selection + 1;
      }
    } else {
      WordInserter({ maximumLetters, columns, word });
    }
  }

  function Left() {
    const finalSelection = selection - word.length;

    if (selection % columns === 0 && finalSelection >= 0) {
      selection =
        selection -
        (Math.floor(Math.random() * (columns - word.length + 1)) + 1); // Randomises the initial point within the boundaries of the row
      for (let i = 0; i < word.length; i++) {
        const selectedSquare = letterSquaresArray[selection];
        //selectedSquare.style.backgroundColor = "red";
        selectedSquare.innerHTML = word.charAt(i);
        selection = selection - 1;
      }
    } else {
      WordInserter({ maximumLetters, columns, word });
    }
  }

  // function DiagonalUpwardsRight() {
  //   const finalSelection =
  //     selection - (word.length * columns + 1 + (word.length - 1));

  //   if (selection % columns === 0 && finalSelection >= 0) {
  //     // selection =
  //     //   selection -
  //     //   (Math.floor(Math.random() * (columns - word.length + 1)) + 1); // Randomises the initial point within the boundaries of the row
  //     for (let i = 0; i < word.length; i++) {
  //       const selectedSquare = letterSquaresArray[selection];
  //       selectedSquare.style.backgroundColor = "red";
  //       selectedSquare.innerHTML = word.charAt(i);
  //       selection = selection - (columns - 1);
  //     }
  //   } else {
  //     WordInserter({ maximumLetters, columns, word });
  //   }
  // }
}
