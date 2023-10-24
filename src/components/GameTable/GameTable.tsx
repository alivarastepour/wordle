import { IGameTableProps } from "../../interfaces/IGameTableProps";
import styles from "../../styles/gameTable.module.scss";
import EmptyRow from "./Rows/EmptyRow";
import FilledRow from "./Rows/FilledRow";
import FillingRow from "./Rows/FillingRow";
import { useMemo } from "react";
import { getFilledRows } from "./getFilledRows";
import { getEmptyRows } from "./getEmptyRows";

function GameTable({ guesses, currentGuess, gameState }: IGameTableProps) {
  const filledRows = useMemo(() => getFilledRows(guesses), [guesses]);
  const emptyRows = useMemo(
    () => getEmptyRows(filledRows.length),
    [filledRows]
  );

  return (
    <>
      <div className={styles["game-table-wrapper"]}>
        <div className={`${"row-flex"} ${styles["filled-row-wrapper"]}`}>
          {guesses
            .filter(({ word }) => !!word)
            .map((item, index) => {
              return <FilledRow key={`${item.word}-${index}`} info={item} />;
            })}
        </div>
        <div className={`${"row-flex"} ${styles["filling-row-wrapper"]}`}>
          <FillingRow word={currentGuess} />
        </div>
        <div className={`${"row-flex"} ${styles["empty-row-wrapper"]}`}>
          {emptyRows.map((_, index) => {
            return <EmptyRow key={index} />;
          })}
        </div>
        <div className={styles["game-state"]}>
          {gameState !== "running" && gameState}
        </div>
      </div>
    </>
  );
}

export default GameTable;
