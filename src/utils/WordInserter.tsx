export default function WordInserter(props: any) {
  const { maximumLetters, columns, word } = props;
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
    WordInserter({ maximumLetters, columns, word });
  }
}
