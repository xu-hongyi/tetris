import SquareGroup from "@/core/SquareGroup";

export interface IPoint {
    readonly x:number
    readonly y:number
}

export interface IViewer {
    //控制小方块显示
    show():void
    //移除小方块
    remove():void
}

export type Shape = IPoint[]

export enum MoveDirection {
    left,
    right,
    down
}

export enum GameStatus {
    init,
    playing,
    pause,
    over
}

export interface GameViewer {
    showNext(tetris:SquareGroup):void

    switch(tetris:SquareGroup):void
}

