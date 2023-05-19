import { _decorator, Color, Component, Rect, Sprite, UITransform } from 'cc';
import { BaseMove } from '../../../common/BaseMove';
import { QuadTree } from './quadTree';
const { ccclass, property } = _decorator;

@ccclass('TestItem')
export class TestItem extends Component {
	edges: Rect = new Rect(0, 0, 1000, 1000);
	bounds: Rect = new Rect(0, 0, 1000, 1000);

	_ignoreList = [];

	_ui: UITransform;
	get ui() {
		if (!this._ui) {
			this._ui = this.node.getComponent(UITransform);
		}
		return this._ui;
	}

	_baseMove: BaseMove;
	get baseMove() {
		if (!this._baseMove) {
			this._baseMove = this.node.getComponent(BaseMove);
		}
		return this._baseMove;
	}

	start() {
		this._ui = this.node.getComponent(UITransform);
		this.baseMove.speed = 100 + 100 * Math.random();
		this.baseMove.dir = 360 * Math.random();
		this.baseMove.nowVelocity.set(
			Math.sin((this.baseMove.dir * 2 * Math.PI) / 360),
			Math.cos((this.baseMove.dir * 2 * Math.PI) / 360),
			0
		);
		this.baseMove.nowVelocity.multiplyScalar(this.baseMove.speed);
		this.bounds = new Rect(
			this.node.position.x - this._ui.anchorX * this._ui.width,
			this.node.position.y - this._ui.anchorY * this._ui.height,
			this._ui.width,
			this._ui.height
		);
		// 注册单个碰撞体的回调函数
		// let collider = this.getComponent(Collider2D);
		// if (collider) {
		// 	collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		// }
	}

	// onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
	// 	if (otherCollider && otherCollider.node && otherCollider.node.getComponent(TestItem)) {
	// 		this.onCollisionEnter(otherCollider.node.getComponent(TestItem), this);
	// 	}
	// }

	//移动
	move(dt: number) {
		this.baseMove.move(dt);
		this.checkEdges();
	}

	//检查移动边界
	checkEdges() {
		if (this.node.position.x < this.edges.xMin) {
			this.baseMove.nowVelocity.x = -this.baseMove.nowVelocity.x;
		} else if (this.node.position.x > this.edges.xMax) {
			this.baseMove.nowVelocity.x = -this.baseMove.nowVelocity.x;
		}
		if (this.node.position.y < this.edges.yMin) {
			this.baseMove.nowVelocity.y = -this.baseMove.nowVelocity.y;
		} else if (this.node.position.y > this.edges.yMax) {
			this.baseMove.nowVelocity.y = -this.baseMove.nowVelocity.y;
		}
	}

	//检查碰撞
	checkCollision(quadTree: QuadTree) {
		this.bounds = new Rect(
			this.node.position.x - this.ui.anchorX * this.ui.width,
			this.node.position.y - this.ui.anchorY * this.ui.height,
			this.ui.width,
			this.ui.height
		);
		quadTree.retrieveNode(this.node).forEach((item) => {
			if (item.node.uuid != this.node.uuid) {
				if (
					!(
						this.bounds.x > item.x ||
						this.bounds.x + this.bounds.width < item.x ||
						this.bounds.y > item.y ||
						this.bounds.y + this.bounds.height < item.y
					)
				) {
					let itemComponent = item.node.getComponent(TestItem);
					this.onCollisionEnter(itemComponent, this);
					itemComponent.onCollisionEnter(this, itemComponent);
					console.log('碰撞');
				} else {
					this.node.getComponent(Sprite).color = Color.WHITE;
					item.node.getComponent(Sprite).color = Color.WHITE;
				}
			}
		});
	}

	/**
	 * 发生触碰
	 * @param other
	 * @param self
	 */
	onCollisionEnter(other: TestItem, self: TestItem) {
		// let p1 = self.mass * self.speed;
		// let p2 = other.mass * other.speed;
		// let p = p1 + p2;

		let x = (Math.abs(self.baseMove.nowVelocity.x) + Math.abs(other.baseMove.nowVelocity.x)) / 2;
		let y = (Math.abs(self.baseMove.nowVelocity.y) + Math.abs(other.baseMove.nowVelocity.y)) / 2;
		if (self.baseMove.nowVelocity.x < 0 && self.node.position.x > other.node.position.x) {
			x = -x;
		} else if (self.baseMove.nowVelocity.x > 0 && self.node.position.x < other.node.position.x) {
			x = -x;
		}
		if (self.baseMove.nowVelocity.y < 0 && self.node.position.y > other.node.position.y) {
			y = -y;
		} else if (self.baseMove.nowVelocity.y > 0 && self.node.position.y < other.node.position.y) {
			y = -y;
		}
		self.baseMove.nowVelocity.set(x, y, 0);
		self.node.getComponent(Sprite).color = Color.RED;
		//self.velocity = this.velocity.multiplyScalar(-1);

		//防止重复碰撞
		// self._ignoreList.push(other.node.uuid);
		// self.scheduleOnce(() => {
		// 	self._ignoreList.remove(other.node.uuid);
		// }, 0.03);
	}
}
