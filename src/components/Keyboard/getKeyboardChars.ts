export function getKeyboardChars() {
  //consider qwerty style
  return [...Array(26).keys()]
    .map((i) => i + 65)
    .map((i) => String.fromCharCode(i))
    .concat(...["backspace", "enter"]);
}
