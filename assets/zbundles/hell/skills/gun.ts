import { _decorator, Component, Node, Prefab, Quat, Vec3 } from 'cc';
import { GameView } from '../game/view';
import { Bullet } from './bullet';
const { ccclass, property } = _decorator;

const tempPos = new Vec3();
const tempRot = new Quat();
@ccclass('Gun')
export class Gun extends Component {
	@property(Prefab)
	bullet: Prefab = null;

	@property(Node)
	point: Node = null; //子弹射锚点

	@property
	speed: number = 1.0; //子弹飞行最大速度

	@property
	lifeTime: number = 0.5; //子弹飞行最长时间

	@property
	cycleTime: number = 0.5; //子弹发射间隔

	minDist: number = 0; //最近发射位置
	nextCycle: number = 0; //下次发射时间
	isShoot: boolean = false; //是否上弹
	direction: Vec3 = new Vec3(); //发射方向

	attack(targetWorldPos: Vec3) {
		if (!targetWorldPos) return;
		//是否可以上弹
		if (this.nextCycle > 0) return;

		Vec3.subtract(tempPos, targetWorldPos, this.node.worldPosition);

		//计算与怪的距离
		let lengthSqr = tempPos.lengthSqr();
		if (!this.isShoot) {
			//首次上弹记录
			this.isShoot = true;
			this.minDist = lengthSqr;
			this.direction.set(tempPos);
			return;
		}

		//保留最近的怪
		if (lengthSqr < this.minDist) {
			this.minDist = lengthSqr;
			this.direction.set(tempPos);
		}
	}

	update(dt: number): void {
		this.nextCycle -= dt;
		if (this.isShoot) {
			this.isShoot = false;
			this.nextCycle = this.cycleTime;

			let parent = GameView.instance.effect;
			let bullet = Bullet.get(this.bullet);
			bullet.node.parent = parent;
			//parent.getComponent(UITransform).convertToNodeSpaceAR(this.point.worldPosition,tempPos);
			//枪管挂点世界坐标和子弹父亲节点世界坐标的偏移坐标，就是实际当前的子坐标，其实和上面转换是等价的
			Vec3.subtract(tempPos, this.point.worldPosition, parent.worldPosition);
			bullet.node.setPosition(tempPos); //计算发射的起点

			//计算发射角度
			let dir = this.direction.normalize();
			let angle = Math.atan2(dir.y, dir.x);
			Quat.rotateZ(tempRot, Quat.IDENTITY, angle);
			bullet.node.setRotation(tempRot);

			//发射速度和生命时长
			bullet.velocity.set(dir).multiplyScalar(this.speed);
			bullet.lifeTime = this.lifeTime;

			//调整枪管瞄准方向
			this.node.rotation = tempRot;
		}
	}
}
