import {IPoint, MoveDirection, Shape} from "@/core/types";
import gameConfig from "@/core/gameConfig";
import SquareGroup from "@/core/SquareGroup";
import {Square} from "@/core/Square";

function isPoint(obj: any): obj is IPoint {
    return obj.x !== undefined;
}

export class TetrisRules {
    static canIMove(shape: Shape, targetPoint: IPoint, exists: Square[]): boolean {
        const targetSquarePoints: IPoint[] = shape.map(i => ({
            x: i.x + targetPoint.x,
            y: i.y + targetPoint.y
        }))

        return !targetSquarePoints.some(i => {
            return i.x < 0 || i.x > gameConfig.panelSize.width - 1 || i.y < 0 || i.y > gameConfig.panelSize.height - 1
        }) && !targetSquarePoints.some(p => exists.some(s => p.x === s.point.x && p.y === s.point.y))
    }

    static move(tetris: SquareGroup, targetPointOrDirection: IPoint, exists: Square[]): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: MoveDirection, exists: Square[]): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection, exists: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(tetris.shape, targetPointOrDirection, exists)) {
                tetris.centerPoint = targetPointOrDirection
                return true;
            }
            return false;
        } else {
            let targetPoint: IPoint;
            if (targetPointOrDirection === MoveDirection.left) {
                targetPoint = {
                    x: tetris.centerPoint.x - 1,
                    y: tetris.centerPoint.y
                }
            } else if (targetPointOrDirection === MoveDirection.right) {
                targetPoint = {
                    x: tetris.centerPoint.x + 1,
                    y: tetris.centerPoint.y
                }
            } else {
                targetPoint = {
                    x: tetris.centerPoint.x,
                    y: tetris.centerPoint.y + 1
                }
            }
            return this.move(tetris, targetPoint, exists)
        }
    };

    static moveDirectly(tetris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean {
        while (this.move(tetris, direction, exists)) {
        }
        return false
    }

    static rotate(tetris: SquareGroup, exists: Square[]): boolean {
        const rotateShape = tetris.afterRotate()
        if (this.canIMove(rotateShape, tetris.centerPoint, exists)) {
            tetris.rotate()
            return true;
        } else {
            return false
        }
    }

    static removeLine(exists:Square[]):number{
        const ys = exists.map(i => i.point.y)
        const minY = Math.min(...ys)
        const maxY = Math.max(...ys)
        let num = 0
        for (let i = minY;i <= maxY; i++){
            const result = this.deleteLine(exists, i)
            if(result){
                num ++
            }
        }
        return num
    }

    static deleteLine(exists:Square[], y:number):boolean{
        const sqs = exists.filter(sq => sq.point.y === y)
        if(sqs.length === gameConfig.panelSize.width){
            sqs.forEach(sq => {
                sq.viewer?.remove()
                const index = exists.indexOf(sq)
                exists.splice(index, 1)
            })
            exists.filter(sq => sq.point.y < y).forEach(sq => sq.point = {
                x:sq.point.x,
                y:sq.point.y + 1
            })
            return true
        }
        return false
    }
}