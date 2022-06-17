export type IKeyState =
  | "W" // Wrong
  | "C"; // Contain

export type IKeyStates = { [key: string]: IKeyState };
