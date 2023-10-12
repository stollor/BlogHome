import { _decorator } from 'cc';
import { WallBase } from './wall_base';
const { ccclass, property } = _decorator;

@ccclass('Wall')
export class Wall extends WallBase {
	constructor() {
		super();
		this.baseProp.hp = 1000;
		this.prop = models.utils.tool.deepClone(this.baseProp);
	}
}
