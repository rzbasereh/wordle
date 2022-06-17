import React, { useEffect, useState } from "react";
import words from "../constants/words";
import { IBoard, IBox } from "../types/board";
import { IKeyStates } from "../types/keyboard";
import Board from "./Board";
import Keyboard from "./Keyboard";

const ROW_NUM = 6;
const COL_NUM = 5;

const getState = (gameState: "win" | "lost" | "") => {
  switch (gameState) {
    case "win":
      return <div>🙌 باریکلا</div>;
    case "lost":
      return <div>😕 باختی که</div>;
    default:
      return <div></div>;
  }
};

let defaultBoard: IBoard = [];
for (let i = 0; i < ROW_NUM; i++) {
  defaultBoard.push([]);
  for (let j = 0; j < COL_NUM; j++) {
    defaultBoard[i].push({ value: "", state: "" });
  }
}

const correct = words[Math.floor(Math.random() * words.length)];

console.log("correct", correct);

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<"win" | "lost" | "">("");
  const [board, setBoard] = useState(defaultBoard);
  const [activeRow, setActiveRow] = useState(0);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [keysState, setKeysState] = useState<IKeyStates>({});

  const allowSubmit = activeBoxIndex === COL_NUM;

  useEffect(() => {
    if (activeRow === ROW_NUM && gameState === "") setGameState("lost");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRow]);

  const handleKeyboardClick = async (value: string) => {
    if (gameState) return;
    const newBoard = [...board];
    if (value === "Enter") {
      if (allowSubmit) {
        const newRow = checkLetters(newBoard[activeRow]);
        newBoard[activeRow] = newRow;
        await setActiveBoxIndex(0);
        await setActiveRow(activeRow + 1);
      }
    } else if (value === "Delete") {
      if (activeBoxIndex > 0) {
        newBoard[activeRow][activeBoxIndex - 1] = { value: "", state: "" };
        await setActiveBoxIndex(activeBoxIndex - 1);
      }
    } else {
      if (activeBoxIndex < COL_NUM) {
        newBoard[activeRow][activeBoxIndex] = { value, state: "" };
        await setActiveBoxIndex(activeBoxIndex + 1);
      }
    }
    setBoard(newBoard);
  };

  const checkLetters = (letters: IBox[]): IBox[] => {
    const modifiedLetters: IBox[] = [];
    let newKeysState = { ...keysState };
    const remainedWords = correct.split("");
    let winFlag = true;

    for (let i = 0; i < COL_NUM; i++) {
      const letter = letters[i];
      let state: IBox["state"] = "W";
      if (letter.value === correct[i]) {
        state = "C";
        newKeysState = { ...newKeysState, [letter.value]: "C" };
        remainedWords[i] = "";
      } else {
        winFlag = false;
      }
      modifiedLetters.push({ ...letter, state });
    }
    console.log("modifiedLetters", modifiedLetters);
    const finalLetters: IBox[] = [];
    for (let letter of modifiedLetters) {
      if (letter.state === "C") {
        finalLetters.push(letter);
        continue;
      }

      const remainedIndex = remainedWords.indexOf(letter.value);
      let state: IBox["state"] = "W";
      if (remainedIndex === -1) {
        newKeysState = { [letter.value]: "W", ...newKeysState };
      } else {
        state = "WP";
        newKeysState = { ...newKeysState, [letter.value]: "C" };
        remainedWords[remainedIndex] = "";
      }
      finalLetters.push({ ...letter, state });
    }
    setKeysState(newKeysState);
    if (winFlag) setGameState("win");

    return finalLetters;
  };

  return (
    <div>
      <Board board={board} />
      <div className="flex justify-center font-fa font-bold p-4">
        {getState(gameState)}
      </div>
      <Keyboard
        states={keysState}
        activeSubmit={allowSubmit}
        onClick={handleKeyboardClick}
      />
    </div>
  );
};

export default Game;
