import { _decorator, Component, EventTouch, Input, input, instantiate, isValid, Node, UITransform, Vec3 } from 'cc';
import { weaponConfig } from '../../../config/weapon';
import { dt } from '../../define/physics';
import { Buff, BuffData, BuffEffect, BuffType, WeaponProp } from '../../define/prop';
import { Bullet } from './bullet';
const { ccclass, property } = _decorator;

@ccclass('Tower')
export class Tower extends Component {
	@property(Node) nodeBulletParent: Node;
	@property(Node) nodeButtonItem: Node;
	@property([Node]) nodeEnemys: Node[] = [];

	private _autoShot: boolean = false;
	private _autoFind: boolean = false;
	private _run: boolean = false;
	private _cumTime: number = 0;
	private _touchPos: Vec3;
	private _lastObjEnemy: Node = null;
	private _lastAngle: number = 90;
	private _ui: UITransform;
	//用于频繁计算的变量,避免无效的对象开销
	private _math_ObjWorldPosition: Vec3 = new Vec3();
	private _math_ObjLocalPosition: Vec3 = new Vec3();

	set autoShot(val: boolean) {
		this._autoShot = val;
	}

	private _buffList: Buff[];
	private _baseProp: WeaponProp;
	private _nowProp: WeaponProp;

	public set baseProp(val: WeaponProp) {
		this._baseProp = val;
	}
	public get baseProp() {
		return this._baseProp;
	}

	public set prop(val: WeaponProp) {
		this._nowProp = val;
	}
	public get prop() {
		return this._nowProp;
	}

	start() {
		input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
		input.on(Input.EventType.TOUCH_MOVE, this.onTochMove, this);
		input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
		input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
		this.baseProp = weaponConfig.gun;
		this.refreshProp();
		this._ui = this.node.getComponent(UITransform)!;
		this._run = true;
		this._autoShot = true;
		this._autoFind = true;
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
			this._lastAngle = angle;
			return angle;
		} else if (this._autoShot) {
			if (this._autoFind) {
				if (!this._lastObjEnemy || !isValid(this._lastObjEnemy)) {
					this._lastObjEnemy = this.getNearestEnemy();
					if (!this._lastObjEnemy) return -1;
				}
				this._lastAngle = this._getAngle(this._lastObjEnemy);
				return this._lastAngle;
			} else {
				return this._lastAngle;
			}
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
		this.nodeEnemys.forEach((enemyParent: Node) => {
			let length = enemyParent.children.length;
			let interval = Math.max(~~(length / 10), 1);
			for (let i = 0; i < length; i = i + interval) {
				if (!result) result = enemyParent.children[i];
				else if (result.position.y > enemyParent.children[i].position.y) result = enemyParent.children[i];
			}
		});
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
		let node = instantiate(this.nodeButtonItem);
		node.parent = this.nodeBulletParent;
		let pos = this.nodeBulletParent.getComponent(UITransform)!.convertToNodeSpaceAR(this.node.getWorldPosition());
		node.position = pos;
		let bullet = node.getComponent(Bullet)!;
		bullet.angle = angle;
		bullet.run = true;
		bullet.owner = this;
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

	refreshProp() {
		//获取基础数值备份
		let baseProp = models.utils.tool.deepClone(this.baseProp);
		this._nowProp = this._refreshProp(this._refreshProp(baseProp, BuffData.base), BuffData.all);
	}

	_refreshProp(baseProp: WeaponProp, dataType: BuffData) {
		//处理基础数值的累加
		let list1 = this._buffList.filter((item) => item.object == dataType && item.effect == BuffEffect.add);
		list1.forEach((item: Buff) => {
			baseProp[item.type] += item.val;
		});
		//处理基础数值的增幅
		for (let key in BuffType) {
			let list2 = this._buffList.filter(
				(item) => item.object == dataType && item.effect == BuffEffect.ratio && item.type == key
			);
			let ratio = 1;
			list2.forEach((item: Buff) => {
				ratio += item.val;
			});
			baseProp[key] *= ratio;
		}
		//处理基础数值的独立乘区
		let list3 = this._buffList.filter((item) => item.object == dataType && item.effect == BuffEffect.mul);
		list3.forEach((item: Buff) => {
			baseProp[item.type] *= 1 + item.val;
		});
		return baseProp;
	}
}
