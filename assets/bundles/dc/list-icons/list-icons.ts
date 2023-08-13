import { _decorator, CCInteger, Component, DynamicAtlasManager, instantiate, macro, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ListIcons')
export class ListIcons extends Component {
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
			models.assetMgr.load(`list-icons/icons/水晶 (${(i % 59) + 1})/spriteFrame`, SpriteFrame).then((sprite) => {
				item.children[0].setImg(sprite);
				//item.getComponentInChildren(Sprite).spriteFrame = sprite;
			});
			item.parent = this.content;
		}
	}

	protected onDisable(): void {
		this.content.destroyAllChildren();
	}

	update(deltaTime: number) {}
}
