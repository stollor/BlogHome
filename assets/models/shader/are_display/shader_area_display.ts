import { CCFloat, Sprite, UITransform, Vec2 } from 'cc';
import { EventTouch } from 'cc';
import { CCBoolean } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shaderAreaDisplay')
export class shaderAreaDisplay extends Component {
    @property(CCBoolean) get _refresh(){
        this.refresh();
        return true;
    }

    @property(CCFloat) private _ratio=0.1;
    @property({type:CCFloat,group:{name:"可视区域参数" },displayName:"宽高比"})
    get ratio(){
        return this._ratio;
    };
    set ratio(val:number){
        this._ratio=val;
        this.setProp("wh_ratio",val)
    }


    @property(CCFloat) private _blur=0.1;
    @property({type:CCFloat,group:{name:"可视区域参数" },displayName:"模糊程度"})
    get blur(){
        return this._blur;
    };
    set blur(val:number){
        this._blur=val;
        this.setProp("blur",val)
    }


    @property(CCFloat) private _radius=0.1;
    @property({type:CCFloat,group:{name:"可视区域参数" },displayName:"半径"})
    get radius(){
        return this._radius;
    };
    set radius(val:number){
        this._radius=val;
        this.setProp("radius",val)
    }


    @property(Vec2) private _center=new Vec2(0.5,0.5);
    @property({type:Vec2,group:{name:"可视区域参数" },displayName:"中心点"})
    get center(){
        return this._center;
    };
    set center(val:Vec2){
        this._center=val;
        this.setProp("center",val)
    }

    get sprite(){
        return this.node.getComponent(Sprite);
    }

    

    setProp(type:string,state:any){
        let _material = this.sprite.getMaterialInstance(0);
        _material.setProperty(type,state);;
    }

    start(){
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        this.refresh();
    }

    refresh(){
        this.radius=this._radius;
        this.blur=this._blur;
        this.radius=this._radius;
        this.center=this._center;
    }

    touchMoveEvent(event:EventTouch){
        this._center.x += event.getDeltaX() / this.node.getComponent(UITransform).width;
        this._center.y -= event.getDeltaY() / this.node.getComponent(UITransform).height;
        this.center=this._center;
    }
}


