import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
	protected onLoad(): void {
		console.log('NewComponent');
	}
}
