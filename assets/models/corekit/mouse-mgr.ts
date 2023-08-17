import { _decorator, Component, EventMouse, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MouseMgr')
export class MouseMgr extends Component {
	@property(Node) icon: Node;
	start() {
		// 获取Canvas节点
		var canvas: Node = find('Canvas');
		// 添加鼠标移动事件监听
		canvas.on(Node.EventType.MOUSE_MOVE, this.onMove, this);
	}

	refresh() {
		this.icon.active = true;
		let gcs = document.getElementById('GameCanvas');
		gcs.style.cursor = 'none';
	}

	onMove(event: EventMouse) {
		// 获取当前鼠标位置
		var mousePos = event.getUILocation();
		// 将节点位置设置为鼠标位置
		this.icon.setWorldPosition(mousePos.to3());
	}

	onMouseMove(event: EventMouse) {
		console.log(event.getUILocation().to3());
		this.icon.setPosition(event.getUILocation().to3());
	}
}
