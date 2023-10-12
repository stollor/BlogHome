import { _decorator, Component, EventTouch, Input, input, instantiate, Node, UITransform, Vec3 } from 'cc';
import { dt } from '../../define/physics';
import { WeaponProp } from '../weapon_prop';
import { Bullet } from './bullet';
const { ccclass, property } = _decorator;

@ccclass('Tower')
export class Tower extends Component {
	@property(Node) nodeBulletLimit: Node;
	@property(Node) nodeEnemy: Node;
	@property(Node) nodeButton: Node;

	public prop: WeaponProp = new WeaponProp();

	private _autoShot: boolean = false;
	private _run: boolean = false;
	private _cumTime: number = 0;
	private _touchPos: Vec3;
	private _lastObjEnemy: Node = null;
	private _ui: UITransform;
	//用于频繁计算的变量,避免无效的对象开销
	private _math_ObjWorldPosition: Vec3 = new Vec3();
	private _math_ObjLocalPosition: Vec3 = new Vec3();

	start() {
		input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
		input.on(Input.EventType.TOUCH_MOVE, this.onTochMove, this);
		input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
		input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
		this.initProp();
		this._ui = this.node.getComponent(UITransform)!;
		this._run = true;
		this._autoShot = true;
	}

	initProp() {
		this.prop.interTime = 0.5;
		this.prop.track = 2;
		this.prop.wave = 2;
	}

	onTouchStart(event: EventTouch) {
		this._touchPos = event.getUILocation().to3();
	}

	onTochMove(event: EventTouch) {
		this._touchPos = event.getUILocation().to3();
	}

	onTouchEnd(event: EventTouch) {
		this._touchPos = null;
	}

	getAngle() {
		if (this._touchPos) {
			//相对于塔的坐标
			let pos2 = this._ui.convertToNodeSpaceAR(this._touchPos);
			//相对于塔的角度
			let angle = (Math.atan2(pos2.y, pos2.x) * 180) / Math.PI;
			return angle;
		} else if (this._autoShot) {
			if (!this._lastObjEnemy || !this._lastObjEnemy.isValid) {
				this._lastObjEnemy = this.getNearestEnemy();
				if (!this._lastObjEnemy) return -1;
			}
			return this._getAngle(this._lastObjEnemy);
		} else {
			return -1;
		}
	}

	_getAngle(Obj: Node): number {
		Obj.getWorldPosition(this._math_ObjWorldPosition);
		this._ui.convertToNodeSpaceAR(this._math_ObjWorldPosition, this._math_ObjLocalPosition);
		let angle = (Math.atan2(this._math_ObjLocalPosition.y, this._math_ObjLocalPosition.x) * 180) / Math.PI;
		return angle;
	}

	getNearestEnemy(): Node {
		let result: Node = null;
		let length = this.nodeEnemy.children.length;
		let interval = Math.max(~~(length / 10), 1);
		for (let i = 0; i < length; i = i + interval) {
			if (!result) result = this.nodeEnemy.children[i];
			else if (result.position.y > this.nodeEnemy.children[i].position.y) result = this.nodeEnemy.children[i];
		}
		return result;
	}

	onShot(angle: number) {
		let dx = Math.cos((angle * Math.PI) / 180) * 20;
		let dy = Math.sin((angle * Math.PI) / 180) * 20;
		let startX = (-1 * this.prop.track * dx) / 2;
		let startY = (-1 * this.prop.track * dy) / 2;
		for (let i = 0; i < this.prop.wave; i++) {
			this.scheduleOnce(() => {
				for (let j = 0; j < this.prop.track; j++) {
					let buttle = this._onShot(angle);
					buttle.move(startY + dy * j, -1 * (startX + dx * j));
				}
			}, i * dt * 4);
		}
	}

	_onShot(angle: number) {
		let node = instantiate(this.nodeButton);
		node.parent = this.nodeBulletLimit;
		let pos = this.nodeBulletLimit.getComponent(UITransform)!.convertToNodeSpaceAR(this.node.getWorldPosition());
		node.position = pos;
		let bullet = node.getComponent(Bullet)!;
		bullet.prop.angle = angle;
		bullet.run = true;
		return node;
	}

	update(deltaTime: number) {
		if (this._run) {
			this._cumTime += deltaTime;
			if (this._cumTime >= this.prop.interTime) {
				this._cumTime -= this.prop.interTime;
				let angle = this.getAngle();
				if (angle != -1) {
					this.onShot(angle);
				}
			}
		}
	}
}
