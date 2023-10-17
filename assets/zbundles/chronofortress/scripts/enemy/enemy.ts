import { _decorator } from 'cc';
import { enemyConfig } from '../../config/enemy';
import { EnemyBase } from './enemy_base';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends EnemyBase {
	constructor() {
		super();
		this.baseProp = enemyConfig.base;
		this.refreshProp();
	}
}
