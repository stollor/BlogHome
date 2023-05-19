import { Sprite } from 'cc';
import { CCBoolean } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shaderFilter')
export class shaderFilter extends Component {

    @property(CCBoolean) get _refresh(){
        this.refresh();
        return true;
    }

    @property({type:CCBoolean,group:{name:"滤镜效果" },displayName:"置灰"})
    get gray(){
        return this._gray;
    };
    set gray(val:boolean){
        this._gray=!!val;
        this.setBlur("useGray",!!val)
    }

    @property({type:CCBoolean,group:{name:"滤镜效果" },displayName:"褐色"})
    get brown(){
        return this._brown;
    };
    set brown(val:boolean){
        this._brown=!!val;
        this.setBlur("useBrown",!!val)
    }

    @property({type:CCBoolean,group:{name:"滤镜效果" },displayName:"反相"})
    get reversal(){
        return this._reversal;
    };
    set reversal(val:boolean){
        this._reversal=!!val;
        this.setBlur("useReversal",!!val)
    }

    @property({type:CCBoolean,group:{name:"滤镜效果" },displayName:"冰冻"})
    get frozen(){
        return this._frozen;
    };
    set frozen(val:boolean){
        this._frozen=!!val;
        this.setBlur("useFrozen",!!val)
    }

    @property({type:CCBoolean,group:{name:"滤镜效果" },displayName:"卡通"})
    get cartoon(){
        return this._cartoon;
    };
    set cartoon(val:boolean){
        this._cartoon=!!val;
        this.setBlur("useCartoon",!!val)
    }


    get sprite(){
        return this.node.getComponent(Sprite);
    }

    @property(CCBoolean) private _brown;
    @property(CCBoolean) private _reversal;
    @property(CCBoolean) private _frozen;
    @property(CCBoolean) private _cartoon;
    @property(CCBoolean) private _gray;

    setBlur(type:string,state:boolean){
        let _material = this.sprite.getMaterialInstance(0);
        _material.setProperty(type,state?1:0);;
    }

    start(){
        this.refresh();
    }

    refresh(){
        this.brown=this._brown;
        this.reversal=this._reversal;
        this.frozen=this._frozen;
        this.cartoon=this._cartoon;
        this.gray=this._gray;
    }
}


