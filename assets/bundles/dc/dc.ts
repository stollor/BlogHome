import { _decorator, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dc')
export class dc extends Component {
	@property(Node) pages: Node;

	protected start(): void {
		models.assetMgr.defaultBundleName = 'dc';
	}

	onSwitchPage(Toggle: Toggle) {
		if (!Toggle.isChecked) return;
		this.pages.children.forEach((item) => (item.active = false));
		this.pages.getChildByName(Toggle.node.name).active = true;
	}
}
