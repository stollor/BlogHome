import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btn')
export class btn extends Component {
	start() {
		this.node.on('click', this.onClick, this);
	}

	onClick() {
		models.database.get('gold').value += 1;
	}

	update(deltaTime: number) {}
}
