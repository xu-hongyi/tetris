import {GameStatus, GameViewer, MoveDirection} from "@/core/types";
import SquareGroup from "@/core/SquareGroup";
import {createTetris} from "@/core/Tetris";
import {TetrisRules} from "@/core/TetrisRule";
import gameConfig from "@/core/gameConfig";
import {Square} from "@/core/Square";

export class Game {
    //游戏状态
    private _gameStatus: GameStatus = GameStatus.init
    //下一个方块类型
    private _nextTetris: SquareGroup
    //计时器，控制方块下落
    private _timer?: number
    //控制方块下落时间
    private _duration: number
    //当前控制的小方块
    private _curTetris?: SquareGroup
    //存储下落后存在的方块
    private _existArr: Square[] = []
    private _score: number = 0

    constructor(
        private _viewer: GameViewer
    ) {
        this._nextTetris = createTetris({x: 0, y: 0})
        this.showNext()
        this._duration = gameConfig.levels[0].duration
        this._viewer.showScore(this._score)
        this._viewer.init(this)
    }

    //初始化游戏
    init() {
        this._existArr.forEach(s => {
            s.viewer?.remove()
        })
        this._existArr = []
        this._gameStatus = GameStatus.init
        this._curTetris = undefined
        this.showNext()
        this._score = 0
        this._viewer.showScore(this._score)
    }
    get gameStatus(){
        return this._gameStatus
    }
    private showNext() {
        this._nextTetris = createTetris({x: 0, y: 0})
        this._viewer.showNext(this._nextTetris)
        this.resetCenterPoint(gameConfig.nextSize.width, this._nextTetris)
    }

    //游戏开始
    start() {
        if (this._gameStatus === GameStatus.playing) return;
        if (this._gameStatus === GameStatus.over) {
            this.init()
        }
        this._gameStatus = GameStatus.playing
        if (!this._curTetris) {
            this.switchTetris()
        }
        this.autoDrop()
        this._viewer.onGameStart()
    }

    //控制方块自由下落
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return;
        this._timer = setInterval(() => {
            if (this._curTetris) {
                if (!TetrisRules.move(this._curTetris, MoveDirection.down, this._existArr)) {
                    this.hitBottom()
                }
            }
        }, this._duration)
    }

    //切换方块
    private switchTetris() {
        this._curTetris = this._nextTetris
        this._curTetris.squares.forEach(sq => sq.viewer?.remove())
        this.resetCenterPoint(gameConfig.panelSize.width, this._curTetris)
        if (!TetrisRules.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._existArr)) {
            this._gameStatus = GameStatus.over
            clearInterval(this._timer)
            this._timer = undefined
            this._viewer.onGameOver()
            return
        }
        this.showNext()
        this._viewer.switch(this._curTetris)
    }

    private resetCenterPoint = (width: number, tetris: SquareGroup) => {
        const x = Math.ceil(width / 2) - 1
        const y = 0
        tetris.centerPoint = {x, y}
        while (tetris.squares.some(s => s.point.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
        }
    };

    controlDown() {
        if (this._gameStatus === GameStatus.playing && this._curTetris) {
            if (!TetrisRules.moveDirectly(this._curTetris, MoveDirection.down, this._existArr)) {
                this.hitBottom()
            }
        }
    }

    controlLeft() {
        if (this._gameStatus === GameStatus.playing && this._curTetris) {
            TetrisRules.move(this._curTetris, MoveDirection.left, this._existArr)
        }
    }

    controlRight() {
        if (this._gameStatus === GameStatus.playing && this._curTetris) {
            TetrisRules.move(this._curTetris, MoveDirection.right, this._existArr)
        }
    }

    controlRotate() {
        if (this._gameStatus === GameStatus.playing && this._curTetris) {
            TetrisRules.rotate(this._curTetris, this._existArr)
        }
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
            this._viewer.onGamePause()
        }
    }

    //触底处理
    private hitBottom() {
        this._existArr = [...this._existArr, ...this._curTetris!.squares]
        const num = TetrisRules.removeLine(this._existArr)
        this.addScore(num)
        this.switchTetris()
    }

    get score(){
        return this._score
    }
    set score(val){
        this._score = val
        this._viewer.showScore(val)
        const duration = gameConfig.levels.filter(i => i.score <= this.score).pop()!.duration
        if(this._duration === duration) return;
        if(this._timer){
            clearInterval(this._timer)
            this._duration = duration
            this._timer = undefined
            this.autoDrop()
        }
    }
    private addScore(num: number) {
        if (num === 0) return;
        if (num === 1) {
            this.score += 10
        } else if (num === 2) {
            this.score += 30
        } else if (num === 3) {
            this.score += 50
        } else {
            this.score += 100
        }
    }
}
