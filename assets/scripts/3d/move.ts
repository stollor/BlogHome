import { _decorator, CCFloat, Component, EventKeyboard, Input, input, KeyCode, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const InKey = {};
@ccclass('Move')
export class Move extends Component {
	@property(CCFloat) speed = 1;

	private _unitScale = 0.1;
	start() {
		input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
		input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
	}

	onKeyDown(event: EventKeyboard) {
		InKey[event.keyCode] = true;
	}

	onKeyUp(event: EventKeyboard) {
		InKey[event.keyCode] = false;
	}

	update(deltaTime: number) {
		if (InKey[KeyCode.KEY_W]) {
			this.node.translate(new Vec3(0, 0, 1 * this.speed * this._unitScale));
		}
		if (InKey[KeyCode.KEY_S]) {
			this.node.translate(new Vec3(0, 0, -1 * this.speed * this._unitScale));
		}
		if (InKey[KeyCode.KEY_A]) {
			this.node.translate(new Vec3(1 * this.speed * this._unitScale, 0, 0));
		}
		if (InKey[KeyCode.KEY_D]) {
			this.node.translate(new Vec3(-1 * this.speed * this._unitScale, 0, 0));
		}
	}
}
