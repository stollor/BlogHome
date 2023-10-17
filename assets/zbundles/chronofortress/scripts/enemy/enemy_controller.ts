import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { EnemyBase } from './enemy_base';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
	@property(Node) nodeLimit: Node;
	@property(Prefab) prefabEnemy: Prefab;

	private _limitUI: UITransform;
	private _run: boolean = false;
	private _interTime: number = 0.5;
	private _cumTime: number = 0;
	private _count: number = 0;
	start() {
		this._limitUI = this.nodeLimit.getComponent(UITransform);
		this._run = true;
	}

	addOne() {
		let node = instantiate(this.prefabEnemy);
		node.parent = this.nodeLimit;
		node.active = true;
		let x = Math.random() * this._limitUI.width - this._limitUI.width / 2;
		let y = this._limitUI.height / 2 + 100;
		node.setPosition(x, y, 0);
		this._count = (this._count + 1) % 100000;
		node.name = 'enemy' + this._count;
		let sp = node.getComponent(EnemyBase);
		sp.move = true;
	}

	update(deltaTime: number) {
		if (this._run) {
			this._cumTime += deltaTime;
			if (this._cumTime >= this._interTime) {
				this._cumTime -= this._interTime;
				this.addOne();
			}
		}
	}
}
