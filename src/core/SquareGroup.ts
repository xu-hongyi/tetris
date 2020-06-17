import {IPoint, Shape} from "@/core/types";
import {Square} from "@/core/Square";

/*
* 小方块组合类
* */
export default class SquareGroup {

    private readonly _squares: ReadonlyArray<Square> = [];

    get shape() {
        return this._shape;
    }

    get squares() {
        return this._squares
    }

    get centerPoint() {
        return this._centerPoint
    }

    set centerPoint(v) {
        this._centerPoint = v
        this.setSquares()
    }

    private setSquares(){
        this._shape.forEach((s, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + s.x,
                y: this._centerPoint.y + s.y
            }
        })
    }
    constructor(
        private _shape: Shape,
        private _centerPoint: IPoint,
        private _color: string
    ) {
        const arr: Square[] = [];
        this._shape.forEach(() => {
            const sq = new Square();
            sq.color = this._color;
            arr.push(sq)
        })
        this._squares = arr;
        this.setSquares()
    }

    protected isClock = true;

    afterRotate(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                return {
                    x: -p.y,
                    y: +p.x
                }
            })
        } else {
            return this._shape.map(p => {
                return {
                    x: +p.y,
                    y: -p.x
                }
            })
        }
    }

    rotate(){
        this._shape = this.afterRotate()
        this.setSquares()
    }
}