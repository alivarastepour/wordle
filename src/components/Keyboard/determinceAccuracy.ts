import { WORD } from "../../lib/constants";

// function getDic() {
//   const map: { [index: string]: number } = {};
//   for (const letter of WORD) {
//     const val = map[letter];
//     map[letter] = val ? val + 1 : 1;
//   }
//   return map;
// }

export function determineAccuracy(word: string) {
  // consider: should work with repeating letters
  const res = [];
  // const a = getDic();
  // console.log(a);

  for (let index = 0; index < word.length; index++) {
    const current = word[index];

    const rightPlace = current === WORD[index];
    if (rightPlace) {
      res.push(2);
      continue;
    }

    const wrongPlace = WORD.includes(current);
    if (wrongPlace) {
      res.push(1);
      continue;
    }

    res.push(0);
  }

  return res;
}
