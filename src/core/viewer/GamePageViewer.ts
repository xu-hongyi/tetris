import {GameStatus, GameViewer} from "@/core/types";
import SquareGroup from "@/core/SquareGroup";
import SquarePageViewer from "@/core/viewer/SquarePageViewer";
import $ from 'jquery'
import {Game} from "@/core/Game";
import gameConfig from "@/core/gameConfig";
import pageConfig from "@/core/viewer/pageConfig";

export class GamePageViewer implements GameViewer{

    private scoreDom = $("#score")
    private nextDom = $("#next")
    private panelDom = $("#panel")
    private msgDom = $("#msg")
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq =>{
            sq.viewer = new SquarePageViewer(sq, this.nextDom)
        })
    }

    switch(tetris: SquareGroup): void {
        tetris.squares.forEach(sq =>{
            sq.viewer?.remove()
            sq.viewer = new SquarePageViewer(sq, this.panelDom)
        })
    }

    init(game: Game): void {
        this.nextDom.css({
            width:gameConfig.nextSize.width * pageConfig.SquareSize.width,
            height:gameConfig.nextSize.height * pageConfig.SquareSize.height
        })
        this.panelDom.css({
            width:gameConfig.panelSize.width * pageConfig.SquareSize.width,
            height:gameConfig.panelSize.height * pageConfig.SquareSize.height
        })
        $(document).on("keyup",(e) =>{
            if(e.keyCode === 37){
                game.controlLeft()
            }else if(e.keyCode === 38){
                game.controlRotate()
            }else if(e.keyCode === 39){
                game.controlRight()
            }else if(e.keyCode === 40){
                game.controlDown()
            }else if(e.keyCode === 32){
                if(game.gameStatus === GameStatus.playing){
                    game.pause()
                }else {
                    game.start()
                }
            }
        })
    }

    showScore(score: number): void {
        this.scoreDom.html(score.toString())
    }

    onGameOver(): void {
        this.msgDom.css({
            display:'flex'
        }).find("p").html("游戏结束")
    }

    onGamePause(): void {
        this.msgDom.css({
            display:'flex'
        }).find("p").html("游戏暂停")
    }

    onGameStart(): void {
        this.msgDom.hide()
    }


}