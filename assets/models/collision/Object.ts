import { Color, Component, Node, PhysicsSystem, Quat, Vec3, _decorator, ccenum, view } from 'cc';
import { cBody } from './Body';
import { cCollider } from './Collider';
import { ShapeType, cBox, cCapsule, cShape, cSphere } from './Shape';
const { ccclass, property } = _decorator;

export enum cDirty {
	R = 1,
	T = 2,
	S = 4,
	RTS = 7,
	RS = R | S,
	NON = 0,
}

export enum TriggerType {
	Enter = 'onTriggerEnter',
	Stay = 'onTriggerStay',
	Exit = 'onTriggerExit',
}

ccenum(ShapeType);
@ccclass('cObject')
export class cObject extends Component {
	@property({ group: 'Body' })
	trigger: boolean = false; //碰撞开关

	@property({ type: PhysicsSystem.PhysicsGroup, group: 'Body' })
	group = PhysicsSystem.PhysicsGroup.DEFAULT; //碰撞分组

	@property({ type: ShapeType, group: 'Shape' })
	type: ShapeType = ShapeType.Box; //相交形状类型

	@property({ group: 'Shape' })
	center: Vec3 = new Vec3(); //偏移位置，是shape相对node节点的中心偏移

	@property({
		group: 'Shape',
		visible() {
			return this.type == ShapeType.Box;
		},
	})
	size: Vec3 = new Vec3(); //方块的长宽高

	@property({
		group: 'Shape',
		visible() {
			return this.type != ShapeType.Box;
		},
	})
	radius: number = 0; //半径，sphere 或者 capsule

	@property({
		group: 'Shape',
		visible() {
			return this.type == ShapeType.Capsule;
		},
	})
	height: number = 0; //半高 ,capsule 专用

	isDirty: cDirty = cDirty.RTS;
	shape: cShape = null;
	body: cBody = null;

	//常用变量
	velocity: Vec3 = new Vec3(); //当前速度
	speed: number = 0; //最大速度
	angle: number = 0; //旋转角度

	// //上一次碰撞的状态
	lastIsInCollider: boolean = false;

	private _nowIsInCollider: boolean = false;

	set nowIsInCollider(value: boolean) {
		this.lastIsInCollider = this._nowIsInCollider;
		this._nowIsInCollider = value;
		if (this._nowIsInCollider && !this.lastIsInCollider) {
			this.onEnter(this.body);
		} else if (!this._nowIsInCollider && this.lastIsInCollider) {
			this.onExit(this.body);
		}
	}

	get nowIsInCollider() {
		return this._nowIsInCollider;
	}

	onLoad() {
		//创建碰撞形状
		switch (this.type) {
			case ShapeType.Box:
				this.shape = new cBox(this.center, this.size);
				break;
			case ShapeType.Sphere:
				this.shape = new cSphere(this.center, this.radius);
				break;
			case ShapeType.Capsule:
				this.shape = new cCapsule(this.center, this.radius, this.height);
				break;
		}

		//创建碰撞body容器
		this.body = cCollider.inst.create(this);

		this.body.shape = this.shape; //绑定碰撞形状
		this.body.group = this.group; //碰撞分组掩码
		this.body.mask = PhysicsSystem.instance.collisionMatrix[this.group];

		this.isDirty = cDirty.RTS; //首次更新标记
		//监听游戏屏幕尺寸变化
		view.on('design-resolution-changed', this.onResize, this);
		view.on('canvas-resize', this.onResize, this);
	}

	onResize() {
		this.body.shape.isDirty = true;
		this.isDirty = cDirty.RTS;
	}

	//同步位置到body
	setPosition(position: Vec3) {
		this.node.position = position;
		this.isDirty |= cDirty.T;
	}

	//同步旋转到body
	setRotation(rotation: Quat) {
		this.node.rotation = rotation;
		this.isDirty |= cDirty.R;
	}

	//同步缩放到body
	setScale(scale: Vec3) {
		this.node.scale = scale;
		this.isDirty |= cDirty.S;
	}

	getRotation() {
		return this.node.rotation;
	}
	getPosition() {
		return this.node.position;
	}
	getScale() {
		return this.node.scale;
	}

	//移除node, 是否回收body ？
	remove(retrieve: boolean = true) {
		if (this.body != null) {
			//是否回收body
			this.body.isRetrieve = retrieve;
			//移除碰撞body
			cCollider.inst.remove(this.body);
		}

		//从父节点移除
		this.node.removeFromParent();

		//最后node用户自己控制
		//this.remove.destroy() // 马上释放
		//pool.push(this.remove()); //回收复用

		return this.node;
	}

	protected onEnable(): void {
		//把body加入碰撞管理
		cCollider.inst.insert(this.body);
	}

	protected onDisable(): void {
		//移除碰撞body
		cCollider.inst.remove(this.body);
	}

	//重新添加到父节点
	insert(parent: Node | null) {
		if (this.body) {
			this.body.isRemove = false;
			this.body.isRetrieve = false;

			if (!this.body.isInCollider) {
				//已经不在collider中，重新插入
				cCollider.inst.insert(this.body);
			}
		}

		//添加到父节点
		if (parent) parent.addChild(this.node);
	}

	setAnimation(name: string) {}
	setColor(color: Color) {}

	//触发碰撞回调
	emitTrigger(b: cBody) {
		this.nowIsInCollider;
		this.onTrigger(b);
	}

	onTrigger(b: cBody) {} //trigger 回调
	onEnter(b: cBody) {} //进入碰撞回调
	onStay(b: cBody) {} //碰撞中回调
	onExit(b: cBody) {} //离开碰撞回调

	init() {}

	onDestroy() {
		this.unscheduleAllCallbacks();
		this.shape = null;
		this.body = null;
	}

	protected update(dt: number): void {}
}
