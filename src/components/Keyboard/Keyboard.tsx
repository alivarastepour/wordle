import { useMemo, useEffect } from "react";
import styles from "../../styles/keyboard.module.scss";

function getKeyboardChars() {
  //consider qwerty style
  return [...Array(26).keys()]
    .map((i) => i + 65)
    .map((i) => String.fromCharCode(i))
    .concat(...["backspace", "enter"]);
}

function Keyboard() {
  const letters = useMemo(getKeyboardChars, []);

  useEffect(() => {
    const keyboardWrapper = document.getElementById("keyboard-wrapper");
    if (!keyboardWrapper) return;

    function handleKeyboardClick(e: MouseEvent) {
      const target = e.target;
      const container = e.currentTarget;
      if (Object.is(target, container)) return;

      console.log((target as Element).innerHTML);
    }

    keyboardWrapper.addEventListener("click", handleKeyboardClick);

    return () => {
      if (!keyboardWrapper) return;
      keyboardWrapper.removeEventListener("click", handleKeyboardClick);
    };
  }, []);

  return (
    <>
      <div id="keyboard-wrapper" className={styles["keyboard-wrapper"]}>
        {letters.map((letter) => {
          return (
            <div
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
