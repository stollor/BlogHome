import {
	_decorator,
	Collider2D,
	Component,
	Contact2DType,
	instantiate,
	IPhysics2DContact,
	macro,
	PhysicsSystem,
	Prefab,
	Vec3,
} from 'cc';
import { Player } from './player';
const { ccclass, property } = _decorator;

@ccclass('Ghost')
export class Ghost extends Component {
	//缓存池管理
	static pools: Array<Ghost> = [];
	static get(prefab: Prefab) {
		let ghost = this.pools.pop();
		if (!ghost) {
			let node = instantiate(prefab);
			ghost = node.getComponent(Ghost);
		}
		return ghost;
	}

	static put(ghost: Ghost) {
		//压入缓存池管理节点
		ghost.node.parent = null;
		this.pools.push(ghost);
	}

	speed: number = 200;
	velocity: Vec3 = new Vec3();
	_tempPos: Vec3 = new Vec3();

	start() {
		let collider = this.getComponent(Collider2D);
		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		}
	}

	onEnable() {
		this.schedule(this.checkPlayerPos, 0.5, macro.REPEAT_FOREVER, 0);
	}

	onDisable() {
		this.unschedule(this.checkPlayerPos);
	}

	checkPlayerPos() {
		let pos = this.node.worldPosition;
		let tartet = Player.instance.node.worldPosition;
		Vec3.subtract(this.velocity, tartet, pos);
		this.velocity.normalize().multiplyScalar(this.speed);
	}

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		// 只在两个碰撞体开始接触时被调用一次
		if (otherCollider.group == PhysicsSystem.PhysicsGroup['skill']) {
			console.log('受到攻击');
			Ghost.put(this);
		}
	}

	update(dt: number) {
		//计算新位置
		let pos = this.node.position;
		let velocity = this.velocity;

		this._tempPos.x = pos.x + velocity.x * dt;
		this._tempPos.y = pos.y + velocity.y * dt;
		this._tempPos.z = pos.z + velocity.z * dt;
		this.node.setPosition(this._tempPos);
	}
}
