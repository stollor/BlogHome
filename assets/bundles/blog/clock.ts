import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('clock')
export class clock extends Component {
	@property(Node) nHour: Node = null!;
	@property(Node) nMinute: Node = null!;
	@property(Node) nSecond: Node = null!;

	hour: number = 0;
	minute: number = 0;
	second: number = 0;
	tempSum: number = 0;

	start() {
		this.init();
	}

	init() {
		const now = new Date();
		this.hour = now.getHours();
		this.minute = now.getMinutes();
		this.second = now.getSeconds();
		this.updateSecond(0);
		this.updateMinute(0);
		this.updateHour(0);
	}

	update(deltaTime: number) {
		this.tempSum += deltaTime;
		if (this.tempSum >= 1) {
			this.updateSecond(1);
			this.tempSum -= 1;
		}
	}

	updateSecond(time) {
		this.second += time;
		if (this.second >= 60) {
			this.updateMinute(Math.floor(this.second / 60));
			this.second %= 60;
		}
		if (this.second < 10) this.nSecond.setStr(`${this.second.toFixed(0).padStart(2, '0')}`);
		else this.nSecond.setStr(`${this.second.toFixed(0)}`);
	}

	updateMinute(time) {
		this.minute += time;
		if (this.minute >= 60) {
			this.updateHour(Math.floor(this.second / 60));
			this.minute %= 60;
		}
		if (this.minute < 10) this.nMinute.setStr(`${this.minute.toFixed(0).padStart(2, '0')}`);
		else this.nMinute.setStr(`${this.minute.toFixed(0)}`);
	}

	updateHour(time) {
		this.hour += time;
		this.hour %= 24;
		if (this.hour < 10) {
			this.nHour.setStr(`${this.hour.toFixed(0).padStart(2, '0')}`);
		} else {
			this.nHour.setStr(`${this.hour.toFixed(0)}`);
		}
	}
}
