import {IPoint, Shape} from "@/core/types";
import {getRandom} from "@/core/util";
import SquareGroup from "@/core/SquareGroup";

export class TShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: 0}], _centerPoint, _color);
    }
}

export class LineShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], _centerPoint, _color);
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}

export class SShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], _centerPoint, _color);
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}

export class SMirrorShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}], _centerPoint, _color);
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class LShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([ {x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}], _centerPoint, _color);
    }
}
export class LMirrorShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([ {x: -1, y: -1},{x: 0, y: 0},  {x: -1, y: 0}, {x: 1, y: 0}], _centerPoint, _color);
    }
}
export class SquareShape extends SquareGroup{
    constructor(
        _centerPoint: IPoint,
        _color: string
    ) {
        super([{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}], _centerPoint, _color);
    }

    afterRotate(): Shape {
        return this.shape;
    }
}


const shapes = [
    TShape,
    LineShape,
    LShape,
    LMirrorShape,
    SquareShape,
    SShape,
    SMirrorShape
]

const colors = [
    'blue',
    'green',
    'yellow',
    'red',
]

export function createTetris(centerPoint: IPoint) {
    let index;
    index = getRandom(0, shapes.length)
    const shape = shapes[index]
    index = getRandom(0, colors.length)
    const color = colors[index]
    return new shape(centerPoint, color)
}