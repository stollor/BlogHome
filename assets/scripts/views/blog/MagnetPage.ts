import { CCFloat, Component, _decorator, screen } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MagnetPage')
export class MagnetPage extends Component {
	@property(CCFloat) speed: number;

	private _inter = 50;
	start() {
		this.node.on('node-moving', this.onMove, this);
	}

	get left() {
		return this.node.worldPosition.x - this.node.ui.width * this.node.ui.anchorX;
	}

	get right() {
		return this.node.worldPosition.x + this.node.ui.width * (1 - this.node.ui.anchorX);
	}

	get top() {
		return this.node.worldPosition.y + this.node.ui.height * (1 - this.node.ui.anchorY);
	}

	get bottom() {
		return this.node.worldPosition.y - this.node.ui.height * this.node.ui.anchorY;
	}

	get checkList() {
		return [0, 0, screen.windowSize.width, screen.windowSize.height];
	}
	onMove() {
		let old = this.node.worldPosition.clone();
		if (this.left < this._inter && this.left > 0) {
			console.log('left', screen.windowSize.width, screen.windowSize.height);
			this.node.setWorldPosition(this.node.ui.width * this.node.ui.anchorX, old.y, old.z);
		}

		if (this.right > screen.windowSize.width - this._inter && this.right < screen.windowSize.width) {
			console.log('right', screen.windowSize.width, screen.windowSize.height);
			this.node.setWorldPosition(screen.windowSize.width - this.node.ui.width * (1 - this.node.ui.anchorX), old.y, old.z);
		}

		if (this.top > screen.windowSize.height - this._inter && this.top < screen.windowSize.height) {
			console.log('top', screen.windowSize.width, screen.windowSize.height);
			this.node.setWorldPosition(
				old.x,
				screen.windowSize.height - this.node.ui.height * (1 - this.node.ui.anchorY),
				old.z
			);
		}

		if (this.bottom < this._inter && this.bottom > 0) {
			console.log('bottom', screen.windowSize.width, screen.windowSize.height);
			this.node.setWorldPosition(old.x, this.node.ui.height * this.node.ui.anchorY, old.z);
		}
		console.log(this.left, this.top, this.right, this.bottom);

		// if (this.right > screen.windowSize.width - 10 ) this.node.setWorldPosition(screen.windowSize.width, old.y, old.z);
		// if (this.top > screen.windowSize.height - 10) this.node.setWorldPosition(old.x, screen.windowSize.height, old.z);
		// if (this.bottom < 10) this.node.setWorldPosition(old.x, 0, old.z);
		//console.log(this.node.worldPosition);
	}

	update(deltaTime: number) {}
}
