export interface IBox {
  value: string;
  state:
    | "C" // Correct
    | "W" // Wrong
    | "WP" // Wrong Place
    | ""; // Default;
}

export type IBoard = IBox[][];
