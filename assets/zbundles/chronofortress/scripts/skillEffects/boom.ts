import { _decorator } from 'cc';
import { BulletType } from '../define/game';
import { BulletBase } from '../weapons/bullet_base';
const { ccclass, property } = _decorator;

@ccclass('boom')
export class boom extends BulletBase {
	constructor() {
		super();
		this.type = BulletType.Boom;
		this.prop.lifeTime = 3;
		this.prop.attack = 40;
	}
}
