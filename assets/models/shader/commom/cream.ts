import { Camera } from 'cc';
import { view } from 'cc';
import { CCBoolean } from 'cc';
import { UITransform } from 'cc';
import { RenderTexture } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('shaderObscureCream')
export class shaderObscureCream extends Component {
    @property(CCBoolean) get _refresh(){
        this.resetRT();
        return true;
    }


    @property(Camera) cam: Camera;
    @property(RenderTexture) rt: RenderTexture = null!;

    @property({slide:true,step:0.05,min:0.1,max:1.0})
    get setRTscale(){
        return this.rtScale;
    }
    set setRTscale(v){
        if(this._isSetting) return
         this.rtScale=v;
         this.resetRT();
    }

    private _isSetting = false;
    private rtScale=0.5;

    start(){
        this.resetRT();
    }

    resetRT(){
        this._isSetting=true;
        EDITOR && (this.cam.targetTexture = null);
        this.scheduleOnce(() => {
            /* in Editor we use designed resolution, in run time, we use real content size */
            const size = EDITOR ? view.getDesignResolutionSize() : this.node.getComponent(UITransform).contentSize;
            this.rt.resize(size.width*this.rtScale, size.height*this.rtScale);
            this.cam.targetTexture = this.rt;
            this._isSetting=false;
        })
    }
}


