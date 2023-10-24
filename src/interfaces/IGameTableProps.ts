import { TGameState } from "../types/TGameState";
import { TGuesses } from "../types/TGuesses";

export interface IGameTableProps {
  gameState: TGameState;
  guesses: TGuesses;
  currentGuess: string;
}
