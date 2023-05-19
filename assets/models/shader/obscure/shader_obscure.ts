import { Camera, CCInteger, Renderer } from 'cc';
import { CCBoolean, Component, Material, RenderTexture, Sprite, UITransform, view, _decorator } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property} = _decorator;

@ccclass('shader_obscure')
export class shader_obscure extends Component {

  
    @property(CCBoolean) get _refresh(){
        this.refresh();
        return true;
    }

    @property(CCBoolean) private _gray;
    @property({type:CCBoolean,displayName:"置灰"})
    get gray(){
        return this._gray;
    };
    set gray(val:boolean){
        this._gray=!!val;
        this.setProp("useGray",!!val)
    }

    @property(CCInteger) private _mosaic=0;
    @property({type:CCInteger,group:{name:"模糊" },displayName:"马赛克"})
    get mosaic(){
        return this._mosaic;
    };
    set mosaic(val:number){
        this._mosaic=val;
        this.setProp("useMosaic",val)
    }

    @property(CCBoolean) private _gaussian;
    @property({type:CCBoolean,group:{name:"模糊" },displayName:"高斯(低性能)"})
    get gaussian(){
        return this._gaussian;
    };
    set gaussian(val:boolean){
        this._gaussian=!!val;
        this.setProp("useGaussianBlur",!!val)
    }

    @property(CCBoolean) private _gaussianBlurLinear13;
    @property({type:CCBoolean,group:{name:"模糊" },displayName:"线性高斯13"})
    get gaussianBlurLinear13(){
        return this._gaussianBlurLinear13;
    };
    set gaussianBlurLinear13(val:boolean){
        this._gaussianBlurLinear13=!!val;
        this.setProp("useGaussianBlurLinear13",!!val)
    }

    @property(CCBoolean) private _blur1;
    @property({type:CCBoolean,group:{name:"模糊" },displayName:"简单模糊1"})
    get blur1(){
        return this._blur1;
    };
    set blur1(val:boolean){
        this._blur1=!!val;
        this.setProp("useBlur1",!!val)
    }

    @property(CCBoolean) private _blur2;
    @property({type:CCBoolean,group:{name:"模糊" },displayName:"简单模糊2"})
    get blur2(){
        return this._blur2;
    };
    set blur2(val:boolean){
        this._blur2=!!val;
        this.setProp("useBlur2",!!val)
    }


    get sprite(){
        return this.node.getComponent(Sprite);
    }

    setProp(type:string,val:any){
        let _material = this.sprite.getMaterialInstance(0);
        _material.setProperty(type,val);;
    }

    start(){
        this.refresh();
    }

    refresh(){
        this.mosaic=this._mosaic;
        this.gaussian=this._gaussian;
        this.gaussianBlurLinear13=this._gaussianBlurLinear13;
        this.blur1=this._blur1;
        this.blur2=this._blur2;
        this.gray=this._gray;
    }
}


