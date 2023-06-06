import { ColorChangeHandler } from "react-color";

export interface State{
    selectedColor: string,
    colorOfCells: Array<string>,
    cellsColorHistory: Array<string>,
    cellsIndexHistory: Array<number>,
    cellsCurrentPointer: number,

}

//CHANGE_CELL_COLOR, UNDO, REDO, RESET, COLOR_PICK
export const ACTION_TYPES = {
    'CHANGE_CELL_COLOR': 'CHANGE_CELL_COLOR',
    'UNDO': 'UNDO',
    'REDO': 'REDO',
    'RESET': 'RESET',
    'COLOR_PICK': 'COLOR_PICK',
}

type ValueOf<Type> = Type[keyof Type];


export interface Action{
    type: ValueOf<typeof ACTION_TYPES>,
    id?:number,
    colorName?:string,
}


export interface ColorPickerProps{
    onChange:ColorChangeHandler,
}

export interface BoxProps{
    id:number,
    boxColor:string,
    selectedColor:string,
    onClick:Function,
}

export interface ColorFromPalette{
    hex:string,
}
