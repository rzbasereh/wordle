import React, { useState } from "react";
import { IBoard } from "../types/board";
import Box from "./Box";

const ROW_NUM = 6;
const COL_NUM = 5;

let defaultBoard: IBoard = [];

for (let i = 0; i < ROW_NUM; i++) {
  defaultBoard.push([]);
  for (let j = 0; j < COL_NUM; j++) {
    defaultBoard[i].push({ value: "", state: "" });
  }
}

interface IProps {
  board: IBoard;
}

const Board: React.FC<IProps> = ({ board }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex flex-col gap-2">
        {board.map((row, rowIdx) => (
          <div className="flex gap-2">
            {row
              .slice(0)
              .reverse()
              .map((box, boxIdx) => (
                <Box {...box} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
