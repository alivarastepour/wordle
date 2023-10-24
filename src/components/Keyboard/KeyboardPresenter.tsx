import { IKeyboardPresenterProps } from "../../interfaces/IKeyboardPresenterProps";
import styles from "../../styles/keyboard.module.scss";

function KeyboardPresenter({ letters }: IKeyboardPresenterProps) {
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

export default KeyboardPresenter;
