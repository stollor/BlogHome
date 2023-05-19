import { _decorator, Component, EditBox, Node } from 'cc';
import { Data } from './data';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
	@property(Node) show: Node;
	@property(EditBox) input: EditBox;

	start() {
		let a = new Data('123');
		this.show.bindData(a);

		this.input.node.on(
			EditBox.EventType.EDITING_DID_ENDED,
			(ed: EditBox) => {
				a.set(ed.string);
			},
			this
		);
	}

	update(deltaTime: number) {}
}
