import { _decorator, Color, Component, Node, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClenderItem')
export class ClenderItem extends Component {
	@property(Node) nData: Node;
	@property(Node) nFestival: Node;
	@property(Node) nInfo: Node;
	@property(Node) nOutSize: Node;

	public data;

	refresh(data) {
		this.data = data;
		this.nData.setStr(data.date);
		this.nFestival.setStr(data.festival);
		if (data.holiday === null || data.holiday === undefined) {
			this.data.holiday = data.week == 6 || data.week == 0;
		}
		this.setHoliday(this.data.holiday);
	}

	setHoliday(bool: boolean) {
		if (bool === true) {
			this.nInfo.active = true;
			this.nInfo.setStr('休');
			this.nOutSize.getComponent(Sprite).color = new Color('#ff0000');
		} else {
			this.nInfo.active = false;
			this.nOutSize.getComponent(Sprite).color = new Color('#ffffff');
		}
	}

	setHeight(height: number) {
		this.node.getComponent(UITransform).height = height;
	}
}
