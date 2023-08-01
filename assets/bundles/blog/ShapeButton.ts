import { Component, EventTouch, Node, PhysicsSystem2D, PolygonCollider2D, _decorator } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ShapeButton')
@requireComponent(PolygonCollider2D)
export class ShapeButton extends Component {
	start() {
		this.node.on(Node.EventType.TOUCH_END, this.onCheck, this);
	}

	onCheck(event: EventTouch): void {
		const collider = PhysicsSystem2D.instance.testPoint(event.touch.getUILocation());
		if (collider && collider.length > 0) {
			this.node.emit('click', collider[0].node);
		}
	}
}
