import {IViewer} from "@/core/types";
import {Square} from "@/core/Square";
import $ from 'jquery'
import pageConfig from "@/core/viewer/pageConfig";
export default class SquarePageViewer implements IViewer{
    private isRemove:boolean = false
    private dom?:JQuery<HTMLElement>
    constructor(private square:Square, private container:JQuery<HTMLElement>) {
    }
    remove(): void {
        if(!this.isRemove){
            this.dom?.remove();
        }
        this.isRemove = true;
    }

    show(): void {
        if(this.isRemove) return;
        this.dom = this.dom ?? $('<div></div>').css({
            position:"absolute",
            width:pageConfig.SquareSize.width,
            height:pageConfig.SquareSize.height,
            backgroundColor:this.square.color,
            border:'1px solid #ccc',
            boxSizing:'border-box'
        }).appendTo(this.container)
        this.dom.css({
            left:this.square.point.x * pageConfig.SquareSize.width,
            top:this.square.point.y * pageConfig.SquareSize.height
        })
    }
}