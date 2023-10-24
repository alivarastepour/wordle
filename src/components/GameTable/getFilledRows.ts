import { TGuesses } from "../../types/TGuesses";

export function getFilledRows(guesses: TGuesses) {
  return guesses.filter(({ word }) => !!word);
}
