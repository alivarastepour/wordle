import { WORD } from "../../lib/constants";

export function determineAccuracy(word: string) {
  const res = [];
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
