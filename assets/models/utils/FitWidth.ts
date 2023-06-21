import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('utils/FitWidth')
export class FitWidth extends Component {
	@property(CCFloat) ratio: number = 1;
	start() {
		this.node.parent.on(Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
	}

	protected onEnable(): void {
		this.onSizeChange();
	}

	onSizeChange() {
		let parentWidth = this.node.parent.ui.width;
		let selfWidth = this.node.ui.width;
		let scale = (parentWidth * this.ratio) / selfWidth;
		this.node.setScale(scale, scale, 1);
	}
}
