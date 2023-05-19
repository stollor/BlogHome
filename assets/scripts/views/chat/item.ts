import { Component, Node, RichText, UITransform, _decorator } from 'cc';
import { Holder } from '../../../models/adapter/abstract/Holder';
const { ccclass, property } = _decorator;

export interface IChatItem {
	type: number;
	msg: string;
	head?: string;
	name?: string;
}

@ccclass('ChatItemView')
export class ChatItemView extends Component {
	@property(Node) nodeName: Node = null;
	@property(Node) nodeMsg: Node = null;
	@property(Node) nodeIcon: Node = null;
	@property(Node) nodeBg: Node = null;

	private _holder: Holder<IChatItem> = null;

	onEnable() {
		this.nodeMsg.on(Node.EventType.SIZE_CHANGED, this.onMessageSizeChanged, this);
	}

	onDisable() {
		this.nodeMsg.off(Node.EventType.SIZE_CHANGED, this.onMessageSizeChanged, this);
	}

	show(holder: Holder) {
		this._holder = holder;
		if (this._holder.data.type == 2) {
			this.nodeMsg.setStr(this._holder.data.msg);
		} else {
			this.nodeMsg.getComponent(RichText).maxWidth = 0;
			this.nodeName.setStr(this._holder.data.name);
			this.nodeMsg.setStr(this._holder.data.msg);
			//this.nodeMsg.getComponent(Label).overflow = Label.Overflow.NONE
		}
	}

	hide() {
		this.nodeName.setStr('');
		this.nodeMsg.setStr('');
	}

	onMessageSizeChanged() {
		if (!this._holder || !this.node.active || this._holder.data.type == 2) return;
		var maxWidth = this._holder.adapter.crossAxisSize - 200;
		if (this.nodeMsg.getComponent(UITransform).width > maxWidth) {
			this.nodeMsg.getComponent(RichText)!.maxWidth = maxWidth;
			return;
		}
		this.scheduleOnce(() => {
			this.nodeBg.getComponent(UITransform).width = this.nodeMsg.getComponent(UITransform).width + 20;
			this.nodeBg.getComponent(UITransform).height = this.nodeMsg.getComponent(UITransform).height + 20;
			this._holder.transform.height = Math.max(this.nodeBg.getComponent(UITransform).height, 120);
			//this.messageBg.getComponent(Widget).updateAlignment()
		});
	}

	// onMessageSizeChanged() {
	//     if (!this._holder || !this.node.active) return console.error("没有显示")
	//     var maxWidth = this._holder.adapter.crossAxisSize - 200
	//     if (this._messageLabelTr.width > maxWidth) {
	//         this.messageLabel.overflow = Label.Overflow.RESIZE_HEIGHT
	//         this._messageLabelTr.width = maxWidth
	//         return
	//     }
	//     // this.messageBg.setContentSize(this._messageLabelTr.width, this._messageLabelTr.height)
	//     this.scheduleOnce(() => {
	//         console.log("修改背景")
	//         this.messageBg.setContentSize(this._messageLabelTr.width + 40, this._messageLabelTr.height + 30)
	//         this._holder.transform.height = Math.max(this.messageBg.height, 100)
	//         // 不手动调用也不会更新
	//         this.messageBg.getComponent(Widget).updateAlignment()
	//     })
	// }
}
