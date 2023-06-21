import { error } from 'cc';
import { sp } from 'cc';
import { JsonAsset } from 'cc';
import { _decorator, Component, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
	
    start() {
        
    }

    loadJson(name){
        resources.load(name, (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;
            console.log(res);
            this.node.addComponent(sp.Skeleton)
        })
    }

    
    update(deltaTime: number) {
        
    }
}


