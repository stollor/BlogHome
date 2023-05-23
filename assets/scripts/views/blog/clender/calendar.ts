import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('calendar')
export class calendar extends Component {
	year: number = 0;
	month: number = 0;
	day: number = 0;

	start() {
		this.init();
	}

	init(): void {
		const now = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		this.day = now.getDate();
	}
}
