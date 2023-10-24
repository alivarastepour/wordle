import { useMemo, useEffect } from "react";
import styles from "../../styles/keyboard.module.scss";
import { TSetState } from "../../types/TSetState";
import { MAX_GUESS_LENGTH, WORD } from "../../lib/constants";
import { IGuessItem } from "../../interfaces/IGuessItem";
import { TGuesses } from "../../types/TGuesses";
import { TGameState } from "../../types/TGameState";

function determineAccuracy(word: string) {
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

function getKeyboardChars() {
  //consider qwerty style
  return [...Array(26).keys()]
    .map((i) => i + 65)
    .map((i) => String.fromCharCode(i))
    .concat(...["backspace", "enter"]);
}

function Keyboard({
  currentGuess,
  setCurrentGuess,
  setGuesses,
  gameState,
}: {
  gameState: TGameState;
  currentGuess: string;
  setGuesses: TSetState<TGuesses>;
  setCurrentGuess: TSetState<string>;
}) {
  const letters = useMemo(getKeyboardChars, []);

  useEffect(() => {
    const keyboardWrapper = document.getElementById("keyboard-wrapper");
    if (!keyboardWrapper) return;

    function handleKeyboardClick(e: MouseEvent) {
      if (gameState !== "running") return;

      const target = e.target;
      const container = e.currentTarget;
      if (Object.is(target, container)) return;

      const element = target as HTMLElement;
      const action = element.dataset.action;
      const content = element.innerText;

      switch (action) {
        case "letter":
          if (currentGuess.length === MAX_GUESS_LENGTH) break;

          setCurrentGuess((prev) => prev.concat(content));
          break;
        case "del":
          if (currentGuess.length === 0) break;

          setCurrentGuess((prev) => {
            const length = prev.length;
            const newCurrentGuess = prev.slice(0, length - 1);
            return newCurrentGuess;
          });
          break;
        case "submit":
          if (currentGuess.length !== MAX_GUESS_LENGTH) break;

          const accuracy = determineAccuracy(currentGuess);
          const newGuess: IGuessItem = {
            accuracy,
            word: currentGuess,
          };

          setGuesses((prev) => prev.concat(newGuess));
          setCurrentGuess("");
          break;
      }
    }

    keyboardWrapper.addEventListener("click", handleKeyboardClick);

    return () => {
      if (!keyboardWrapper) return;
      keyboardWrapper.removeEventListener("click", handleKeyboardClick);
    };
  }, [currentGuess, gameState]);

  return (
    <>
      <div id="keyboard-wrapper" className={styles["keyboard-wrapper"]}>
        {letters.map((letter) => {
          const action =
            letter === "backspace"
              ? "del"
              : letter === "enter"
              ? "submit"
              : "letter";
          return (
            <div
              data-action={action}
              className={`${styles[letter]} ${styles["keyboard-letter"]}`}
              key={letter}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Keyboard;
