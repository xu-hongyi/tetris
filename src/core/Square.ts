import {IPoint, IViewer} from "@/core/types";

export class Square {
    //每个小方块的颜色
    private _color:string = ""
    //每个小方块的逻辑坐标
    private _point:IPoint = {x:0, y:0}
    //控制小方块显示
    private _viewer?:IViewer
    get color(){
        return this._color
    }

    set color(val){
        this._color = val
    }

    get point(){
        return this._point
    }

    set point(val){
        this._point = val
        this._viewer?.show()
    }

    get viewer(){
        return this._viewer
    }

    set viewer(val){
        this._viewer = val
        val?.show()
    }
}