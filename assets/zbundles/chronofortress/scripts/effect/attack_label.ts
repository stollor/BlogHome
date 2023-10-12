import { _decorator, Component, Label, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackLabel')
export class AttackLabel extends Component {
	@property(Label) labelNumber: Label;
	start() {}

	show(number: number) {
		this.labelNumber.string = String(number);
		tween(this.node)
			.by(0.5, { position: v3(20, 100, 0), scale: v3(0.5, 0.5, 0) }, { easing: 'sineOut' })
			.call(() => {
				this.node.destroy();
			})
			.start();
	}
}
