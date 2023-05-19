import { Component, EventTouch, Material, Node, Sprite, UITransform, v2, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shaderWaterWave')
export class shaderWaterWave extends Component {

    private _waveOffset: number = 0.0;
    private _material:Material;
    get sprite(){
        return this.node.getComponent(Sprite);
    }

    onLoad() {
        this._material= this.sprite.getMaterialInstance(0);
        this.node.on(Node.EventType.TOUCH_END, this.touchStartEvent, this);
    }


    touchStartEvent(evt:EventTouch) {
        let pos = evt.getLocation();
        let ui=this.node.getComponent(UITransform);
        let val=v2(pos.x / ui.width, (ui.height - pos.y) / ui.height);
        this._material.setProperty('center',val );
        this._waveOffset = 0.0;
    }

    update(dt) {
        if (this._waveOffset > 2.0) return;
        this._waveOffset += dt;
        this._material.setProperty('wave_offset', this._waveOffset);
    }
}


