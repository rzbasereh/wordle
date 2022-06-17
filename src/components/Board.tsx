import React from "react";
import { IBoard } from "../types/board";
import Box from "./Box";

interface IProps {
  board: IBoard;
}

const Board: React.FC<IProps> = ({ board }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex flex-col gap-2">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row
              .slice(0)
              .reverse()
              .map((box, boxIdx) => (
                <Box key={boxIdx} {...box} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
