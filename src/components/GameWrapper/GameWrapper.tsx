import GameTable from "../GameTable/GameTable";
import Keyboard from "../Keyboard/Keyboard";
import { useEffect, useState } from "react";
import { TGuesses } from "../../types/TGuesses";
import { MAX_GUESS_COUNT, WORD } from "../../lib/constants";
import styles from "../../styles/gameWrapper.module.scss";
import { TGameState } from "../../types/TGameState";

function GameWrapper() {
  const [guesses, setGuesses] = useState<TGuesses>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<TGameState>("running");

  useEffect(() => {
    if (guesses.length === 0) return;

    const lastAddedIndex = guesses.length - 1;
    const lastAdded = guesses[lastAddedIndex];
    const newGameState: TGameState =
      lastAdded.word === WORD
        ? "won"
        : lastAddedIndex === MAX_GUESS_COUNT - 1
        ? "lost"
        : "running";
    setGameState(newGameState);
  }, [guesses]);

  return (
    <>
      <div className={styles["game-wrapper"]}>
        <GameTable
          gameState={gameState}
          guesses={guesses}
          currentGuess={currentGuess}
        />
        <Keyboard
          gameState={gameState}
          currentGuess={currentGuess}
          setGuesses={setGuesses}
          setCurrentGuess={setCurrentGuess}
        />
      </div>
    </>
  );
}

export default GameWrapper;
