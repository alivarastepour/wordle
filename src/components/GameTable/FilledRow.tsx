import { IGuessItem } from "../../interfaces/IGuessItem";
import styles from "../../styles/row.module.scss";
import filledStyles from "../../styles/filledRow.module.scss";

function FilledRow({ info }: { info: IGuessItem }) {
  const wordArr = Array.from(info.word);
  return (
    <>
      <div className={styles["x"]}>
        {wordArr.map((char, index) => {
          const acc = info.accuracy[index];
          const state =
            acc === 0
              ? "wrong-letter"
              : acc === 1
              ? "wrong-place"
              : "right-place";
          return (
            <div
              key={`${char}-${index}`}
              className={`${filledStyles[state]} ${styles["letter-wrapper"]}`}
            >
              {char}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FilledRow;
