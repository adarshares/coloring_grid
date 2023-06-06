import { State } from "./interfaces";

export const KEY_STATE:string = "KEY_STATE";
export const INITIAL_STATE:State = {
    selectedColor: "white",
    colorOfCells: Array(256).fill("white"),
    cellsColorHistory: [],
    cellsIndexHistory: [],
    cellsCurrentPointer: -1,
}