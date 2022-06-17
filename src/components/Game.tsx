import React, { useState } from "react";
import { IBoard } from "../types/board";
import { IKeyStates } from "../types/keyboard";
import Board from "./Board";
import Keyboard from "./Keyboard";

const ROW_NUM = 6;
const COL_NUM = 5;

let defaultBoard: IBoard = [];

for (let i = 0; i < ROW_NUM; i++) {
  defaultBoard.push([]);
  for (let j = 0; j < COL_NUM; j++) {
    defaultBoard[i].push({ value: "", state: "" });
  }
}

const Game: React.FC = () => {
  const [board, setBoard] = useState(defaultBoard);
  const [activeRow, setActiveRow] = useState(0);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [keysState, setKeysState] = useState<IKeyStates>({});

  const handleKeyboardClick = async (value: string) => {
    const newBoard = [...board];
    if (value === "Enter") {
      //
    } else if (value === "Delete") {
      newBoard[activeRow][activeBoxIndex - 1] = { value: "", state: "" };
      await setActiveBoxIndex(activeBoxIndex - 1);
    } else {
      if (activeBoxIndex < COL_NUM) {
        newBoard[activeRow][activeBoxIndex] = { value, state: "" };
        await setActiveBoxIndex(activeBoxIndex + 1);
      }
    }
    setBoard(newBoard);
  };

  return (
    <div>
      <Board board={board} />
      <Keyboard states={keysState} onClick={handleKeyboardClick} />
    </div>
  );
};

export default Game;
