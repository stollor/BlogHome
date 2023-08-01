import { _decorator, Button, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PanelBase')
export class PanelBase extends Component {
	@property(Node) nClose: Node;
	@property(Node) nTitle: Node;

	private _ui: UITransform;
	get ui() {
		if (!this._ui) this._ui = this.node.getComponent(UITransform);
		return this._ui;
	}
	start() {
		this.nClose?.on(Button.EventType.CLICK, this.onClose, this);
	}

	onClose() {
		this.node.destroy();
	}

	update(deltaTime: number) {}
}
