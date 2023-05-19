import {
	_decorator,
	Collider2D,
	Component,
	Contact2DType,
	instantiate,
	IPhysics2DContact,
	PhysicsSystem,
	Prefab,
	Vec3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
	//缓存池管理
	static pools: Array<Bullet> = [];
	static get(prefab: Prefab) {
		let bullet = this.pools.pop();
		if (!bullet) {
			let node = instantiate(prefab);
			bullet = node.getComponent(Bullet);
		}
		return bullet;
	}

	static put(bullet: Bullet) {
		//压入缓存池管理节点
		bullet.node.parent = null;
		this.pools.push(bullet);
	}

	//生命周期，回收时间
	lifeTime: number = 0;
	tempPos: Vec3 = new Vec3();
	velocity: Vec3 = new Vec3();
	//attack: number = 0;

	update(dt: number) {
		this.lifeTime -= dt;
		if (this.lifeTime < 0) {
			//生命周期回收
			Bullet.put(this);
			return;
		}

		//计算新位置
		let pos = this.node.getPosition();
		let velocity = this.velocity;

		this.tempPos.x = pos.x + velocity.x * dt;
		this.tempPos.y = pos.y + velocity.y * dt;
		this.tempPos.z = pos.z + velocity.z * dt;

		this.node.setPosition(this.tempPos);
	}

	start() {
		let collider = this.getComponent(Collider2D);
		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
			collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
		}
	}

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		// 只在两个碰撞体开始接触时被调用一次
		if (otherCollider.group == PhysicsSystem.PhysicsGroup['enemy']) {
			Bullet.put(this);
		}
	}
	onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		// 只在两个碰撞体结束接触时被调用一次
	}
}
