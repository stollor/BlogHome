// import { Node, Prefab, _decorator } from 'cc';

// import { Holder } from '../../../models/adapter/abstract/Holder';
// import { ScrollAdapter } from '../../../models/adapter/abstract/ScrollAdapter';
// import { View } from '../../../models/adapter/abstract/View';
// import { WrapMode } from '../../../models/adapter/define/enum';
// import { IElement } from '../../../models/adapter/define/interface';
// import { ChatItemView, IChatItem } from './item';
// const { ccclass, property } = _decorator;

// class MyView extends View<IChatItem> {
// 	protected onVisible(): void {}
// 	protected onDisable(): void {}
// }
// class MyHolder extends Holder<IChatItem> {
// 	private _item: ChatItemView = null;
// 	protected onCreated(): void {
// 		this._item = this.node.getComponent(ChatItemView);
// 	}
// 	protected onVisible(): void {
// 		this._item.show(this);
// 	}
// 	protected onDisable(): void {
// 		this._item.hide();
// 	}
// }

// @ccclass('ChatListView')
// export class ChatListView extends ScrollAdapter<IChatItem> {
// 	@property(Prefab) prefab1: Prefab = null;
// 	@property(Prefab) prefab2: Prefab = null;
// 	@property(Prefab) prefab3: Prefab = null;

// 	public getPrefab(data: IChatItem): Prefab {
// 		if (data.type == 0) {
// 			return this.prefab1;
// 		} else if (data.type == 1) {
// 			return this.prefab2;
// 		} else if (data.type == 2) {
// 			return this.prefab3;
// 		}
// 	}
// 	public getView(): View<IChatItem, ScrollAdapter<IChatItem>> {
// 		return new MyView(this);
// 	}
// 	public getHolder(node: Node, code: string): Holder<IChatItem, ScrollAdapter<IChatItem>> {
// 		return new MyHolder(node, code, this);
// 	}
// 	public initElement(element: IElement, data: IChatItem): void {
// 		element.wrapBeforeMode = WrapMode.Auto;
// 	}

// 	show(holder: Holder<IChatItem>) {}

// 	hide() {}
// }
