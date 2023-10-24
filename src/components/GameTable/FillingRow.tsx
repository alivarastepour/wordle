import { MAX_GUESS_LENGTH } from "../../lib/constants";
import styles from "../../styles/row.module.scss";

function FillingRow({ word }: { word: string }) {
  const wordArr = new Array(MAX_GUESS_LENGTH).fill(null);
  return (
    <>
      <div className={styles["x"]}>
        {wordArr.map((_, index) => {
          const char = word[index];
          return (
            <div key={`${char}-${index}`} className={styles["letter-wrapper"]}>
              {char}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FillingRow;
