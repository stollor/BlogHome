import { CCBoolean, Component, EventTouch, Node, UITransform, Vec2, Vec3, Vec4, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PanelDray')
export class PanelDray extends Component {
	@property(Vec2) minSize: Vec2 = new Vec2(400, 400);
	@property(Vec4) checkWidth: Vec4 = new Vec4(10, 10, 10, 10);
	@property(CCBoolean) canMove: boolean = true;
	private _ui: UITransform;
	private _drayX: Boolean = false;
	private _drayY: Boolean = false;
	private _drayXScale = 1;
	private _drayYScale = 1;
	private _draying: Boolean = false;
	private _canMove: Boolean = true;
	get ui() {
		if (!this._ui) this._ui = this.node.getComponent(UITransform);
		return this._ui;
	}
	start() {
		this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
		this.node.on(Node.EventType.MOUSE_LEAVE, this.onTouchEnd, this);
		this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
	}

	onMouseMove(event: EventTouch) {
		if (this._draying) return;
		let v1 = new Vec3(0, 0, 0);
		let v2 = new Vec3(event.getUILocation().x, event.getUILocation().y, 0);
		this.node.inverseTransformPoint(v1, v2);
		let drayX = false,
			drayY = false,
			drayXScale = 0,
			drayYScale = 0;
		if (v1.x > this.ui.width / 2 - this.checkWidth.z) {
			drayX = true;
			drayXScale = 1;
		} else if (v1.x < (this.ui.width / 2) * -1 + this.checkWidth.x) {
			drayX = true;
			drayXScale = -1;
		}

		if (v1.y > this.ui.height / 2 - this.checkWidth.y) {
			drayY = true;
			drayYScale = -1;
		} else if (v1.y < (this.ui.height / 2) * -1 + this.checkWidth.w) {
			drayY = true;
			drayYScale = 1;
		}
		this.setMouseCursor(drayX, drayY, drayXScale, drayYScale);
	}

	onTouchStart(event: EventTouch) {
		let v1 = new Vec3(0, 0, 0);
		let v2 = new Vec3(event.getUILocation().x, event.getUILocation().y, 0);
		this.node.inverseTransformPoint(v1, v2);
		this._draying = true;
		let cb = () => {
			event.propagationStopped = true;
		};

		if (v1.x > this.ui.width / 2 - this.checkWidth.z) {
			this.node.moveAnchorTo(0, null);
			this._drayX = true;
			this._drayXScale = 1;
			cb();
		} else if (v1.x < (this.ui.width / 2) * -1 + this.checkWidth.x) {
			this.node.moveAnchorTo(1, null);
			this._drayX = true;
			this._drayXScale = -1;
			cb();
		}

		if (v1.y > this.ui.height / 2 - this.checkWidth.y) {
			this.node.moveAnchorTo(null, 0);
			this._drayY = true;
			this._drayYScale = -1;
			cb();
		} else if (v1.y < (this.ui.height / 2) * -1 + this.checkWidth.w) {
			this.node.moveAnchorTo(null, 1);
			this._drayY = true;
			this._drayYScale = 1;
			cb();
		}
		this.setMouseCursor(this._drayX, this._drayY, this._drayXScale, this._drayYScale);
		this._canMove = this.canMove;
	}

	onTouchMove(event: EventTouch) {
		let delta = event.getUIDelta();
		if (this._drayX) this.ui.width = Math.max(delta.x * this._drayXScale + this.ui.width, this.minSize.x);
		if (this._drayY) this.ui.height = Math.max(-delta.y * this._drayYScale + this.ui.height, this.minSize.y);
		if (this._canMove && !this._drayX && !this._drayY) {
			this.node.move(delta.x, delta.y);
		}
		if (this._drayX || this._drayY) {
			event.propagationStopped = true;
		}
	}

	onTouchEnd(event: EventTouch) {
		this._drayX = false;
		this._drayY = false;
		this._draying = false;
		this._canMove = false;
		this.node.moveAnchorTo(0.5, 0.5);
		let gcs = document.getElementById('GameCanvas');
		gcs && (gcs.style.cursor = 'default');
	}

	setMouseCursor(drayX, drayY, drayXScale, drayYScale) {
		let gcs = document.getElementById('GameCanvas');
		if (!gcs) return;
		if (drayX && !drayY) {
			gcs.style.cursor = 'ew-resize';
		} else if (drayY && !drayX) {
			gcs.style.cursor = 'ns-resize';
		} else if (drayX && drayY) {
			if (drayXScale == 1 && drayYScale == 1) {
				gcs.style.cursor = 'se-resize';
			} else if (drayXScale == 1 && drayYScale == -1) {
				gcs.style.cursor = 'ne-resize';
			} else if (drayXScale == -1 && drayYScale == 1) {
				gcs.style.cursor = 'ne-resize';
			} else if (drayXScale == -1 && drayYScale == -1) {
				gcs.style.cursor = 'se-resize';
			}
		} else {
			gcs.style.cursor = 'default';
		}
	}
}
