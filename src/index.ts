import SquarePageViewer from "@/core/viewer/SquarePageViewer";
import $ from 'jquery'
import {createTetris} from "@/core/Tetris";
import {TetrisRules} from "@/core/TetrisRule";
import {MoveDirection} from "@/core/types";

const squareGroup = createTetris({x:5, y:5})

squareGroup.squares.forEach(s =>{
    s.viewer = new SquarePageViewer(s, $("#root"))
})

$('#down').click(() =>{
    TetrisRules.move(squareGroup, MoveDirection.down)
})

$('#left').click(() =>{
    TetrisRules.move(squareGroup, MoveDirection.left)
})

$('#right').click(() =>{
    TetrisRules.move(squareGroup, MoveDirection.right)
})

$("#rotate").on('click', () =>{
    TetrisRules.rotate(squareGroup)
})
// $('#up').click(() =>{
//     TetrisRules.moveDirectly(squareGroup, {
//         x:squareGroup.centerPoint.x,
//         y:squareGroup.centerPoint.y - 1
//     })
// })

// $('#remove').click(() =>{
//     sq.viewer?.remove()
// })