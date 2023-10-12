import { _decorator, Component } from 'cc';
import { EffectController } from './scripts/effect/effect_controller';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	start() {
		EffectController.instance = new EffectController();
	}

	update(deltaTime: number) {}
}
