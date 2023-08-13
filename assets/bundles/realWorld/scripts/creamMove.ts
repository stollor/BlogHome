import { _decorator, Component, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('creamMove')
export class creamMove extends Component {
	start() {
		models.em.on('Player-Move-Cream', this.onMove, this);
	}

	onMove(data: any) {
		this.node.worldPosition = v3(data.pos.x, data.pos.y, 1000);
	}
}
