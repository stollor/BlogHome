import { _decorator } from 'cc';
import { BulletType } from '../../define/game';
import { BulletBase } from '../bullet_base';
const { ccclass, property } = _decorator;
@ccclass('Bullet')
export class Bullet extends BulletBase {
	constructor() {
		super();
		this.type = BulletType.Gun;
	}
}
