import clsx from "clsx";
import React from "react";
import { IKeyState } from "../types/keyboard";

interface IProps {
  children: React.ReactNode;
  size?: "lg";
  color?: "blue";
  state?: IKeyState;
  onClick?: () => void;
  disabled?: boolean;
}

const Key: React.FC<IProps> = ({
  children,
  size,
  color,
  state,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={clsx(
        "font-fa rounded-lg flex justify-center items-center cursor-pointer shadow h-12",
        size === "lg" ? "w-14" : "w-8",
        color === "blue"
          ? disabled
            ? "text-white bg-blue-500 opacity-50 pointer-events-none"
            : "text-white bg-blue-500 hover:bg-blue-600"
          : state === "W"
          ? "bg-red-500 text-white"
          : state === "C"
          ? "bg-yellow-100 hover:opacity-80 border-2 border-slate-400 active:shadow-none"
          : "bg-slate-100 hover:bg-slate-200 active:shadow-none"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Key;
