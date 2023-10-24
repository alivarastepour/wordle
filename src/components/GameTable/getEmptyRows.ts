import { MAX_GUESS_COUNT } from "../../lib/constants";

export function getEmptyRows(filledRowsLength: number) {
  const emptyRowBaseLength = MAX_GUESS_COUNT - filledRowsLength - 1;
  const emptyRowsLength = emptyRowBaseLength >= 0 ? emptyRowBaseLength : 0;
  const emptyRows = new Array(emptyRowsLength).fill(null);
  return emptyRows;
}
