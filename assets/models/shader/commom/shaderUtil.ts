import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shaderUtil')
export class shaderUtil extends Component {

    @property(Sprite) sprite:Sprite;

    start() {


    }

    update(deltaTime: number) {
        
    }

    setDefault(key,val){
        let _material = this.sprite.getMaterialInstance(0);
        let list={};
        list[key]=val;
        _material.recompileShaders(list)
    }

    setProp(type:string,val:any){
        let _material = this.sprite.getMaterialInstance(0);
        _material.setProperty(type,val);;
    }


}

