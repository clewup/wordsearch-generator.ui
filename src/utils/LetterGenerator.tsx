export default function LetterGenerator() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  const randomLetter = characters.charAt(
    Math.floor(Math.random() * charactersLength)
  );
  return randomLetter;
}
