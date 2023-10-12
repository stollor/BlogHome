import { _decorator } from 'cc';
import { BulletType } from '../../define/game';
import { BulletBase } from '../bullet_base';
const { ccclass, property } = _decorator;
@ccclass('Bullet')
export class Bullet extends BulletBase {
	constructor() {
		super();
		this.type = BulletType.Gun;
		this.prop.lifeTime = 3;
		this.prop.attack = 10;
		this.prop.speed = 600;
		this.prop.penetr = 3;
		this.prop.speedDecay = 0.6;
		this.prop.splitCount = 3;
		this.prop.splitTimes = 1;
		this.prop.reflect = true;
		this.prop.boom = true;
	}
}
