import GameTable from "../GameTable/GameTable";
import Keyboard from "../Keyboard/Keyboard";
import { useState } from "react";
import { IGuessItem } from "../../interfaces/IGuessItem";
import { TGuesses } from "../../types/TGuesses";
import { MAX_GUESS_COUNT } from "../../lib/constants";
// keyboard does not need word data. but it should be able to set it.
//it needs data about placement

const guessesInitialState: TGuesses = new Array(MAX_GUESS_COUNT).fill({
  word: "",
  accuracy: [],
});

// gameboard needs words but does not set them. it produces data aobut placement
function GameWrapper() {
  const [guesses, setGuesses] = useState<TGuesses>([
    {
      accuracy: [0, 1, 0, 2, 1],
      word: "salam",
    },
    {
      accuracy: [0, 0, 1, 1, 2],
      word: "alooa",
    },
  ]);
  const [currentGuess, setCurrentGuess] = useState<string>("abcde");

  return (
    <>
      <GameTable guesses={guesses} currentGuess={currentGuess} />
      <Keyboard />
    </>
  );
}

export default GameWrapper;
