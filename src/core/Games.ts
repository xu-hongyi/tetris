import {GameStatus, GameViewer, MoveDirection} from "@/core/types";
import SquareGroup from "@/core/SquareGroup";
import {createTetris} from "@/core/Tetris";
import {TetrisRules} from "@/core/TetrisRule";
import gameConfig from "@/core/gameConfig";

export class Games {
    //游戏状态
    private _gameStatus:GameStatus = GameStatus.init
    //下一个方块类型
    private _nextTetris:SquareGroup = createTetris({x:0, y:0})
    //计时器，控制方块下落
    private _timer?:number
    //控制方块下落时间
    private _duration:number = 1000
    //当前控制的小方块
    private _curTetris?:SquareGroup
    constructor(
        private _viewer:GameViewer
    ) {
        this._viewer.showNext(this._nextTetris)
        this.resetCenterPoint(gameConfig.nextSize.width, this._nextTetris)
    }
    //游戏开始
    start(){
        if(this._gameStatus === GameStatus.playing) return;
        this._gameStatus = GameStatus.playing
        if(!this._curTetris){
            this.switchTetris()
        }
        this.autoDrop()
    }
    //控制方块自由下落
    private autoDrop(){
        if(this._timer || this._gameStatus !== GameStatus.playing) return;
        this._timer = setInterval(() =>{
            if (this._curTetris) {
                TetrisRules.move(this._curTetris, MoveDirection.down)
            }
        }, this._duration)
    }
    //切换方块
    private switchTetris(){
        this._curTetris = this._nextTetris
        this.resetCenterPoint(gameConfig.panelSize.width, this._curTetris)
        this._nextTetris = createTetris({x:0, y:0})
        this.resetCenterPoint(gameConfig.nextSize.width, this._nextTetris)
        this._viewer.switch(this._curTetris)
        this._viewer.showNext(this._nextTetris)
    }

    private resetCenterPoint(width:number, tetris:SquareGroup){
        const x = Math.ceil(width / 2) - 1
        const y = 0
        tetris.centerPoint = {x, y}
        while (tetris.squares.some(s => s.point.y < 0)){
            tetris.squares.forEach(sq =>{
                sq.point = {
                    x:sq.point.x,
                    y:sq.point.y + 1
                }
            })
        }
    }

    controlDown(){
        if(this._gameStatus === GameStatus.playing && this._curTetris){
            TetrisRules.moveDirectly(this._curTetris, MoveDirection.down)
        }
    }

    controlLeft(){
        if(this._gameStatus === GameStatus.playing && this._curTetris){
            TetrisRules.move(this._curTetris, MoveDirection.left)
        }
    }

    controlRight(){
        if(this._gameStatus === GameStatus.playing && this._curTetris){
            TetrisRules.move(this._curTetris, MoveDirection.right)
        }
    }

    controlRotate(){
        if(this._gameStatus === GameStatus.playing && this._curTetris){
            TetrisRules.rotate(this._curTetris)
        }
    }
    pause(){
        if(this._gameStatus === GameStatus.playing){
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
        }
    }
}