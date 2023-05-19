import { Material } from 'cc';
import { UITransform } from 'cc';
import { v2 } from 'cc';
import { EventTouch } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShaderDiscard')
export class Discard extends Component {

    private _material:Material;
    private _val:number;
    get sprite(){
        return this.node.getComponent(Sprite);
    }

    onLoad() {
        this._material= this.sprite.getMaterialInstance(0);
        this.node.on(Node.EventType.TOUCH_END, this.touchStartEvent, this);
    }


    touchStartEvent(evt:EventTouch) {
        if(this._val>=1){
            this._val=0;
            this._material.setProperty('burnThreshold',this._val );
        }else{
            this._val=0;
            this.unscheduleAllCallbacks();
            this.schedule(()=>{
                this._material.setProperty('burnThreshold',this._val );
                this._val+=0.01
            },0.02,100)
        }

      
        
    }

}


