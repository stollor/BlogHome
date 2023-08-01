import { Collider2D, Component, Contact2DType, IPhysics2DContact, PhysicsSystem, _decorator, v2 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('MapTiled')
export class MapTiled extends Component {
	//获取默认物理控制面板的分组信息
	PLAYER = PhysicsSystem.PhysicsGroup['player'];
	public refreshCB: Function = () => {};

	start() {
		let collider = this.getComponent(Collider2D);
		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		}
	}

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		// 只在两个碰撞体开始接触时被调用一次
		this.refreshCB(v2(Math.floor(this.node.position.x / 512), Math.floor(this.node.position.y / 512)));
	}

	public setInit(parent, pos, type) {
		this.node.parent = parent;
		this.node.setPosition(pos);
	}
}
