import {IPoint, MoveDirection, Shape} from "@/core/types";
import gameConfig from "@/core/gameConfig";
import SquareGroup from "@/core/SquareGroup";

function isPoint(obj: any): obj is IPoint {
    return obj.x !== undefined;
}

export class TetrisRules {
    static canIMove(shape: Shape, targetPoint: IPoint): boolean {
        const targetSquarePoints: IPoint[] = shape.map(i => ({
            x: i.x + targetPoint.x,
            y: i.y + targetPoint.y
        }))

        const result = targetSquarePoints.some(i => {
            return i.x < 0 || i.x > gameConfig.panelSize.width - 1 || i.y < 0 || i.y > gameConfig.panelSize.height - 1
        })
        return !result;

    }

    static move(tetris: SquareGroup, targetPointOrDirection: IPoint): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: MoveDirection): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(tetris.shape, targetPointOrDirection)) {
                tetris.centerPoint = targetPointOrDirection
                return true;
            }
            return false;
        } else {
            if (targetPointOrDirection === MoveDirection.left) {
                const targetPoint = {
                    x: tetris.centerPoint.x - 1,
                    y: tetris.centerPoint.y
                }
                return this.move(tetris, targetPoint)
            } else if (targetPointOrDirection === MoveDirection.right) {
                const targetPoint = {
                    x: tetris.centerPoint.x + 1,
                    y: tetris.centerPoint.y
                }
                return this.move(tetris, targetPoint)
            } else if (targetPointOrDirection === MoveDirection.down) {
                const targetPoint = {
                    x: tetris.centerPoint.x,
                    y: tetris.centerPoint.y + 1
                }
                return this.move(tetris, targetPoint)
            } else {
                return false
            }
        }
    };


    static moveDirectly(tetris: SquareGroup, direction: MoveDirection) {
        while (this.move(tetris, direction)) {
        }
    }

    static rotate(tetris:SquareGroup):boolean{
        const rotateShape = tetris.afterRotate()
        if(this.canIMove(rotateShape, tetris.centerPoint)){
            tetris.rotate()
            return true;
        }else {
            return false
        }
    }
}