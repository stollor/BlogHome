import { _decorator, Collider2D, Component, Node } from 'cc';
import { BulletType } from '../define/game';
import { PHY_GROUP } from '../define/physics';
import { WeaponProp } from '../define/prop';
import { Tower } from './tower/tower';

const { ccclass, property } = _decorator;

@ccclass('BulletBase')
export class BulletBase extends Component {
	@property(Collider2D) collider: Collider2D = null;

	public type: BulletType;

	private _owner: Tower;
	public get owner(): Tower {
		return this._owner;
	}
	public set owner(v: Tower) {
		this._owner = v;
		this.prop = models.utils.tool.deepClone(v.prop);
	}

	public prop: WeaponProp;

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
