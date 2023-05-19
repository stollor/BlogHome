
import { Component, Sprite, SpriteFrame, tween, UIOpacity, Vec3 } from 'cc';
import { Button, Label, RichText } from 'cc';
import { isValid } from 'cc';
import { Asset } from 'cc';
import { _decorator, Node } from 'cc';
import { Data } from '../data/data';
const { ccclass, property } = _decorator;

@ccclass('CNodeCustom')
export class CNodeCustom extends Component {

}

declare module 'cc' {
    interface Node {
		/**增加的方法 */
		setStr: (str: string | number) => void;
		setImg: (frame: SpriteFrame) => void;

        /**扩展的方法 */
        //on: (type, callback, target, useCapture?, video?) => void;
        destory: () => boolean;
        //oparity:number;
        oparity: number;
		bindData:(data:Data)=>void;
		
    }
}




/**
 * 设置文字
 */
Node.prototype.setStr = function (str: string | number) {
    let comp = this.getComponent(Label);
    if (!comp) comp = this.getComponent(RichText);
    if (comp) comp.string = str;
}



Node.prototype.setImg = function (frame: SpriteFrame) {
    let comp = this.getComponent(Sprite);
    if (!comp || !frame) return;
    comp.spriteFrame = frame;
    this.addAutoReleaseAsset(frame);
}
   
Node.prototype.bindData=function(data:Data){
	data.addListener((val)=>{
		this.setStr(val);
	})
}
// Node.prototype.transPosto = function (node:Node,off:Vec3){
//     var nodeWordPos = this.parent.convertToWorldSpaceAR(this.position);
//     var myParentSpacePosition = this.parent.convertToNodeSpaceAR(nodeWordPos);
// }


Object.defineProperty(Node.prototype, 'oparity', {
    configurable: true,
    enumerable: false,
    set(value) {
        let sp = this.getComponent(UIOpacity);
        if (!sp) sp = this.addComponent(UIOpacity);
        sp.opacity = value;
    },
    get() {
        let sp = this.getComponent(UIOpacity);
        if (!sp) sp = this.addComponent(UIOpacity);
        return sp.opacity;
    }
})



// let originOparity = Object.getOwnPropertyDescriptor(Node.prototype, "oparity")

// let originGet = originOparity.get

// originOparity.get = function() {

//     return 255

// }

// originOparity.set = function(val:number) {
//     console.log(val)

// }




