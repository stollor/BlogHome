import { _decorator, Button, Component, DynamicAtlasManager, Node, Slider, Sprite, SpriteFrame, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('debug_dynamic_atlas')
export class debug_dynamic_atlas extends Component {
	@property(Node) content: Node;
	@property(Button) btnRefresh: Button;
	@property(Button) btnClose: Button;
	protected start(): void {
		// 开启合图
		//DynamicAtlasManager.instance.enabled = true;
		this.btnClose.node.on(Button.EventType.CLICK, () => {
			this.node.active = false;
		});
		this.btnRefresh.node.on(Button.EventType.CLICK, () => {
			this.refresh();
		});
	}

	onEnable() {
		this.refresh();
	}

	refresh() {
		this.content.destroyAllChildren();
		let max = DynamicAtlasManager.instance.atlasCount;
		for (let i = 0; i < max; i++) {
			let item = new Node();
			let sp = item.addComponent(Sprite);
			// @ts-ignore
			let texture = DynamicAtlasManager.instance._atlases[i]._texture;
			let spriteFrame = new SpriteFrame();
			spriteFrame.texture = texture;
			sp.spriteFrame = spriteFrame;
			sp.type = Sprite.Type.SIMPLE;
			sp.sizeMode = Sprite.SizeMode.TRIMMED;
			item.parent = this.content;
		}
		this.scheduleOnce(() => {
			this.content.getComponent(UITransform).width = this.content.children[0].getComponent(UITransform).width;
		});
	}

	setItemScale(silder: Slider) {
		this.content.children.forEach((item) => {
			item.scale = v3(0.5 + silder.progress, 0.5 + silder.progress, 1);
		});
	}
}
