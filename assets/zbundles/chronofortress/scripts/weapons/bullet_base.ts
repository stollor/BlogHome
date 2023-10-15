import { _decorator, Collider2D, Component, Node } from 'cc';
import { BulletType } from '../define/game';
import { PHY_GROUP } from '../define/physics';
import { BulletProp } from './bullet_prop';
const { ccclass, property } = _decorator;

@ccclass('BulletBase')
export class BulletBase extends Component {
	type: BulletType;
	private _prop: BulletProp = { speed: 1000, lifeTime: 4, attack: 10 };
	@property(Collider2D) collider: Collider2D = null;

	public set prop(val: BulletProp) {
		for (let i in val) {
			this._prop[i] = val[i];
		}
	}
	public get prop() {
		return this._prop;
	}

	public ignoreEnemys: Node[] = [];

	private _run: boolean = false;
	private _cumTime: number = 0;

	public isLock: boolean = false;

	public set run(value: boolean) {
		this._run = value;
	}

	public _angle: number = 0;
	public set angle(value: number) {
		this._angle = value;
		this.node.setRotationFromEuler(0, 0, -90 + value);
	}
	public get angle() {
		return this._angle;
	}

	protected start(): void {
		this.collider.group = PHY_GROUP.SKILL;
	}

	update(deltaTime: number) {
		if (this._run) {
			this._cumTime += deltaTime;
			if (this._cumTime >= this.prop?.lifeTime) {
				this.node.destroy();
			}
			let dx = Math.cos((this.angle * Math.PI) / 180) * this.prop.speed * deltaTime;
			let dy = Math.sin((this.angle * Math.PI) / 180) * this.prop.speed * deltaTime;
			this.node.move(dx, dy);
		}
	}
}
