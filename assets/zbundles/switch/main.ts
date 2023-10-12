import { assetManager } from 'cc';
import { _decorator, Component, director, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	start() {
		// assetManager.loadBundle('models', (err, bundle) => {
		// });
	}

	onButtonEvent(event: EventTouch, data) {
		this.switchScene(data);
	}

	switchScene(name) {
		director.loadScene(name);
	}
}
