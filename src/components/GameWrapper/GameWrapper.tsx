import GameTable from "../GameTable/GameTable";
import Keyboard from "../Keyboard/Keyboard";
import { useState } from "react";
import { TGuesses } from "../../types/TGuesses";
import { MAX_GUESS_COUNT } from "../../lib/constants";

const guessesInitialState: TGuesses = new Array(MAX_GUESS_COUNT).fill({
  word: "",
  accuracy: [],
});

function GameWrapper() {
  const [guesses, setGuesses] = useState<TGuesses>(guessesInitialState);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  // console.log(guesses);
  // console.log(currentGuess);

  return (
    <>
      <GameTable guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        currentGuess={currentGuess}
        setGuesses={setGuesses}
        setCurrentGuess={setCurrentGuess}
      />
    </>
  );
}

export default GameWrapper;
