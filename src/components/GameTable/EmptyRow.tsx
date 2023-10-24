import { MAX_GUESS_LENGTH } from "../../lib/constants";
import styles from "../../styles/row.module.scss";

function EmptyRow() {
  const wordArr = new Array(MAX_GUESS_LENGTH).fill("");
  return (
    <>
      <div className={styles["x"]}>
        {wordArr.map((_, index) => {
          return <div key={index} className={styles["letter-wrapper"]}></div>;
        })}
      </div>
    </>
  );
}

export default EmptyRow;
