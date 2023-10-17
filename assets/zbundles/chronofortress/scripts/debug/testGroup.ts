import { _decorator, Component, Label } from 'cc';
import { Enemy } from '../enemy/enemy';
import { Tower } from '../weapons/tower/tower';
const { ccclass, property } = _decorator;

@ccclass('TestGroup')
export class TestGroup extends Component {
	@property(Tower) tower: Tower;
	@property(Label) lbTest: Label;
	start() {
		this.refresh();
		this.show();
	}

	refresh() {
		let list = this.node.getComponentsInChildren(Enemy);
		list.forEach((enemy) => {
			enemy.prop.hp = 99999999999;
			enemy.prop.speed = 0;
		});
	}

	show() {
		this.state1(this.tower)
			.then((tower: Tower) => {
				return this.state2(tower);
			})
			.then((tower: Tower) => {
				return this.state3(tower);
			})
			.then((tower: Tower) => {
				return this.state4(tower);
			})
			.then((tower: Tower) => {
				return this.state5(tower);
			})
			.then((tower: Tower) => {
				this.lbTest.string = 'over';
				tower.autoShot = false;
			});
	}

	async state1(tower: Tower = this.tower, time: number = 3) {
		this.lbTest.string = '普通状态';
		return new Promise((resolve, reject) => {
			tower.prop.interTime = 0.25;
			tower.prop.track = 1;
			tower.prop.wave = 1;
			tower.prop.attack = 10;
			this.scheduleOnce(() => {
				resolve(tower);
			}, time);
		});
	}

	async state2(tower: Tower = this.tower, time: number = 5) {
		this.lbTest.string = '增加弹轨';
		return this._Weapon(tower, 'track', 1, 5, time);
	}

	async state3(tower: Tower = this.tower, time: number = 5) {
		this.lbTest.string = '增加波次';
		return this._Weapon(tower, 'wave', 1, 5, time);
	}

	async state4(tower: Tower = this.tower, time: number = 5) {
		this.lbTest.string = '穿透弹';
		return this._Weapon(tower, 'penetr', 1, 5, time);
	}
	async state5(tower: Tower = this.tower, time: number = 5) {
		this.lbTest.string = '分裂弹';
		return this._Weapon(tower, 'splitTimes', 1, 5, time);
	}

	_Weapon(tower: Tower, val: any, startNum: number, endNum: number, time: number = 5) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < endNum; i++) {
				this.scheduleOnce(() => {
					tower.prop[val] = startNum + i;
				}, (time / endNum) * i);
			}
			this.scheduleOnce(() => {
				tower.prop[val] = startNum;
				resolve(tower);
			}, time);
		});
	}
}
