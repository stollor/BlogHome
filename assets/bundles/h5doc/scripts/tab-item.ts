import { _decorator, Button, Color, Component, instantiate, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TabItem')
export class TabItem extends Component {
	@property(Button) btnSwicht: Button;
	@property(Button) btnTitle: Button;
	@property(Node) nodeContent: Node;
	@property(Node) nodeItem: Node;

	start() {
		this.btnSwicht.node.on(Button.EventType.CLICK, this.onSwicht, this);
		this.btnTitle.node.on(Button.EventType.CLICK, this.onClick, this);
	}

	onSwicht() {
		let show = this.nodeContent.active;
		if (show) {
			this.nodeContent.active = false;
		} else {
			this.nodeContent.active = true;
		}
	}

	refresh(data: any) {
		this.btnTitle.node.getComponent(Label).string = data.name;
		this.btnTitle.node.name = data.name;
		this.nodeContent.name = data.name;
		let list = data.children;
		for (let i = 0; i < list.length; i++) {
			let node = instantiate(this.nodeItem);
			node.name = list[i];
			node.setStr(list[i]);
			node.active = true;
			node.getComponent(Label).color = new Color('#14213d');
			node.on(Button.EventType.CLICK, this.onClick, this);
			this.nodeContent.addChild(node);
		}
	}

	onClick(btn: Button) {
		//btn.node.getComponent(Label).color = new Color('#99FF99');
		let msg = '';
		if (btn.node.parent.name == 'title') {
			msg = btn.node.name;
		} else {
			msg = btn.node.parent.name + '-' + btn.node.name;
		}
		em.emit('TableItem-onClick', msg);
	}
}
