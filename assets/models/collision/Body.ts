import { Mat3, Quat, Vec3 } from 'cc';
import { cDirty, cObject } from './Object';
import { cShape } from './Shape';

export enum bDirty {
	C = 1, //center
	R = 2, //raidus
	H = 4, //halfSize
	CRH = 7,
	NON = 0,
}

export class cBody {
	id: number = 0;
	mask: number = 0;
	group: number = 0;
	shape: cShape = null;
	object: cObject = null;

	//脏区更新标记
	isDirty: bDirty = bDirty.CRH;

	//缓存
	lower: number = 0;
	upper: number = 0;
	aabb: Array<number> = [0, 0, 0, 0, 0, 0];

	//状态
	isRemove: boolean = false;
	isRetrieve: boolean = true;
	isIdentity: boolean = true;
	isInCollider: boolean = false;

	//缓存
	raidus: number = 0;
	center: Vec3 = new Vec3();
	rotMat3: Mat3 = new Mat3();
	halfSize: Vec3 = new Vec3();

	constructor(obj: cObject) {
		this.object = obj;
	}

	updateBound(force: boolean = false) {
		let object = this.object; //force 强制全局刷新
		let isDirty = force ? cDirty.RTS : object.isDirty;
		if (isDirty > 0) {
			const shape = this.shape;
			if (isDirty & cDirty.R) {
				//旋转更新aabb
				this.isIdentity = false;
				let rot = this.getRotation();
				this.rotMat3.fromQuat(rot); //计算缓存Mat3
				if (rot.equals(Quat.IDENTITY, 0.0001)) {
					this.isIdentity = true;
				}

				shape.updateAABB(this.rotMat3, this.isIdentity);
			}
			object.isDirty = cDirty.NON;

			const AABB = this.aabb; // world aabb
			const aabb = shape.aabb; //local aabb
			const s = this.getScale(); //world scale
			const p = this.getPosition(); //world postion

			//兼容负放大倍数Math.abs(scale)
			const sx = s.x >= 0 ? s.x : -s.x;
			const sy = s.y >= 0 ? s.y : -s.y;
			const sz = s.z >= 0 ? s.z : -s.z;

			AABB[0] = aabb[0] * sx + p.x;
			AABB[1] = aabb[1] * sy + p.y;
			AABB[2] = aabb[2] * sz + p.z;

			AABB[3] = aabb[3] * sx + p.x;
			AABB[4] = aabb[4] * sy + p.y;
			AABB[5] = aabb[5] * sz + p.z;

			this.isDirty = bDirty.CRH; //设置脏区标记

			return true;
		}
		return false;
	}

	clear() {
		// this.id = 0;
		this.shape = null;
		this.object.body = null;
		this.object = null;
		this.isInCollider = false;
		this.isRemove = false;
	}

	//body 坐标统一使用世界数据进行计算
	getScale() {
		return this.object.node.worldScale;
	} // world scale
	getPosition() {
		return this.object.node.worldPosition;
	} //wold position
	getRotation() {
		return this.object.node.worldRotation;
	} //world rotation

	getRotMat3() {
		//world rotate mat3
		return this.rotMat3;
	}

	getCenter() {
		const flag = bDirty.C;
		if (this.isDirty & flag) {
			this.isDirty &= ~flag;

			const aabb = this.aabb;
			const center = this.center;
			center.x = (aabb[0] + aabb[3]) * 0.5;
			center.y = (aabb[1] + aabb[4]) * 0.5;
			center.z = (aabb[2] + aabb[5]) * 0.5;
		}

		return this.center; //world center
	}

	getRaidus() {
		const flag = bDirty.R;
		if (this.isDirty & flag) {
			this.isDirty &= ~flag;

			//兼容负放大倍数
			const s = this.getScale();
			const sx = s.x >= 0 ? s.x : -s.x;
			const sy = s.y >= 0 ? s.y : -s.y;
			const sz = s.z >= 0 ? s.z : -s.z;

			const raidus = this.shape.radius;
			const scale = Math.max(sx, sy, sz);
			this.raidus = scale * raidus;
		}

		return this.raidus; //world raidus
	}

	getHalfSize() {
		const flag = bDirty.H;
		if (this.isDirty & flag) {
			this.isDirty &= ~flag;

			//兼容负放大倍数
			const s = this.getScale();
			const sx = s.x >= 0 ? s.x : -s.x;
			const sy = s.y >= 0 ? s.y : -s.y;
			const sz = s.z >= 0 ? s.z : -s.z;

			const world = this.halfSize;
			const local = this.shape.halfSize;

			world.x = sx * local.x;
			world.y = sy * local.y;
			world.z = sz * local.z;
		}

		return this.halfSize; //world halfsize
	}
}
