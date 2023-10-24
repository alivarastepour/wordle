import { TGameState } from "../types/TGameState";
import { TGuesses } from "../types/TGuesses";
import { TSetState } from "../types/TSetState";

export interface IKeyboardProps {
  gameState: TGameState;
  currentGuess: string;
  setGuesses: TSetState<TGuesses>;
  setCurrentGuess: TSetState<string>;
}
