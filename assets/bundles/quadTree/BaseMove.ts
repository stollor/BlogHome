import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const tempPos = new Vec3(0, 0, 0);

@ccclass('BaseMove')
export class BaseMove extends Component {
	speed: number = 20; //速度标量
	dir: number = 0; //速度方向
	mass: number = 10; //质量
	maxSpeed: number = 100; //最大速度
	maxAcceleration: number = 100; //最大加速度
	timeHorizon: number = 5; //时间视野
	timeStep: number = 0.1; //时间步长

	prefVelocity: Vec3 = new Vec3(0, 0, 0); //期望速度
	newVelocity: Vec3 = new Vec3(0, 0, 0); //新速度
	nowVelocity: Vec3 = new Vec3(0, 0, 0); //当前速度矢量

	radius = 1; //本身的半径
	goal: Vec3 = new Vec3(0, 0, 0); //目标

	static obstacles: BaseMove[] = []; //障碍物

	get velocity() {
		return this.nowVelocity;
	}

	move(dt: number) {
		//this.rvo2();
		tempPos.x = this.node.position.x + this.nowVelocity.x * dt;
		tempPos.y = this.node.position.y + this.nowVelocity.y * dt;
		tempPos.z = this.node.position.z + this.nowVelocity.z * dt;
		this.node.setPosition(tempPos);
	}

	/**
	 * 避障算法
	 * @param goal      目标
	 * @param obstacles 障碍物
	 * @returns
	 */
	rvo2() {
		// 计算速度障碍
		for (let i = 0; i < BaseMove.obstacles.length; i++) {
			const obstacle = BaseMove.obstacles[i];
			if (obstacle.node.uuid == this.node.uuid) continue;
			const relativePosition = new Vec3();
			Vec3.subtract(relativePosition, obstacle.node.position, this.node.position);
			const relativeVelocity = new Vec3();
			Vec3.subtract(relativeVelocity, this.nowVelocity, obstacle.velocity);
			const distSq = relativePosition.lengthSqr();
			const combinedRadius = obstacle.radius + this.radius;
			const combinedRadiusSq = combinedRadius * combinedRadius;

			const obstacleVelocity = new Vec3();
			Vec3.negate(obstacleVelocity, obstacle.velocity);
			const obstacleLine = new Vec3();
			Vec3.normalize(obstacleLine, relativePosition);
			const obstacleProjection = Vec3.dot(obstacleVelocity, obstacleLine);
			const obstacleDistance = Math.sqrt(distSq) - combinedRadius;

			// 如果机器人在障碍物的速度障碍内，则需要调整速度
			if (obstacleDistance < this.timeHorizon * this.maxSpeed && obstacleProjection > 0) {
				const obstacleLinePerp = new Vec3();
				Vec3.cross(obstacleLinePerp, obstacleLine, new Vec3(0, 1, 0));
				Vec3.normalize(obstacleLinePerp, obstacleLinePerp);
				const u = new Vec3();
				Vec3.multiplyScalar(u, obstacleLinePerp, obstacleDistance / this.timeHorizon - obstacleProjection);
				Vec3.subtract(this.newVelocity, this.newVelocity, Vec3.multiplyScalar(new Vec3(), u, 1.0 / this.timeStep));
			}
		}

		// 限制速度和加速度
		const speed = this.newVelocity.length();
		if (speed > this.maxSpeed) {
			Vec3.multiplyScalar(this.newVelocity, this.newVelocity, this.maxSpeed / speed);
		}

		const acceleration = new Vec3();
		Vec3.subtract(acceleration, this.newVelocity, this.nowVelocity);
		const accel = acceleration.length();
		if (accel > this.maxAcceleration) {
			Vec3.multiplyScalar(acceleration, acceleration, this.maxAcceleration / accel);
		}

		// 计算新速度和新位置
		Vec3.add(this.newVelocity, this.nowVelocity, Vec3.multiplyScalar(new Vec3(), acceleration, this.timeStep));
		this.nowVelocity = this.newVelocity;
	}
}
