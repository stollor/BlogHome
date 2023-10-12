import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	start() {
		let node = this.node.getChildByName('label');
		let params = { name: 1, label: node, data: [1, 2, 3], data2: { name: 1 } };
		let data = models.utils.tool.deepClone(params);
		data.name = 2;
		data.data.push(6);
		data.data2.name = 2;
		data.label.name = 'ccy';
		console.log('.111', params, data);
	}

	update(deltaTime: number) {}
}
