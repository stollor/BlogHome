import { _decorator, CCInteger, Component, DynamicAtlasManager, instantiate, macro, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bag')
export class bag extends Component {
	@property(Node) item: Node;
	@property(Node) content: Node;
	@property(CCInteger) itemNumber: number = 99;

	onEnable() {
		// 开启合图
		macro.CLEANUP_IMAGE_CACHE = false;
		DynamicAtlasManager.instance.enabled = true;

		this.content.destroyAllChildren();
		for (let i = 0; i < this.itemNumber; i++) {
			let item = instantiate(this.item);
			item.parent = this.content;
		}
	}

	update(deltaTime: number) {}
}
