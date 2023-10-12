import { _decorator } from 'cc';
import { EnemyBase } from './enemy_base';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends EnemyBase {
	constructor() {
		super();
		this.baseProp.attack = 20;
		this.baseProp.hp = 200;
		this.baseProp.speed = 100;
		this.baseProp.attackInterval = 1;
		this.prop = models.utils.tool.deepClone(this.baseProp);
	}
}
