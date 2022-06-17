import clsx from "clsx";
import React from "react";
import { IBox } from "../types/board";

type IProps = IBox;

const Box: React.FC<IProps> = ({ value, state }) => {
  return (
    <div
      className={clsx(
        "rounded-lg flex justify-center items-center font-fa font-bold text-3xl w-16 h-16",
        state === "" && "bg-gray-100",
        state === "C" && "bg-lime-500",
        state === "W" && "bg-red-500 text-white",
        state === "WP" && "bg-yellow-400"
      )}
    >
      {value}
    </div>
  );
};

export default Box;
