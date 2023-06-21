import { _decorator, Component, director, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	start() {}

	onButtonEvent(event: EventTouch, data) {
		this.switchScene(data);
	}

	switchScene(name) {
		director.loadScene(name);
	}
}
