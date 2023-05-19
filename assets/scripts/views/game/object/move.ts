import { _decorator, CCFloat, Component, EventKeyboard, Input, input, Vec3 } from 'cc';
import { Joystick } from '../../../../models/Joystick/Joystick';
const { ccclass, property } = _decorator;

@ccclass('ObjectMove')
export class ObjectMove extends Component {
	@property(Boolean) useKeyBoard: boolean = false;
	@property(Boolean) useJoystick: boolean = false;
	@property({
		type: Joystick,
		visible: function () {
			return this.useJoystick;
		},
	})
	joystick: Joystick;
	velocity: Vec3 = new Vec3();
	@property(CCFloat) speed: number = 100;

	private _tempPos: Vec3 = new Vec3();
	private _key = {};
	start() {
		if (this.useKeyBoard) {
			input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
			input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
		}
		if (this.useJoystick) {
			this.joystick?.init((event) => {
				let angle = event.angle;
				let ratio = event.ratio;
				switch (event.type) {
					case Input.EventType.TOUCH_START:
						this.velocity.set(Vec3.ZERO);
						break;
					case Input.EventType.TOUCH_MOVE:
						this.velocity.set(Math.cos(angle), Math.sin(angle), 0);
						this.velocity.multiplyScalar(this.speed * ratio);
						break;
					case Input.EventType.TOUCH_END:
						this.velocity.set(Vec3.ZERO);
						break;
				}
			});
		}
	}

	onKeyDown(event: EventKeyboard) {
		this._key[event.keyCode] = true;
	}

	onKeyUp(event: EventKeyboard) {
		this._key[event.keyCode] = false;
	}

	// checkKeyInput() {
	// 	// let velocity =
	// 	if (this._key[KeyCode.KEY_W]) {
	// 	}
	// }

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
