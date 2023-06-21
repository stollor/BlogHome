import { _decorator, Component, EventTouch, Node, UITransform } from 'cc';
import { InterData, ScrollAdapter, WrapMode } from '../../../../models/adapter';
import { ClenderItem } from './item';
const { ccclass, property } = _decorator;

const festival = {
	'1-1': '元旦',
	'2-14': '情人节',
	'3-8': '妇女节',
	'3-12': '植树节',
	'4-1': '愚人节',
	'5-1': '劳动节',
	'5-4': '青年节',
	'6-1': '儿童节',
	'7-1': '建党节',
	'8-1': '建军节',
	'9-10': '教师节',
	'10-1': '国庆节',
	'12-24': '平安夜',
	'12-25': '圣诞节',
};

const holiday = {
	'1-1': true,
	'3-8': true,
	'5-1': true,
	'5-4': true,
	'6-1': true,
	'10-1': true,
};

@ccclass('ClenderPanel')
export class ClenderPanel extends Component {
	@property(ScrollAdapter) scrollView: ScrollAdapter = null!;
	@property(Node) item: Node;
	@property(Node) scaleBtn: Node;

	private _line: number = 0;
	start() {
		this.scrollView.prefabMap.set('item', this.item);
		this.scrollView.modelManager.insert(this.getData(), this.itemInterData.bind(this));
		this.scaleBtn.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
	}

	//拖拽按钮scaleBtn,改变node的大小
	onTouchMove(event: EventTouch) {
		let delta = event.getUIDelta();
		this.node.getComponent(UITransform).width += delta.x;
		this.node.getComponent(UITransform).height -= delta.y;
		//let itemHeight = this.node.getComponent(UITransform).height / this._line;
	}

	itemInterData(item) {
		let interdata: InterData = {
			prefab: 'item',
			onShow: (holder) => {
				holder.node.getComponent(ClenderItem).refresh(item);
				holder.node.getComponent(ClenderItem).setHeight(this.node.getComponent(UITransform).height / this._line);
			},
			element: {
				wrapAfterMode: item.week == 0 ? WrapMode.Wrap : WrapMode.Nowrap,
				wrapBeforeMode: WrapMode.Nowrap,
			},
		};
		return interdata;
	}

	getData() {
		let data = new Date();
		let year = data.getFullYear();
		let month = data.getMonth() + 1;
		let res = [];
		let lastMonthDay = new Date(year, month - 1, 0).getDate();
		let nowMotnhDay = new Date(year, month, 0).getDate();
		let nextMonthDay = new Date(year, month + 1, 0).getDate();

		let startWeek = new Date(`${year}-${month}-${1}`).getDay();
		let endWeek = new Date(`${year}-${month}-${nowMotnhDay}`).getDay();
		for (let i = 1; i < startWeek; i++) {
			let info = {
				date: lastMonthDay - i,
				week: i,
				festival: festival[`${month - 1}-${lastMonthDay - i}`],
				holiday: holiday[`${month - 1}-${lastMonthDay - i}`],
			};
			res.push(info);
		}

		for (let i = 1; i <= nowMotnhDay; i++) {
			let info = {
				date: i,
				week: new Date(`${year}-${month}-${i}`).getDay(),
				festival: festival[`${month}-${i}`],
				holiday: holiday[`${month}-${i}`],
			};
			res.push(info);
		}

		for (let i = 1; i <= 7 - endWeek; i++) {
			let info = {
				date: i,
				week: new Date(`${year}-${month + 1}-${i}`).getDay(),
				festival: festival[`${month + 1}-${i}`],
				holiday: holiday[`${month + 1}-${i}`],
			};
			res.push(info);
		}
		this._line = Math.ceil(res.length / 7);
		return res;
	}
}
