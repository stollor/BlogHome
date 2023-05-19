import { _decorator, Component, EditBox, WebView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
	@property(WebView) web: WebView;

	start() {}

	update(deltaTime: number) {}

	setWebUrl(edit: EditBox) {
		this.web.url = edit.string;
	}
}
