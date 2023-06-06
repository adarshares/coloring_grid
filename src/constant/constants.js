export const KEY_STATE = "KEY_STATE";
export const INITIAL_STATE = {
    selectedColor: "white",
    colorOfCells: Array(256).fill("white"),
    cellsColorHistory: [],
    cellsIndexHistory: [],
    cellsCurrentPointer: -1,
}