import { Component, EventTouch, Input, Node, UITransform, Vec2, Vec3, _decorator, input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {
	@property(Node)
	round!: Node; //摇杆背景

	@property(Node)
	inner!: Node; //摇杆 也就是中心点

	@property
	isStatic: boolean = true; //固定罗盘不隐藏

	@property
	isDiretion: boolean = false; //是否为方向模式(中心指示点拉尽)

	@property
	maxRadius: number = 128;

	@property
	activeRange: number = 0.1; //摇杆触发范围比例（0-1）

	private joystickCB: Function | null = null;

	public touchID: number | null = -1;

	onLoad() {
		this.show(this.isStatic);
		if (this.isStatic) {
			this.round.on(Node.EventType.TOUCH_START, this.touchStart, this);
			this.round.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
			this.round.on(Node.EventType.TOUCH_END, this.touchEnd, this);
			this.round.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
		} else {
			input.on(Input.EventType.TOUCH_START, this.touchStart, this);
			input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
			input.on(Input.EventType.TOUCH_CANCEL, this.touchEnd, this);
			input.on(Input.EventType.TOUCH_END, this.touchEnd, this);
		}
	}

	init(cb: Function) {
		this.joystickCB = cb;
	}

	show(flag: boolean) {
		this.round.active = flag;
	}

	innerPosition(pos: Vec2) {
		let data = { type: null, active: true, angle: 0, ratio: 0 };

		let ui = this.round.getComponent(UITransform);
		let s = ui!.convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
		s.z = 0;

		//触发范围
		if (s.length() <= this.maxRadius * this.activeRange) {
			this.inner.position = new Vec3();
			data.active = false;
			return data;
		}

		//限制范围
		if (s.length() > this.maxRadius || this.isDiretion) {
			s = s.normalize();
			s = s.multiplyScalar(this.maxRadius);
		}
		this.inner.position = new Vec3(s); //修正位置

		//实际数据
		data.active = true;
		data.angle = Math.atan2(s.y, s.x);
		data.ratio = s.length() / this.maxRadius; // (s.length()-this.maxRadius*this.activeRange)/(this.maxRadius*(1.0 - this.activeRange)); //

		return data;
	}

	touchStart(event: EventTouch) {
		if (this.touchID == -1) {
			this.touchID = event.getID();

			if (!this.isStatic) {
				this.show(true);
				let pos = event.getUILocation();
				this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
			}
		}

		if (this.touchID != event.getID()) return false;
		let data: any = this.innerPosition(event.getUILocation());
		data.type = Input.EventType.TOUCH_START;
		this.joystickCB && this.joystickCB(data);

		return true;
	}

	touchMove(event: EventTouch) {
		if (this.touchID != event.getID()) return false;
		let data: any = this.innerPosition(event.getUILocation());
		data.type = Input.EventType.TOUCH_MOVE;
		this.joystickCB && this.joystickCB(data);

		return true;
	}

	touchEnd(event: EventTouch) {
		//摇杆弹回原位置
		if (this.touchID != event.getID()) return false;

		this.touchID = -1;
		this.show(this.isStatic);

		this.inner.position = new Vec3();
		let data = { type: Input.EventType.TOUCH_END, active: false, angle: 0, ratio: 0 };
		this.joystickCB && this.joystickCB(data);

		return true;
	}
}
