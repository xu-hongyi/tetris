import {Games} from "@/core/Games";
import {GamePageViewer} from "@/core/viewer/GamePageViewer";
import $ from 'jquery'
const game = new Games(new GamePageViewer())

$("#left").on('click', () =>{
    game.controlLeft()
})
$("#right").on('click', () =>{
    game.controlRight()
})
$("#down").on('click', () =>{
    game.controlDown()
})
$("#up").on('click', () =>{
    game.controlRotate()
})
$("#play").on('click', () =>{
    game.start()
})
$("#pause").on('click', () =>{
    game.pause()
})