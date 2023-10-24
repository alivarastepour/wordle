import { MAX_GUESS_COUNT } from "../../lib/constants";
import styles from "../../styles/gameTable.module.scss";
import { TGameState } from "../../types/TGameState";
import { TGuesses } from "../../types/TGuesses";
import EmptyRow from "./EmptyRow";
import FilledRow from "./FilledRow";
import FillingRow from "./FillingRow";
import { useMemo } from "react";
function GameTable({
  guesses,
  currentGuess,
  gameState,
}: {
  gameState: TGameState;
  guesses: TGuesses;
  currentGuess: string;
}) {
  const filledRows = useMemo(
    () => guesses.filter(({ word }) => !!word),
    [guesses]
  );

  const emptyRowBaseLength = MAX_GUESS_COUNT - filledRows.length - 1;
  const emptyRowsLength = emptyRowBaseLength >= 0 ? emptyRowBaseLength : 0;
  const emptyRows = new Array(emptyRowsLength).fill(null);

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
          {gameState === "running" && <FillingRow word={currentGuess} />}
        </div>
        <div className={`${"row-flex"} ${styles["empty-row-wrapper"]}`}>
          {emptyRows.map((_, index) => {
            return <EmptyRow key={index} />;
          })}
        </div>
        <div className={styles["game-state"]}>{gameState}</div>
      </div>
    </>
  );
}

export default GameTable;
