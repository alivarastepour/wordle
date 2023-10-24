import { useMemo, useEffect } from "react";
import { MAX_GUESS_LENGTH } from "../../lib/constants";
import { IGuessItem } from "../../interfaces/IGuessItem";

import KeyboardPresenter from "./KeyboardPresenter";
import { determineAccuracy } from "./determinceAccuracy";
import { getKeyboardChars } from "./getKeyboardChars";
import { IKeyboardProps } from "../../interfaces/IKeyboardProps";

function Keyboard({
  currentGuess,
  setCurrentGuess,
  setGuesses,
  gameState,
}: IKeyboardProps) {
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

      function updateCurrent() {
        if (currentGuess.length === MAX_GUESS_LENGTH) return;

        setCurrentGuess((prev) => prev.concat(content));
      }

      function deleteLetter() {
        if (currentGuess.length === 0) return;

        setCurrentGuess((prev) => {
          const length = prev.length;
          const newCurrentGuess = prev.slice(0, length - 1);
          return newCurrentGuess;
        });
      }

      function addNewGuess() {
        if (currentGuess.length !== MAX_GUESS_LENGTH) return;

        const accuracy = determineAccuracy(currentGuess);
        const newGuess: IGuessItem = {
          accuracy,
          word: currentGuess,
        };

        setGuesses((prev) => prev.concat(newGuess));
        setCurrentGuess("");
      }

      switch (action) {
        case "letter":
          updateCurrent();
          break;
        case "del":
          deleteLetter();
          break;
        case "submit":
          addNewGuess();
          break;
      }
    }

    keyboardWrapper.addEventListener("click", handleKeyboardClick);

    return () => {
      if (!keyboardWrapper) return;
      keyboardWrapper.removeEventListener("click", handleKeyboardClick);
    };
  }, [currentGuess, gameState]);

  return <KeyboardPresenter letters={letters} />;
}

export default Keyboard;
