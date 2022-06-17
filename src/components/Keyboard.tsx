import React from "react";
import Key from "./Key";
import { Delete as DeleteIcon, Check as CheckIcon } from "react-feather";
import { IKeyStates } from "../types/keyboard";

const kayLines = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ"], // line 1
  ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ"], // line 2
  ["ظ", "ط", "ژ", "ز", "ر", "ذ", "د", "پ", "و"], // line 3
];

interface IProps {
  states: IKeyStates;
  onClick?: (value: string) => void;
  activeSubmit?: boolean;
}

const Keyboard: React.FC<IProps> = ({ states, onClick, activeSubmit }) => {
  return (
    <div className="flex justify-center ">
      <div className="rounded-lg flex flex-col gap-2 bg-slate-300 p-2">
        {kayLines.map((kayLine, index) => (
          <div className="flex justify-center gap-2">
            {index === 2 && (
              <Key size="lg" onClick={() => (onClick ? onClick("Delete") : {})}>
                <DeleteIcon
                  size={20}
                  style={{ transform: "rotateY(180deg)" }}
                />
              </Key>
            )}
            {kayLine.map((key) => (
              <Key
                state={states[key]}
                onClick={() => (onClick ? onClick(key) : {})}
              >
                {key}
              </Key>
            ))}
            {index === 2 && (
              <Key
                size="lg"
                color="blue"
                disabled={!activeSubmit}
                onClick={() => (onClick ? onClick("Enter") : {})}
              >
                <CheckIcon size={20} />
              </Key>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
