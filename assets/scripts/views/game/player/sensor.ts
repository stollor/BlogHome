import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { sortObjects } from '../../../tools/utils';
import { Player } from './player';
const { ccclass, property } = _decorator;

@ccclass('Sensor')
export class Sensor extends Component {
	start() {
		let collider = this.getComponent(Collider2D);
		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
			collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
		}
	}
	private static _instance: Sensor = null;
	public static get instance() {
		return this._instance;
	}

	public objectList: Node[] = [];

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		this.objectList.push(otherCollider.node);
		otherCollider.node.position.x;
	}
	onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		this.objectList.remove(otherCollider.node);
		// 只在两个碰撞体结束接触时被调用一次
	}

	protected update(dt: number): void {
		sortObjects(this.objectList, [(item) => item.position.x, true], [(item) => item.position.y, true]);
		Player.instance.attack(this.objectList);
	}
}
