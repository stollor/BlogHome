import { _decorator, Collider2D, Component } from 'cc';
import { BulletType } from '../define/game';
import { PHY_GROUP } from '../define/physics';
import { BulletProp } from './bullet_prop';
const { ccclass, property } = _decorator;

@ccclass('BulletBase')
export class BulletBase extends Component {
	type: BulletType;
	prop: BulletProp = new BulletProp();
	@property(Collider2D) collider: Collider2D = null;

	private _run: boolean = false;
	private _cumTime: number = 0;

	public isLock: boolean = false;

	public set run(value: boolean) {
		this._run = value;
	}

	public set angle(value: number) {
		this.prop.angle = value;
		this.node.setRotationFromEuler(0, 0, -90 + value);
	}

	protected start(): void {
		this.collider.group = PHY_GROUP.SKILL;
	}

	update(deltaTime: number) {
		if (this._run) {
			this._cumTime += deltaTime;
			if (this._cumTime >= this.prop.lifeTime) {
				this.node.destroy();
			}
			let dx = Math.cos((this.prop.angle * Math.PI) / 180) * this.prop.speed * deltaTime;
			let dy = Math.sin((this.prop.angle * Math.PI) / 180) * this.prop.speed * deltaTime;
			this.node.move(dx, dy);
		}
	}
}
