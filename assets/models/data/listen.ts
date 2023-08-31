import { Enum } from 'cc';
import { ProgressBar } from 'cc';
import { Toggle } from 'cc';
import { Slider } from 'cc';
import { EditBox } from 'cc';
import { Label } from 'cc';
import { CCString } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Data } from './data';
import { EDITOR } from 'cc/env';

const { ccclass, property } = _decorator;

enum ListenType {
	Label,
	Sprite,
	ProgressBar,
	EditBox,
	Toggle,
	Slider,
	VirtualList,
}

Enum(ListenType);

@ccclass('data/Listen')
export class Listen extends Component {
	@property private _key: string = '';
	@property(CCString)
	get key(): string {
		return this._key;
	}
	set key(value: string) {
		this._key = value;
		this.refresh();
	}

	@property({ type: ListenType }) type: ListenType = ListenType.Label;
	public data: Data = null;

	protected onLoad(): void {
		this.refresh();
	}

	refresh(): void {
		if (EDITOR) {
			return;
		}
		this.data = null;
		if (!this.key) return;

		this.data = models.database.get(this.key);
		this.data.onChange = (val, _) => {
			this.onChange(val);
		};
	}

	onChange(val) {
		switch (this.type) {
			case ListenType.Label:
				{
					this.node.getComponent(Label).string = val;
				}
				break;
			case ListenType.Sprite:
				{
					this.node.setImgSrc(val);
				}
				break;
			case ListenType.ProgressBar:
				{
					this.node.getComponent(ProgressBar).progress = val;
				}
				break;
			case ListenType.EditBox:
				{
					this.node.getComponent(EditBox).string = val;
				}
				break;
			case ListenType.Toggle:
				{
					this.node.getComponent(Toggle).isChecked = !!val;
				}
				break;
			case ListenType.Slider:
				{
					this.node.getComponent(Slider).progress = val;
				}
				break;
			case ListenType.VirtualList:
				{
					//TODO:未实装
					let virtualList: any = this.node.getComponent('VirtualList');
					if (virtualList) {
						virtualList.modelManager.clear();
						virtualList.modelManager.insert(val);
					}
				}
				break;
		}
	}
}
